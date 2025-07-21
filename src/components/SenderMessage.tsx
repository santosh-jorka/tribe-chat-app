import React from 'react';
import { View, Text, Image } from 'react-native';
import type { ChatMessageProps } from '../types';
import { ScaledSheet } from 'react-native-size-matters';
import { formatTime } from '@/utils/formatTime';

const SenderMessage: React.FC<ChatMessageProps> = (props) => {
  const { message, participant, showHeader, groupedReactions } = props;
  const bubbleMargin = { marginRight: showHeader ? 8 : 40 };
  return (
    <View style={[styles.container, styles.rightContainer]}>
      <View style={[styles.messageBubble, styles.sentMessage, styles.bubbleRight, bubbleMargin]}>
        {showHeader && (
          <View style={styles.headerRow}>
            <Text style={styles.name}>{participant.name}</Text>
            <Text style={styles.time}>{message.sentAt}</Text>
          </View>
        )}
        {!showHeader && (
          <View style={[styles.headerRow, { justifyContent: 'flex-end', paddingLeft: 40 }]}>
            <Text style={styles.time}>{formatTime(message.sentAt)}</Text>
          </View>
        )}
        {message.text && <Text style={styles.messageText}>{formatTime(message.sentAt)}</Text>}
        {groupedReactions.length > 0 && (
          <View style={styles.reactionRow}>
            {props.groupedReactions.map(({ emoji, count }) => (
              <Text key={emoji} style={styles.reaction}>
                {emoji} {count > 1 ? `x${count}` : ""}
              </Text>
            ))}
          </View>
        )}
      </View>
      {showHeader && (
        <Image
          source={participant.avatarUrl ? { uri: participant.avatarUrl } : require('../assets/images/react-logo.png')}
          style={styles.avatar}
        />
      )}

    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: '8@s',
  },
  rightContainer: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: '32@s',
    height: '32@s',
    borderRadius: '16@s',
    marginHorizontal: '8@s',
    backgroundColor: '#ccc',
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: '16@s',
    padding: '10@s',
  },
  sentMessage: {
    backgroundColor: '#DCF8C6',
  },
  bubbleRight: {
    alignSelf: 'flex-end',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2@s',
  },

  name: {
    fontWeight: 'bold',
    fontSize: '14@s',
    marginRight: '8@s',
  },
  time: {
    color: '#888',
    fontSize: '12@s',
  },
  messageText: {
    fontSize: '10@s',
    color: '#000',
    marginTop: '4@s',
  },
  reactionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '6@vs',
    gap: '6@s',
  },
  reaction: {
    backgroundColor: '#eee',
    paddingHorizontal: '6@s',
    paddingVertical: '2@vs',
    borderRadius: '10@s',
    fontSize: '12@s',
    marginRight: '4@s',
    marginBottom: '4@vs',
  },  
});

export default SenderMessage; 