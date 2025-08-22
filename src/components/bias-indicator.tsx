import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react";

type BiasIndicatorProps = {
  leftLeaningScore: number;
  rightLeaningScore: number;
  reasoning: string;
};

export function BiasIndicator({ leftLeaningScore, rightLeaningScore, reasoning }: BiasIndicatorProps) {
  return (
    <div className="w-full space-y-3 pt-2">
      <div>
        <div className="flex justify-between items-center text-sm mb-1">
          <span className="font-medium text-[hsl(var(--chart-1))]">Left-Leaning</span>
          <span className="font-semibold text-[hsl(var(--chart-1))]">{(leftLeaningScore * 100).toFixed(0)}%</span>
        </div>
        <Progress value={leftLeaningScore * 100} className="h-2 [&>div]:bg-[hsl(var(--chart-1))]" aria-label={`Left-leaning score: ${(leftLeaningScore * 100).toFixed(0)}%`} />
      </div>
      <div>
        <div className="flex justify-between items-center text-sm mb-1">
          <span className="font-medium text-[hsl(var(--chart-3))]">Right-Leaning</span>
          <span className="font-semibold text-[hsl(var(--chart-3))]">{(rightLeaningScore * 100).toFixed(0)}%</span>
        </div>
        <Progress value={rightLeaningScore * 100} className="h-2 [&>div]:bg-[hsl(var(--chart-3))]" aria-label={`Right-leaning score: ${(rightLeaningScore * 100).toFixed(0)}%`} />
      </div>
       <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <button aria-label="Show AI reasoning for bias scores">
                      <Info className="h-4 w-4" />
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="max-w-xs">{reasoning}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <p className="italic">Hover for AI reasoning.</p>
      </div>
    </div>
  );
}
