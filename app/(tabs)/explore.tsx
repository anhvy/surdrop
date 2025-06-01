import FileList from "@/components/FileList";
import { Suspense } from "react";
import { Text } from "react-native";

export default async function TabTwoScreen() {
  return (
    <Suspense>
      <FileList />
      <Text>Explore</Text>;
    </Suspense>
  );
}
