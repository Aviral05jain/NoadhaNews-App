import { Compass } from 'lucide-react';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <Compass className="h-8 w-8 text-accent" />
      <h1 className="text-xl font-bold text-foreground font-headline">
        NoadhaNews
      </h1>
    </div>
  );
}
