import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ChatHeaderProps {
  modelName: string;
  onModelSelect: (model: string) => void;
}

const models = [
      "groq/compound-mini",
      "meta-llama/llama-prompt-guard-2-86m",
      "llama-3.3-70b-versatile",
      "allam-2-7b",
      "canopylabs/orpheus-v1-english",
      "groq/compound",
      "moonshotai/kimi-k2-instruct",
      "whisper-large-v3",
      "moonshotai/kimi-k2-instruct-0905",
      "meta-llama/llama-prompt-guard-2-22m",
      "openai/gpt-oss-safeguard-20b",
      "llama-3.1-8b-instant",
      "qwen/qwen3-32b",
      "meta-llama/llama-4-maverick-17b-128e-instruct",
      "openai/gpt-oss-120b",
      "openai/gpt-oss-20b",
      "canopylabs/orpheus-arabic-saudi",
      "meta-llama/llama-guard-4-12b",
      "whisper-large-v3-turbo",
      "meta-llama/llama-4-scout-17b-16e-instruct",
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
              <div className="absolute right-0 mt-2 w-56 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg">

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