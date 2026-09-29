import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import ascendLogo from "@/assets/logo-ascendceramics.png";
import { Eyebrow, PHONE, Reveal, Section, TEL, IG, IgLink } from "./shared";

const FORM_URL = "https://script.google.com/macros/s/AKfycbzTJL4WH1RPF0LHrsbk33NqiH-jj_SBlZFUN2F8jH0JxRs860PDEmGB6k24m71KQgU0/exec";

const forYou = [
  "Doing $15K+/month consistently",
  "Ceramic or PPF is already your core offer",
  "You have (or will hire) at least one detailer",
  "You want $30K–$40K months, not more busywork",
];

const notForYou = [
  "Mobile-only, side-hustle operators",
  "Chasing $99 wash volume",
  "Looking for cheap leads, not a partner",
  "Unwilling to raise prices",
];

const pillars = [
  ["Pricing To $1,500", "Repositioning your packages so a coating sells at premium, not discount."],
  ["Hiring Detailers", "Recruiting, pay structure and training so you're out of the bay."],
  ["Retention", "Maintenance plans that turn one coating into three years of revenue."],
  ["PPF Upsell", "The film ladder that doubles average ticket on the same car."],
];

export function AscendTab() {
  const [submitting, setSubmitting] = useState(false);

  async function submitApplication(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    const values = new FormData(form);
    setSubmitting(true);
    try {
      const res = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: values.get("name"),
          phone: values.get("phone"),
          email: values.get("email"),
          service: values.get("service"),
          message: values.get("message"),
        }),
      });
      if (!res.ok) throw new Error(`Submit failed: ${res.status}`);
      toast.success("Message sent!");
      form.reset();
    } catch {
      toast.error("Couldn't send your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="noise">
      <div className="flex justify-center px-5 pt-10">
        <img src={ascendLogo.url} alt="AscendCeramics" className="h-auto w-[200px]" />
      </div>
      <nav className="flex items-center justify-between border-b border-hairline px-5 py-5 md:px-10">
        <span className="font-display text-[11px] uppercase tracking-[0.3em]">
          Ascend<span className="text-ascend">Ceramics</span>.com
        </span>
        <div className="flex items-center gap-5">
          <IgLink handle={IG.ascend} tone="ascend" />
          <a href={TEL} className="hidden font-display text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground sm:inline">
            {PHONE}
          </a>
        </div>
      </nav>

      <div className="site-hero mx-auto max-w-4xl px-5 py-28 text-center md:py-44">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Eyebrow tone="ascend">Invite Only</Eyebrow>
          <h1 className="mt-8 font-display text-[2.8rem] leading-[0.95] sm:text-6xl lg:text-8xl">
            Ascend To
            <br />
            <span className="text-ascend">$30K/Month</span>
          </h1>
          <div className="mx-auto mt-8 h-px w-28 bg-ascend" />
          <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-muted-foreground">
            The private scaling system for 7-figure-minded detailers doing $15K+ that want
            $30K–$40K with ceramic + PPF.
          </p>
          <div className="mt-6 flex justify-center items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Private:</span><IgLink handle={IG.ascend} tone="ascend" className="text-foreground" />
          </div>
          <a
            href="#apply"
            className="premium-cta glow-ascend mt-12 inline-flex h-14 items-center rounded-full bg-ascend px-10 font-display text-xs uppercase tracking-[0.22em] text-ink"
          >
            Apply For Private Partnership
          </a>
          <p className="mt-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Invite-only · 1 per 30 miles · 80% rejected
          </p>
        </div>
      </div>

      <Section className="border-y border-hairline">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <Eyebrow tone="ascend">Who It's For</Eyebrow>
            <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
              {forYou.map((x) => (
                <li key={x} className="py-5 font-display text-sm uppercase tracking-[0.06em]">
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Who It's Not For</Eyebrow>
            <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
              {notForYou.map((x) => (
                <li key={x} className="py-5 text-sm text-muted-foreground">
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Eyebrow tone="ascend">Beyond Leads</Eyebrow>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {pillars.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.06}>
              <div className="glass h-full rounded-[32px] transition-transform duration-500 hover:-translate-y-2 p-8 md:p-10">
                <h3 className="font-display text-xl text-ascend">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-y border-hairline bg-matte">
        <Reveal>
          <Eyebrow tone="ascend">Case Study</Eyebrow>
          <p className="price-figure mt-6 font-display text-4xl md:text-6xl">
            $15K <span className="text-ascend">→</span> $32K
          </p>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            A two-bay shop in Orange County in 7 months: coating price raised from $795 to $1,500,
            one detailer hired, PPF added as the upsell ladder. Same building, same owner.
          </p>
        </Reveal>
      </Section>

      <Section id="apply" className="pb-32">
        <div className="mx-auto max-w-xl">
          <Reveal>
            <div className="glass rounded-[32px] p-8 md:p-12">
              <Eyebrow tone="ascend">Application</Eyebrow>
              <h2 className="mt-4 font-display text-2xl">Request Your Territory</h2>
              <form className="mt-8 space-y-4" onSubmit={submitApplication}>
                {[
                  { label: "Name", name: "name", type: "text" },
                  { label: "Shop Revenue / Month", name: "shopRevenue", type: "text" },
                  { label: "City", name: "city", type: "text" },
                  { label: "Phone", name: "phone", type: "tel" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Service", name: "service", type: "text" },
                  { label: "Message", name: "message", type: "text" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {f.label}
                    </label>
                    <input
                      name={f.name}
                      type={f.type}
                      required
                      className="mt-2 h-12 w-full rounded-2xl border border-hairline bg-ink px-4 text-sm text-foreground outline-none transition-colors focus:border-ascend"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={submitting}
                  className="premium-cta mt-4 inline-flex h-14 w-full items-center justify-center rounded-full bg-ascend font-display text-xs uppercase tracking-[0.22em] text-ink disabled:opacity-60"
                >
                  Apply For Private Partnership
                </button>
              </form>
              <p className="mt-5 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Or call {PHONE}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <footer className="border-t border-hairline px-5 py-14 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Private:</span><IgLink handle={IG.ascend} tone="ascend" /><span>HQ</span><IgLink handle={IG.hq} tone="ascend" /><span>Scale</span><IgLink handle={IG.scale} tone="ascend" />
          </div>
          <a href={TEL} className="font-display text-sm uppercase tracking-[0.2em] hover:text-ascend">{PHONE}</a>
        </div>
      </footer>
    </div>
  );
}
