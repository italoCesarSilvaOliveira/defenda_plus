import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "Black"
  },
  image: {
    width: 42,
    height: 42,
  },
  user: {
    flex: 1,
  },
  name: {
    color: "#000"
  }
})