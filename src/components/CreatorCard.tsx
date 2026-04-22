import { Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Creator } from "@/data/creators";
import { cn } from "@/lib/utils";

type Props = {
  creator: Creator;
  selected: boolean;
  onToggle: (id: string) => void;
};

export const CreatorCard = ({ creator, selected, onToggle }: Props) => {
  return (
    <button
      type="button"
      onClick={() => onToggle(creator.id)}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl bg-surface-elevated p-6 text-left transition-all duration-300",
        "shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5",
        selected && "ring-2 ring-foreground ring-offset-2 ring-offset-background",
      )}
    >
      {/* Header: avatar + name */}
      <div className="flex items-center gap-3">
        <Avatar className="h-14 w-14">
          <AvatarImage src={creator.avatar} alt={creator.name} />
          <AvatarFallback>{creator.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="truncate text-base font-medium text-foreground">{creator.name}</div>
          <div className="mt-0.5 truncate text-xs text-muted-foreground">@{creator.handle}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-5 flex items-baseline gap-4">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            粉丝
          </div>
          <div className="mt-1 text-xl font-semibold text-foreground">{creator.followers}</div>
        </div>
        <div className="h-8 w-px bg-border/70" />
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            均播
          </div>
          <div className="mt-1 text-xl font-semibold text-foreground">{creator.avgViews}</div>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="rounded-md bg-chip px-2 py-1 text-xs text-chip-foreground">
          {creator.platform}
        </span>
        <span className="rounded-md bg-chip px-2 py-1 text-xs text-chip-foreground">
          {creator.category}
        </span>
        <span className="rounded-md bg-chip px-2 py-1 text-xs text-chip-foreground">
          {creator.region}
        </span>
        <span className="rounded-md bg-chip px-2 py-1 text-xs text-chip-foreground">
          {creator.gender}
        </span>
      </div>

      {/* Selected checkmark */}
      {selected && (
        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </div>
      )}
    </button>
  );
};
