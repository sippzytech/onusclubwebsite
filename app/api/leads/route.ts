// Server-side proxy for marketing-site form submissions.
//
// The browser posts here (same origin); this handler forwards to the OnUsClub
// API. The browser never talks to api.onusclub.com directly, which is the
// convention the dashboard already follows — and it means the shared ingest
// secret stays on the server instead of shipping to every visitor.
//
// Before this existed, both forms on the site validated input, showed a
// success state and discarded the data. Every enquiry since launch was lost.

import { NextResponse } from "next/server";

const API_BASE = process.env.ONUSCLUB_API_BASE ?? "https://api.onusclub.com";
const INGEST_SECRET = process.env.LEADS_INGEST_SECRET ?? "";

export async function POST(req: Request): Promise<NextResponse> {
  if (!INGEST_SECRET) {
    // Loud on the server, vague to the client: a visitor cannot act on this,
    // and the message should not advertise how the endpoint is gated.
    console.error("[leads] LEADS_INGEST_SECRET is not set — cannot forward lead");
    return NextResponse.json(
      { ok: false, error: "Lead capture is not configured." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_BASE}/v1/public/leads`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-leads-secret": INGEST_SECRET,
      },
      body: JSON.stringify({
        ...(body as Record<string, unknown>),
        // Attribution, taken server-side so it cannot be spoofed by the form.
        referer: req.headers.get("referer") ?? undefined,
      }),
      // A visitor will not wait, and a hung upstream should not hang the page.
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      // Log the upstream detail; return something a human can read. The API's
      // validation errors describe our own schema and mean nothing to a café
      // owner filling in a form.
      console.error("[leads] upstream rejected", res.status, await res.text().catch(() => ""));
      return NextResponse.json(
        {
          ok: false,
          error:
            res.status === 400
              ? "Please check your details and try again."
              : "Something went wrong. Please email onusclub.official@gmail.com.",
        },
        { status: res.status === 400 ? 400 : 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] forward failed", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please email onusclub.official@gmail.com." },
      { status: 502 }
    );
  }
}
