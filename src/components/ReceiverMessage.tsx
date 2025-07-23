import React from 'react';
import {View, Text, Image} from 'react-native';
import type {ChatMessageProps} from '../types';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {formatTime} from '@/utils/formatTime';
import {formatTimestampToDate} from '@/utils/ChatMessageUtils';
import {useState} from 'react';
import {Dimensions} from "react-native";
import {AttachmentImage} from "@/components/AttachmentImage";
import ImageWithFallback from "@/components/ImageWithFallback";

const ReceiverMessage: React.FC<ChatMessageProps> = ({
                                                         message,
                                                         participant,
                                                         showHeader,
                                                         showDate,
                                                         groupedReactions
                                                     }) => {
    const bubbleMargin = {marginLeft: showHeader ? 0 : 60};
    const screenWidth = Dimensions.get('window').width;

    const [failedImageUrls, setFailedImageUrls] = useState<string[]>([]);

    const handleImageError = (url: string) => {
        console.debug(`Image failed to load: ${url}`);
        setFailedImageUrls(prev => [...prev, url]);
    };

    const getScaledImageStyle = (originalWidth: number, originalHeight: number) => {
        const maxWidth = screenWidth * 0.9; // or any desired container width
        const ratio = maxWidth / originalWidth;
        return {
            width: maxWidth,
            height: originalHeight * ratio,
            borderRadius: 8,
        };
    };
    return (
        <View style={[styles.container, styles.leftContainer]}>

            <View style={styles.messageContainer}>

                {showHeader && (
                    <ImageWithFallback
                        uri={participant.avatarUrl}
                        fallback={require('../assets/images/face_img.png')}
                        style={styles.avatar}
                    />
                )}

                <View style={[styles.receivedMessage, styles.messageBubble, bubbleMargin]}>

                    {showHeader && (
                        <View style={styles.headerRow}>
                            <Text style={styles.name}>{participant.name}</Text>
                            <Text style={styles.time}>{formatTime(message.sentAt)}</Text>
                        </View>
                    )}

                    {!showHeader && (
                        <View style={styles.headerRowright}>
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
                            {groupedReactions.map(({emoji, count}) => (
                                <Text key={emoji} style={styles.reaction}>
                                    {emoji}{count > 1 ? `x${count}` : ""}
                                </Text>
                            ))}
                        </View>
                    )}
                </View>
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
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: scale(8),
        //backgroundColor: 'red',
    },
    leftContainer: {
        justifyContent: 'flex-start',
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
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: scale(8),
        justifyContent: 'flex-start',
        //backgroundColor: 'blue',
    },
    avatar: {
        width: scale(32),
        height: scale(32),
        borderRadius: scale(16),
        marginHorizontal: scale(8),
        //backgroundColor: '#ccc',
    },
    messageBubble: {
        maxWidth: '70%',
        borderRadius: scale(16),
        padding: scale(10),
        //backgroundColor: 'red',
    },
    receivedMessage: {
        backgroundColor: '#fff',
        //backgroundColor: 'red',
    },
    bubbleLeft: {
        alignSelf: 'flex-start',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: scale(1),
    },
    headerRowright: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
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
        textAlign: 'right',
    },

    messageText: {
        fontSize: scale(14),
        color: '#000',
        marginTop: scale(1),
        textAlign: 'justify',
        //backgroundColor: 'blue',
    },
    imageAttachment: {
        width: scale(180),
        height: scale(180),
        marginTop: scale(6),
        borderRadius: scale(6),
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
    unavailableText: {
        fontStyle: 'italic',
        color: 'gray',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
    }
});

export default ReceiverMessage; 