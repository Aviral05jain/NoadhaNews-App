'use server';

/**
 * @fileOverview A content categorization AI agent.
 *
 * - categorizeContent - A function that handles the content categorization process.
 * - CategorizeContentInput - The input type for the categorizeContent function.
 * - CategorizeContentOutput - The return type for the categorizeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeContentInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the news article to categorize.'),
});
export type CategorizeContentInput = z.infer<typeof CategorizeContentInputSchema>;

const CategorizeContentOutputSchema = z.object({
  category: z.string().describe('The category of the news article.'),
  confidence: z
    .number()
    .describe(
      'The confidence score (0 to 1) of the categorization. Higher values indicate higher confidence.'
    ),
});
export type CategorizeContentOutput = z.infer<typeof CategorizeContentOutputSchema>;

export async function categorizeContent(input: CategorizeContentInput): Promise<CategorizeContentOutput> {
  return categorizeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeContentPrompt',
  input: {schema: CategorizeContentInputSchema},
  output: {schema: CategorizeContentOutputSchema},
  prompt: `You are an expert news categorization agent.

  Given the following news article, determine the most appropriate category and a confidence score (0 to 1) for your categorization.

  Article Content: {{{articleContent}}}

  Categories: Politics, Sports, Technology, Business, Entertainment, Health, Science, World News

  Respond with the category and confidence score.
`,
});

const categorizeContentFlow = ai.defineFlow(
  {
    name: 'categorizeContentFlow',
    inputSchema: CategorizeContentInputSchema,
    outputSchema: CategorizeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
