import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';

const alerts = [
  { id: 'a1', title: 'Library closes early on Friday' },
  { id: 'a2', title: 'Campus Wi-Fi maintenance tonight' },
  { id: 'a3', title: 'Bus route change for APK–DFC shuttle' },
  { id: 'a4', title: 'Exam timetable published' },
];

export default function App() {
  const [saved, setSaved] = useState([]);

  // 4.1/4.2: functional update returns a NEW array, never mutates state
  const toggleSaved = useCallback((id) => {
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const renderItem = useCallback(
    ({ item }) => <AlertCard item={item} saved={saved.includes(item.id)} toggleSaved={toggleSaved} />,
    [saved, toggleSaved]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.count}>Saved alerts: {saved.length}</Text>
      <FlatList
        data={alerts}
        keyExtractor={(item) => String(item.id)} // 4.3: stable key from data
        extraData={saved}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

// React.memo: unchanged cards skip re-rendering when another alert is toggled
const AlertCard = React.memo(function AlertCard({ item, saved, toggleSaved }) {
  // 4.4: created once, kept across renders
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(16)).current;

  // Empty deps: runs once on mount, so it never restarts on save/unsave
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, [fade, slide]);

  return (
    <Animated.View
      style={[
        styles.card,
        saved && styles.cardSaved,
        { opacity: fade, transform: [{ translateY: slide }] },
      ]}
    >
      <Text style={styles.title}>{item.title}</Text>
      {/* 4.1: deferred call, ID passed at press time */}
      <Pressable onPress={() => toggleSaved(item.id)}>
        <Text style={[styles.action, saved && styles.actionSaved]}>{saved ? '★ Saved' : 'Save'}</Text>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F6FA' },
  count: { fontSize: 18, fontWeight: '700', padding: 16, paddingBottom: 0 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: 'transparent' },
  cardSaved: { backgroundColor: '#FFF1EA', borderLeftColor: '#E8501F' },
  title: { fontSize: 16, marginBottom: 8 },
  action: { color: '#555', fontWeight: '600' },
  actionSaved: { color: '#E8501F' },
});
