import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';

export default function HomeScreen() {
  const { savedServices, theme, toggleTheme, colors, hydrated } = useApp();

  if (!hydrated) {
    return <View style={[styles.center, { backgroundColor: colors.background }]}><ActivityIndicator color={colors.accent} /></View>;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>UJ Campus Services</Text>
      <Text style={[styles.count, { color: colors.accent }]}>Saved Services: {savedServices.length}</Text>
      <Pressable style={[styles.button, { backgroundColor: colors.accent }]} onPress={toggleTheme}>
        <Text style={styles.buttonText}>Switch to {theme === 'light' ? 'Dark' : 'Light'} mode</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 12 },
  count: { fontSize: 20, fontWeight: '600', marginBottom: 24 },
  button: { padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
