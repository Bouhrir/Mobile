import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

export default function Calculator() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isTablet = Math.min(width, height) >= 600;

  const MAX_KEYPAD_WIDTH = isTablet
    ? Math.min(width * (isLandscape ? 0.5 : 0.6), 520)
    : isLandscape
    ? Math.min(width * 0.7, 500)
    : Math.min(width - 32, 400);

  const BUTTON_GAP = isTablet ? 14 : isLandscape ? 10 : 12;

  const BUTTON_SIZE = Math.min(
    (MAX_KEYPAD_WIDTH - BUTTON_GAP * 3) / 4,
    (height - 220) / 5,
    88
  );

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "lightyellow",
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    displayContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      paddingHorizontal: 8,
      paddingBottom: isLandscape ? 4 : 12,
    },
    historyText: {
      fontSize: isTablet ? 32 : isLandscape ? 22 : 28,
      color: "#8C856B",
    },
    displayText: {
      fontSize: isTablet ? 80 : isLandscape ? 56 : 72,
      fontWeight: "300",
      color: "#2C2A1E",
      letterSpacing: -1,
    },
    keypad: {
      width: MAX_KEYPAD_WIDTH,
      alignSelf: "center",
      gap: BUTTON_GAP,
    },
    row: {
      flexDirection: "row",
      gap: BUTTON_GAP,
      justifyContent: "center",
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
      fontSize: Math.max(BUTTON_SIZE * 0.4, 24),
      fontWeight: "bold",
      color: "#2C2A1E",
    },
    functionText: {
      fontWeight: "500",
    },
    operatorText: {
      color: "#FFFFFF",
      fontWeight: "600",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.historyText} numberOfLines={1} adjustsFontSizeToFit>
          0
        </Text>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          0
        </Text>
      </View>

      <View style={styles.keypad}>
        {keypad.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
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
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}