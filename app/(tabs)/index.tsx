import { Box, HStack, VStack } from "@/components/ui";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { Package } from "lucide-react-native";
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
        // router.navigate(`orders/${item.id}/capture`);
      }}
    >
      <Box className="flex-1 p-4 rounded-xl bg-white">
        <HStack space="md">
          <Box className="p-2 bg-neutral-100 rounded-xl w-24 h-24 items-center justify-center ">
            <Package size={48} strokeWidth={1} color="#d4d4d4" />
          </Box>
          <VStack>
            <Text>{item.sender}</Text>
            <Text>{item.pickup_address}</Text>
            <Text>{item.receiver}</Text>
            <Text>{item.delivery_address}</Text>
          </VStack>
        </HStack>
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
    <VStack className="flex-1 py-5">
      <FlashList
        renderItem={({ item }) => {
          return <ItemCell item={item} />;
        }}
        estimatedItemSize={50}
        data={packages}
        ItemSeparatorComponent={() => <Box className="h-3" />}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
      />
    </VStack>
  );
}
