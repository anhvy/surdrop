import { Box } from "@/components/ui";
import {
  Canvas,
  Circle,
  ImageSVG,
  Path,
  Shadow,
  Skia,
} from "@shopify/react-native-skia";
import { useRouter } from "expo-router";
import { Dimensions, Pressable } from "react-native";
import { useSharedValue } from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");

const TAB_BAR_HEIGHT = 100;
const BAR_COLOR = "white";
const ICON_SIZE = 24;

const NOTCH_BASE_OFFSET_Y = 40;
const NOTCH_DEPTH = 40;
const CENTRAL_BUTTON_RADIUS = 42;
const NOTCH_OPENING_WIDTH_FACTOR = 2.8;

const svgSetting = Skia.SVG.MakeFromString(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#555555" viewBox="0 0 256 256"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>`
)!;

const svgHome = Skia.SVG.MakeFromString(
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#555555" viewBox="0 0 256 256"><path d="M42.76,50A8,8,0,0,0,40,56V224a8,8,0,0,0,16,0V179.77c26.79-21.16,49.87-9.75,76.45,3.41,16.4,8.11,34.06,16.85,53,16.85,13.93,0,28.54-4.75,43.82-18a8,8,0,0,0,2.76-6V56A8,8,0,0,0,218.76,50c-28,24.23-51.72,12.49-79.21-1.12C111.07,34.76,78.78,18.79,42.76,50ZM216,172.25c-26.79,21.16-49.87,9.74-76.45-3.41-25-12.35-52.81-26.13-83.55-8.4V59.79c26.79-21.16,49.87-9.75,76.45,3.4,25,12.35,52.82,26.13,83.55,8.4Z"></path></svg>`
)!;

const svgDrop = Skia.SVG.MakeFromString(
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#fff" viewBox="0 0 256 256"><path d="M224,40V80a8,8,0,0,1-16,0V48H176a8,8,0,0,1,0-16h40A8,8,0,0,1,224,40ZM80,208H48V176a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H80a8,8,0,0,0,0-16Zm136-40a8,8,0,0,0-8,8v32H176a8,8,0,0,0,0,16h40a8,8,0,0,0,8-8V176A8,8,0,0,0,216,168ZM40,88a8,8,0,0,0,8-8V48H80a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8V80A8,8,0,0,0,40,88ZM80,72h96a8,8,0,0,1,8,8v96a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V80A8,8,0,0,1,80,72Zm8,96h80V88H88Z"></path></svg>`
)!;

const SkiaBottomNav = () => {
  const router = useRouter();
  const tabBarWidth = screenWidth;
  const scale = useSharedValue(1);

  const path = Skia.Path.Make();

  path.moveTo(0, NOTCH_BASE_OFFSET_Y);

  const notchStartPointX =
    tabBarWidth / 2 - (CENTRAL_BUTTON_RADIUS * NOTCH_OPENING_WIDTH_FACTOR) / 2;
  path.lineTo(notchStartPointX, NOTCH_BASE_OFFSET_Y);

  const controlPoint1X = notchStartPointX + CENTRAL_BUTTON_RADIUS * 0.6;
  const controlPoint1Y = NOTCH_BASE_OFFSET_Y;
  const controlPoint2X = tabBarWidth / 2 - CENTRAL_BUTTON_RADIUS;
  const controlPoint2Y = NOTCH_BASE_OFFSET_Y + NOTCH_DEPTH;
  const notchBottomMidPointX = tabBarWidth / 2;
  const notchBottomMidPointY = NOTCH_BASE_OFFSET_Y + NOTCH_DEPTH;
  path.cubicTo(
    controlPoint1X,
    controlPoint1Y,
    controlPoint2X,
    controlPoint2Y,
    notchBottomMidPointX,
    notchBottomMidPointY
  );

  const controlPoint3X = tabBarWidth / 2 + CENTRAL_BUTTON_RADIUS;
  const controlPoint3Y = NOTCH_BASE_OFFSET_Y + NOTCH_DEPTH;
  const controlPoint4X =
    tabBarWidth / 2 +
    (CENTRAL_BUTTON_RADIUS * NOTCH_OPENING_WIDTH_FACTOR) / 2 -
    CENTRAL_BUTTON_RADIUS * 0.6;
  const controlPoint4Y = NOTCH_BASE_OFFSET_Y;
  const notchEndPointX =
    tabBarWidth / 2 + (CENTRAL_BUTTON_RADIUS * NOTCH_OPENING_WIDTH_FACTOR) / 2;
  path.cubicTo(
    controlPoint3X,
    controlPoint3Y,
    controlPoint4X,
    controlPoint4Y,
    notchEndPointX,
    NOTCH_BASE_OFFSET_Y
  );

  path.lineTo(tabBarWidth, NOTCH_BASE_OFFSET_Y);
  path.lineTo(tabBarWidth, TAB_BAR_HEIGHT);
  path.lineTo(0, TAB_BAR_HEIGHT);
  path.close();

  const centralButtonCX = tabBarWidth / 2;
  const centralButtonCY =
    NOTCH_BASE_OFFSET_Y + NOTCH_DEPTH - CENTRAL_BUTTON_RADIUS * 0.6;

  const sideIconCY = (NOTCH_BASE_OFFSET_Y + TAB_BAR_HEIGHT) / 2;

  return (
    <Box className="absolute bottom-0 left-0 right-0">
      <Canvas style={{ width: tabBarWidth, height: TAB_BAR_HEIGHT }}>
        <Path path={path} color={BAR_COLOR}>
          <Shadow dx={0} dy={16} blur={12} color="#000" />
        </Path>

        <Circle
          cx={centralButtonCX}
          cy={centralButtonCY - 16}
          r={CENTRAL_BUTTON_RADIUS - 4}
          color="oklch(14.1% 0.005 285.823)"
        />

        <ImageSVG
          svg={svgHome}
          x={tabBarWidth / 6}
          y={sideIconCY - ICON_SIZE / 2}
          width={24}
          height={24}
        />

        <ImageSVG
          svg={svgDrop}
          x={centralButtonCX - 16}
          y={centralButtonCY - 32}
          width={32}
          height={32}
          transform={[{ scale: scale.value }]}
        />

        <ImageSVG
          svg={svgSetting}
          x={tabBarWidth - tabBarWidth / 6 - ICON_SIZE}
          y={sideIconCY - ICON_SIZE / 2}
          width={24}
          height={24}
        />
      </Canvas>
      <Box className="absolute bottom-0 left-0 right-0 flex flex-row justify-between items-end">
        <Box className="flex-1 h-[60]">
          <Pressable
            onPress={() => {
              router.push("/(tabs)");
            }}
            className="h-full w-full"
          />
        </Box>
        <Box className="w-[80] h-[80] mb-5 rounded-full">
          <Pressable
            onPress={() => {
              router.push("/orders/123/capture");
            }}
            className="h-full w-full"
          />
        </Box>
        <Box className="flex-1 h-[60]">
          <Pressable
            onPress={() => {
              router.push("/(tabs)/explore");
            }}
            className="h-full w-full"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SkiaBottomNav;
