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
        "group relative h-[260px] w-full overflow-hidden rounded-2xl bg-surface-elevated p-6 text-left transition-all duration-300",
        "shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]",
        "hover:-translate-y-0.5",
        selected && "ring-2 ring-foreground ring-offset-2 ring-offset-background",
      )}
    >
      {/* Default face */}
      <div
        className={cn(
          "flex h-full flex-col items-center justify-center gap-3 transition-all duration-300",
          "group-hover:opacity-0 group-hover:-translate-y-2",
        )}
      >
        <Avatar className="h-24 w-24">
          <AvatarImage src={creator.avatar} alt={creator.name} />
          <AvatarFallback>{creator.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <div className="text-xl font-medium text-foreground">{creator.name}</div>
          <div className="mt-1 text-sm text-muted-foreground">@{creator.handle}</div>
        </div>
      </div>

      {/* Hover info */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-center gap-3 p-6 opacity-0 transition-all duration-300",
          "translate-y-2 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Creator Info
        </div>
        <div className="text-2xl font-semibold text-foreground">
          {creator.followers} <span className="text-base font-normal text-muted-foreground">粉丝</span>
        </div>
        <div className="text-sm text-muted-foreground">
          均播 <span className="text-foreground">{creator.avgViews}</span>
        </div>
        <div className="mt-1 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-chip px-2 py-1 text-xs text-chip-foreground">{creator.region}</span>
          <span className="rounded-md bg-chip px-2 py-1 text-xs text-chip-foreground">{creator.gender}</span>
        </div>
        <div className="text-sm text-foreground">{creator.platform}</div>
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
