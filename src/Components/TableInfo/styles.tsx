import { StyleSheet } from "react-native";
import { colors } from "../../Constants/Colors";

export const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: colors.gray[500],
    marginHorizontal: 10,
    backgroundColor: colors.gray[500],
    borderRadius: 12,
    padding: 10,
  },
  tableRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: colors.gray[500],
    borderRadius: 8,
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
    backgroundColor: "transparent",
  },
  tableRegisters: {
    display: "flex",
    flexDirection: "column",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    gap: 5,
  },
  titleCards: {
    display: "flex",
    gap: 7,
    flexDirection: "row",
    alignItems: "center",
  },
  textCell: {
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "500",
  },
  textDate: {
    fontSize: 12,
  },
  valuesContainer: {
    display: "flex",
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    display: "flex",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  expenses: {
    backgroundColor: colors.red[300],
  },
  income: {
    backgroundColor: colors.green[200],
  },
  bold: {
    fontWeight: "600",
  },

  buttonsContainer: {
    margin: 10,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  buttonTransaction: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.gray[500],
    width: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 14,
    color: colors.gray[200],
  },
});
