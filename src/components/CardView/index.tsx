import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from './styles';

export const Card = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>😅</Text>
      <Text style={styles.infoText}>Sem Agendamento !</Text>
    </View>
  );
};