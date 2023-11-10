"use client";

import { useChat } from "ai/react";
import { nanoid, Message } from "ai";
import { useState } from "react";
import { toast } from "react-hot-toast";

import ChatPanel from "@/components/chat-panel";
import EmptyScreen from "@/components/empty-screen";
import ChatMessagesList from "@/components/chat-messages-list";
import SystemPromptInput from "./system-prompt-input";
import ModelSettings from "@/components/model-settings";

export default function Playground() {
  const [systemMsg, setSystemMsg] = useState<string>("");
  const [temperature, setTemperature] = useState(0.1);
  const [maxLength, setMaxLength] = useState(256);
  const [modelName, setModelName] = useState("gpt-3.5-turbo");

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
      modelName,
      temperature,
      maxLength,
    },
    async onResponse(response) {
      if (response.status === 500) {
        const { error }: { error: string } = await response.json();
        toast.error(error);
      }
    },
  });

  const updateSystemMessage = () => {
    const systemMessage: Message = {
      id: nanoid(),
      role: "system",
      content: systemMsg,
    };

    // update the first system message if exists
    if (messages.length > 0 && messages[0].role === "system") {
      setMessages([systemMessage, ...messages.slice(1)]);
    } else {
      setMessages([systemMessage, ...messages]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // update system message
    updateSystemMessage();
    // send endpoint using vercel sdk
    handleSubmit(e);
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <div className="flex h-full w-full flex-col justify-between gap-x-6 gap-y-6 md:flex-row">
      <SystemPromptInput
        prompt={systemMsg}
        setPrompt={setSystemMsg}
        className="h-full flex-1"
      />
      <div className="flex w-full flex-[2_1_0%] flex-col justify-between gap-y-4 md:overflow-hidden">
        {messages.filter((message) => message.role !== "system").length ? (
          <ChatMessagesList
            messages={messages}
            onDeleteMessage={handleDelete}
            className="max-h-[calc(100vh-18rem)] overflow-auto"
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
            updateSystemMessage();
            return reload(e);
          }}
          messages={messages}
        />
      </div>
      <ModelSettings
        modelName={modelName}
        setModelName={setModelName}
        temperature={temperature}
        setTemperature={setTemperature}
        maxLength={maxLength}
        setMaxLength={setMaxLength}
      />
    </div>
  );
}
