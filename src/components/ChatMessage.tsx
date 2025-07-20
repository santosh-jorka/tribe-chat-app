import React from 'react';
import type { ChatMessageProps } from '../types';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  if (props.isCurrentUser) {
    return <SenderMessage {...props} />;
  } else {
    return <ReceiverMessage {...props} />;
  }
};

export default ChatMessage; 