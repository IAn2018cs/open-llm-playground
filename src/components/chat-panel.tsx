import { type UseChatHelpers } from "ai/react";

import { Button } from "@/components/ui/button";
import PromptForm from "@/components/prompt-form";
import { IconRefresh, IconStop } from "@/components/icons";

export interface ChatPanelProps
  extends Pick<UseChatHelpers, "isLoading" | "reload" | "messages" | "stop"> {
  id?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ChatPanel = ({
  isLoading,
  stop,
  reload,
  messages,
  onSubmit,
  handleInputChange,
}: ChatPanelProps) => {
  return (
    <div>
      <div className="mx-auto sm:max-w-2xl sm:px-4 space-y-1">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.filter((msg) => msg.role !== "system").length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="border bg-background px-4 py-2 shadow-lg sm:rounded-t-xl md:py-4">
          <PromptForm
            onSubmit={onSubmit}
            handleInputChange={handleInputChange}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
