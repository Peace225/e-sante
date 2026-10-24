import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Animated,
  Easing,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [loading, setLoading] = useState(false);

  const setToken = useAuthStore((state) => state.setToken);
  const navigation = useNavigation<any>();

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

  const handleRegister = async () => {
    if (!nom || !prenom || !email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    try {
      setLoading(true);
      // Simulation temporaire pour valider le parcours :
      Alert.alert('Succès', 'Compte créé avec succès !', [
        { text: 'OK', onPress: () => setToken('fake-jwt-token-lifecare-360') }
      ]);
    } catch (error) {
      console.error("Erreur d'inscription", error);
      Alert.alert('Inscription échouée', "Impossible de créer le compte pour le moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
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
            <Text style={styles.liveText}>Nouveau Patient • Abidjan</Text>
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
                <Ionicons name="shield-checkmark" size={32} color="#FFFFFF" />
              </Animated.View>
            </View>
          </View>

          <Text style={styles.brandTitle}>Créer un compte</Text>
          <Text style={styles.brandSubtitle}>Rejoignez l'écosystème LIFECARE 360</Text>
        </LinearGradient>

        {/* Formulaire d'inscription */}
        <Animated.View
          style={[
            styles.formCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.formHeaderTitle}>Informations personnelles</Text>
          <Text style={styles.formHeaderSub}>Renseignez vos coordonnées médicales</Text>

          <View style={styles.inputGroup}>
            <Input
              label="Nom"
              placeholder="ex: Kokoliko"
              value={nom}
              onChangeText={setNom}
            />
          </View>

          <View style={styles.inputGroup}>
            <Input
              label="Prénom"
              placeholder="ex: Brad Sergueï"
              value={prenom}
              onChangeText={setPrenom}
            />
          </View>

          <View style={styles.inputGroup}>
            <Input
              label="Adresse email"
              placeholder="ex: contact@bradsergueikokoliko.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Input
              label="Téléphone"
              placeholder="ex: +225 0700000000"
              keyboardType="phone-pad"
              value={telephone}
              onChangeText={setTelephone}
            />
          </View>

          <View style={styles.inputGroup}>
            <Input
              label="Mot de passe"
              placeholder="••••••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Button
            title="S'inscrire"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />

          <Button
            title="Déjà un compte ? Se connecter"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        </Animated.View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A365D' },
  scrollContainer: { flexGrow: 1 },
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
  },
  formHeaderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 4,
  },
  formHeaderSub: {
    fontSize: 12.5,
    color: '#718096',
    marginBottom: 20,
  },
  inputGroup: { marginBottom: 12 },
  registerButton: {
    marginTop: 8,
    marginBottom: 12,
  },
});