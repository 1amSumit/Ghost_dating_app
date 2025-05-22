import { useState } from "react";
import { Text, View } from "react-native";

export default function PronouncInput() {
  const [pronons, setPronouns] = useState([]);
  return (
    <View>
      <Text>What&apos; your pronouns?</Text>

      <View>
        <Text>Select up to 4</Text>
      </View>
    </View>
  );
}
