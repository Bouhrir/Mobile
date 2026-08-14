import { Button } from "expo-router/build/react-navigation";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");
const BUTTON_GAP = 12;
const BUTTON_SIZE = (width - 32 - BUTTON_GAP * 3) / 4;

export default function Calculator() {
  const keypad = [
	[
	  { label: "AC", type: "function" },
	  { label: "C", type: "function" },
	  { label: "∞", type: "function" },
	  { label: "÷", type: "operator" },
	],
	[
	  { label: "7", type: "number" },
	  { label: "8", type: "number" },
	  { label: "9", type: "number" },
	  { label: "×", type: "operator" },
	],
	[
	  { label: "4", type: "number" },
	  { label: "5", type: "number" },
	  { label: "6", type: "number" },
	  { label: "-", type: "operator" },
	],
	[
	  { label: "1", type: "number" },
	  { label: "2", type: "number" },
	  { label: "3", type: "number" },
	  { label: "+", type: "operator" },
	],
	[
	  { label: "0", type: "number", span: 2 },
	  { label: ".", type: "number" },
	  { label: "=", type: "operator" },
	],
  ];

  return (
	<View style={styles.container}>
		<View style={styles.displayContainer}>
		  <Text style={styles.historyText}>0</Text>
		  <Text style={styles.displayText}>0</Text>
		</View>

		<View style={styles.keypad}>
		  {keypad.map((row, rowIndex) => (
			<View key={rowIndex} style={styles.row}>
			  {row.map((btn) => (
				<Button
				  key={btn.label}
				  activeOpacity={0.7}
				  style={[
					styles.button,
					btn.type === "function" && styles.functionBtn,
					btn.type === "operator" && styles.operatorBtn,
					btn.span === 2 && styles.zeroButton,
				  ]}
				  onPressIn={() => console.log(`Button Pressed ${btn.label}`)}
				>
				  <Text
					style={[
					  styles.buttonText,
					  btn.type === "function" && styles.functionText,
					  btn.type === "operator" && styles.operatorText,
					]}
				  >
					{btn.label}
				  </Text>
				</Button>
			  ))}
			</View>
		  ))}
		</View>
	</View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
	flex: 1,
	backgroundColor: "lightyellow",
  },
  container: {
	flex: 1,
	flexDirection: "column",
	justifyContent: "space-between",
	backgroundColor: "lightyellow",
	paddingHorizontal: 16,
	marginTop: 60,
	paddingBottom: 24,
  },
  displayContainer: {
	flex: 1,
	justifyContent: "flex-end",
	alignItems: "flex-end",
	paddingHorizontal: 8,
	// marginBottom: 16,
  },
  historyText: {
	fontSize: 24,
	color: "#8C856B",
  },
  displayText: {
	fontSize: 72,
	fontWeight: "300",
	color: "#2C2A1E",
	letterSpacing: -1,
  },
  keypad: {
	gap: BUTTON_GAP,
  },
  row: {
	flexDirection: "row",
	justifyContent: "space-between",
	gap: BUTTON_GAP,
  },
  button: {
	width: BUTTON_SIZE,
	height: BUTTON_SIZE,
	borderRadius: BUTTON_SIZE / 2,
	backgroundColor: "#F3ECC8",
	justifyContent: "center",
	alignItems: "center",
  },
  zeroButton: {
	width: BUTTON_SIZE * 2 + BUTTON_GAP,
	alignItems: "flex-start",
	paddingLeft: BUTTON_SIZE * 0.35,
  },
  functionBtn: {
	backgroundColor: "#E2D9A7",
  },
  operatorBtn: {
	backgroundColor: "#E59819",
  },
  buttonText: {
	fontSize: 32,
	fontWeight: "bold",
	color: "#2C2A1E",
  },
  functionText: {
	fontWeight: "500",
	color: "#2C2A1E",
  },
  operatorText: {
	color: "#FFFFFF",
	fontWeight: "600",
  },
});