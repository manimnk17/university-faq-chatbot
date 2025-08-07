
export enum Sender {
  User = 'user',
  Bot = 'bot',
}

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  sources?: { title: string; url: string }[];
}
