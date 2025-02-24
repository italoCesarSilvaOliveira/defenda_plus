import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 23,
    paddingHorizontal: 20,

    // Sombra para Android
    elevation: 20,

    // Sombra para iOS
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  component: {  
    marginTop: 10,
    marginHorizontal: 35,
  },

  headerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },

  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
