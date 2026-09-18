import { useMemo, useState } from 'react';
import { PanResponder, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppBar from './components/AppBar';
import BottomBar, { tabs } from './components/BottomBar';

import './global.css';

function TabContent({ tabName, displayText }: { tabName: string; displayText: string }) {
  return (
    <View style={styles.content}>
      <Text style={styles.contentText}>
        {tabName}
        <br />
        {displayText}
      </Text>
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState('');
  const [isUsingGeolocation, setIsUsingGeolocation] = useState(false);
  const { width } = useWindowDimensions();

  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery);
    setIsUsingGeolocation(false);
  };

  const selectTab = (nextTab: number) => {
    setActiveTab(Math.max(0, Math.min(nextTab, tabs.length - 1)));
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 12 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
        onPanResponderRelease: (_, gestureState) => {
          if (Math.abs(gestureState.dx) > Math.max(48, width * 0.12)) {
            selectTab(activeTab + (gestureState.dx < 0 ? 1 : -1));
          }
        },
      }),
    [activeTab, width]
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <AppBar
          query={query}
          onLocationPress={() => setIsUsingGeolocation(true)}
          onQueryChange={handleQueryChange}
        />
        <View style={styles.swipeArea} {...panResponder.panHandlers}>
          <TabContent
            tabName={tabs[activeTab].name}
            displayText={isUsingGeolocation ? 'Geolocation' : query}
          />
        </View>
        <BottomBar activeTab={activeTab} onTabPress={selectTab} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f7f2',
  },
  swipeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  contentText: {
    color: '#183b3b',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
  },
});
