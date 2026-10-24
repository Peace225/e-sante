import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';

export default function OrdonnanceDetail() {
  const route = useRoute<any>();
  const { ordonnanceId } = route.params || { ordonnanceId: 'ORD-001' };

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

  // Données simulées pour l'exemple (à lier à ton API)
  const ordonnance = {
    id: ordonnanceId,
    patientId: 'PAT-001',
    doctorId: 'DOC-001',
    medecinNom: 'Dr. Kouassi Jean',
    etablissement: 'PISAM Cocody',
    medicaments: [
      { nom: 'Paracétamol 1g', posologie: '1 comprimé matin et soir (5 jours)' },
      { nom: 'Amoxicilline 500mg', posologie: '1 gélule 3 fois par jour (7 jours)' },
    ],
    instructions: 'À prendre pendant les repas. Boire beaucoup d\'eau.',
    createdAt: '24 Octobre 2026',
    qrToken: `LIFECARE-SECURE-ORD-${ordonnanceId}-PAT001`,
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
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
          <Text style={styles.liveText}>Pharmacie • Abidjan</Text>
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
              <Ionicons name="qr-code" size={32} color="#FFFFFF" />
            </Animated.View>
          </View>
        </View>

        <Text style={styles.brandTitle}>Ordonnance #{ordonnance.id}</Text>
        <Text style={styles.brandSubtitle}>Prescription médicale sécurisée & QR Code</Text>
      </LinearGradient>

      {/* Contenu principal animé */}
      <Animated.View
        style={[
          styles.contentWrapper,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Carte de Prescription */}
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Détails de l'ordonnance</Text>
            <View style={styles.dateBadge}>
              <Ionicons name="calendar-outline" size={13} color="#2B6CB0" style={{ marginRight: 4 }} />
              <Text style={styles.date}>{ordonnance.createdAt}</Text>
            </View>
          </View>

          <View style={styles.doctorSection}>
            <Text style={styles.doctorName}>{ordonnance.medecinNom}</Text>
            <Text style={styles.hospital}>{ordonnance.etablissement}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Médicaments prescrits</Text>
          {ordonnance.medicaments.map((med, index) => (
            <View key={index} style={styles.medItem}>
              <Text style={styles.medName}>{med.nom}</Text>
              <Text style={styles.medPosologie}>{med.posologie}</Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Instructions médicales</Text>
          <Text style={styles.instructionsText}>{ordonnance.instructions}</Text>
        </View>

        {/* Section QR Code Pharmacie */}
        <View style={styles.qrCard}>
          <Text style={styles.qrTitle}>QR Code Pharmacie</Text>
          <Text style={styles.qrSubtitle}>Présentez ce code sécurisé lors de votre passage en pharmacie partenaire</Text>
          
          <View style={styles.qrPlaceholder}>
            <Ionicons name="qr-code-outline" size={64} color="#2B6CB0" style={{ marginBottom: 10 }} />
            <Text style={styles.qrTokenLabel}>{ordonnance.qrToken}</Text>
          </View>
        </View>

        <Button 
          title="Télécharger le Reçu / PDF" 
          onPress={() => console.log('Téléchargement PDF...')} 
          variant="outline"
          style={styles.downloadButton}
        />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#1A365D' },
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
  contentWrapper: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    marginTop: -16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A202C',
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  date: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2B6CB0',
  },
  doctorSection: {
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A202C',
  },
  hospital: {
    fontSize: 13,
    color: '#4A5568',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 8,
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  medItem: {
    backgroundColor: '#F7FAFC',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  medName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2B6CB0',
  },
  medPosologie: {
    fontSize: 13,
    color: '#4A5568',
    marginTop: 2,
  },
  instructionsText: {
    fontSize: 13.5,
    color: '#4A5568',
    backgroundColor: '#EDF2F7',
    padding: 12,
    borderRadius: 10,
    lineHeight: 18,
  },
  qrCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    marginBottom: 16,
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 4,
  },
  qrSubtitle: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 16,
  },
  qrPlaceholder: {
    backgroundColor: '#F7FAFC',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: '100%',
  },
  qrTokenLabel: {
    fontSize: 11,
    color: '#718096',
    fontWeight: '700',
    marginTop: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  downloadButton: {
    marginTop: 4,
    borderColor: '#2B6CB0',
  },
});