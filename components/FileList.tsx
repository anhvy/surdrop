import { Tusky } from "@tusky-io/ts-sdk/web";
import { Text } from "react-native";

const tusky = new Tusky({
  apiKey: "991f70ab-1bde-4427-9484-2af03ab92820",
});

export default function FileList() {
  const files = tusky.file.listAll();

  console.log(files);

  return <Text>Tusky</Text>;
}
