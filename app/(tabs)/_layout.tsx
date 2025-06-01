import { Box } from "@/components/ui";
import { SkiaBottomNav } from "@/components/ui/bottom-tabs";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React from "react";

// Defining the layout of the custom tab navigator
export default function Layout() {
  return (
    <Box className="flex-1">
      <Tabs>
        <TabSlot />
        <TabList>
          <TabTrigger name="home" href="/(tabs)" />
          <TabTrigger name="capture" href="/(tabs)/capture" />
        </TabList>
      </Tabs>
      <SkiaBottomNav />
    </Box>
  );
}
