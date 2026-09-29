import scaleLogo from "@/assets/logo-scaleceramics.png.asset.json";
import beading from "@/assets/beading.jpg";
import { Eyebrow, PHONE, Reveal, Section, TEL, IG, IgLink, IgRow } from "./shared";

const steps = [
  { n: "01", t: "Ads", d: "Ceramic-intent ads run to your 30-mile territory. No shared leads, ever." },
  { n: "02", t: "AI Booking", d: "Our AI setter replies in 8 seconds, qualifies budget, books the bay." },
  { n: "03", t: "You Coat", d: "You show up to a full calendar of $1,200–$3,000 ceramic jobs." },
];

const stack = [
  ["Done-For-You Ads", "Creative, targeting, spend management across Meta + Google."],
  ["AI Speed-To-Lead Setter", "24/7 text follow-up until the job is on your calendar."],
  ["CRM + Pipeline", "Every lead tracked, nurtured and re-marketed for 12 months."],
  ["Territory Guarantee", "15+ ceramic clients in 90 days or we work free."],
];

const faqs = [
  ["How fast do leads start?", "Ads go live within 5 business days of onboarding."],
  ["Do I share leads?", "Never. One shop per 30-mile radius, locked for the length of the deal."],
  ["What's the contract?", "90 days, then month-to-month. The guarantee covers the first 90."],
  ["What ad spend do I need?", "$1,500–$2,500/mo works for most markets; we advise on yours."],
];

const plans = [
  {
    name: "ScaleCeramics LITE",
    price: "$750",
    sub: "Perfect for solo detailers doing $5k-$15k/mo",
    features: [
      "Booking Website + Calendar",
      "SMS Follow-up System",
      "1-2 Ads Running 24/7",
      "Goal: 5-10 bookings/mo",
      "Ad spend not included ($15-20/day to Meta)",
    ],
    cta: "Get Started with LITE",
    href: "https://buy.stripe.com/8x2cN44bUbko4TEelJ4ow00",
    note: "Secure checkout via Stripe - No contract. Cancel anytime.",
    popular: false,
  },
  {
    name: "AscendCeramics PRO",
    price: "$1,500",
    sub: "For shops with bays doing $15k+ who want to be fully booked",
    features: [
      "Everything in LITE PLUS",
      "Premium Website + Full Auto-Booking",
      "3-4 Ads + Retargeting",
      "Priority Support + Weekly Reporting",
      "Goal: 20-30 bookings/mo",
      "Ad spend not included ($30-50/day to Meta)",
    ],
    cta: "Get Started with PRO",
    href: "https://buy.stripe.com/bJefZgcIqagkgCm3H54ow01",
    note: "Secure checkout via Stripe - No contract. Cancel anytime. 48hr setup.",
    popular: true,
  },
];

export function ScaleTab() {
  return (
    <div className="noise">
      <div className="flex justify-center px-5 pt-10">
        <img src={scaleLogo.url} alt="ScaleCeramics" className="h-auto w-[200px]" />
      </div>
      <nav className="sticky top-[57px] z-30 flex items-center justify-between border-b border-hairline bg-ink/85 px-5 py-4 backdrop-blur-xl md:px-10">
        <span className="font-display text-[11px] uppercase tracking-[0.3em]">
          Scale<span className="text-scale">Ceramics</span>.com
        </span>
        <div className="flex items-center gap-5">
          <IgLink handle={IG.scale} tone="scale" />
          <a href={TEL} className="hidden font-display text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground sm:inline">
            {PHONE}
          </a>
          <button
            onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            className="plan-cta inline-flex h-9 items-center rounded-full px-4 font-display text-[10px] uppercase tracking-[0.2em]"
          >
            Get Started
          </button>
        </div>
      </nav>

      <div className="site-hero relative overflow-hidden">
        <img
          src={beading}
          alt="Water beading on a black supercar hood"
          width={1536}
          height={864}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative mx-auto max-w-4xl px-5 py-28 text-center md:py-40">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Eyebrow tone="scale">Done-For-You Ceramic Growth</Eyebrow>
            <h1 className="mt-6 font-display text-[2.6rem] leading-[0.94] sm:text-6xl lg:text-7xl">
              We Add 20-30 Ceramic Clients / Month.
              <br />
              <span className="text-scale">1 Shop Per 30 Miles.</span>
            </h1>
            <div className="mt-6 flex justify-center"><IgLink handle={IG.scale} tone="scale" className="text-foreground" /></div>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={TEL}
                className="premium-cta glow-scale inline-flex h-14 items-center rounded-full bg-scale px-9 font-display text-xs uppercase tracking-[0.22em] text-ink"
              >
                Book Audit
              </a>
              <a
                href={TEL}
                className="inline-flex h-14 items-center rounded-full bg-foreground px-9 font-display text-xs uppercase tracking-[0.22em] text-ink"
              >
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <Reveal>
          <Eyebrow tone="scale">The Problem</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-3xl leading-tight md:text-5xl">
            You're stuck selling $99 washes while someone across town coats three cars a day.
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Referrals dried up. Marketplace tire-kickers waste your bay. The skill isn't the
            problem — the pipeline is.
          </p>
        </Reveal>
      </Section>

      <Section className="border-y border-hairline bg-matte">
        <Eyebrow tone="scale">How It Works</Eyebrow>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="glass h-full rounded-[32px] transition-transform duration-500 hover:-translate-y-2 p-8">
                <p className="font-display text-sm text-scale">{s.n}</p>
                <h3 className="mt-4 font-display text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow tone="scale">Proof</Eyebrow>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <div className="overflow-hidden rounded-[32px] border border-hairline">
              <img
                src={beading}
                alt="Hydrophobic beading close-up"
                loading="lazy"
                width={1536}
                height={864}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <div className="grid gap-6">
            {[
              ["31", "Coatings booked in month two — Anaheim, CA"],
              ["$46K", "Added revenue in 90 days — Riverside, CA"],
            ].map(([v, l]) => (
              <Reveal key={v}>
                <div className="glass rounded-[32px] p-8">
                   <p className="price-figure font-display text-4xl text-scale">{v}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section id="pricing" className="scroll-mt-32 border-y border-hairline bg-matte">
        <div>
          <Eyebrow tone="scale">What You Get</Eyebrow>
          <div className="mt-8 divide-y divide-hairline border-y border-hairline">
            {stack.map(([t, d]) => (
              <div key={t} className="py-6">
                <h3 className="font-display text-lg">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16"><Eyebrow tone="scale">Pricing</Eyebrow></div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <Reveal key={p.name}>
              <div className={`glass relative flex h-full flex-col rounded-[32px] p-8 md:p-10 ${p.popular ? "plan-popular" : ""}`}>
                {p.popular && (
                  <span className="plan-badge absolute -top-3 left-8 rounded-full px-4 py-1 font-display text-[10px] uppercase tracking-[0.22em]">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl">{p.name}</h3>
                <p className="price-figure mt-6 font-display text-5xl">
                  {p.price}<span className="text-base text-muted-foreground">/month</span>
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{p.sub}</p>
                <ul className="mt-8 flex-1 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3"><span className="plan-dot">•</span>{f}</li>
                  ))}
                </ul>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="plan-cta mt-10 inline-flex h-14 w-full items-center justify-center rounded-full font-display text-xs uppercase tracking-[0.22em]"
                >
                  {p.cta}
                </a>
                <p className="mt-4 text-center text-xs text-muted-foreground">🔒 {p.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pb-0">
        <Reveal>
          <div className="glass glow-scale rounded-[32px] p-8 text-center md:p-14">
            <Eyebrow tone="scale">The Guarantee</Eyebrow>
            <p className="mx-auto mt-6 max-w-3xl font-display text-2xl leading-snug md:text-4xl">
              15+ ceramic clients in 90 days — or we work free until you get them. In writing.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Eyebrow tone="scale">FAQ</Eyebrow>
        <div className="mt-8 divide-y divide-hairline border-y border-hairline">
          {faqs.map(([q, a]) => (
            <div key={q} className="py-6">
              <h3 className="font-display text-base">{q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section className="border-t border-hairline bg-matte">
        <Eyebrow tone="scale">Contact</Eyebrow>
        <h2 className="mt-4 font-display text-3xl md:text-5xl">See The Results Live.</h2>
        <div className="mt-8"><IgRow tone="scale" pill /></div>
      </Section>

      <footer className="border-t border-hairline px-5 py-14 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Follow:</span><IgLink handle={IG.scale} tone="scale" /><IgLink handle={IG.hq} tone="scale" /><IgLink handle={IG.ascend} tone="scale" />
          </div>
          <a href={TEL} className="font-display text-sm uppercase tracking-[0.2em] hover:text-scale">{PHONE}</a>
        </div>
      </footer>
    </div>
  );
}
