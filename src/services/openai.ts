// OpenAI API 服务
const API_KEY = import.meta.env.OPENAI_API_KEY;
const API_BASE = 'https://api.openai.com/v1';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: Message;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * 调用 OpenAI Chat Completions API
 */
export async function chatCompletion(
  messages: Message[],
  options?: Partial<ChatCompletionRequest>
): Promise<ChatCompletionResponse> {
  const response = await fetch(`${API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
      ...options
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * 简化的文本对话接口
 */
export async function sendMessage(
  userMessage: string,
  systemPrompt?: string
): Promise<string> {
  const messages: Message[] = [];
  
  if (systemPrompt) {
    messages.push({
      role: 'system' as const,
      content: systemPrompt
    });
  }
  
  messages.push({
    role: 'user' as const,
    content: userMessage
  });

  const response = await chatCompletion(messages);
  return response.choices[0].message.content;
}
