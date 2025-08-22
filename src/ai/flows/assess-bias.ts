// This file contains the Genkit flow for assessing bias in news articles.
// It provides a 'left-leaning' and 'right-leaning' score for each article.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessBiasInputSchema = z.object({
  articleContent: z.string().describe('The content of the news article to assess.'),
});
export type AssessBiasInput = z.infer<typeof AssessBiasInputSchema>;

const AssessBiasOutputSchema = z.object({
  leftLeaningScore: z
    .number()
    .min(0)
    .max(1)
    .describe('A score between 0 and 1 indicating how left-leaning the article is.'),
  rightLeaningScore: z
    .number()
    .min(0)
    .max(1)
    .describe('A score between 0 and 1 indicating how right-leaning the article is.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the left and right leaning scores.'),
});
export type AssessBiasOutput = z.infer<typeof AssessBiasOutputSchema>;

export async function assessBias(input: AssessBiasInput): Promise<AssessBiasOutput> {
  return assessBiasFlow(input);
}

const assessBiasPrompt = ai.definePrompt({
  name: 'assessBiasPrompt',
  input: {schema: AssessBiasInputSchema},
  output: {schema: AssessBiasOutputSchema},
  prompt: `You are an AI that assesses the bias of news articles.

  Given the following news article, provide a left-leaning score and a right-leaning score between 0 and 1.
  A score of 0 means the article has no bias towards that side, and a score of 1 means the article is strongly biased towards that side.

  Also, provide a brief explanation of your reasoning for the assigned scores.

  Article Content: {{{articleContent}}}
  `,
});

const assessBiasFlow = ai.defineFlow(
  {
    name: 'assessBiasFlow',
    inputSchema: AssessBiasInputSchema,
    outputSchema: AssessBiasOutputSchema,
  },
  async input => {
    const {output} = await assessBiasPrompt(input);
    return output!;
  }
);
