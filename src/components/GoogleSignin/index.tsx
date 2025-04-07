import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { Button, View, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession(); // Necessário para o fluxo web

export function GoogleSignIn() {
  const navigation = useNavigation();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '177988970730-ubpdilavfbctfc6mpnv005ugq13urd36.apps.googleusercontent.com', // Opcional para builds iOS
    androidClientId: '177988970730-9f70qhsral26ndiup7vqkbe5lcrd60fd.apps.googleusercontent.com', // Opcional para builds Android
    webClientId: '177988970730-4af6bj2p1289bvcd5e5d3k468erhnn3l.apps.googleusercontent.com', // Obrigatório
  });

  useEffect(() => {
    (async () => {
      if (response?.type === 'success') {
        const { authentication } = response;
        
        // Salvar o token de acesso
        await AsyncStorage.setItem('@google_token', authentication?.accessToken || '');

        // Obter informações do usuário
        const userInfo = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${authentication?.accessToken}` },
        });
        const user = await userInfo.json();

        // Navegar para a tela principal
        // navigation.navigate('Home', { user });
      }
    })();
  }, [response]);

  return (
    <View style={{ marginVertical: 20 }}>
      <Button
        title="Entrar com Google"
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}