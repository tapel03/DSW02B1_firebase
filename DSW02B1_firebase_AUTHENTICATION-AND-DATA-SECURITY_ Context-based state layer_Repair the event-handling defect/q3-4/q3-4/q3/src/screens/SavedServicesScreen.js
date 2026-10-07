import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';

export default function SavedServicesScreen() {
  const { savedServices, removeSavedService, colors, hydrated } = useApp();

  if (!hydrated) {
    return <View style={[styles.container, { backgroundColor: colors.background }]}><Text style={{ color: colors.muted }}>Loading saved services…</Text></View>;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={savedServices}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>No saved services yet. Save one from the Services tab.</Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
            <Pressable onPress={() => removeSavedService(item.id)}>
              <Text style={{ color: colors.accent, fontWeight: '600' }}>Remove</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 17, fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16 },
});
