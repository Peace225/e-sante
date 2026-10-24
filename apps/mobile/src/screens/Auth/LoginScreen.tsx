import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/authStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('contact@bradsergueikokoliko.com');
  const [password, setPassword] = useState('');
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

  const handleLogin = () => {
    // Validation de la session et bascule instantanée vers l'application
    setToken('fake-jwt-token-lifecare-360');
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
            <Text style={styles.liveText}>Sécurisé • Abidjan</Text>
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
                <Ionicons name="medical" size={36} color="#FFFFFF" />
              </Animated.View>
            </View>
          </View>

          <Text style={styles.brandTitle}>E-Santé</Text>
          <Text style={styles.brandSubtitle}>Votre santé, simplifiée et connectée</Text>
        </LinearGradient>

        {/* Formulaire de Connexion */}
        <Animated.View
          style={[
            styles.formCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.formHeaderTitle}>Connexion Patient</Text>
          <Text style={styles.formHeaderSub}>Accédez à votre dossier et vos rendez-vous</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adresse email</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#4A5568" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="nom@exemple.com"
                placeholderTextColor="#A0AEC0"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#4A5568" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••••••"
                placeholderTextColor="#A0AEC0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          {/* Bouton de Connexion principal */}
          <TouchableOpacity style={styles.primaryButtonWrapper} onPress={handleLogin} activeOpacity={0.85}>
            <LinearGradient
              colors={['#2B6CB0', '#1A365D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Se connecter</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Bouton de Redirection vers l'Inscription */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Créer un nouveau compte</Text>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A365D' },
  scrollContainer: { flexGrow: 1 },
  headerGradient: {
    paddingTop: 60,
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
    marginBottom: 20,
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
    width: 84,
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  radarHalo: {
    position: 'absolute',
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#63B3ED',
  },
  logoIconBox: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  brandSubtitle: {
    fontSize: 13,
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
    paddingTop: 32,
    paddingBottom: 40,
  },
  formHeaderTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A202C',
    marginBottom: 4,
  },
  formHeaderSub: {
    fontSize: 13,
    color: '#718096',
    marginBottom: 24,
  },
  inputGroup: { marginBottom: 18 },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    height: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A202C',
  },
  primaryButtonWrapper: {
    marginTop: 12,
    borderRadius: 16,
    shadowColor: '#2B6CB0',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryButton: {
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#CBD5E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#4A5568',
    fontSize: 14,
    fontWeight: '700',
  },
});