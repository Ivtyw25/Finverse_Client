import { Bell, Settings, LogOut, LayoutDashboard } from 'lucide-react'; // ← ADD this
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';


export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900">SecureBank</h1>
          <p className="text-sm text-slate-500">Mobile Banking</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors relative">
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </button>

          {/* 🚀 Dashboard Icon */}
          <button onClick={()=> navigate("/Logs")} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <LayoutDashboard className="h-5 w-5 text-slate-600" />
          </button>

          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
            <Settings className="h-5 w-5 text-slate-600" />
          </button>
          
          <button 
            onClick={logout}
            className="p-2 rounded-full hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
