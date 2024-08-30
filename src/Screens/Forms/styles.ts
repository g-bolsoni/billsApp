import { StyleSheet } from "react-native";
import { colors } from "../../Constants/Colors";

export const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    zIndex: 20,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 20,
    backgroundColor: colors.gray[800],
  },
  texts: {
    fontSize: 18,
    color: colors.gray[200],
    marginBottom: 10,
  },
  label: {
    color: colors.gray[200],
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray[500],
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    color: colors.gray[200],
    backgroundColor: colors.gray[700],
  },
  error: {
    color: colors.red[500],
    marginBottom: 10,
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  switch: {
    marginTop: 10,
    marginBottom: 10,
  },
  datePicker: {
    width: "100%",
    marginBottom: 10,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: colors.gray[500],
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: colors.gray[700],
  },
  dateButtonText: {
    color: colors.gray[200],
    textAlign: "center",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonBackHome: {
    display: "flex",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.gray[400],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonSubmit: {
    display: "flex",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.green[500],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});
