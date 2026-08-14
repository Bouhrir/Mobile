import { Text, View, StyleSheet } from "react-native";
import { FaCalculator } from "react-icons/fa6";

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
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E59819",
    borderColor: "#eebd6fff",
    borderWidth: 2,
    flexDirection: "row",
    marginHorizontal: 16,
    borderRadius: 27,
    marginTop: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#fff",
  },
  icon: {
    fontSize: 22,
    color: "#fff",
    position: "absolute",
    right: 18,
  },
});