import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal, Users, X } from "lucide-react";
import { creators } from "@/data/creators";
import { CreatorCard } from "@/components/CreatorCard";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PLATFORMS = ["TikTok Shop", "抖音", "小红书", "Instagram", "YouTube"];
const GENDERS = ["男性", "女性"];
const CATEGORIES = ["美妆", "穿搭", "数码", "美食", "生活"];

export const CreatorLibrary = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [platforms, setPlatforms] = useState<Set<string>>(new Set());
  const [genders, setGenders] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleSet =
    (setter: React.Dispatch<React.SetStateAction<Set<string>>>) => (val: string) =>
      setter((s) => {
        const next = new Set(s);
        next.has(val) ? next.delete(val) : next.add(val);
        return next;
      });

  const filtered = useMemo(() => {
    return creators.filter((c) => {
      if (platforms.size && !platforms.has(c.platform)) return false;
      if (genders.size && !genders.has(c.gender)) return false;
      if (categories.size && !categories.has(c.category)) return false;
      return true;
    });
  }, [platforms, genders, categories]);

  const activeFilterCount = platforms.size + genders.size + categories.size;

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
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-full bg-surface-elevated/60 backdrop-blur-xl px-4 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-card-hover)] border border-white/40">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              全部达人
              <span className="rounded-full bg-chip px-2 py-0.5 text-xs text-chip-foreground">
                {filtered.length}
              </span>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>平台</DropdownMenuLabel>
              {PLATFORMS.map((p) => (
                <DropdownMenuCheckboxItem
                  key={p}
                  checked={platforms.has(p)}
                  onCheckedChange={() => toggleSet(setPlatforms)(p)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {p}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>性别</DropdownMenuLabel>
              {GENDERS.map((g) => (
                <DropdownMenuCheckboxItem
                  key={g}
                  checked={genders.has(g)}
                  onCheckedChange={() => toggleSet(setGenders)(g)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {g}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>品类</DropdownMenuLabel>
              {CATEGORIES.map((c) => (
                <DropdownMenuCheckboxItem
                  key={c}
                  checked={categories.has(c)}
                  onCheckedChange={() => toggleSet(setCategories)(c)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {c}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setPlatforms(new Set());
                setGenders(new Set());
                setCategories(new Set());
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
