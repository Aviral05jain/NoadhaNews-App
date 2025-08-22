import { config } from 'dotenv';
config();

import '@/ai/flows/categorize-content.ts';
import '@/ai/flows/summarize-news.ts';
import '@/ai/flows/assess-bias.ts';