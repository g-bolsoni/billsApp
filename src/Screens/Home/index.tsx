import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../../Components/Header';
import { colors } from '../../Constants/Colors';

export function Home() {
    return (
        <View style={styles.HomeContainer}>
            <Header />
        </View>
    );
}

const styles = StyleSheet.create({
    HomeContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.gray[700]
    }
})