import type { AssessBiasOutput } from '@/ai/flows/assess-bias';
import type { CategorizeContentOutput } from '@/ai/flows/categorize-content';
import type { SummarizeNewsOutput } from '@/ai/flows/summarize-news';

export type NewsArticle = {
  id: string;
  title: string;
  source: {
    id: string | null;
    name: string;
  };
  url: string;
  content: string | null;
  description: string | null;
  urlToImage: string | null;
  publishedAt: string;
  author: string | null;
};

export type ProcessedNewsArticle = NewsArticle &
  AssessBiasOutput &
  CategorizeContentOutput &
  Pick<SummarizeNewsOutput, 'summary'>;
