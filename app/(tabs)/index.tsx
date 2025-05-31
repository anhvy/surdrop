import { Box, VStack } from "@/components/ui";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

type TItem = {
  id: string;
  delivery_address: string;
  pickup_address: string;
  sender: string;
  receiver: string;
};

const ItemCell = ({ item }: { item: TItem }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        router.navigate(`orders/${item.id}/capture`);
      }}
    >
      <Box className="flex-1 p-4 border border-gray-200 rounded-lg">
        <Text>{item.sender}</Text>
        <Text>{item.pickup_address}</Text>
        <Text>{item.receiver}</Text>
        <Text>{item.delivery_address}</Text>
      </Box>
    </Pressable>
  );
};

const packages = Array.from({ length: 20 }).map((_, i) => ({
  id: `0321${i + 1}`,
  sender: `Sender ${i + 1}`,
  receiver: `Receiver ${i + 1}`,
  pickup_address: `81 Phan Xich Long ${i + 1}`,
  delivery_address: `18E Cong Hoa ${i + 1}`,
}));

export default function HomeScreen() {
  return (
    <VStack className="flex-1 px-4 bg-white py-5">
      <FlashList
        renderItem={({ item }) => {
          return <ItemCell item={item} />;
        }}
        estimatedItemSize={50}
        data={packages}
        ItemSeparatorComponent={() => <Box className="h-2" />}
      />
    </VStack>
  );
}
