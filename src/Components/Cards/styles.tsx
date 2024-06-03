import { StyleSheet } from 'react-native';
import { colors } from '../../Constants/Colors'

export const styles = StyleSheet.create({
    cardsContainer: {
        flex: 1,
        paddingHorizontal: 24,
        marginTop: -50,
        height: 120,
        maxHeight: 150,
        zIndex: 20
    },
    cardsContent: {
        alignItems: 'center',
        height: 120,
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: colors.gray[500],
        borderRadius: 8,
        padding: 24,
        width: 320,
        marginRight: 20,
    },
    titleInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardText: {
        fontSize: 16,
        color: colors.gray[200],
    },
    amount: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    icon: {
        width: 32,
        height: 32,
    },
});
