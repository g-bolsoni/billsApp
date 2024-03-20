import React from 'react';
import { Image, ScrollView, Text, View, ImageSourcePropType } from 'react-native';

import { styles } from './styles';
import income from '../../../assets/entrada.svg';
import expenses from '../../../assets/saida.svg';
import total from '../../../assets/money.svg';

interface ICards {
    title: string;
    imageSource: ImageSourcePropType;
    data: {
        isLoading: boolean;
        data: number;
    }
}
export function Cards() {
    const Card = ({ title, imageSource, data }: ICards) => (
        <View style={styles.card}>
            <View style={styles.titleInfo}>
                <Text style={styles.cardText}>{title}</Text>
                <Image source={imageSource} style={styles.icon} />
            </View>
            <Text style={styles.amount}>
                {data.isLoading ? 'Carregando...' : formatCurrency(data.data)}
            </Text>
        </View>
    );

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(value);
    };

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.cardsContainer}
            contentContainerStyle={styles.cardsContent}
        >
            <Card
                title="Entradas"
                imageSource={income}
                data={{
                    isLoading: false,
                    data: 100
                }}
            />
            <Card
                title="Saídas"
                imageSource={expenses}
                data={{
                    isLoading: false,
                    data: 100
                }}
            />
            <Card
                title="Total dos gastos"
                imageSource={total}
                data={{
                    isLoading: false,
                    data: 100
                }}
            />
        </ScrollView>
    );
}