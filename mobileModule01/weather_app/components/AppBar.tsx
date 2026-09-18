import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { FaSearch } from 'react-icons/fa';
import { FaLocationArrow } from 'react-icons/fa';

type AppBarProps = {
  query: string;
  onLocationPress: () => void;
  onQueryChange: (query: string) => void;
};

export default function AppBar({ query, onLocationPress, onQueryChange }: AppBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FaSearch style={styles.searchIcon} />
        <TextInput
          accessibilityLabel="Search for a location"
          onChangeText={onQueryChange}
          placeholder="Search city"
          placeholderTextColor="#6d8580"
          returnKeyType="search"
          style={styles.input}
          value={query}
        />
      </View>
      <Pressable
        accessibilityLabel="Use current location"
        accessibilityRole="button"
        onPress={onLocationPress}
        style={({ pressed }) => [styles.locationButton, pressed && styles.pressed]}>
        <FaLocationArrow style={styles.locationIcon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: '#e2ebe5',
    borderRadius: 50,
    flex: 1,
    flexDirection: 'row',
    minHeight: 52,
    paddingHorizontal: 14,
  },
  searchIcon: {
    color: '#275957',
    fontSize: 20,
    lineHeight: 30,
    marginRight: 8,
  },
  input: {
    color: '#183b3b',
    flex: 1,
    fontSize: 16,
    minHeight: 48,
  },
  locationButton: {
    alignItems: 'center',
    backgroundColor: '#e49b45',
    borderRadius: 50,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  locationIcon: {
    color: '#fffaf0',
    fontSize: 15,
  },
  pressed: {
    opacity: 0.7,
  },
});
