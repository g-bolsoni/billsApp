import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { IBills } from './props';
import { handleGetBills } from './actions';
import { formatCurrency } from '../../Utils/convertValueToReal';

export function TableInfo() {
  const [bills, setBills] = useState<IBills[] | [] >([]);

  useEffect(()=> {
    (async () => {
      const response = await handleGetBills();

      if(response){
        setBills(response);
      }

    })();
  }, []);

  const handleCalculateBillValue = (item: IBills) => {
    const value = item.bill_value * (item.bill_type == 'Expenses' ? -1 : 1);
    const valueFormated = formatCurrency(value);
    return valueFormated;
  }

  return (
    <View style={styles.table}>
    <View style={styles.tableRow}>
      <Text style={styles.tableHeader}>Nome</Text>
      <Text style={styles.tableHeader}>Valor</Text>
    </View>
    {bills.map((item, index) => (
      <View key={index} style={[styles.tableRow, item.bill_type == 'Expenses' ? styles.expenses : styles.income]}>
        <Text style={[styles.tableCell, styles.bold]}>{item.bill_name}</Text>
        <Text style={styles.tableCell}>{ handleCalculateBillValue(item) }</Text>
      </View>
    ))}
  </View>
  );
}