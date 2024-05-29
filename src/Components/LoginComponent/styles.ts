import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  card: {
    width: '100%',
    flexDirection: 'column',
    gap: 10,
  },
  cardHeader: {
    marginBottom: 10,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  formGroup: {
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    color: '#1F2937',
  },
  input: {
    height: 40,
    borderColor: '#9CA3AF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: '#B91C1C',
  },
  actions: {
    marginTop: 20,
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#10B981',
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  link: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },

});