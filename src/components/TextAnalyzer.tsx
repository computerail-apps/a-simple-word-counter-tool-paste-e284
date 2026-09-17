import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/lib/ui/Card';
import { Button } from '@/lib/ui/Button';
import { Eraser, ClipboardPaste, Sparkles } from 'lucide-react';
import { StatsGrid } from '@/components/StatsGrid';

const SAMPLE_TEXT =
  "The quiet hum of the server room was the only sound at 3 a.m. Mira stared at the dashboard, waiting for the deploy to finish. Every second felt like a minute. When the green checkmark finally appeared, she let out a breath she didn't know she'd been holding.\n\nSome things you can't rush — good writing is one of them. Take your time, read it back, and trim what doesn't earn its place.";

function analyze(text: string) {
  const trimmed = text.trim();
  const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).filter(Boolean).length;
  const charactersWithSpaces = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences =
    trimmed.length === 0 ? 0 : (trimmed.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? []).filter((s) => s.trim().length > 0).length;
  const paragraphs =
    trimmed.length === 0 ? 0 : trimmed.split(/\n+/).map((p) => p.trim()).filter(Boolean).length;
  const readingTimeMinutes = words === 0 ? 0 : Math.max(1, Math.round(words / 200));

  return { words, charactersWithSpaces, charactersNoSpaces, sentences, paragraphs, readingTimeMinutes };
}

export function TextAnalyzer() {
  const [text, setText] = useState('');
  const stats = useMemo(() => analyze(text), [text]);

  const handlePasteSample = () => setText(SAMPLE_TEXT);
  const handleClear = () => setText('');
  const handlePasteClipboard = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      if (clip) setText((prev) => (prev ? prev + '\n' + clip : clip));
    } catch {
      // Clipboard permission denied or unavailable — silently ignore, user can paste manually.
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-elev-2">
        <CardContent className="p-0">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here…"
            spellCheck
            className="h-64 w-full resize-none rounded-xl bg-transparent p-6 text-body text-foreground placeholder:text-muted-foreground focus:outline-none md:h-80"
            autoFocus
          />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-3">
            <span className="text-micro text-muted-foreground">
              {text.length === 0 ? 'Nothing typed yet' : 'Updating live as you type'}
            </span>
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" size="sm" onClick={handlePasteClipboard}>
                <ClipboardPaste size={14} />
                Paste
              </Button>
              <Button variant="ghost" size="sm" onClick={handlePasteSample}>
                <Sparkles size={14} />
                Try sample
              </Button>
              <Button variant="ghost" size="sm" onClick={handleClear} disabled={text.length === 0}>
                <Eraser size={14} />
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <StatsGrid stats={stats} />
    </div>
  );
}
