import { Box } from "@/components/ui";
import SkiaBottomNav from "@/components/ui/bottom-tabs";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React from "react";

export default function Layout() {
  return (
    <Box className="flex-1">
      <Tabs>
        <TabSlot />
        <TabList>
          <TabTrigger name="home" href="/(tabs)" />
          <TabTrigger name="capture" href="/(tabs)/capture" />
          <TabTrigger name="explore" href="/(tabs)/explore" />
        </TabList>
      </Tabs>
      <SkiaBottomNav />
    </Box>
  );
}
