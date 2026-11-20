import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { pathToFileURL } from "node:url";
import ts from "typescript";

test("the compiled Vercel function starts in native Node ESM without a development loader", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "rvc-function-startup-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await writeFile(join(directory, "package.json"), JSON.stringify({ type: "module" }));

  for (const filename of ["api/send-registration-email.ts", "api/_template.ts", "src/lib/emailBypass.ts"]) {
    const source = await readFile(new URL(`../${filename}`, import.meta.url), "utf8");
    const compiled = ts.transpileModule(source, {
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
    });
    const destination = join(directory, filename.replace(/\.ts$/, ".js"));
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, compiled.outputText);
  }

  const result = execFileSync(process.execPath, [
    "--input-type=module", "--eval", `
      import assert from "node:assert/strict";
      globalThis.fetch = () => { throw new Error("Startup must not call an external service"); };
      const { default: handler } = await import(process.argv[1]);
      const response = {
        headers: {},
        setHeader(name, value) { this.headers[name] = value; },
        status(code) { this.code = code; return this; },
        json(body) { this.body = body; },
      };
      await handler({ method: "GET" }, response);
      assert.equal(response.code, 405);
      assert.equal(response.headers.Allow, "POST");
      assert.deepEqual(response.body, { message: "Method not allowed." });
      console.log("Native function startup passed");
    `,
    pathToFileURL(join(directory, "api/send-registration-email.js")).href,
  ], { encoding: "utf8", env: { ...process.env, NODE_OPTIONS: "" } });
  assert.match(result, /Native function startup passed/);
});
