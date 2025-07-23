import React from 'react';
import {View, Text, Image} from 'react-native';
import type {ChatMessageProps} from '../types';
import {ScaledSheet, scale, verticalScale} from 'react-native-size-matters';
import {formatTime} from '@/utils/formatTime';
import {formatTimestampToDate} from "@/utils/ChatMessageUtils";
import {AttachmentImage} from "@/components/AttachmentImage";
import ImageWithFallback from "@/components/ImageWithFallback";

const SenderMessage: React.FC<ChatMessageProps> = (props) => {
    const {message, participant, showHeader, showDate, groupedReactions} = props;
    const bubbleMargin = {marginRight: showHeader ? 0 : 60};
    return (
        <View style={[styles.container, styles.rightContainer]}>

            <View style={styles.messageContainer}>

                <View style={[styles.messageBubble, styles.sentMessage, styles.bubbleRight, bubbleMargin]}>

                    {showHeader && (
                        <View style={styles.headerRow}>
                            <Text style={styles.name}>{participant.name}</Text>
                            <Text style={styles.time}>{formatTime(message.sentAt)}</Text>
                        </View>
                    )}


                    {!showHeader && (
                        <View style={[styles.headerRow, {justifyContent: 'flex-end', paddingLeft: 40}]}>
                            <Text style={styles.time}>{formatTime(message.sentAt)}</Text>
                        </View>
                    )}


                    {message.text && <Text style={styles.messageText}>{message.text}</Text>}


                    {message.attachments?.length > 0 &&
                        message.attachments.map((attachment, index) => (
                            <AttachmentImage key={index} attachment={attachment}/>
                        ))}

                    {groupedReactions.length > 0 && (
                        <View style={styles.reactionRow}>
                            {props.groupedReactions.map(({emoji, count}) => (
                                <Text key={emoji} style={styles.reaction}>
                                    {emoji}{count > 1 ? `x${count}` : ""}
                                </Text>
                            ))}
                        </View>
                    )}
                </View>
                {showHeader && (
                    <ImageWithFallback
                        uri={participant.avatarUrl}
                        fallback={require('../assets/images/face_img.png')}
                        style={styles.avatar}
                    />
                )}
            </View>

            {showDate && (
                <View style={styles.dateContainer}>
                    <Text style={styles.date}>{formatTimestampToDate(message.sentAt)}</Text>
                </View>
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginBottom: scale(2),
    },
    rightContainer: {
        justifyContent: 'flex-end',
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: scale(6),
        justifyContent: 'flex-end',
        //backgroundColor: 'blue',
    },
    dateContainer: {
        marginBottom: scale(4),
        width: '100%',
        alignItems: 'center',
    },
    date: {
        fontSize: scale(12),
        color: '#888',
        textAlign: 'center',
    },
    avatar: {
        width: scale(32),
        height: scale(32),
        borderRadius: scale(16),
        marginHorizontal: scale(8),
        //backgroundColor: '#ccc'
    },
    messageBubble: {
        maxWidth: '70%',
        borderRadius: scale(16),
        padding: scale(10),
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
        marginBottom: scale(1),
    },
    name: {
        fontWeight: 'bold',
        fontSize: scale(12),
        marginRight: scale(8),
    },
    time: {
        color: '#888',
        fontSize: scale(10),
        textAlign: 'right'
    },
    messageText: {
        fontSize: scale(14),
        color: '#000',
        marginTop: scale(1),
        textAlign: 'justify',
    },
    reactionRow: {
        flexDirection: 'row',
        marginTop: scale(4),
        justifyContent: 'flex-start',
        //backgroundColor: 'red',
    },
    reaction: {
        backgroundColor: '#eee',
        paddingHorizontal: scale(3),
        //paddingVertical: verticalScale(1),
        borderRadius: scale(10),
        fontSize: scale(12),
        textAlign: "left",
        //marginBottom: verticalScale(4),
    },
    imageAttachment: {
        width: scale(180),
        height: scale(180),
        marginTop: scale(6),
        borderRadius: scale(6),
    },
});

export default SenderMessage; 