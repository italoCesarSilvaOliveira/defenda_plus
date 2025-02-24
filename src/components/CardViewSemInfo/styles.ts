import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    width: 350,
    height: 303,
    borderWidth: 1,
    borderColor: '#3498db',
    borderStyle: 'dashed',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',

    // Sombra para Android
    elevation: 20,

    // Sombra para iOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  emoji: {
    fontSize: 81,
    marginBottom: 10,
  },
  infoText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: '#808080',
    marginBottom: 10,
  },
});
