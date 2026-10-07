import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { services } from '../data/services';
import { useApp } from '../context/AppContext';

export default function ServicesScreen() {
  const { savedServices, addSavedService, removeSavedService, colors } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        extraData={savedServices}
        renderItem={({ item }) => {
          const isSaved = savedServices.some((s) => s.id === item.id);
          return (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
              <Text style={{ color: colors.muted, marginBottom: 10 }}>{item.description}</Text>
              <Pressable
                style={[styles.button, { backgroundColor: isSaved ? colors.muted : colors.accent }]}
                onPress={() => (isSaved ? removeSavedService(item.id) : addSavedService(item))}
              >
                <Text style={styles.buttonText}>{isSaved ? 'Remove' : 'Save'}</Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 16, borderRadius: 12, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  button: { padding: 10, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
