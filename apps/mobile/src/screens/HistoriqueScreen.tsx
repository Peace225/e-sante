import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HistoriqueScreen() {
  // Données simulées pour l'historique
  const historique = [
    { id: '1', type: 'Consultation Générale', date: '15 Oct 2026', medecin: 'Dr. Kouassi Jean', lieu: 'PISAM Cocody' },
    { id: '2', type: 'Bilan Sanguin', date: '02 Sep 2026', medecin: 'Laboratoire Central', lieu: 'Plateau' },
    { id: '3', type: 'Téléconsultation', date: '18 Aoû 2026', medecin: 'Dr. Aminata Touré', lieu: 'En ligne' },
  ];

  // Animations Motion Design médical (100% fluides & natives)
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;
  const heartBeatAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Apparition en douceur de la page
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Boucle du radar médical (effet d'onde)
    Animated.loop(
      Animated.parallel([
        Animated.timing(pulseAnim, {
          toValue: 1.8,
          duration: 2000,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Battement cardiaque de l'icône médicale
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartBeatAnim, { toValue: 1.2, duration: 120, useNativeDriver: true }),
        Animated.timing(heartBeatAnim, { toValue: 1.0, duration: 100, useNativeDriver: true }),
        Animated.timing(heartBeatAnim, { toValue: 1.15, duration: 120, useNativeDriver: true }),
        Animated.timing(heartBeatAnim, { toValue: 1.0, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeAnim, heartBeatAnim, opacityAnim, pulseAnim, slideAnim]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* En-tête avec Dégradé Médical et Motion Design */}
      <LinearGradient
        colors={['#1A365D', '#2B6CB0', '#2C7A7B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        {/* Badge Live Sync */}
        <View style={styles.livePill}>
          <Animated.View style={[styles.liveDot, { transform: [{ scale: heartBeatAnim }] }]} />
          <Text style={styles.liveText}>Archives • Abidjan</Text>
        </View>

        {/* Logo avec Halo Radar Animé */}
        <View style={styles.logoContainer}>
          <Animated.View
            style={[
              styles.radarHalo,
              {
                opacity: opacityAnim,
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />
          <View style={styles.logoIconBox}>
            <Animated.View style={{ transform: [{ scale: heartBeatAnim }] }}>
              <Ionicons name="time-outline" size={32} color="#FFFFFF" />
            </Animated.View>
          </View>
        </View>

        <Text style={styles.brandTitle}>Historique Médical</Text>
        <Text style={styles.brandSubtitle}>Consultez l'ensemble de vos actes et soins passés</Text>
      </LinearGradient>

      {/* Contenu principal animé */}
      <Animated.View
        style={[
          styles.listContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <FlatList
          data={historique}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.headerCard}>
                <View style={styles.typeWrapper}>
                  <Ionicons name="pulse" size={16} color="#2B6CB0" style={{ marginRight: 6 }} />
                  <Text style={styles.typeText}>{item.type}</Text>
                </View>
                <View style={styles.dateBadge}>
                  <Ionicons name="calendar-outline" size={12} color="#2B6CB0" style={{ marginRight: 4 }} />
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="person-outline" size={14} color="#718096" style={{ marginRight: 6 }} />
                <Text style={styles.medecinText}>{item.medecin}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={14} color="#718096" style={{ marginRight: 6 }} />
                <Text style={styles.lieuText}>{item.lieu}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="folder-open-outline" size={48} color="#A0AEC0" style={{ marginBottom: 12 }} />
              <Text style={styles.empty}>Aucun historique disponible.</Text>
            </View>
          }
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A365D' },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#68D391',
    marginRight: 6,
  },
  liveText: { fontSize: 12, fontWeight: '700', color: '#EBF8FF' },
  logoContainer: {
    width: 76,
    height: 76,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  radarHalo: {
    position: 'absolute',
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#63B3ED',
  },
  logoIconBox: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  brandSubtitle: {
    fontSize: 12.5,
    color: '#E2E8F0',
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    marginTop: -16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2B6CB0',
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  dateText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2B6CB0',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  medecinText: {
    fontSize: 13.5,
    color: '#2D3748',
    fontWeight: '600',
  },
  lieuText: {
    fontSize: 13,
    color: '#718096',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  empty: {
    textAlign: 'center',
    color: '#718096',
    fontSize: 14,
    fontWeight: '600',
  },
});