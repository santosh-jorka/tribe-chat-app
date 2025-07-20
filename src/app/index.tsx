import { Text, View, FlatList, TouchableOpacity, ListRenderItem } from "react-native";
import MessageCard from "../components/MessageCard";
import { useRouter } from "expo-router";
import type { Chat } from "../types";
import { ScaledSheet } from "react-native-size-matters";
const chats: Chat[] = [
  { id: "1", name: "Santhosh", message: "Hello", time: "12:00", count: 1 },
  { id: "2", name: "Alex", message: "Hey!", time: "11:45", count: 2 },
];

export default function Index() {
  const router = useRouter();

  const renderItem: ListRenderItem<Chat> = ({ item }) => (
    <TouchableOpacity onPress={() => router.push({ pathname: "/chatScreen", params: { chatId: item.id, name: item.name } })}>
      <MessageCard name={item.name} message={item.message} time={item.time} count={item.count} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: '16@s',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: '16@s',
  },
  title: {
    fontSize: '24@s',
    fontWeight: 'bold',
  },
  separator: {
    height: '12@s'  ,
  },
});
