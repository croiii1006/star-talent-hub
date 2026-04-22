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
        "group relative w-full overflow-hidden rounded-2xl bg-surface-elevated px-6 pb-6 pt-8 text-center font-light transition-all duration-300",
        "shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5",
        selected && "ring-2 ring-foreground ring-offset-2 ring-offset-background",
      )}
    >
      {/* Centered enlarged avatar */}
      <div className="flex justify-center">
        <Avatar className="h-24 w-24 ring-1 ring-border/60">
          <AvatarImage src={creator.avatar} alt={creator.name} />
          <AvatarFallback className="text-lg font-light">{creator.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </div>

      {/* Name + handle */}
      <div className="mt-4">
        <div className="truncate text-base font-normal text-foreground">{creator.name}</div>
        <div className="mt-1 truncate text-xs font-light text-muted-foreground">@{creator.handle}</div>
      </div>

      {/* Stats */}
      <div className="mt-5 flex items-end justify-center gap-6">
        <div>
          <div className="text-[10px] font-light uppercase tracking-[0.18em] text-muted-foreground">
            粉丝
          </div>
          <div className="mt-1.5 text-2xl font-light leading-none text-accent-orange">
            {creator.followers}
          </div>
        </div>
        <div className="h-8 w-px bg-border/70" />
        <div>
          <div className="text-[10px] font-light uppercase tracking-[0.18em] text-muted-foreground">
            均播
          </div>
          <div className="mt-1.5 text-2xl font-light leading-none text-accent-orange">
            {creator.avgViews}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-5 flex flex-wrap justify-center gap-1.5">
        <span className="rounded-md bg-chip px-2 py-1 text-xs font-light text-chip-foreground">
          {creator.platform}
        </span>
        <span className="rounded-md bg-chip px-2 py-1 text-xs font-light text-chip-foreground">
          {creator.category}
        </span>
        <span className="rounded-md bg-chip px-2 py-1 text-xs font-light text-chip-foreground">
          {creator.region}
        </span>
        <span className="rounded-md bg-chip px-2 py-1 text-xs font-light text-chip-foreground">
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
