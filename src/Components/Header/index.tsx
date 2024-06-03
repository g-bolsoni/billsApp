import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { Cards } from '../Cards';
import logo from '../../../assets/logo.png';
import logoutIcon from '../../../assets/logout.png'
import { useAuth } from '../../Contexts/AuthContext';

export function Header({ navigation }: any) {
    const { signOut } = useAuth();

    const handleLogout = async () => {
        await signOut();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };
    return (
        <>
            <View style={styles.header}>
                <View style={styles.container}>
                    <View style={styles.logoSection}>
                        <Image source={logo} style={styles.logo} />
                        <Text style={styles.title}>Gb Money</Text>
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.buttonHeader} onPress={() => navigation.navigate('Forms')}>
                            <Text style={styles.buttonText}> Nova Transação </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleLogout()}>
                            <Image source={logoutIcon} style={styles.logo} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Cards />
        </>
    );
}

