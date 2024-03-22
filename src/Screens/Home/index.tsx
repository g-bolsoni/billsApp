import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../Components/Header';
import { colors } from '../../Constants/Colors';
import { TableInfo } from '../../Components/TableInfo';

export function Home({navigation}: any) {
    return (
        <ScrollView style={styles.HomeContainer}>
            <Header navigation={navigation} />
            <TableInfo />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    HomeContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.gray[700]
    }
});