import { ChevronDown } from 'lucide-react';

interface ChatHeaderProps {
  modelName: string;
  onModelSelect: () => void;
}

export function ChatHeader({ modelName, onModelSelect }: ChatHeaderProps) {
  return (
    <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{modelName}</h2>
            <p className="text-sm text-gray-500 mt-1">Ready to assist you</p>
          </div>
          <button
            onClick={onModelSelect}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm"
          >
            <span className="text-sm font-medium text-gray-700">GPT-4</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
