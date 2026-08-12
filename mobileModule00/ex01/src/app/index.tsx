import { Text, View, StyleSheet } from "react-native";
import { Button } from "expo-router/build/react-navigation";
import HelloWorld from "./hellowrld";
import { useRouter } from "expo-router";
import ClickMe from "./Bark";
export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <ClickMe />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
	gap: 20,
  },
  text: {
	fontSize: 40,
	fontWeight: "bold",
	color: "black",
	textAlign: "center",
  },
});
