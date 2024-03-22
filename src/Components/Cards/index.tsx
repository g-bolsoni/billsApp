import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import { styles } from './styles';
import income from '../../../assets/entrada.svg';
import expenses from '../../../assets/saida.svg';
import total_image from '../../../assets/money.svg';
import { ICards } from './props';
import { handleTotalData } from './actions';
import { formatCurrency } from '../../Utils/convertValueToReal';


export function Cards() {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect( ()=>{
        (async () => {
            const response = await handleTotalData();
            setTotalIncome(response.totalIncome);
            setTotalExpenses(response.totalExpenses);
            setTotal(response.total);
        })();
    }, []);


    const Card = ({ title, imageSource, value }: ICards) => (
        <View style={styles.card}>
            <View style={styles.titleInfo}>
                <Text style={styles.cardText}>{title}</Text>
                <Image source={imageSource} style={styles.icon} />
            </View>
            <Text style={styles.amount}>
                {formatCurrency(value)}
            </Text>
        </View>
    );



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
                value={totalIncome}
            />
            <Card
                title="Saídas"
                imageSource={expenses}
                value={totalExpenses}
            />
            <Card
                title="Total dos gastos"
                imageSource={total_image}
                value={total}
            />
        </ScrollView>
    );
}