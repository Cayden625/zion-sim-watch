import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface MetricCardProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export const MetricCard = ({ label, children, className = '' }: MetricCardProps) => {
  return (
    <Card className={`p-4 bg-card border border-border shadow-lg ${className}`}>
      <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
        {label}
      </div>
      {children}
    </Card>
  );
};
