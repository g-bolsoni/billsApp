import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { styles } from "./styles";

import { ICards } from "./props";
import { handleTotalData } from "./actions";
import { formatCurrency } from "../../Utils/convertValueToReal";
import { BillsContext } from "../../Contexts/BillsContext";
import Icon from "react-native-vector-icons/Feather";
import { colors } from "../../Constants/Colors";

export function Cards() {
  const { bills } = useContext(BillsContext);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await handleTotalData(bills);
      setTotalIncome(response.totalIncome);
      setTotalExpenses(response.totalExpenses);
      setTotal(response.total);
    })();
  }, [bills]);

  const Card = ({ title, imageSource, value, color }: ICards) => (
    <View style={styles.card}>
      <View style={styles.titleInfo}>
        <Text style={styles.cardText}>{title}</Text>
        <Icon name={imageSource} size={25} color={color} />
      </View>
      <Text style={styles.amount}>{formatCurrency(value)}</Text>
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
        imageSource="arrow-up-circle"
        value={totalIncome}
        color={colors.green[200]}
      />
      <Card
        title="Saídas"
        imageSource="arrow-down-circle"
        value={totalExpenses}
        color={colors.red[600]}
      />
      <Card
        title="Total dos gastos"
        imageSource="dollar-sign"
        value={total}
        color={colors.gray[200]}
      />
    </ScrollView>
  );
}
