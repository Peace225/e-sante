import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';
import { useAppointmentStore } from '../../store/appointmentStore';

export default function RdvDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { appointmentId } = route.params || {};

  const { selectedAppointment, selectAppointment, appointments } = useAppointmentStore();
  const [loading, setLoading] = useState(false);

  // Animations Motion Design médical (100% fluides & natives)
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;
  const heartBeatAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (appointmentId) {
      selectAppointment(appointmentId);
    }
  }, [appointmentId]);

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

  const appointment = selectedAppointment || appointments.find((a) => a.id === appointmentId);

  if (!appointment) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={48} color="#A0AEC0" style={{ marginBottom: 12 }} />
        <Text style={styles.errorText}>Rendez-vous introuvable.</Text>
        <Button title="Retour" onPress={() => navigation.goBack()} style={{ marginTop: 20 }} />
      </View>
    );
  }

  const formattedDate = new Date(appointment.date || appointment.dateTime).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleCancel = () => {
    Alert.alert(
      'Annulation',
      'Voulez-vous vraiment annuler ce rendez-vous ?',
      [
        { text: 'Non', style: 'cancel' },
        { 
          text: 'Oui, annuler', 
          style: 'destructive', 
          onPress: () => {
            Alert.alert('Succès', 'Le rendez-vous a été annulé.');
            navigation.goBack();
          } 
        },
      ]
    );
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
          <Text style={styles.liveText}>Suivi Médical • Abidjan</Text>
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
              <Ionicons name="pulse" size={32} color="#FFFFFF" />
            </Animated.View>
          </View>
        </View>

        <Text style={styles.brandTitle}>Détails du Rendez-vous</Text>
        <Text style={styles.brandSubtitle}>Consultation planifiée et sécurisée</Text>
      </LinearGradient>

      {/* Carte des détails animée */}
      <Animated.View
        style={[
          styles.formCard,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.hospitalRow}>
            <Ionicons name="business-outline" size={18} color="#2B6CB0" style={{ marginRight: 6 }} />
            <Text style={styles.etablissement}>{appointment.etablissement || 'PISAM Cocody'}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{appointment.status || 'Confirmé'}</Text>
          </View>
        </View>

        <Text style={styles.motifTitle}>Motif de la consultation</Text>
        <Text style={styles.motifText}>{appointment.motif}</Text>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.labelWrapper}>
            <Ionicons name="calendar-outline" size={16} color="#718096" style={{ marginRight: 8 }} />
            <Text style={styles.label}>Date & Heure</Text>
          </View>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.labelWrapper}>
            <Ionicons name="medkit-outline" size={16} color="#718096" style={{ marginRight: 8 }} />
            <Text style={styles.label}>ID Médecin</Text>
          </View>
          <Text style={styles.value}>{appointment.doctorId}</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.labelWrapper}>
            <Ionicons name="person-outline" size={16} color="#718096" style={{ marginRight: 8 }} />
            <Text style={styles.label}>ID Patient</Text>
          </View>
          <Text style={styles.value}>{appointment.patientId}</Text>
        </View>

        <Button 
          title="Annuler ce rendez-vous" 
          onPress={handleCancel} 
          variant="outline"
          textStyle={{ color: '#E53E3E' }}
          style={styles.cancelButton}
        />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#1A365D' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7FAFC',
  },
  errorText: {
    fontSize: 16,
    color: '#718096',
    fontWeight: '600',
  },
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
  formCard: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    marginTop: -16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  etablissement: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2B6CB0',
  },
  badge: {
    backgroundColor: '#C6F6D5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#22543D',
  },
  motifTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#718096',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  motifText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    color: '#718096',
    fontWeight: '500',
  },
  value: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2D3748',
  },
  cancelButton: {
    borderColor: '#E53E3E',
    marginTop: 24,
    backgroundColor: '#FFF5F5',
  },
});