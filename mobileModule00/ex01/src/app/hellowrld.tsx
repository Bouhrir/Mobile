import { Text, View, StyleSheet } from "react-native";
import { Button } from "expo-router/build/react-navigation";
import { useRouter } from "expo-router";
	
export default function HelloWorld() {
  const router = useRouter();
  return (
    <View style={styles.container}>
		<Text style={styles.text}>Hello World!</Text>
		<Button title="Press Me" onPress={() => {
			console.log("Button pressed");
			router.push("/Bark");
		}} >
			<Text style={{fontSize: 20, fontWeight: "bold"}}>Click Me</Text>
		</Button>
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

