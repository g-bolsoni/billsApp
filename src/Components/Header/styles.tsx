import { StyleSheet } from 'react-native';
import { colors } from '../../Constants/Colors'

export const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.gray[800],
        height: 180,
        justifyContent: 'flex-start',
        zIndex: 10
    },
    container: {
        paddingHorizontal: 24,
        paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    buttonHeader: {
        display: 'flex',
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: colors.green[500],
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    }
});