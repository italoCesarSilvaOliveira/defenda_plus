// screens/LoginScreen.tsx
import { GoogleSignIn } from '../../components/GoogleSignin/index';
import { View, StyleSheet, Text } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>
      
      <GoogleSignIn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
});