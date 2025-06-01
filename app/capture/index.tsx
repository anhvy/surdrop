import { Box, Button, ButtonText, Text } from "@/components/ui";
import CurrentLocation from "@/components/ui/CurrentLocation";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

export default function OrderPage() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const [permission, requestPermission] = useCameraPermissions();

  const [imageData, setImageData] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  // Get screen width for square camera
  const screenWidth = Dimensions.get("window").width;

  if (!permission) {
    return <Text>Loading camera</Text>;
  }

  if (!permission.granted) {
    return (
      <Box className="flex-1 items-center justify-center">
        <Text className="mb-5">Camera permissions are not granted</Text>
        <Button onPress={requestPermission}>
          <ButtonText>Grant Permission</ButtonText>
        </Button>
      </Box>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current && !isCapturing) {
      try {
        setIsCapturing(true);

        // Optimize camera settings for faster capture
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.1,
          skipProcessing: true,
          exif: false,
          base64: true,
        });

        if (!photo.base64) {
          throw new Error("Failed to get base64 image data");
        }

        // Format base64 data for image source
        const base64Data = `data:image/jpeg;base64,${photo.base64}`;

        // No need to prefetch for base64 images
        setImageData(base64Data);
      } catch (error) {
        console.error("Failed to take picture:", error);
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const retakePicture = () => {
    setImageData(null);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      {imageData ? (
        <Box className="p-5">
          <Image
            source={{ uri: imageData }}
            contentFit="cover"
            style={styles.image}
            transition={500}
          />
        </Box>
      ) : (
        // Camera view
        <Box
          style={{ width: screenWidth, height: screenWidth }}
          className="rounded-md p-5 overflow-hidden"
        >
          <CameraView
            ref={cameraRef}
            facing="back"
            style={{ flex: 1, borderRadius: 12, overflow: "hidden" }}
            animateShutter={false}
            ratio="1:1"
          />
        </Box>
      )}
      <Box className="px-5 w-full">
        <Text className="text-lg font-bold">Metadata</Text>
        <CurrentLocation />
      </Box>
      {!imageData ? (
        <Box className="mt-auto bg-white p-8 z-50 w-full">
          <Button size="lg" onPress={takePicture} disabled={isCapturing}>
            <ButtonText>{isCapturing ? "Capturing..." : "Capture"}</ButtonText>
          </Button>
        </Box>
      ) : (
        <Box className="mt-auto bg-white p-8 flex-row justify-between border-t-2 border-gray-200">
          <Button size="lg" variant="outline" onPress={retakePicture}>
            <ButtonText>Retake</ButtonText>
          </Button>
          <Button size="lg" onPress={() => router.back()}>
            <ButtonText>Finish</ButtonText>
          </Button>
        </Box>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    aspectRatio: 1,
    width: "100%",
    borderRadius: 12,
  },
});
