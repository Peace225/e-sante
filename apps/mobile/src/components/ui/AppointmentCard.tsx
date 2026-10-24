// src/components/ui/AppointmentCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Appointment } from '../../types';

interface AppointmentCardProps {
  appointment: Appointment;
  onPress?: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onPress,
}) => {
  // Définir la couleur du badge selon le statut
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'CONFIRME':
        return { bg: '#C6F6D5', text: '#22543D', label: 'Confirmé' };
      case 'EN_ATTENTE':
        return { bg: '#FEFCBF', text: '#744210', label: 'En attente' };
      case 'ANNULE':
        return { bg: '#FED7D7', text: '#742A2A', label: 'Annulé' };
      default:
        return { bg: '#EDF2F7', text: '#4A5568', label: status };
    }
  };

  const statusInfo = getStatusStyle(appointment.status);

  // Formater la date proprement
  const formattedDate = new Date(appointment.date || appointment.dateTime).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress} 
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.header}>
        <Text style={styles.etablissement}>{appointment.etablissement || 'PISAM Cocody'}</Text>
        <View style={[styles.badge, { backgroundColor: statusInfo.bg }]}>
          <Text style={[styles.badgeText, { color: statusInfo.text }]}>{statusInfo.label}</Text>
        </View>
      </View>

      <Text style={styles.motif} numberOfLines={1}>
        {appointment.motif}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.dateText}>📅 {formattedDate}</Text>
        <Text style={styles.doctorId}>Dr. {appointment.doctorId}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
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
    marginBottom: 8,
  },
  etablissement: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  motif: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F7FAFC',
    paddingTop: 10,
  },
  dateText: {
    fontSize: 13,
    color: '#718096',
  },
  doctorId: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2B6CB0',
  },
});