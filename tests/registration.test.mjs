import assert from "node:assert/strict";
import { test } from "node:test";
import handler from "../api/send-registration-email.ts";
import { submitRegistration, RegistrationRequestError } from "../src/lib/api.ts";

const registration = {
  firstName: "<Grace>",
  lastName: "Okafor",
  email: "grace@example.test",
  phone: "+2348000000000",
  city: "Warri",
  churchType: "Godhouse",
  godhouseCentre: "Ojo",
  otherChurch: "Previously entered",
  attendanceType: "Physical",
  accommodation: "no",
};

function response() {
  return {
    statusCode: 200,
    headers: {},
    data: undefined,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(data) { this.data = data; return this; },
  };
}

function configureToken(t) {
  const previous = process.env.SENDER_API_TOKEN;
  process.env.SENDER_API_TOKEN = "fake-token";
  t.after(() => {
    if (previous === undefined) delete process.env.SENDER_API_TOKEN;
    else process.env.SENDER_API_TOKEN = previous;
  });
}

test("the handler saves in Django before exactly one Sender call and uses its own HTML", async (t) => {
  const requests = [];
  t.mock.method(globalThis, "fetch", async (url, init) => {
    requests.push([url, JSON.parse(init.body), init]);
    if (requests.length === 1) {
      assert.equal(url, "https://godhouse.org/api/rvc/register/");
      assert.equal(requests[0][1].godhouseCentre, "Ojo");
      assert.equal(requests[0][1].otherChurch, undefined);
      assert.equal(requests[0][1].html, undefined);
      return Response.json({ message: "Saved", confirmation_email_sent: false }, { status: 201 });
    }
    assert.equal(url, "https://api.sender.net/v2/message/send");
    assert.match(requests[1][1].html, /&lt;Grace&gt;/);
    assert.equal(requests[1][1].html.includes("INJECTED HTML"), false);
    assert.equal(requests[1][1].to.email, registration.email);
    return Response.json({ success: true, message: "Email sent", emailId: "fake-id" });
  });
  configureToken(t);
  const res = response();
  await handler({ method: "POST", body: { ...registration, html: "INJECTED HTML" } }, res);
  assert.equal(requests.length, 2);
  assert.equal(res.statusCode, 201);
  assert.deepEqual(res.data, { message: "Saved", confirmation_email_sent: true });
});

test("a duplicate, rate limit, or validation failure never invokes Sender", async (t) => {
  for (const status of [400, 409, 429]) {
    let calls = 0;
    const body = status === 400
      ? { message: "Check your information", errors: { phone: ["Invalid phone"] } }
      : { message: "Already registered" };
    t.mock.method(globalThis, "fetch", async () => {
      calls += 1;
      return Response.json(body, { status });
    });
    const res = response();
    await handler({ method: "POST", body: registration }, res);
    assert.equal(calls, 1);
    assert.equal(res.statusCode, status);
    assert.deepEqual(res.data, body);
    t.mock.restoreAll();
  }
});

test("desk registrations save without invoking Sender", async (t) => {
  for (const email of [null, "", "none", " NO-EMAIL "]) {
    let calls = 0;
    t.mock.method(globalThis, "fetch", async (_url, init) => {
      calls += 1;
      assert.equal(JSON.parse(init.body).email, null);
      return Response.json({ message: "Saved" }, { status: 201 });
    });
    const res = response();
    await handler({ method: "POST", body: { ...registration, email } }, res);
    assert.equal(calls, 1);
    assert.equal(res.statusCode, 201);
    assert.deepEqual(res.data, { message: "Saved", confirmation_email_sent: false });
    t.mock.restoreAll();
  }
});

test("missing Sender configuration keeps the saved registration and avoids calling the provider", async (t) => {
  configureToken(t);
  delete process.env.SENDER_API_TOKEN;
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls += 1;
    return Response.json({ message: "Saved" }, { status: 201 });
  });
  const res = response();
  await handler({ method: "POST", body: registration }, res);
  assert.equal(calls, 1);
  assert.equal(res.statusCode, 201);
  assert.equal(res.data.confirmation_email_sent, false);
  assert.equal(typeof res.data.confirmation_email_error, "string");
});

test("provider failure or malformed acceptance leaves the saved registration successful with a warning", async (t) => {
  configureToken(t);
  for (const provider of ["reject", "malformed", "timeout", "non-json"]) {
    let calls = 0;
    t.mock.method(globalThis, "fetch", async () => {
      calls += 1;
      if (calls === 1) return Response.json({ message: "Saved" }, { status: 201 });
      if (provider === "timeout") throw new DOMException("Timed out", "TimeoutError");
      if (provider === "non-json") return new Response("OK");
      return Response.json({ success: false }, { status: provider === "reject" ? 502 : 200 });
    });
    const res = response();
    await handler({ method: "POST", body: registration }, res);
    assert.equal(calls, 2);
    assert.equal(res.statusCode, 201);
    assert.equal(res.data.message, "Saved");
    assert.equal(res.data.confirmation_email_sent, false);
    assert.equal(typeof res.data.confirmation_email_error, "string");
    t.mock.restoreAll();
  }
});

test("an unreachable backend or incomplete persistence receipt never invokes Sender", async (t) => {
  for (const backend of ["timeout", "malformed", "bad_input"]) {
    let calls = 0;
    t.mock.method(globalThis, "fetch", async () => {
      calls += 1;
      if (backend === "timeout") throw new DOMException("Timed out", "TimeoutError");
      if (backend === "bad_input") return new Response("Bad Gateway", { status: 502 });
      return Response.json({ unexpected: true }, { status: 201 });
    });
    const res = response();
    await handler({ method: "POST", body: registration }, res);
    assert.equal(calls, 1);
    assert.equal(res.statusCode, 502);
    assert.equal(res.data.confirmation_email_sent, undefined);
    t.mock.restoreAll();
  }
});

test("recipient-only requests, invalid JSON, and other HTTP methods cannot send", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => { calls += 1; throw new Error("Should not call"); });
  for (const req of [
    { method: "POST", body: { email: registration.email, firstName: registration.firstName } },
    { method: "POST", body: "{" },
    { method: "GET" },
  ]) {
    const res = response();
    await handler(req, res);
    assert.ok([400, 405].includes(res.statusCode));
  }
  assert.equal(calls, 0);
});

test("the browser calls the same-origin orchestration once and accepts saved mail failure", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls += 1;
    assert.equal(url, "/api/send-registration-email");
    assert.equal(init.credentials, "omit");
    assert.equal(JSON.parse(init.body).email, null);
    return Response.json({ message: "Saved", confirmation_email_sent: false }, { status: 201 });
  });
  assert.deepEqual(await submitRegistration({ ...registration, email: " NO-EMAIL " }), {
    message: "Saved", confirmation_email_sent: false,
  });
  assert.equal(calls, 1);
});

test("browser duplicate errors and malformed success never navigate as a saved registration", async (t) => {
  for (const status of [409, 200, 201]) {
    t.mock.method(globalThis, "fetch", async () => Response.json(
      status === 409 ? { message: "Already registered" } : { message: "Missing mail result" },
      { status },
    ));
    await assert.rejects(submitRegistration(registration), RegistrationRequestError);
    t.mock.restoreAll();
  }
});
