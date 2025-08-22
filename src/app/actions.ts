'use server';

import { assessBias } from '@/ai/flows/assess-bias';
import { categorizeContent } from '@/ai/flows/categorize-content';
import { summarizeNews } from '@/ai/flows/summarize-news';
import { mockNews } from '@/lib/mock-news';
import type { ProcessedNewsArticle } from '@/lib/types';

export async function getProcessedNews(): Promise<ProcessedNewsArticle[]> {
  const articles = mockNews;

  const processedArticles = await Promise.all(
    articles.map(async (article) => {
      try {
        const articleContent = article.content;
        const [bias, category, summary] = await Promise.all([
          assessBias({ articleContent }),
          categorizeContent({ articleContent }),
          summarizeNews({ articleContent }),
        ]);

        return {
          ...article,
          ...bias,
          ...category,
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
