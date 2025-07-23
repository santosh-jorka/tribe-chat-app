type TMessageAttachment = {
  uuid: string;
  type: "image";
  url: string;
  width: number;
  height: number;
};

type TReaction = {
  uuid: string;
  participantUuid: string;
  value: string;
};

type TParticipant = {
  uuid: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  email?: string;
  jobTitle?: string;
  createdAt: number;
  updatedAt: number;
};

type TMessage = {
  uuid: string;
  text: string;
  attachments: TMessageAttachment[];
  replyToMessageUuid?: string;
  reactions: TReaction[];
  authorUuid: string;
  sentAt: number;
  updatedAt: number;
};

type TMessageJSON = Omit<TMessage, "replyToMessageUuid"> & {
  replyToMessage?: Omit<TMessage, "replyToMessageUuid">;
};

type Attachment = {
  type: string;
  url: string;
  width: number;
  height: number;
};

export interface ChatMessageProps {
  message: TMessage;
  participant: TParticipant;
  showHeader: boolean;
  showDate: boolean;
  groupedReactions: { emoji: string; count: number }[];
}



export type { TMessage, TMessageAttachment, TReaction, TParticipant, TMessageJSON,Attachment };
