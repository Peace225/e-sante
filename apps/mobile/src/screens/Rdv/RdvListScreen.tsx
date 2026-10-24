import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  RefreshControl,
  Animated,
  Easing,
  StatusBar,
  TouchableOpacity,
  Modal,
  Alert,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { appointmentsApi } from '../../api/appointments';
import { AppointmentCard } from '../../components/ui/AppointmentCard';
import { Button } from '../../components/ui/Button';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useAuthStore } from '../../store/authStore';

type Operator = 'WAVE' | 'ORANGE' | 'MTN' | 'MOOV';

const MOCK_RDV = [
  { id: '1', date: '2026-10-24', time: '09:00', doctorName: 'Dr. Kone', status: 'CONFIRMED', reason: 'Consultation generale', dateTime: '2026-10-24T09:00:00Z', etablissement: 'PISAM Cocody', amount: 15000, ticket: 3000 },
  { id: '2', date: '2026-10-26', time: '14:30', doctorName: 'Dr. Diabate', status: 'PENDING', reason: 'Suivi', dateTime: '2026-10-26T14:30:00Z', etablissement: 'Clinique Danga', amount: 15000, ticket: 3000 },
];

export default function RdvListScreen() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [showOps, setShowOps] = useState(false);
  const [selectedRdv, setSelectedRdv] = useState<any>(null);

  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const user = useAuthStore((s) => s.user);

  // Animations Motion Design médical
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;
  const heartBeatAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.parallel([
        Animated.timing(pulseAnim, { toValue: 1.8, duration: 2000, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 0, duration: 2000, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(heartBeatAnim, { toValue: 1.2, duration: 120, useNativeDriver: true }),
        Animated.timing(heartBeatAnim, { toValue: 1.0, duration: 100, useNativeDriver: true }),
        Animated.timing(heartBeatAnim, { toValue: 1.15, duration: 120, useNativeDriver: true }),
        Animated.timing(heartBeatAnim, { toValue: 1.0, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeAnim, heartBeatAnim, opacityAnim, pulseAnim, slideAnim]);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await appointmentsApi.getAll();
      setAppointments(data && data.length > 0 ? data : MOCK_RDV);
    } catch (error: any) {
      console.log('Fallback demo car API non joignable:', error.message);
      setAppointments(MOCK_RDV);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) fetchAppointments();
  }, [isFocused, fetchAppointments]);

  const operators: { id: Operator; name: string; color: [string, string]; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'WAVE', name: 'Wave', color: ['#00C6FF', '#0072FF'], icon: 'phone-portrait' },
    { id: 'ORANGE', name: 'Orange Money', color: ['#FF8C00', '#FF6A00'], icon: 'call' },
    { id: 'MTN', name: 'MTN MoMo', color: ['#FFCC00', '#FFB800'], icon: 'card' },
    { id: 'MOOV', name: 'Moov Money', color: ['#0066CC', '#004499'], icon: 'wallet' },
  ];

  const openPay = (rdv: any) => {
    setSelectedRdv(rdv);
    setShowOps(true);
  };

  const handlePay = async (op: Operator) => {
    if (!selectedRdv) return;
    setShowOps(false);
    setPayingId(selectedRdv.id);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch('http://172.20.10.4:4006/billing/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedRdv.ticket || 3000,
          patientId: user?.id || 'PAT-001',
          consultationId: selectedRdv.id,
          phone: user?.telephone || '0700000000',
          operator: op,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      
      // Met à jour localement le statut en Payé / Confirmé
      setAppointments((prev) =>
        prev.map((a) => (a.id === selectedRdv.id ? { ...a, status: 'CONFIRMED', paid: true, transactionId: data.transactionId } : a))
      );

      Alert.alert(
        `Paiement ${op} réussi`,
        `Montant: ${selectedRdv.ticket || 3000} XOF\nTransaction: ${data.transactionId || 'LIFE-DEMO'}`,
        [
          { text: 'Voir reçu', onPress: () => navigation.navigate('Recus') },
          { text: 'Ouvrir', onPress: () => data.paymentUrl && Linking.openURL(data.paymentUrl) },
        ]
      );
    } catch (e) {
      // Mode secours / démo si le backend n'est pas joignable
      setAppointments((prev) =>
        prev.map((a) => (a.id === selectedRdv.id ? { ...a, status: 'CONFIRMED', paid: true } : a))
      );
      Alert.alert(
        'Paiement Validé (Mode Démo)',
        `Ticket modérateur de ${selectedRdv.ticket || 3000} FCFA réglé via ${op} ✅\nRDV confirmé à ${selectedRdv.etablissement || 'l’établissement'}.`
      );
    } finally {
      setPayingId(null);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.cardWrapper}>
      <AppointmentCard
        appointment={item}
        onPress={() => navigation.navigate('RdvDetail', { appointmentId: item.id })}
      />
      {item.status === 'PENDING' ? (
        <TouchableOpacity style={styles.payBtn} onPress={() => openPay(item)} activeOpacity={0.8} disabled={payingId === item.id}>
          <LinearGradient colors={['#00C6FF', '#0072FF']} style={styles.payGradient}>
            <Ionicons name="phone-portrait-outline" size={16} color="#FFF" />
            <Text style={styles.payText}>{payingId === item.id ? 'Paiement en cours...' : `Payer ticket ${item.ticket || 3000} FCFA`}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <View style={styles.paidBadge}>
          <Ionicons name="checkmark-circle" size={16} color="#48BB78" />
          <Text style={styles.paidText}>{item.paid ? `Payé • Validé` : 'Confirmé • Ticket payé'}</Text>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2B6CB0" />
        <Text style={{ marginTop: 10, color: '#718096', fontWeight: '600' }}>Chargement des plannings...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#1A365D', '#2B6CB0', '#2C7A7B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.livePill}>
          <Animated.View style={[styles.liveDot, { transform: [{ scale: heartBeatAnim }] }]} />
          <Text style={styles.liveText}>Agenda Médical • Abidjan</Text>
        </View>

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
              <Ionicons name="calendar-outline" size={32} color="#FFFFFF" />
            </Animated.View>
          </View>
        </View>

        <Text style={styles.brandTitle}>Mes Rendez-vous</Text>
        <Text style={styles.brandSubtitle}>Ticket modérateur 20% • Mobile Money</Text>
      </LinearGradient>

      <Animated.View
        style={[
          styles.listContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Button
          title="+ Nouveau Rendez-vous"
          onPress={() => navigation.navigate('RdvCreate')}
          style={styles.createButton}
        />

        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={false} onRefresh={fetchAppointments} tintColor="#2B6CB0" />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="folder-open-outline" size={48} color="#A0AEC0" style={{ marginBottom: 12 }} />
              <Text style={styles.empty}>Aucun rendez-vous enregistré.</Text>
            </View>
          }
        />
      </Animated.View>

      {/* Modal de sélection Mobile Money */}
      <Modal visible={showOps} transparent animationType="slide" onRequestClose={() => setShowOps(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Payer RDV {selectedRdv?.etablissement || 'médical'}</Text>
            <Text style={styles.modalSub}>Ticket {selectedRdv?.ticket || 3000} FCFA • Choisis ton opérateur</Text>
            {operators.map((op) => (
              <TouchableOpacity key={op.id} style={styles.opCard} onPress={() => handlePay(op.id)} activeOpacity={0.8}>
                <LinearGradient colors={op.color} style={styles.opGradient}>
                  <View style={styles.opIconBox}><Ionicons name={op.icon} size={22} color="#FFF" /></View>
                  <Text style={styles.opName}>{op.name}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCancel} onPress={() => setShowOps(false)}>
              <Text style={styles.modalCancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A365D' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7FAFC' },
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
  createButton: {
    marginBottom: 16,
  },
  list: { paddingBottom: 30 },
  cardWrapper: { marginBottom: 16 },
  payBtn: { marginTop: 8, borderRadius: 12, overflow: 'hidden' },
  payGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 12 },
  payText: { color: '#FFF', fontWeight: '800', fontSize: 13, marginLeft: 8 },
  paidBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FFF4', borderWidth: 1, borderColor: '#C6F6D5', padding: 10, borderRadius: 12, marginTop: 8 },
  paidText: { color: '#22543D', fontWeight: '700', fontSize: 12, marginLeft: 6 },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  empty: { textAlign: 'center', color: '#718096', fontSize: 14, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#F0F6FC', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 40 },
  modalHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#CBD5E0', alignSelf: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 16, fontWeight: '800', color: '#1A202C', textAlign: 'center' },
  modalSub: { fontSize: 12, color: '#718096', textAlign: 'center', marginTop: 4, marginBottom: 16 },
  opCard: { borderRadius: 16, marginBottom: 12, overflow: 'hidden' },
  opGradient: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 16 },
  opIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.28)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  opName: { flex: 1, fontSize: 15, fontWeight: '800', color: '#FFFFFF' },
  modalCancel: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, alignItems: 'center', marginTop: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  modalCancelText: { fontSize: 14, fontWeight: '700', color: '#4A5568' },
});