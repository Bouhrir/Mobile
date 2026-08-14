import {
  StyleSheet,
  SafeAreaView,
} from "react-native";
import AppBar from "./AppBar";
import Calculator from "./Calculator";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppBar />
      <Calculator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "lightyellow",
  },
});