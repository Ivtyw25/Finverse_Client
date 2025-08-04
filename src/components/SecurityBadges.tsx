import { Shield, Lock, CheckCircle } from 'lucide-react';

export default function SecurityBadges() {
  const badges = [
    {
      icon: Shield,
      text: 'Bank-level Security',
      description: '256-bit SSL encryption'
    },
    {
      icon: Lock,
      text: 'Secure Login',
      description: 'Protected authentication'
    },
    {
      icon: CheckCircle,
      text: 'Verified Platform',
      description: 'FDIC insured institution'
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
          <badge.icon className="h-4 w-4 text-green-600" />
          <div>
            <span className="font-medium">{badge.text}</span>
            <p className="text-xs text-slate-500">{badge.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}