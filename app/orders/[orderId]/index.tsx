import { Box, Button, ButtonText, Text } from "@/components/ui";
import { Stack, useLocalSearchParams } from "expo-router";

export default function OrderPage() {
  const { orderId } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: `Order #${orderId}` }} />
      <Box className="bg-white flex-1 p-5">
        <Text>Order page</Text>
        <Button size="md" variant="solid" action="primary">
          <ButtonText>Capture proof</ButtonText>
        </Button>
      </Box>
    </>
  );
}
