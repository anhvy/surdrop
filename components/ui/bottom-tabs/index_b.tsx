import { Ionicons } from "@expo/vector-icons"; // For icons (you can use any icon library)
import { Canvas, Circle, Path, Skia } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TAB_BAR_HEIGHT = 70;
const BUTTON_SIZE = 60;
const BUTTON_RADIUS = BUTTON_SIZE / 2;
const CURVE_DEPTH = 30;
const ICON_SIZE = 24;
const ICON_OFFSET = 15;

const CurvedBottomTabBar: React.FC = () => {
  // Create the path for the curved tab bar
  const path = Skia.Path.Make();
  const startX = 0;
  const endX = SCREEN_WIDTH;
  const midX = SCREEN_WIDTH / 2;
  const tabBarTop = TAB_BAR_HEIGHT - CURVE_DEPTH;
  const buttonY = -BUTTON_RADIUS;

  // Define the path
  path.moveTo(startX, TAB_BAR_HEIGHT);
  path.lineTo(midX - BUTTON_SIZE - 10, TAB_BAR_HEIGHT);
  // Quadratic Bezier curve for the left side of the button
  path.quadTo(midX - BUTTON_SIZE / 2, tabBarTop - CURVE_DEPTH, midX, tabBarTop);
  // Quadratic Bezier curve for the right side of the button
  path.quadTo(
    midX + BUTTON_SIZE / 2,
    tabBarTop - CURVE_DEPTH,
    midX + BUTTON_SIZE + 10,
    TAB_BAR_HEIGHT
  );
  path.lineTo(endX, TAB_BAR_HEIGHT);
  path.lineTo(endX, 0);
  path.lineTo(startX, 0);
  path.close();

  // Handle icon presses
  const handleIconPress = (iconName: string) => {
    console.log(`${iconName} pressed`);
  };

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        {/* Draw the curved tab bar */}
        <Path path={path} color="#ffffff" style="fill" antiAlias={true} />
        {/* Draw the central button */}
        <Circle
          cx={midX}
          cy={buttonY}
          r={BUTTON_RADIUS}
          color="#000000"
          style="fill"
          antiAlias={true}
        />
        {/* Draw the "+" symbol on the central button */}

        {/* Notification dot on the rightmost icon */}
        <Circle
          cx={SCREEN_WIDTH - 60}
          cy={ICON_OFFSET + 5}
          r={6}
          color="#ff0000"
          style="fill"
          antiAlias={true}
        />
      </Canvas>
      {/* Overlay TouchableOpacity for icons */}
      <View style={styles.iconContainer}>
        {/* Home Icon */}
        <TouchableOpacity
          style={[styles.iconButton, { left: 40 }]}
          onPress={() => handleIconPress("Home")}
        >
          <Ionicons name="home-outline" size={ICON_SIZE} color="#000000" />
        </TouchableOpacity>
        {/* Calendar Icon */}
        <TouchableOpacity
          style={[styles.iconButton, { left: 120 }]}
          onPress={() => handleIconPress("Calendar")}
        >
          <Ionicons name="calendar-outline" size={ICON_SIZE} color="#000000" />
        </TouchableOpacity>
        {/* Central Button (Touchable) */}
        <TouchableOpacity
          style={styles.centralButton}
          onPress={() => handleIconPress("Add")}
        />
        {/* Profile Icon */}
        <TouchableOpacity
          style={[styles.iconButton, { right: 120 }]}
          onPress={() => handleIconPress("Profile")}
        >
          <Ionicons name="person-outline" size={ICON_SIZE} color="#000000" />
        </TouchableOpacity>
        {/* Rupee Icon with Notification Dot */}
        <TouchableOpacity
          style={[styles.iconButton, { right: 40 }]}
          onPress={() => handleIconPress("Rupee")}
        >
          <Ionicons name="cash-outline" size={ICON_SIZE} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: SCREEN_WIDTH,
    height: TAB_BAR_HEIGHT,
  },
  canvas: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH,
    height: TAB_BAR_HEIGHT,
  },
  iconButton: {
    position: "absolute",
    top: ICON_OFFSET,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  centralButton: {
    position: "absolute",
    left: SCREEN_WIDTH / 2 - BUTTON_RADIUS,
    top: -BUTTON_RADIUS,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_RADIUS,
  },
});

export default CurvedBottomTabBar;
