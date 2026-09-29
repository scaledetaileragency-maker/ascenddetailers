import { useEffect, useRef, useState, type ReactNode } from "react";

export const PHONE = "(562) 263-4622";
export const TEL = "tel:+15622634622";
export const EMAIL = "ascenddetailers@gmail.com";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },

      { rootMargin: "-60px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={`transition-all duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}


export function Eyebrow({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "scale" | "ascend" }) {
  const color =
    tone === "scale" ? "text-scale" : tone === "ascend" ? "text-ascend" : "text-muted-foreground";
  return (
    <p className={`font-display text-[11px] uppercase tracking-[0.35em] ${color}`}>{children}</p>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-5 py-20 md:px-10 md:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function StickyCall({ tone = "white" }: { tone?: "white" | "scale" | "ascend" }) {
  const styles =
    tone === "scale"
      ? "bg-scale text-ink"
      : tone === "ascend"
        ? "bg-ascend text-ink"
        : "bg-foreground text-ink";
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-ink/80 p-3 backdrop-blur-xl md:hidden">
      <a
        href={TEL}
        className={`flex h-14 w-full items-center justify-center rounded-2xl font-display text-sm uppercase tracking-[0.18em] ${styles}`}
      >
        Tap to Call {PHONE}
      </a>
    </div>
  );
}

export const IG = {
  hq: "ascenddetailers",
  scale: "scaleceramics",
  ascend: "ascendceramics",
} as const;

export function IgIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IgLink({
  handle,
  tone = "white",
  pill = false,
  className = "",
}: {
  handle: string;
  tone?: "white" | "scale" | "ascend";
  pill?: boolean;
  className?: string;
}) {
  const hover = tone === "scale" ? "hover:text-scale hover:border-scale" : tone === "ascend" ? "hover:text-ascend hover:border-ascend" : "hover:text-foreground hover:border-foreground";
  return (
    <a
      href={`https://instagram.com/${handle}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors ${hover} ${
        pill ? "h-11 rounded-full border border-hairline px-5" : ""
      } ${className}`}
    >
      <IgIcon />@{handle}
    </a>
  );
}

export function IgRow({ tone = "white", pill = false }: { tone?: "white" | "scale" | "ascend"; pill?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <IgLink handle={IG.hq} tone={tone} pill={pill} />
      <IgLink handle={IG.scale} tone={tone} pill={pill} />
      <IgLink handle={IG.ascend} tone={tone} pill={pill} />
    </div>
  );
}
