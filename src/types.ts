
export interface Chat {
  id: string;
  name: string;
  message: string;
  time: string;
  count: number;
}

export interface MessageCardProps {
  name: string;
  message: string;
  time: string;
  count: number;
}

export interface ChatMessageProps {
  avatarUrl?: string;
  name: string;
  time: string;
  reactions?: string[]; 
  isEdited?: boolean;
  isCurrentUser?: boolean;
  showAvatar?: boolean;
  message?: string;
} 