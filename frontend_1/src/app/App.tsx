import { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatHeader } from './components/ChatHeader';
import { EmptyState } from './components/EmptyState';
import { MessageList, type Message } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import sendMessage from './SERVICE/api';
export default function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    const responses = await sendMessage(userMessage);
    return responses;
  };

  const handleSendMessage = async (content: string) => {
  const userMessage: Message = {
    id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(content);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,   // ✅ Now it's a string
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    }

    setIsTyping(false);
  };

  const handleExampleClick = (text: string) => {
    handleSendMessage(text);
  };

  const handleModelSelect = () => {
    // Placeholder for model selection
    console.log('Model selector clicked');
  };

  return (
    <div className="flex h-screen bg-white font-['Inter',system-ui,sans-serif] antialiased">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'chat' && (
          <>
            <ChatHeader
              modelName="Groq AI Assistant"
              onModelSelect={handleModelSelect}
            />

            <div className="flex-1 overflow-hidden flex flex-col bg-gradient-to-b from-gray-50/30 to-white">
              {messages.length === 0 ? (
                <EmptyState onExampleClick={handleExampleClick} />
              ) : (
                <MessageList messages={messages} />
              )}
              <div ref={messagesEndRef} />

              {isTyping && (
                <div className="max-w-3xl mx-auto px-6 pb-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#8B9DC3] to-[#6B7FA0] rounded-2xl flex items-center justify-center shadow-sm">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200/50 rounded-3xl rounded-tl-lg px-6 py-4 shadow-sm">
                      <p className="text-gray-400">Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <ChatInput onSend={handleSendMessage} disabled={isTyping} />
          </>
        )}

        {activeTab === 'history' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat History</h3>
              <p className="text-gray-500">Your conversation history will appear here</p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-500">Configure your AI assistant preferences</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
