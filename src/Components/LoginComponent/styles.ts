import { StyleSheet } from "react-native";
import { colors } from "../../Constants/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[800],
    padding: 30,
  },
  card: {
    width: "100%",
    flexDirection: "column",
    gap: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeader: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.gray[200],
    textAlign: "center",
  },

  formGroup: {
    marginBottom: 10,
    width: "100%",
  },

  label: {
    fontSize: 14,
    color: colors.gray[200],
  },
  input: {
    height: 40,
    borderColor: colors.gray[200],
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: colors.gray[200],
  },
  error: {
    color: colors.red[500],
  },
  actions: {
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: colors.green[400],
    width: "80%",
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: colors.gray[200],
    fontWeight: "500",
    fontSize: 18,
  },
  link: {
    color: colors.blue[500],
    textDecorationLine: "underline",
  },
});
