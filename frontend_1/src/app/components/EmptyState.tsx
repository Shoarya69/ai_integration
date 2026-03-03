import { Sparkles, Lightbulb, Code, PenTool } from 'lucide-react';

interface EmptyStateProps {
  onExampleClick: (text: string) => void;
}

export function EmptyState({ onExampleClick }: EmptyStateProps) {
  const examples = [
    {
      icon: Lightbulb,
      title: 'Brainstorm ideas',
      description: 'Help me think of creative solutions',
    },
    {
      icon: Code,
      title: 'Write code',
      description: 'Generate clean, functional code',
    },
    {
      icon: PenTool,
      title: 'Creative writing',
      description: 'Craft compelling content',
    },
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Welcome message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#8B9DC3] to-[#6B7FA0] rounded-3xl shadow-lg mb-6">
            <Sparkles className="w-8 h-8 text-white" strokeWidth={2} />
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            How can I help you today?
          </h2>
          <p className="text-gray-500">
            Start a conversation or try one of these examples
          </p>
        </div>

        {/* Example cards */}
        <div className="grid grid-cols-3 gap-4">
          {examples.map((example, index) => {
            const Icon = example.icon;
            return (
              <button
                key={index}
                onClick={() => onExampleClick(example.description)}
                className="bg-white p-6 rounded-2xl border border-gray-200/50 hover:border-[#8B9DC3]/30 hover:shadow-md transition-all duration-200 text-left group"
              >
                <Icon className="w-6 h-6 text-[#8B9DC3] mb-3 group-hover:scale-110 transition-transform duration-200" strokeWidth={1.5} />
                <h3 className="font-medium text-gray-900 mb-1">{example.title}</h3>
                <p className="text-sm text-gray-500">{example.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
