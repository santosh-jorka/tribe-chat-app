import React from 'react';
import type { ChatMessageProps } from '../types';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import { getGroupedReactions } from '@/utils/ChatMessageUtils';

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  const groupedReactions = getGroupedReactions(props.message.reactions || []);
  //console.debug('groupedReactions:', groupedReactions);
  if(!props.participant || !props.participant.name){
    return "No participant found";
  }
  if (props.participant.name.toLowerCase() === 'you') {
    return <SenderMessage message={props.message} participant={props.participant} showHeader={props.showHeader} showDate={props.showDate} groupedReactions={groupedReactions}/>;
  } else {
    return <ReceiverMessage message={props.message} participant={props.participant} showHeader={props.showHeader} showDate={props.showDate} groupedReactions={groupedReactions}/>;
  }
};

export default ChatMessage; 