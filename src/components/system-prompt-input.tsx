import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import MessageRole from "@/components/message-role";
import { useState } from "react";
import { MessageRoleType } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface SystemPromptInputProps extends React.HTMLAttributes<HTMLDivElement> {
  onAddMessage: (role: MessageRoleType, content: string) => void;
  onClearAllMessages: () => void;
}

const SystemPromptInput = ({
  onAddMessage,
  onClearAllMessages,
  className,
  ...props
}: SystemPromptInputProps) => {
  const [isHover, setIsHover] = useState(false);
  const [role, setRole] = useState<MessageRoleType>("system");
  const [prompt, setPrompt] = useState(""); // 内部状态

  const toggleRole = () => {
    setRole((prevRole) => {
      switch (prevRole) {
        case "system":
          return "user";
        case "user":
          return "assistant";
        case "assistant":
          return "system";
        default:
          return "system";
      }
    });
  };

  const handleAddMessage = () => {
    if (prompt.trim()) {
      onAddMessage(role, prompt);
      setPrompt(""); // 清空输入框
    }
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col rounded-md border-muted-foreground/50 p-2 md:border",
        className,
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...props}
    >
      <MessageRole
        role={role.toUpperCase()}
        isHover={isHover}
        className="cursor-pointer px-3 pb-1 pt-4"
        onClick={toggleRole}
      />
      <Textarea
        className="h-full resize-none border-0 text-[16px] font-light focus-visible:ring-0 focus-visible:ring-transparent"
        placeholder="输入提示词内容"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="mt-2 flex justify-between">
        <Button
          onClick={onClearAllMessages}
          variant="outline"
          className="text-red-500"
        >
          清空所有消息
        </Button>
        <Button onClick={handleAddMessage}>添加消息</Button>
      </div>
    </div>
  );
};

export default SystemPromptInput;
