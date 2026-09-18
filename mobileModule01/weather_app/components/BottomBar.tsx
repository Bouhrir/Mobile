import { Pressable, StyleSheet, Text, View } from 'react-native';
import { IoPartlySunnySharp } from "react-icons/io5";
import { IoToday } from "react-icons/io5";
import { FaCalendarWeek } from "react-icons/fa";



export const tabs = [
  { name: 'Currently', icon: <IoPartlySunnySharp /> },
  { name: 'Today', icon: <IoToday /> },
  { name: 'Weekly', icon: <FaCalendarWeek /> },
] as const;

type BottomBarProps = {
  activeTab: number;
  onTabPress: (tabIndex: number) => void;
};

export default function BottomBar({ activeTab, onTabPress }: BottomBarProps) {
  return ( 
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = index === activeTab;
        return (
          <Pressable
            accessibilityLabel={`${tab.name} tab`}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            key={tab.name}
            onPress={() => onTabPress(index)}
            style={({ pressed }) => [
              styles.tab,
              isActive && styles.activeTab,
              pressed && styles.pressed,
            ]}>
            <Text style={[styles.icon, isActive && styles.activeText]}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.activeText]}>{tab.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#183b3b',
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 12,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 20,
  },
  tab: {
    alignItems: 'center',
    borderRadius: 50,
    flex: 1,
    gap: 3,
    justifyContent: 'center',
    minHeight: 58,
    paddingHorizontal: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#e49b45',
  },
  icon: {
    color: '#b7cbc2',
    fontSize: 21,
  },
  label: {
    color: '#b7cbc2',
    fontSize: 13,
    fontWeight: '600',
  },
  activeText: {
    color: '#fffaf0',
  },
  pressed: {
    opacity: 0.75,
  },
});
