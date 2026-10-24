import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '../store/authStore';

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const fullName = user ? `${user.prenom || ''} ${user.nom || ''}`.trim() : 'Brad Sergueï Kokoliko';
  const initials = user
    ? `${user.prenom?.[0] || 'B'}${user.nom?.[0] || 'K'}`.toUpperCase()
    : 'BK';

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

  // Fonction pour sélectionner ou capturer une photo de profil
  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission requise", "L'accès à la pellicule est nécessaire pour changer la photo de profil.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      setProfileImage(pickerResult.assets[0].uri);
      Alert.alert("Succès", "Photo de profil mise à jour avec succès !");
    }
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
          <Text style={styles.liveText}>Espace Patient • Abidjan</Text>
        </View>

        {/* Avatar cliquable avec Halo Radar Animé */}
        <TouchableOpacity style={styles.logoContainer} onPress={handlePickImage} activeOpacity={0.85}>
          <Animated.View
            style={[
              styles.radarHalo,
              {
                opacity: opacityAnim,
                transform: [{ scale: pulseAnim }],
              },
            ]}
          />
          <View style={styles.avatarBox}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{initials}</Text>
            )}
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={12} color="#FFFFFF" />
            </View>
          </View>
        </TouchableOpacity>

        <Text style={styles.brandTitle}>{fullName}</Text>
        <Text style={styles.brandSubtitle}>{user?.email || 'contact@bradsergueikokoliko.com'}</Text>
      </LinearGradient>

      {/* Contenu principal animé */}
      <Animated.View
        style={[
          styles.cardContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informations du compte</Text>

          <View style={styles.row}>
            <View style={styles.labelRow}>
              <Ionicons name="finger-print-outline" size={16} color="#718096" style={{ marginRight: 8 }} />
              <Text style={styles.label}>ID Patient</Text>
            </View>
            <Text style={styles.value}>{user?.id || 'PAT-001'}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.labelRow}>
              <Ionicons name="shield-checkmark-outline" size={16} color="#718096" style={{ marginRight: 8 }} />
              <Text style={styles.label}>Rôle</Text>
            </View>
            <Text style={styles.value}>Patient / Développeur</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.labelRow}>
              <Ionicons name="call-outline" size={16} color="#718096" style={{ marginRight: 8 }} />
              <Text style={styles.label}>Téléphone</Text>
            </View>
            <Text style={styles.value}>{user?.telephone || '+225 07 12 06 81 37'}</Text>
          </View>

          <View style={[styles.row, { borderBottomWidth: 0 }]}>
            <View style={styles.labelRow}>
              <Ionicons name="location-outline" size={16} color="#718096" style={{ marginRight: 8 }} />
              <Text style={styles.label}>Ville</Text>
            </View>
            <Text style={styles.value}>Abidjan, Côte d'Ivoire</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={18} color="#E53E3E" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
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
    width: 88,
    height: 88,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  radarHalo: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#63B3ED',
  },
  avatarBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: { color: '#FFFFFF', fontSize: 26, fontWeight: '800' },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2B6CB0',
    padding: 5,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  brandSubtitle: {
    fontSize: 13,
    color: '#E2E8F0',
    fontWeight: '500',
  },
  cardContainer: {
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
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#2B6CB0', marginBottom: 16 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: { color: '#718096', fontSize: 14, fontWeight: '500' },
  value: { color: '#1A202C', fontWeight: '700', fontSize: 14 },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E53E3E',
    backgroundColor: '#FFF5F5',
    paddingVertical: 14,
    borderRadius: 16,
  },
  logoutText: { color: '#E53E3E', fontSize: 15, fontWeight: '700' },
});