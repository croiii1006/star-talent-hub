import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { creators } from "@/data/creators";
import { CreatorCard } from "@/components/CreatorCard";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type RegionFilter = "全部" | "中国" | "海外";
type GenderFilter = "全部" | "男" | "女";

const REGIONS: RegionFilter[] = ["全部", "中国", "海外"];
const GENDERS: GenderFilter[] = ["全部", "男", "女"];

export const CreatorLibrary = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [region, setRegion] = useState<RegionFilter>("全部");
  const [gender, setGender] = useState<GenderFilter>("全部");

  const toggle = (id: string) =>
    setSelected((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const filtered = useMemo(() => {
    return creators.filter((c) => {
      if (region === "中国" && c.region !== "CN") return false;
      if (region === "海外" && c.region === "CN") return false;
      if (gender === "男" && c.gender !== "男性") return false;
      if (gender === "女" && c.gender !== "女性") return false;
      return true;
    });
  }, [region, gender]);

  const activeFilterCount =
    (region !== "全部" ? 1 : 0) + (gender !== "全部" ? 1 : 0);

  const Pill = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-5 py-2 text-sm font-light transition",
        active
          ? "bg-foreground text-background"
          : "bg-transparent text-foreground border border-border/60 hover:border-border",
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-warm)" }}>
      <div className="mx-auto max-w-[1280px] px-8 py-12">
        {/* Header */}
        <header className="mb-8 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-[28px] tracking-tight text-foreground font-light">
                已签约达人库
              </h1>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              已签约 {creators.length} 位达人 · 选中后可作为对标参考人物
            </p>
          </div>
        </header>

        {/* Filter bar */}
        <div className="mb-8 flex flex-wrap items-center gap-2.5">
          <Popover>
            <PopoverTrigger className="inline-flex items-center gap-2 rounded-full bg-surface-elevated/60 backdrop-blur-xl px-4 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-card-hover)] border border-white/40">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              全部达人
              <span className="rounded-full bg-chip px-2 py-0.5 text-xs text-chip-foreground">
                {filtered.length}
              </span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-[360px] rounded-2xl border border-white/40 bg-surface-elevated/90 backdrop-blur-xl p-6 shadow-[var(--shadow-card-hover)]"
            >
              <div className="space-y-5">
                <div>
                  <div className="mb-3 text-sm font-light text-muted-foreground">
                    区域
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {REGIONS.map((r) => (
                      <Pill
                        key={r}
                        active={region === r}
                        onClick={() => setRegion(r)}
                      >
                        {r}
                      </Pill>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-3 text-sm font-light text-muted-foreground">
                    性别
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {GENDERS.map((g) => (
                      <Pill
                        key={g}
                        active={gender === g}
                        onClick={() => setGender(g)}
                      >
                        {g}
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setRegion("全部");
                setGender("全部");
              }}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
              清除筛选
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((c) => (
            <CreatorCard
              key={c.id}
              creator={c}
              selected={selected.has(c.id)}
              onToggle={toggle}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl bg-surface-elevated/60 backdrop-blur-xl border border-white/40 py-20 text-center text-sm text-muted-foreground shadow-[var(--shadow-card)]">
            暂无符合条件的达人
          </div>
        )}

        <div className="h-32" />
      </div>
    </div>
  );
};
