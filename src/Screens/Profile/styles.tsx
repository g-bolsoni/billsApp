import { StyleSheet } from "react-native";
import { colors } from "../../Constants/Colors";

export const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: colors.gray[700],
    paddingTop: 0,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    marginTop: 0,
    borderRadius: 12,
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: colors.gray[600],
  },
  containerTitle: {
    marginBottom: 30,
  },
  footerContainer: {
    marginTop: 20,
    display: "flex",
    gap: 20,
  },
  logoutContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  containerBody: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 10,
  },
  deleteAccountContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  inputGroupContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 30,
    borderWidth: 1,
    borderColor: colors.gray[200],
    position: "relative",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 40,
  },
  inputContainer: {
    display: "flex",
    width: "100%",
    position: "relative",
  },
  // Texts

  title: {
    fontSize: 20,
    color: colors.gray[200],
    fontWeight: "600",
    padding: 5,
  },
  textName: {
    fontSize: 16,
    color: colors.gray[200],
    fontWeight: "500",
  },
  text: {
    fontSize: 16,
    color: colors.gray[200],
    fontWeight: "500",
  },
  smalText: {
    fontSize: 12,
    color: colors.gray[200],
    fontWeight: "400",
    opacity: 0.5,
  },
  logoutText: {
    color: colors.gray[200],
  },
  deleteAccountText: {
    color: colors.gray[200],
  },
  // Buttons
  logout: {
    borderWidth: 1,
    borderColor: colors.gray[400],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 12,
  },
  buttonEdit: {
    width: 100,
    backgroundColor: colors.gray[200],
    display: "flex",
    justifyContent: "center",
    height: 25,
    alignItems: "center",
    borderRadius: 8,
    marginLeft: "auto",
    position: "absolute",
    right: 15,
    top: -15,
  },
  // Inputs
  inputText: {
    borderBottomColor: colors.gray[200],
    borderBottomWidth: 1,
    // borderWidth: 1,
    width: "100%",
    borderRadius: 8,
    height: 30,
    paddingLeft: 10,
    color: colors.gray[200],
  },
  // Inputs - label
  label: {
    fontSize: 12,
    paddingLeft: 10,
    color: colors.gray[200],
    fontWeight: "500",
    position: "absolute",
    top: -15,
    left: 0,
  },
});
