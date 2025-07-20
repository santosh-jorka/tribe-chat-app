import {View, Text} from 'react-native';
import React from 'react';
import type { MessageCardProps } from "../types";
import { ScaledSheet } from 'react-native-size-matters';     
const MessageCard = ({ name, message, time, count }: MessageCardProps) => {
    return (
        <View style={styles.button}>
            <View style={styles.leftContainer}>
                {/* Replace with a placeholder image for now */}
                <View style={styles.imagePlaceholder} />
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.message}>{message}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.time}>{time}</Text>
                {count > 0 && (
                  <View style={styles.messageCountContainer}>
                      <Text style={styles.messageCount}>{count}</Text>
                  </View>
                )}
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    button: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: '12@s', backgroundColor: "#fff", borderRadius: '8@s', elevation: 1 },
    imagePlaceholder: { height: '53@s', width: '53@s', borderRadius: '26@s', backgroundColor: '#ccc', marginRight: '12@s' },
    name: { fontWeight: 'bold', fontSize: '16@s' },
    message: { color: '#555', marginTop: '2@s' },
    time: { color: '#888', fontSize: '12@s' },
    messageCountContainer: { backgroundColor: '#007AFF', borderRadius: '10@s', paddingHorizontal: '6@s', paddingVertical: '2@s', marginTop: '4@s' },
    messageCount: { color: '#fff', fontSize: '12@s' },
    leftContainer: { flexDirection: 'row', alignItems: 'center' },
    rightContainer: { alignItems: 'flex-end', minWidth: '40@s' },
});
export default MessageCard;
