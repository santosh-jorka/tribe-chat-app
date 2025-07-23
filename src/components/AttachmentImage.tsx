import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import type { Attachment } from '../types';
import {scale, ScaledSheet} from "react-native-size-matters";



interface AttachmentImageProps {
    attachment: Attachment;
}

const screenWidth = Dimensions.get('window').width;

const getScaledImageStyle = (originalWidth: number, originalHeight: number) => {
    const maxWidth = screenWidth * 0.9;
    const ratio = maxWidth / originalWidth;
    return {
        width: maxWidth,
        height: originalHeight * ratio,
        borderRadius: 8,
    };
};

export const AttachmentImage: React.FC<AttachmentImageProps> = ({ attachment }) => {
    const [hasError, setHasError] = useState(false);

    if (attachment.type !== 'image') return null;

    const imageStyle = getScaledImageStyle(attachment.width, attachment.height);

    return (
        <View>
            {!hasError ? (
                <Image
                    source={{ uri: attachment.url }}
                    style={styles.imageAttachment}
                    onError={() => setHasError(true)}
                />
            ) : (
                <Text style={styles.unavailableText}>Attachment Image unavailable</Text>
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    unavailableText: {
        fontStyle: 'italic',
        color: 'gray',
        fontSize: scale(14),
        textAlign: 'center',
        marginTop: scale(8),
    },
    imageAttachment: {
        width: scale(180),
        height: scale(180),
        marginTop: scale(6),
        borderRadius: scale(6),
    }
});
