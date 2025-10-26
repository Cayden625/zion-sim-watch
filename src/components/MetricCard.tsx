import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface MetricCardProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export const MetricCard = ({ label, children, className = '' }: MetricCardProps) => {
  return (
    <Card className={`p-2 bg-card border border-border shadow-lg ${className}`}>
      <div className="text-[8px] text-muted-foreground uppercase tracking-wide mb-1">
        {label}
      </div>
      {children}
    </Card>
  );
};
