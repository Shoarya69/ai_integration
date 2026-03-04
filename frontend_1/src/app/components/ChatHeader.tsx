import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ChatHeaderProps {
  modelName: string;
  onModelSelect: (model: string) => void;
}

const models = [
  "llama-3.3-70b-versatile",
  "mixtral-8x7b",
  "gemma-7b-it",
  "gpt-4",
  "Auto",
];

export function ChatHeader({ modelName, onModelSelect }: ChatHeaderProps) {

  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
      <div className="w-full px-6 py-6">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Nordix AI</h2>
            <p className="text-sm text-gray-500 mt-1">
              Ready to assist you
            </p>
          </div>

          <div className="relative">

            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              <span className="text-sm font-medium text-gray-700">
                {modelName}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {open && (
              <div className="absolute right-0  mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg">

                {models.map((model) => (
                  <button
                    key={model}
                    onClick={() => {
                      onModelSelect(model);
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:rounded-xl text-sm"
                  >
                    {model}
                  </button>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>
    </header>
  );
}