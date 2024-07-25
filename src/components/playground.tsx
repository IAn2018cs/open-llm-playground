"use client";

import { useChat } from "ai/react";
import { nanoid, Message } from "ai";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import ChatPanel from "@/components/chat-panel";
import EmptyScreen from "@/components/empty-screen";
import ChatMessagesList from "@/components/chat-messages-list";
import SystemPromptInput from "./system-prompt-input";
import ModelSettings from "@/components/model-settings";
import { type MessageRoleType } from "@/lib/types";
import { useModelSettings } from "@/components/model-context";

export default function Playground() {
  const { modelSettings } = useModelSettings();

  // ai sdk hook
  const {
    messages,
    isLoading,
    reload,
    stop,
    setMessages,
    handleSubmit,
    handleInputChange,
  } = useChat({
    api: "/api/chat",
    body: {
      modelName: modelSettings.modelName,
      temperature: modelSettings.temperature,
      maxLength: modelSettings.maxLength,
    },
    async onResponse(response) {
      if (response.status === 500) {
        const { error }: { error: string } = await response.json();
        toast.error(error);
      }
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // send endpoint using vercel sdk
    handleSubmit(e);
  };

  const clearAllMessages = () => {
    // 处理清空所有消息的逻辑
    console.log("Clearing all messages");
    setMessages([]);
  };

  const addMessage = (role: MessageRoleType, content: string) => {
    // 处理添加消息的逻辑
    console.log(`New ${role} message: ${content}`);
    const newMessage: Message = {
      id: nanoid(),
      role: role,
      content: content,
    };
    setMessages([...messages, newMessage]);
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  const editMessage = (id: string, content: string) => {
    setMessages(
      messages.map((message) =>
        message.id === id ? { ...message, content } : message,
      ),
    );
  };

  const changeMessageRole = (id: string, currentRole: MessageRoleType) => {
    const roles: MessageRoleType[] = ["user", "system", "assistant"];
    const currentIndex = roles.indexOf(currentRole);
    const nextIndex = (currentIndex + 1) % roles.length;
    const role = roles[nextIndex];
    setMessages(
      messages.map((message) =>
        message.id === id ? { ...message, role } : message,
      ),
    );
  };

  // fix hydration issue
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex h-full w-full flex-col justify-between gap-x-6 md:flex-row">
      <SystemPromptInput
        onAddMessage={addMessage}
        onClearAllMessages={clearAllMessages}
        className="h-full flex-1"
      />
      <div className="h-full max-h-3 border-y bg-muted-foreground/10 md:hidden" />
      <div className="flex w-full flex-[2_1_0%] flex-col justify-between gap-y-4 overflow-hidden pt-4 md:pt-0">
        {messages.length > 0 ? (
          <ChatMessagesList
            messages={messages}
            onDeleteMessage={deleteMessage}
            onEditMessage={editMessage}
            onChangeRole={changeMessageRole}
            className="max-h-[calc(100vh-28rem)] overflow-auto md:max-h-[calc(100vh-18rem)]"
          />
        ) : (
          <EmptyScreen />
        )}
        <ChatPanel
          isLoading={isLoading}
          stop={stop}
          handleInputChange={handleInputChange}
          onSubmit={onSubmit}
          reload={(e) => {
            return reload(e);
          }}
          messages={messages}
        />
      </div>
      <ModelSettings className="hidden lg:flex" />
    </div>
  );
}
