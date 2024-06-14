import { StyleSheet } from 'react-native';
import { colors } from '../../Constants/Colors';

export const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: colors.gray[500],
    marginTop: 16,
    backgroundColor: colors.gray[500]
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: colors.gray[500],
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    color: "white",
    padding: 5,
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    textTransform: 'capitalize',
    fontWeight: '500'
  },
  icons: {
    width: 20,
    height: 20,
    color: "#000"
  },
  buttons: {
    display: 'flex',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  expenses: {
    backgroundColor: colors.red[100]
  },
  income: {
    backgroundColor: colors.green[200]
  },
  bold: {
    fontWeight: '600'
  }
});