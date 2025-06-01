import { Box, HStack, Text, VStack } from "@/components/ui";
import * as Device from "expo-device";
import * as Location from "expo-location";
import * as Network from "expo-network";
import { InfoIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

type NetworkState = {
  isConnected: boolean;
  type: Network.NetworkStateType;
  isInternetReachable: boolean | null;
  ipAddress: string | null;
  deviceName: string | null;
  deviceModel: string | null;
};

interface MetadataProps {
  timestamp?: Date;
}

const initialNetworkState: NetworkState = {
  isConnected: false,
  type: Network.NetworkStateType.UNKNOWN,
  isInternetReachable: null,
  ipAddress: null,
  deviceName: null,
  deviceModel: null,
};

export default function Metadata({ timestamp }: MetadataProps) {
  const [networkState, setNetworkState] =
    useState<NetworkState>(initialNetworkState);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoadingNetwork, setIsLoadingNetwork] = useState(true);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setIsLoadingLocation(false);
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    const getNetworkInfo = async () => {
      try {
        setIsLoadingNetwork(true);

        // Get device information
        const deviceName = Device.deviceName || null;
        const deviceModel = Device.modelName || null;

        // Get network information
        const networkStateData = await Network.getNetworkStateAsync();
        const ipAddress = await Network.getIpAddressAsync();

        setNetworkState({
          isConnected: !!networkStateData.isConnected,
          type: networkStateData.type || Network.NetworkStateType.UNKNOWN,
          isInternetReachable: !!networkStateData.isInternetReachable,
          ipAddress,
          deviceName,
          deviceModel,
        });
      } catch (error) {
        console.error("Failed to get network info:", error);
      } finally {
        setIsLoadingNetwork(false);
      }
    };

    getNetworkInfo();

    // Set up a listener for network changes if available
    let subscription: { remove: () => void } | undefined;
    if (typeof Network.addNetworkStateListener === "function") {
      subscription = Network.addNetworkStateListener(() => {
        getNetworkInfo();
      });
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const getNetworkTypeText = () => {
    console.log("networkState", networkState);
    if (!networkState.isConnected) {
      return "Offline";
    }

    switch (networkState.type) {
      case Network.NetworkStateType.WIFI:
        return "Wi-Fi";
      case Network.NetworkStateType.CELLULAR:
        return "Cellular";
      case Network.NetworkStateType.BLUETOOTH:
        return "Bluetooth";
      case Network.NetworkStateType.ETHERNET:
        return "Ethernet";
      case Network.NetworkStateType.WIMAX:
        return "WiMAX";
      case Network.NetworkStateType.VPN:
        return "VPN";
      case Network.NetworkStateType.OTHER:
        return "Other";
      default:
        return "Unknown";
    }
  };

  return (
    <Box className="p-4 bg-white rounded-xl rounded-t-md">
      <VStack space="sm">
        <HStack className="items-center" space="sm">
          <InfoIcon size={24} />
          <Text className="text-lg font-semibold">Metadata</Text>
        </HStack>

        {!isLoadingNetwork && (
          <VStack space="xs">
            {timestamp && (
              <HStack className="justify-between space-x-2">
                <Text className="text-gray-500">Timestamp</Text>
                <Text>{timestamp.toISOString()}</Text>
              </HStack>
            )}

            <HStack className="justify-between space-x-2">
              <Text className="text-gray-500">Network Status</Text>
              <Text
                className={
                  networkState.isConnected ? "text-green-600" : "text-red-600"
                }
              >
                {`${getNetworkTypeText()} | ${
                  networkState.isConnected ? "Connected" : "Disconnected"
                }`}
              </Text>
            </HStack>

            {networkState.ipAddress && (
              <HStack className="justify-between space-x-2">
                <Text className="text-gray-500">IP Address</Text>
                <Text>{networkState.ipAddress}</Text>
              </HStack>
            )}

            <HStack className="justify-between space-x-2">
              <Text className="text-gray-500">Internet</Text>
              <Text
                className={
                  networkState.isInternetReachable === true
                    ? "text-green-600"
                    : networkState.isInternetReachable === false
                    ? "text-red-600"
                    : "text-gray-500"
                }
              >
                {networkState.isInternetReachable === true
                  ? "Reachable"
                  : networkState.isInternetReachable === false
                  ? "Unreachable"
                  : "Unknown"}
              </Text>
            </HStack>

            {networkState.deviceName && (
              <HStack className="justify-between space-x-2">
                <Text className="text-gray-500">Device Name</Text>
                <Text>{networkState.deviceName}</Text>
              </HStack>
            )}

            {networkState.deviceModel && (
              <HStack className="justify-between space-x-2">
                <Text className="text-gray-500">Device Model</Text>
                <Text>{networkState.deviceModel}</Text>
              </HStack>
            )}

            {location && (
              <HStack className="justify-between space-x-2">
                <Text className="text-gray-500">Location</Text>
                {isLoadingLocation ? (
                  "..."
                ) : (
                  <Text>{`${location.coords.latitude.toFixed(
                    6
                  )},${location.coords.longitude.toFixed(6)}`}</Text>
                )}
              </HStack>
            )}
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
