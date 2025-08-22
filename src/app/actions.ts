'use server';

import { assessBias } from '@/ai/flows/assess-bias';
import { categorizeContent } from '@/ai/flows/categorize-content';
import { summarizeNews } from '@/ai/flows/summarize-news';
import type { ProcessedNewsArticle, NewsArticle } from '@/lib/types';

async function getRealtimeNews(): Promise<NewsArticle[]> {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey || apiKey === 'YOUR_NEWS_API_KEY_HERE') {
        console.error('News API key is not configured. Please add it to the .env file.');
        return [];
    }
    const sources = 'the-times-of-india,the-hindu,ndtv,google-news-in';
    const url = `https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching news:', errorData.message);
            throw new Error(`Failed to fetch news: ${response.statusText}`);
        }
        const data = await response.json();
        
        // Add a unique ID to each article
        return data.articles.map((article: Omit<NewsArticle, 'id'>, index: number) => ({
            ...article,
            id: `${article.url}-${index}`
        }));

    } catch (error) {
        console.error('Error fetching real-time news:', error);
        return [];
    }
}


export async function getProcessedNews(): Promise<ProcessedNewsArticle[]> {
  const articles = await getRealtimeNews();

  const processedArticles = await Promise.all(
    articles.map(async (article) => {
      try {
        // Use description if content is null or empty
        const articleContent = article.content || article.description;
        if (!articleContent) {
            return null;
        }

        const [bias, category, summary] = await Promise.all([
          assessBias({ articleContent }),
          categorizeContent({ articleContent }),
          summarizeNews({ articleContent }),
        ]);

        return {
          ...article,
          ...bias,
          ...category,
          source: article.source.name, // Flatten source object
          summary: summary.summary,
        };
      } catch (error) {
        console.error(`Error processing article ${article.id}:`, error);
        return null;
      }
    })
  );

  return processedArticles.filter(Boolean) as ProcessedNewsArticle[];
}
