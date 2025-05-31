import { Box, Text } from "@/components/ui";
import { Stack } from "expo-router";

export default function OrderPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Box>
        <Text>Order page</Text>
      </Box>
    </>
  );
}
