import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { Cards } from '../Cards';
import Logo from '../../../assets/logo.svg';
import LogoutIcon from '../../../assets/logout.svg'
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
                        <Logo style={styles.logo} />
                        <Text style={styles.title}>Gb Money</Text>
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.buttonHeader} onPress={() => navigation.navigate('Forms')}>
                            <Text style={styles.buttonText}> Nova Transação </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleLogout()}>
                            <LogoutIcon />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Cards />
        </>
    );
}

