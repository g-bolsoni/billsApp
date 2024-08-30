import { StyleSheet } from "react-native";
import { colors } from "../../Constants/Colors";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.gray[800],
    justifyContent: "flex-start",
    zIndex: 10,
  },
  container: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 20,
    height: 20,
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.gray[200],
    textAlign: "center",
  },
  buttonHeader: {
    display: "flex",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.green[500],
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.gray[200],
    fontSize: 16,
    fontWeight: "500",
  },
});
