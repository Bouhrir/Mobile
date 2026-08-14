import { Text, View, StyleSheet } from "react-native";
import {FaCalculator} from "react-icons/fa6";

export default function AppBar() {
	  return (
		<View style={styles.container}>
		  <Text style={styles.text}>Calculator</Text>
		  <FaCalculator style={styles.icon} />
		</View>
	  );
}

const styles = StyleSheet.create({
	  container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#E59819",
		borderColor: "white",
		borderWidth: 2,
		flexDirection: "row",
		marginHorizontal: 20,
		maxHeight: 60,
		borderRadius: 50,
		overflow: "hidden",
		marginTop: 20,
	  },
	  text: {
		fontSize: 20,
		fontWeight: "bold",
		fontStyle: "italic",
		color: "#fff",
	  },
	icon: {
		fontSize: 24,
		color: "#fff",
		position: "absolute",
		right: 16,
	},
});