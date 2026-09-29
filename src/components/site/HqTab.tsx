import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import heroPorsche from "@/assets/hero-porsche.jpg";
import textureChrome from "@/assets/texture-chrome.jpg";
import { Eyebrow, PHONE, Reveal, Section, TEL, EMAIL, IG, IgLink, IgRow } from "./shared";

const FORM_URL = "https://script.google.com/macros/s/AKfycbzTJL4WH1RPF0LHrsbk33NqiH-jj_SBlZFUN2F8jH0JxRs860PDEmGB6k24m71KQgU0/exec";

const stats = [
  { value: "$2.4M+", label: "Client Revenue" },
  { value: "200+", label: "Shops Scaled" },
  { value: "1", label: "Per 30 Miles" },
];

export function HqTab({ onGo }: { onGo: (tab: "scale" | "ascend") => void }) {
  const [submitting, setSubmitting] = useState(false);

  async function submitContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    const values = new FormData(form);
    setSubmitting(true);
    try {
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: values.get("name"),
          phone: values.get("phone"),
          email: values.get("email"),
          shopName: values.get("shopName"),
          message: values.get("message"),
        }),
      });
      toast.success("Message sent!");
      form.reset();
    } catch {
      toast.error("Couldn't send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="noise">
      <nav className="flex flex-col gap-3 border-b border-hairline px-5 py-5 md:flex-row md:items-center md:justify-between md:px-10">
        <span className="font-display text-[11px] uppercase tracking-[0.3em] text-foreground">
          AscendDetailers — Holding Co. <span className="text-muted-foreground">Buena Park, CA</span>
        </span>
        <div className="flex items-center gap-6 font-display text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <a href="#portfolio" className="hidden transition-colors hover:text-foreground sm:inline">Portfolio</a>
          <IgLink handle="ascenddetailers" />
          <a href={TEL} className="inline-flex h-9 items-center rounded-full bg-foreground px-4 text-ink transition-opacity hover:opacity-85">{PHONE}</a>
        </div>
      </nav>

      <Section className="site-hero pt-14 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Private Growth Partner</Eyebrow>
            <h1 className="mt-6 font-display text-[3rem] leading-[0.92] sm:text-[4.5rem] lg:text-[5.5rem]">
              Private Growth
              <br />
              Partner For
              <br />
              <span className="outline-text">Elite Shops.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              We are the holding company behind ScaleCeramics &amp; AscendCeramics. 1 shop per 30
              miles. 15+ ceramic clients guaranteed.
            </p>
            <div className="mt-8">
              <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Follow results</p>
              <IgRow />
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-hairline pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="price-figure font-display text-2xl md:text-4xl">{s.value}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="glow-white animate-in fade-in zoom-in-95 duration-1000 overflow-hidden rounded-[32px] border border-hairline"
          >
            <img
              src={heroPorsche}
              alt="Detailer ceramic coating a black Porsche 911"
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      <Section id="portfolio" className="pt-0">
        <Reveal>
          <Eyebrow>The Portfolio</Eyebrow>
          <h2 className="mt-4 font-display text-3xl md:text-5xl">Two Brands. One Standard.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div
              className="glass hover:glow-scale h-full rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 md:p-12"
            >
              <Eyebrow tone="scale">ScaleCeramics.com</Eyebrow>
              <h3 className="mt-6 font-display text-3xl leading-tight md:text-4xl">
                We Add 20-30 Ceramic Clients / Month
              </h3>
              <p className="price-figure mt-6 font-display text-xl text-scale">$750/mo</p>
              <IgLink handle={IG.scale} tone="scale" className="mt-4 flex w-fit" />
              <button
                onClick={() => onGo("scale")}
                className="premium-cta mt-10 inline-flex h-12 items-center rounded-full bg-scale px-7 font-display text-[11px] uppercase tracking-[0.22em] text-ink"
              >
                View ScaleCeramics
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="glass hover:glow-ascend h-full rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 md:p-12"
            >
              <Eyebrow tone="ascend">AscendCeramics.com</Eyebrow>
              <h3 className="mt-6 font-display text-3xl leading-tight md:text-4xl">
                Ascend To $30K / Month
              </h3>
              <p className="price-figure mt-6 font-display text-xl text-ascend">$1,500/mo</p>
              <IgLink handle={IG.ascend} tone="ascend" className="mt-4 flex w-fit" />
              <button
                onClick={() => onGo("ascend")}
                className="premium-cta mt-10 inline-flex h-12 items-center rounded-full bg-ascend px-7 font-display text-[11px] uppercase tracking-[0.22em] text-ink"
              >
                View AscendCeramics
              </button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="pb-0">
        <Reveal>
          <div className="glass mx-auto max-w-xl rounded-[32px] p-8 md:p-12">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="mt-4 font-display text-2xl">Get In Touch</h2>
            <form className="mt-8 space-y-4" onSubmit={submitContact}>
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Phone", name: "phone", type: "tel" },
                { label: "Email", name: "email", type: "email" },
                { label: "Shop Name", name: "shopName", type: "text" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{f.label}</label>
                  <input
                    name={f.name}
                    type={f.type}
                    required
                    className="mt-2 h-12 w-full rounded-2xl border border-hairline bg-ink px-4 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                  />
                </div>
              ))}
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="mt-2 w-full rounded-2xl border border-hairline bg-ink px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="premium-cta inline-flex h-12 w-full items-center justify-center rounded-full bg-foreground px-7 font-display text-[11px] uppercase tracking-[0.22em] text-ink disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </Reveal>
      </Section>

      <div id="guarantee" className="relative overflow-hidden border-y border-hairline">
        <img
          src={textureChrome}
          alt=""
          loading="lazy"
          width={1536}
          height={864}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <Reveal>
            <Eyebrow>The Guarantee</Eyebrow>
            <p className="mt-6 font-display text-2xl leading-snug md:text-4xl">
              15+ ceramic clients in 90 days — or we work free until you get them.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              One shop per 30-mile radius. Territory is either open or it isn't.
            </p>
          </Reveal>
        </div>
      </div>

      <footer className="px-5 py-16 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.2em]">
              ASCENDDETAILERS.COM owns ScaleCeramics.com &amp; AscendCeramics.com
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>Follow HQ:</span><IgLink handle={IG.hq} />
              <span>Portfolio:</span><IgLink handle={IG.scale} tone="scale" /><IgLink handle={IG.ascend} tone="ascend" />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <a href={TEL} className="block hover:text-foreground">{PHONE}</a>
            <a href={`mailto:${EMAIL}`} className="block hover:text-foreground">{EMAIL}</a>
            <p className="mt-1">Buena Park, CA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
