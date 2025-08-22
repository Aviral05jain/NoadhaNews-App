"use client";

import { useState, useEffect, useMemo } from "react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset, SidebarTrigger, SidebarGroup } from "@/components/ui/sidebar";
import { AppLogo } from "@/components/app-logo";
import { NewsCard } from "@/components/news-card";
import { Card } from "@/components/ui/card";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProcessedNews } from "@/app/actions";
import type { ProcessedNewsArticle } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ALL_CATEGORIES = ["Politics", "Sports", "Technology", "Business", "Entertainment", "Health", "Science", "World News"];

export default function Home() {
  const [news, setNews] = useState<ProcessedNewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(ALL_CATEGORIES);

  useEffect(() => {
    async function loadNews() {
      setIsLoading(true);
      try {
        const processedNews = await getProcessedNews();
        setNews(processedNews);
      } catch (error) {
        console.error("Failed to load news:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadNews();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const filteredNews = useMemo(() => {
    if (!news) return [];
    // Ensure category is a string before filtering
    return news.filter(article => typeof article.category === 'string' && selectedCategories.includes(article.category));
  }, [news, selectedCategories]);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <AppLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <h2 className="text-lg font-semibold mb-4 px-2 font-headline">Categories</h2>
            <div className="space-y-3 px-2">
              {ALL_CATEGORIES.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={category} 
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                    aria-label={`Select ${category} category`}
                  />
                  <Label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
             <SidebarTrigger />
             <h1 className="text-2xl font-bold font-headline">Your News Feed</h1>
          </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredNews.length > 0 ? (
                 filteredNews.map(article => <NewsCard key={article.id} article={article} />)
              ) : (
                <div className="col-span-full text-center py-12">
                    <h2 className="text-xl font-semibold">No articles found</h2>
                    <p className="text-muted-foreground mt-2">Try selecting different categories from the sidebar.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function CardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-6 w-1/3 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-4">
            <div className="space-y-1">
                <div className="flex justify-between"><Skeleton className="h-4 w-24" /><Skeleton className="h-4 w-10" /></div>
                <Skeleton className="h-2 w-full" />
            </div>
             <div className="space-y-1">
                <div className="flex justify-between"><Skeleton className="h-4 w-24" /><Skeleton className="h-4 w-10" /></div>
                <Skeleton className="h-2 w-full" />
            </div>
            <Skeleton className="h-4 w-48" />
        </div>
      </CardFooter>
    </Card>
  )
}
