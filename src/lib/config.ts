export interface ModelConfig {
  modelName: string;
  defaultTemperature: number;
  minTemperature: number;
  maxTemperature: number;
  defaultTokens: number;
  minTokens: number;
  maxTokens: number;
}

export const Models: ModelConfig[] = JSON.parse(
  process.env.MODEL_CONFIGS || "[]",
);
