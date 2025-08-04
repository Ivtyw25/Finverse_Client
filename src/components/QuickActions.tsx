import type { QuickAction } from '../types/index';
import { useNavigate } from 'react-router';

interface QuickActionsProps {
  actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  const navigate = useNavigate();  
  const handleActionClick = (action: string) => {
    if (action === "transfer") {
        navigate('/transfer')
    }
    console.log(`Navigate to ${action}`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.action)}
              className="flex flex-col items-center p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200 group"
            >
              <div className="bg-blue-100 p-3 rounded-xl mb-3 group-hover:bg-blue-200 transition-colors duration-200">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-slate-900 text-sm mb-1">{action.title}</h4>
              <p className="text-xs text-slate-500 text-center">{action.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}