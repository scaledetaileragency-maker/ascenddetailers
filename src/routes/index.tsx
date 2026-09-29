import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HqTab } from "@/components/site/HqTab";
import { ScaleTab } from "@/components/site/ScaleTab";
import { AscendTab } from "@/components/site/AscendTab";
import { StickyCall } from "@/components/site/shared";
import { ChatBot } from "@/components/site/ChatBot";
import hqLogo from "@/assets/logo-ascenddetailers.png.asset.json";
import { Toaster } from "@/components/ui/sonner";

const TITLE = "AscendDetailers — Private Growth Partner For Elite Detail Shops";
const DESC =
  "The holding company behind ScaleCeramics & AscendCeramics. 20-30 ceramic clients a month, one shop per 30 miles, guaranteed.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Tab = "hq" | "scale" | "ascend";

const tabs: { id: Tab; label: string }[] = [
  { id: "hq", label: "AscendDetailers.com" },
  { id: "scale", label: "ScaleCeramics.com" },
  { id: "ascend", label: "AscendCeramics.com" },
];

function Index() {
  const [tab, setTab] = useState<Tab>("hq");

  return (
    <main className="min-h-screen bg-ink pb-24 text-foreground md:pb-0">
      <div className="sticky top-0 z-40 border-b border-hairline bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 py-3 md:justify-center">
          {tabs.map((t) =>
            t.id === "hq" ? (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                aria-label={t.label}
                className="relative flex items-center rounded-full px-5 py-2.5"
              >
                <img
                  src={hqLogo.url}
                  alt="AscendDetailers"
                  className={`h-auto w-[200px] max-w-none transition-opacity duration-300 ${
                    tab === "hq" ? "opacity-100" : "opacity-40"
                  }`}
                />
              </button>
            ) : (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative whitespace-nowrap rounded-full px-5 py-2.5 font-display text-[10px] uppercase tracking-[0.22em] transition-colors md:text-[11px] ${
                  tab === t.id ? "text-ink" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === t.id && (
                  <span className="absolute inset-0 rounded-full bg-foreground" />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ),
          )}
        </div>
      </div>

      <div key={tab} className="animate-in fade-in duration-500">
        {tab === "hq" && <HqTab onGo={setTab} />}
        {tab === "scale" && <ScaleTab />}
        {tab === "ascend" && <AscendTab />}
      </div>


      <StickyCall tone={tab === "scale" ? "scale" : tab === "ascend" ? "ascend" : "white"} />
      <ChatBot tone={tab === "scale" ? "scale" : tab === "ascend" ? "ascend" : "white"} />
      <Toaster position="top-center" />
    </main>
  );
}
