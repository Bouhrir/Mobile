import { Text, View, StyleSheet } from "react-native";
import { Button } from "expo-router/build/react-navigation";

export default function Index() {
  return (
    <View style={styles.container}>
		<Text style={styles.text}>Would u bark for me <Text style={{color: "rgba(0, 132, 255, 1)"}}>Drake</Text><br/>👉🏾👈🏾</Text>
		<Button title="Press Me" onPress={() => {console.log("Button pressed");}} >
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
