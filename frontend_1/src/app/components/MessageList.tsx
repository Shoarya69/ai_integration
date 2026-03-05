import { motion } from 'motion/react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from "react-markdown";

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`flex gap-4 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#8B9DC3] to-[#6B7FA0] rounded-2xl flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
            )}

            <div
              className={`max-w-[70%] ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-[#8B9DC3] to-[#6B7FA0] text-white rounded-3xl rounded-tr-lg px-6 py-4 shadow-sm'
                  : 'bg-white border border-gray-200/50 rounded-3xl rounded-tl-lg px-6 py-4 shadow-sm'
              }`}
            >
              <p className={`leading-relaxed ${message.role === 'assistant' ? 'text-gray-800' : ''}`}>
                <ReactMarkdown>{message.content}</ReactMarkdown>
                
              </p>
              <p
                className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-white/70' : 'text-gray-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            {message.role === 'user' && (
              <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-2xl flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" strokeWidth={2} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
