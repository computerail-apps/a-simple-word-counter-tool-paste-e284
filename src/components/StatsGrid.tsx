import { Card, CardContent } from '@/lib/ui/Card';
import { AlignLeft, Hash, Clock, Baseline, Rows3, MessageSquareText } from 'lucide-react';

interface Stats {
  words: number;
  charactersWithSpaces: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
}

function StatCard({
  icon,
  label,
  value,
  suffix,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <Card className="transition-colors duration-150 ease-out hover:border-primary/40">
      <CardContent className="flex flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-muted-foreground">
          {icon}
          <span className="text-small">{label}</span>
        </div>
        <div className="text-h2 tabular-nums text-foreground">
          {value.toLocaleString()}
          {suffix ? <span className="ml-1 text-small text-muted-foreground">{suffix}</span> : null}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsGrid({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      <StatCard icon={<AlignLeft size={16} />} label="Words" value={stats.words} />
      <StatCard icon={<Hash size={16} />} label="Characters" value={stats.charactersWithSpaces} />
      <StatCard icon={<Baseline size={16} />} label="Characters (no spaces)" value={stats.charactersNoSpaces} />
      <StatCard icon={<MessageSquareText size={16} />} label="Sentences" value={stats.sentences} />
      <StatCard icon={<Rows3 size={16} />} label="Paragraphs" value={stats.paragraphs} />
      <StatCard icon={<Clock size={16} />} label="Reading time" value={stats.readingTimeMinutes} suffix={stats.readingTimeMinutes === 1 ? 'min' : 'min'} />
    </div>
  );
}
