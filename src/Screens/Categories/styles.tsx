import { StyleSheet } from "react-native";
import { colors } from "../../Constants/Colors";

export const styles = StyleSheet.create({
  CategoryContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.gray[700],
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    margin: 10,
    marginTop: 0,
    borderRadius: 12,
  },
  // Textos
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: colors.gray[200],
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: colors.gray[200],
  },
  buttonStart: {
    width: 200,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.gray[800],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.gray[200],
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  // Tabela
  tableRegisters: {
    display: "flex",
    flexDirection: "column",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    gap: 5,
  },
  tableRow: {
    display: "flex",
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
    borderWidth: 0,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.gray[600],
  },
  tableTitle: {
    fontSize: 18,
    padding: 5,
    textTransform: "capitalize",
    fontWeight: "500",
    color: colors.gray[200],
  },
  tableText: {
    fontSize: 12,
    padding: 5,
    textTransform: "capitalize",
    fontWeight: "400",
    color: colors.gray[200],
  },
  categoryInfo: {
    maxWidth: "80%",
  },
  buttonRemove: {
    display: "flex",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonTransaction: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.gray[500],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonTextTable: {
    color: colors.gray[200],
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  buttonsContainer: {
    margin: 10,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  centerContainer: {
    justifyContent: "center",
  },
});
