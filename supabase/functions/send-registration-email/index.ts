import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3'
import { TEMPLATE } from './template.ts'

const Body = z.object({
  firstName: z.string().trim().min(1).max(50),
  lastName: z.string().trim().max(50).optional(),
  email: z.string().trim().email().max(255),
})

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  const json = (d: unknown, status = 200) =>
    new Response(JSON.stringify(d), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  try {
    const parsed = Body.safeParse(await req.json())
    if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400)
    const { firstName, lastName, email } = parsed.data
    const token = Deno.env.get('SENDER_API_TOKEN')
    if (!token) return json({ error: 'Email not configured' }, 500)

    const res = await fetch('https://api.sender.net/v2/message/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        from: { email: 'info@godhouse.org', name: 'The Godhouse Centre' },
        to: { email, name: `${firstName} ${lastName ?? ''}`.trim() },
        subject: "Registration Confirmed: You're RVC-bound!",
        html: TEMPLATE.replace('{{FIRST_NAME}}', esc(firstName)),
      }),
    })
    const text = await res.text()
    if (!res.ok) {
      console.error('Sender error', res.status, text)
      return json({ error: 'Email send failed', status: res.status }, 502)
    }
    return json({ success: true })
  } catch (e) {
    console.error(e)
    return json({ error: 'Unexpected error' }, 500)
  }
})
