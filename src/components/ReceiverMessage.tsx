import React from 'react';
import { View, Text, Image } from 'react-native';
import type { ChatMessageProps } from '../types';
import { ScaledSheet } from 'react-native-size-matters';

const ReceiverMessage: React.FC<ChatMessageProps> = ({ avatarUrl, name, time, message, showAvatar = true }) => {
  // Add margin when there's no avatar to align with messages that have avatars
  const bubbleMargin = { marginLeft: showAvatar ? 8 : 40 };
  return (
    <View style={[styles.container, styles.leftContainer]}>
      {showAvatar && (
        <Image
          source={avatarUrl ? { uri: avatarUrl } : require('../assets/images/react-logo.png')}
          style={styles.avatar}
        />
      )}
      <View style={[styles.messageBubble, styles.receivedMessage, styles.bubbleLeft, bubbleMargin]}>
        {showAvatar && (
          <View style={styles.headerRow}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
        )}
        {!showAvatar && (
          <View style={styles.headerRow}>
            <Text style={styles.time}>{time}</Text>
          </View>
        )}
        {message && <Text style={styles.messageText}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: '8@s',
  },
  leftContainer: {
    justifyContent: 'flex-start',
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
  receivedMessage: {
    backgroundColor: '#fff',
  },
  bubbleLeft: {
    alignSelf: 'flex-start',
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
    fontSize: '16@s',
    color: '#000',
    marginTop: '4@s',
  },
});

export default ReceiverMessage; 