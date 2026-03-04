import { MessageSquare, Clock, Settings, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-[#FAFAFA] border-r border-gray-200/50 flex-col h-screen">
      
      {/* Logo */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#8B9DC3] to-[#6B7FA0] rounded-2xl flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-white" strokeWidth={2} />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-gray-900">Nordix AI</h1>
            <p className="text-xs text-gray-500">Assistant</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}

        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200/50">
        <div className="px-4 py-3 bg-white rounded-xl">
          <p className="text-xs text-gray-500">Made with care</p>
          <p className="text-xs text-gray-400 mt-1">Nordic Design</p>
        </div>
      </div>

    </aside>
  );
}