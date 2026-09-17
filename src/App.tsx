import { Nav } from '@/lib/ui/Nav';
import { Container } from '@/lib/ui/Container';
import { Button } from '@/lib/ui/Button';
import { Type, Github } from 'lucide-react';
import { TextAnalyzer } from '@/components/TextAnalyzer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav
        brand={
          <span className="inline-flex items-center gap-2">
            <Type size={18} />
            WordTally
          </span>
        }
        actions={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <Github size={16} />
            <span className="hidden md:inline">Source</span>
          </Button>
        }
      />
      <main className="py-8 md:py-12">
        <Container>
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-2 text-center animate-in">
              <h1 className="text-display text-foreground">Word counter, without the noise</h1>
              <p className="text-body text-muted-foreground">
                Type or paste your text below. Word count, character count, and reading time update instantly — computed live, right in your browser.
              </p>
            </div>
            <TextAnalyzer />
          </div>
        </Container>
      </main>
    </div>
  );
}
