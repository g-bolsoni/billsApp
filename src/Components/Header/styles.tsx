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
        paddingHorizontal: 20,
        paddingTop: 20,
        gap: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    logoSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
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