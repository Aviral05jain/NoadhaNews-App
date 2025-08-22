
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/app-logo';
import { ArrowRight, BarChart, FileText, Globe } from 'lucide-react';
import { Header } from '@/components/header';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-card">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              NoadhaNews: Unbiased News, Amplified
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
              Cut through the noise. We use AI to analyze news from multiple sources, revealing media bias and giving you a balanced perspective on every story.
            </p>
            <div className="mt-6">
              <Link href="/dashboard">
                <Button size="lg">
                  Explore the News Feed
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl font-headline">
              Core Features
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4 text-center mb-12">
              Everything you need to become a more informed reader.
            </p>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="p-3 mb-4 rounded-full bg-accent text-accent-foreground">
                    <BarChart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-headline">Bias Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI scores articles for left and right-leaning bias, complete with a detailed explanation, so you can understand the underlying perspective.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="p-3 mb-4 rounded-full bg-accent text-accent-foreground">
                    <FileText className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-headline">AI Summaries</h3>
                <p className="text-muted-foreground">
                  Get concise, neutral summaries of every article, saving you time while keeping you informed of the key facts.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="p-3 mb-4 rounded-full bg-accent text-accent-foreground">
                    <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-headline">Diverse Sources</h3>
                <p className="text-muted-foreground">
                  We pull from a wide array of Indian news sources to provide a comprehensive view of the media landscape.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex items-center justify-center p-6 border-t bg-card">
        <p className="text-sm text-muted-foreground">&copy; 2024 NoadhaNews. All rights reserved.</p>
      </footer>
    </div>
  );
}
