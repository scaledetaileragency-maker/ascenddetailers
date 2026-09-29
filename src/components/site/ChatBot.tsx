import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, Send, X, Phone } from "lucide-react";
import { EMAIL, IG, IgIcon, PHONE, TEL } from "./shared";

type Tone = "white" | "scale" | "ascend";
type Msg =
  | { from: "user" | "ai"; text: string }
  | { from: "ai"; kind: "zip" }
  | { from: "ai"; kind: "lead"; zip: string }
  | { from: "ai"; kind: "success"; zip: string };

const IGS = "@ascenddetailers @scaleceramics @ascendceramics";

const CHIPS = [
  "How many clients?",
  "How are you different?",
  "Ad spend?",
  "1 per 30 miles?",
  "Can I see ads?",
  "What do you do for $1,497?",
  "Contract?",
  "Scale vs Ascend?",
  "What's your IG?",
  "Is my zip open?",
];

const ZIP_TRIGGERS = ["zip open", "is my zip", "is my area", "check my zip", "my zip", "is my city", "available in my area", "my area open", "locked", "30 miles"];

// Order matters: more specific first.
const KB: [string[], string][] = [
  [["scale vs ascend", "ascenddetailers", "scaleceramics", "ascend", "difference"], `AscendDetailers is HQ parent. ScaleCeramics $1,497/mo adds 20-30 ceramic clients. AscendCeramics $2,500/mo private scales to $30K with PPF, hiring, pricing. Same team, same number ${PHONE}. IGs @ascenddetailers HQ, @scaleceramics, @ascendceramics.`],
  [["instagram", " ig", "ig?", "handle", "social", "follow", "website"], `Follow us: HQ / Parent @ascenddetailers, ScaleCeramics ($1,497) @scaleceramics for 20-30 client results, AscendCeramics ($2,500) @ascendceramics for $30K private. All linked in the footer. Call ${PHONE}.`],
  [["see ads", "show ads", "can i see"], "Yes — on the audit call we screen share live client ads. Can't send publicly; competitors copy the same day."],
  [["why only 1", "why only one", "why 1 "], "If we work with you and a competitor, we're bidding against ourselves and driving costs up. We want you to OWN your city."],
  [["competitor", "zip", "30 mile"], "If we work with them, we legally can't work with you. 1 per 30 miles, in the contract. Give me your zip and I'll check if it's locked."],
  [["waitlist", "taken"], "Locked out means waitlist only. We don't double-dip."],
  [["burned", "different"], "We're not a general agency. ONLY ceramic shops, 1 per 30 miles — not restaurants. Built to sell $1,200-$2,500 coatings, with 15+ guaranteed."],
  [["client", "proof", "reference"], "Yes — after the audit call. We don't give numbers before the zip check for the 30-mile lock. Once we confirm it's open, we'll intro you 3-way to a shop doing 20+ ceramics."],
  [["market", "city"], "Ceramic demand is the same everywhere — Teslas, BMWs, trucks. Shops in Buena Park, LA, OC, Texas run the same system. The market isn't different; the offer is."],
  [["buena park", "meet", "location"], `Yeah, HQ is Buena Park, CA — ${PHONE}. Zoom is usually faster, but if you're local pull up to the shop.`],
  [["how many", "guarantee", "15"], "20-30 a month. Guarantee 15+ or we work free. At $1,200-$1,800 average that's $18K-$27K extra."],
  [["how long", "first"], "5-7 days to launch. First bookings day 8-10. First coating week 2. Full ramp by day 30."],
  [["$99", "cheap", "wash"], "We blacklist cheap keywords — car wash, cheap, $99. Only target ceramic coating near me, paint correction, Tesla ceramic, PPF."],
  [["what do you do", "1497", "1,497", "included"], "DFY ads, funnel, AI setter that books, CRM follow-up until they're on your calendar with name, car and service. You just coat."],
  [["book", "appointment"], "The AI books. You wake up to invites with name, car, service and phone. Just confirm."],
  [["crm", "jobber"], "Our own black label CRM, free — but it syncs with Jobber, Housecall and others."],
  [["ad spend", "fuel", "extra"], "Yes, $20-$30/day in ad fuel. The $1,497 is us driving. One ceramic pays a month of ad spend."],
  [["need", "onboarding", "start"], "15-min onboarding. Before/after pics, logo, zips to lock, calendar link."],
  [["too many"], "Good problem. Throttle ads or raise your price to $1,500. That's how you go $15K → $30K."],
  [["why 1497", "500", "price", "expensive"], "$500 agencies sell $99 washes. One $1,200 ceramic pays for us."],
  [["contract", "cancel"], "Month-to-month, no 12-month trap. But if you cancel, your lock goes public. If someone takes it, you can't come back."],
  [["work free", "don't hit", "dont hit"], "We work free until you do. In writing."],
];

const FALLBACK = `Good question — best to book an audit and check your zip for the 30-mile lock. Call/text ${PHONE} or Book Audit. IGs ${IGS}.`;

function answer(q: string): string | "ZIP" {
  const t = ` ${q.toLowerCase()} `;
  if (ZIP_TRIGGERS.some((k) => t.includes(k))) return "ZIP";
  for (const [keys, a] of KB) if (keys.some((k) => t.includes(k))) return a;
  return FALLBACK;
}

function fmtPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

async function fireLead(lead: { shop_name: string; name: string; phone: string; zip: string }) {
  const payload = { ...lead, source: "chatbot-zip-check", ig: IGS, timestamp: new Date().toISOString() };
  console.log("NEW ZIP CHECK LEAD", payload);
  const url = import.meta.env['VITE_LEAD_WEBHOOK_URL'] as string | undefined;
  let sent = false;
  if (url) {
    try {
      const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      sent = r.ok;
    } catch {
      sent = false;
    }
  }
  const smsBody = `NEW LEAD — Zip Check: ${lead.shop_name} ${lead.zip} ${lead.name} ${lead.phone} — Check 30-mile lock now`;
  if (!sent) {
    const subject = `NEW ZIP CHECK LEAD — ${lead.zip} — ${lead.shop_name}`;
    const body = `Shop: ${lead.shop_name}\nName: ${lead.name}\nCell: ${lead.phone}\nZip: ${lead.zip}\nSource: chatbot-zip-check\nTime: ${payload.timestamp}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => (window.location.href = `sms:+15622634622?&body=${encodeURIComponent(smsBody)}`), 1200);
  } else {
    window.location.href = `sms:+15622634622?&body=${encodeURIComponent(smsBody)}`;
  }
}

export function ChatBot({ tone }: { tone: Tone }) {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "ai", text: "Hey — I'm the AscendDetailers AI. Ask anything about ScaleCeramics, AscendCeramics, or check if your zip is still open." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing, open]);

  const accentBg = tone === "scale" ? "bg-scale" : tone === "ascend" ? "bg-ascend" : "bg-foreground";
  const accentText = tone === "scale" ? "text-scale" : tone === "ascend" ? "text-ascend" : "text-foreground";
  const accentBorder = tone === "scale" ? "focus:border-scale" : tone === "ascend" ? "focus:border-ascend" : "focus:border-foreground";
  const glow = tone === "scale" ? "glow-scale" : tone === "ascend" ? "glow-ascend" : "glow-white";

  const aiSay = (m: Msg) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((p) => [...p, m]);
    }, 800);
  };

  const ask = (q: string) => {
    const text = q.trim();
    if (!text) return;
    setMsgs((p) => [...p, { from: "user", text }]);
    setInput("");
    const a = answer(text);
    aiSay(a === "ZIP" ? { from: "ai", kind: "zip" } : { from: "ai", text: a });
  };

  const inputCls = `h-11 w-full rounded-xl border border-hairline bg-ink px-3 text-sm text-foreground outline-none transition-colors ${accentBorder}`;

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open AI chat"}
        className={`fixed bottom-24 right-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full text-ink transition-transform hover:scale-105 md:bottom-6 md:right-6 ${accentBg} ${glow} ${open ? "" : "animate-pulse"}`}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed inset-0 z-[9998] flex flex-col overflow-hidden border border-hairline bg-[oklch(0.08_0_0)]/95 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300 md:inset-auto md:bottom-24 md:right-6 md:h-[600px] md:w-[380px] md:rounded-[24px]">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
            <div>
              <p className="flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.18em]">
                <span className="h-2 w-2 rounded-full bg-[oklch(0.75_0.2_145)]" />
                AscendDetailers AI — Ask Anything
              </p>
              <a href={TEL} className="mt-1 block text-xs text-muted-foreground hover:text-foreground">{PHONE}</a>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-muted-foreground hover:text-foreground md:hidden">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m, i) => {
              if ("text" in m) {
                const user = m.from === "user";
                return (
                  <div key={i} className={`flex ${user ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${user ? `${accentBg} text-ink` : "bg-hairline text-foreground"}`}>
                      {m.text}
                    </div>
                  </div>
                );
              }
              if (m.kind === "zip") return <ZipStep key={i} inputCls={inputCls} accentBg={accentBg} onZip={(zip) => { setMsgs((p) => [...p, { from: "user", text: zip }]); aiSay({ from: "ai", kind: "lead", zip }); }} />;
              if (m.kind === "lead") return <LeadStep key={i} zip={m.zip} inputCls={inputCls} accentBg={accentBg} onDone={(lead) => { setMsgs((p) => [...p, { from: "ai", kind: "success", zip: m.zip }]); void fireLead(lead); }} />;
              return (
                <div key={i} className="rounded-2xl bg-hairline p-4 text-sm leading-relaxed">
                  <p>🔒 Checking lock for <b>{m.zip}</b>... You're on the priority list. Text from {PHONE} in 5 mins if open.</p>
                  <p className="mt-2 text-muted-foreground">Follow results: {IGS}</p>
                  <div className="mt-3 flex flex-col gap-2">
                    <a href={TEL} className={`flex h-10 items-center justify-center gap-2 rounded-full font-display text-[11px] uppercase tracking-[0.18em] text-ink ${accentBg}`}><Phone className="h-4 w-4" />Call {PHONE}</a>
                    <a href={`https://instagram.com/${IG.scale}`} target="_blank" rel="noopener noreferrer" className="flex h-10 items-center justify-center gap-2 rounded-full border border-hairline font-display text-[11px] uppercase tracking-[0.18em]"><IgIcon />Follow @{IG.scale}</a>
                  </div>
                </div>
              );
            })}
            {typing && (
              <div className="flex w-16 gap-1 rounded-2xl bg-hairline px-4 py-3">
                {[0, 150, 300].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${d}ms` }} />)}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex gap-2 overflow-x-auto px-4 pb-2">
            {CHIPS.map((c) => (
              <button key={c} onClick={() => ask(c)} className="whitespace-nowrap rounded-full border border-hairline px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
                {c}
              </button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="flex gap-2 border-t border-hairline p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." className={inputCls} />
            <button type="submit" aria-label="Send" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-ink ${accentBg}`}>
              <Send className="h-4 w-4" />
            </button>
          </form>
          <a href={TEL} className={`block pb-3 text-center font-display text-[10px] uppercase tracking-[0.25em] ${accentText}`}>Book Ceramic Audit →</a>
        </div>
      )}
    </>
  );
}

function ZipStep({ onZip, inputCls, accentBg }: { onZip: (z: string) => void; inputCls: string; accentBg: string }) {
  const [zip, setZip] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className="rounded-2xl bg-hairline p-4 text-sm">
      <p>Let me check the 30-mile lock — 1 shop per 30 miles. What's your zip?</p>
      {!done && (
        <form className="mt-3 flex gap-2" onSubmit={(e: FormEvent) => { e.preventDefault(); if (/^\d{5}$/.test(zip)) { setDone(true); onZip(zip); } }}>
          <input inputMode="numeric" value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))} placeholder="90620" className={inputCls} />
          <button type="submit" disabled={zip.length !== 5} className={`h-11 shrink-0 rounded-xl px-4 font-display text-[11px] uppercase text-ink disabled:opacity-40 ${accentBg}`}>Check</button>
        </form>
      )}
    </div>
  );
}

function LeadStep({ zip, onDone, inputCls, accentBg }: { zip: string; onDone: (l: { shop_name: string; name: string; phone: string; zip: string }) => void; inputCls: string; accentBg: string }) {
  const [shop, setShop] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className="rounded-2xl bg-hairline p-4 text-sm">
      <p>Got it — what's your shop name + cell? I'll check if {PHONE} has that zip open and text you in 5 mins.</p>
      {!done && (
        <form className="mt-3 space-y-2" onSubmit={(e) => { e.preventDefault(); if (phone.replace(/\D/g, "").length !== 10) return; setDone(true); onDone({ shop_name: shop, name, phone, zip }); }}>
          <input required placeholder="Shop Name" value={shop} onChange={(e) => setShop(e.target.value)} className={inputCls} />
          <input required placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          <input required inputMode="tel" placeholder="(___) ___-____" value={phone} onChange={(e) => setPhone(fmtPhone(e.target.value))} className={inputCls} />
          <input type="hidden" value={zip} readOnly />
          <button type="submit" className={`h-11 w-full rounded-xl font-display text-[11px] uppercase tracking-[0.18em] text-ink ${accentBg}`}>Check If My Zip Is Open →</button>
        </form>
      )}
    </div>
  );
}
