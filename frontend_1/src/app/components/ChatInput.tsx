import { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-6 py-6">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-3 bg-white border border-gray-200 rounded-3xl shadow-lg p-2 focus-within:border-[#8B9DC3]/50 focus-within:shadow-xl transition-all duration-200">
            <button
              type="button"
              className="flex-shrink-0 p-3 text-gray-400 hover:text-[#8B9DC3] hover:bg-gray-50 rounded-2xl transition-all duration-200"
              aria-label="Attach file"
            >
              <Paperclip className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything…"
              disabled={disabled}
              rows={1}
              className="flex-1 resize-none bg-transparent border-none outline-none px-2 py-3 text-gray-900 placeholder-gray-400 max-h-32 min-h-[24px]"
              style={{
                height: 'auto',
                minHeight: '24px',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
            />

            <button
              type="submit"
              disabled={!input.trim() || disabled}
              className="flex-shrink-0 p-3 bg-gradient-to-br from-[#8B9DC3] to-[#6B7FA0] text-white rounded-2xl hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-3">
            AI can make mistakes. Consider checking important information.
          </p>
        </form>
      </div>
    </div>
  );
}
