import { Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { FaCalculator } from "react-icons/fa6";

export default function AppBar() {
  const { width, height } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 600;

  const styles = StyleSheet.create({
    container: {
      height: isTablet ? 72 : 60,
      width: isTablet ? "60%" : "90%",
      maxWidth: 500,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E59819",
      borderColor: "white",
      borderWidth: 2,
      flexDirection: "row",
      borderRadius: 50,
      overflow: "hidden",
      marginTop: 20,
    },
    text: {
      fontSize: isTablet ? 24 : 20,
      fontWeight: "bold",
      fontStyle: "italic",
      color: "#fff",
    },
    icon: {
      fontSize: isTablet ? 28 : 24,
      color: "#fff",
      position: "absolute",
      right: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calculator</Text>
      <FaCalculator style={styles.icon} />
    </View>
  );
}