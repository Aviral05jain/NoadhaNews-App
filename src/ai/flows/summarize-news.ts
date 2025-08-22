'use server';

/**
 * @fileOverview Summarizes news articles in a neutral and objective manner.
 *
 * - summarizeNews - A function that summarizes a news article.
 * - SummarizeNewsInput - The input type for the summarizeNews function.
 * - SummarizeNewsOutput - The return type for the summarizeNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeNewsInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the news article to summarize.'),
});
export type SummarizeNewsInput = z.infer<typeof SummarizeNewsInputSchema>;

const SummarizeNewsOutputSchema = z.object({
  summary: z.string().describe('A neutral and objective summary of the news article.'),
  leftLeaningScore: z.number().describe('The degree of left-leaning bias in the article (between 0 and 1).'),
  rightLeaningScore: z.number().describe('The degree of right-leaning bias in the article (between 0 and 1).'),
});
export type SummarizeNewsOutput = z.infer<typeof SummarizeNewsOutputSchema>;

export async function summarizeNews(input: SummarizeNewsInput): Promise<SummarizeNewsOutput> {
  return summarizeNewsFlow(input);
}

const summarizeNewsPrompt = ai.definePrompt({
  name: 'summarizeNewsPrompt',
  input: {schema: SummarizeNewsInputSchema},
  output: {schema: SummarizeNewsOutputSchema},
  prompt: `You are an AI assistant tasked with providing unbiased summaries of news articles. Your goal is to present the core information in a neutral tone, avoiding any political slant or subjective interpretation. You must also assess the degree to which the original article leans left or right, using a score between 0 and 1 for each.

Article Content:
{{articleContent}}

Summary (Neutral and Objective):
`, // The prompt is now complete and includes the request for the summary.
});

const summarizeNewsFlow = ai.defineFlow(
  {
    name: 'summarizeNewsFlow',
    inputSchema: SummarizeNewsInputSchema,
    outputSchema: SummarizeNewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeNewsPrompt(input);
    return output!;
  }
);
