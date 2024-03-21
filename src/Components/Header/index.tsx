import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { Cards } from '../Cards';
import logo from '../../../assets/logo.svg';

export function Header({ navigation }:any) {
    return (
        <>
            <View style={styles.header}>
                <View style={styles.container}>
                    <View style={styles.logoSection}>
                        <Image
                            style={styles.logo}
                            source={logo}
                        />
                        <Text style={styles.title}>Gb Money</Text>
                    </View>
                    <TouchableOpacity style={styles.buttonHeader}  onPress={() => navigation.navigate('Forms')}>
                        <Text style={styles.buttonText}> Nova Transação </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Cards />
        </>
    );
}

