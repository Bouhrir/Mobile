import React, { useState } from "react";
// import { BiAdjust } from "react-icons/bi";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { evaluate } from "mathjs";

const { width, height } = Dimensions.get("window");
const isLandscape = width > height;

const MAX_KEYPAD_WIDTH = isLandscape ? Math.min(width * 0.7, 650) : Math.min(width - 32, 500);
const BUTTON_GAP = isLandscape ? 10 : 12;
const BUTTON_SIZE = (MAX_KEYPAD_WIDTH - BUTTON_GAP * 3) / 4;
const KEY_SIZE = isLandscape 
  ? Math.min(BUTTON_SIZE, (height * 0.6) / 5 - BUTTON_GAP)
  : Math.min(BUTTON_SIZE, (height * 0.52) / 5 - BUTTON_GAP);

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [isCalculated, setIsCalculated] = useState(false);

  const handlePress = (label: string) => {

    if (label === "AC") {
      setExpression("");
      setResult("0");
      setIsCalculated(false);
      return;
    }

    if (label === "C") {
      if (isCalculated) {
        setExpression("");
        setResult("0");
        setIsCalculated(false);
        return;
      }
      setExpression((prev) => prev.slice(0, -1));
      return;
    }

    if (["+", "-", "×", "÷"].includes(label)) {
      if (isCalculated) {
        if (result === "Error") return;
        setExpression(result + " " + label + " ");
        setIsCalculated(false);
        return;
      }

      if (!expression) {
        if (label === "-") {
          setExpression("-");
        }
        return;
      }

      const trimmed = expression.trim();
      const lastChar = trimmed.slice(-1);

      if (["+", "-", "×", "÷"].includes(lastChar)) {
        setExpression(trimmed.slice(0, -1) + label + " ");
      } else {
        setExpression((prev) => prev + " " + label + " ");
      }
      return;
    }

    if (label === ".") {
      if (isCalculated) {
        setExpression("0.");
        setIsCalculated(false);
        return;
      }

      if (!expression || expression.endsWith(" ")) {
        setExpression((prev) => prev + "0.");
        return;
      }

      const segments = expression.split(/[\+\-\×\÷\s]+/);
      const currentSegment = segments[segments.length - 1];

      if (currentSegment.includes(".")) {
        return;
      }

      setExpression((prev) => prev + ".");
      return;
    }

    if (label === "=") {
      if (!expression) return;

      try {
        const sanitized = expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .trim();

        const calculated = evaluate(sanitized);

        if (calculated === undefined || calculated === null || isNaN(calculated) || !isFinite(calculated)) {
    		setResult("Error");
        } else {
          const formatted =
            typeof calculated === "number"
              ? Number(calculated.toFixed(8)).toString()
              : String(calculated);

          setResult(formatted);
        }
        setIsCalculated(true);
      } catch (error) {
        setResult("Error");
      }
      return;
    }

    if (isCalculated) {
      setExpression(label);
      setIsCalculated(false);
    } else {
      setExpression((prev) => prev + label);
    }
  };

  const keypad = [
    [
      { label: "AC", type: "function" },
      { label: "C", type: "function" },
      { label: "", type: "function" },
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
        <Text style={styles.historyText} adjustsFontSizeToFit>{expression || "0"}</Text>
        <Text style={styles.displayText} adjustsFontSizeToFit>{result}</Text>
      </View>

      <View style={styles.keypadWrapper}>
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
                  onPress={() => handlePress(btn.label)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "lightyellow",
    paddingHorizontal: 16,
    paddingBottom: isLandscape ? 8 : 16,
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingBottom: isLandscape ? 4 : 12,
  },
  historyText: {
    fontSize: isLandscape ? 22 : 28,
    color: "#8C856B",
    marginBottom: 2,
  },
  displayText: {
    fontSize: isLandscape ? 56 : 72,
    fontWeight: "300",
    color: "#2C2A1E",
    letterSpacing: -1,
  },
  keypadWrapper: {
    width: "100%",
    alignItems: "center",
  },
  keypad: {
    width: MAX_KEYPAD_WIDTH,
    gap: BUTTON_GAP,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: BUTTON_GAP,
  },
  button: {
    width: KEY_SIZE,
    height: KEY_SIZE,
    borderRadius: KEY_SIZE / 2,
    backgroundColor: "#F3ECC8",
    justifyContent: "center",
    alignItems: "center",
  },
  zeroButton: {
    width: KEY_SIZE * 2 + BUTTON_GAP,
    alignItems: "flex-start",
    paddingLeft: KEY_SIZE * 0.38,
  },
  functionBtn: {
    backgroundColor: "#E2D9A7",
  },
  operatorBtn: {
    backgroundColor: "#E59819",
  },
  buttonText: {
    fontSize: Math.max(KEY_SIZE * 0.45, 24),
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