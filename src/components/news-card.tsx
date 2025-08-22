import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BiasIndicator } from "@/components/bias-indicator";
import type { ProcessedNewsArticle } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import Image from 'next/image';

type NewsCardProps = {
    article: ProcessedNewsArticle;
};

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className="flex flex-col h-full hover:border-accent transition-colors duration-300">
      {article.urlToImage && (
        <div className="relative h-48 w-full">
            <Image 
                src={article.urlToImage} 
                alt={article.title} 
                layout="fill" 
                objectFit="cover" 
                className="rounded-t-lg"
            />
        </div>
      )}
      <CardHeader className={!article.urlToImage ? '' : 'pt-4'}>
        <div className="flex justify-between items-center text-xs text-muted-foreground pb-2">
            <span>{article.source.name}</span>
            <Badge variant="secondary">{article.category}</Badge>
        </div>
        <CardTitle className="font-headline text-lg leading-snug">
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors group">
            {article.title}
            <ExternalLink className="inline-block w-4 h-4 ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{article.summary}</p>
      </CardContent>
      <CardFooter>
        <BiasIndicator 
          leftLeaningScore={article.leftLeaningScore}
          rightLeaningScore={article.rightLeaningScore}
          reasoning={article.reasoning}
        />
      </CardFooter>
    </Card>
  );
}
