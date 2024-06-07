import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';

import { styles } from './styles';
import { IBills } from './props';
import { handleGetBills } from './actions';
import { formatCurrency } from '../../Utils/convertValueToReal';
import edit from '../../../assets/edit.png';
import remove from '../../../assets/delete.png';
import { colors } from '../../Constants/Colors';

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
  const handleRemoveBill = ( bill_id: string ) => {
    console.log(bill_id);
  };

  return (
    <View style={styles.table}>
    <View style={styles.tableRow}>
      <Text style={styles.tableHeader}>Nome</Text>
      <Text style={styles.tableHeader}>Valor</Text>
      <Text style={styles.tableHeader}></Text>
    </View>
    {bills.map((item, index) => (
      <View key={index} style={[styles.tableRow, item.bill_type == 'Expenses' ? styles.expenses : styles.income]}>
        <Text style={[styles.tableCell, styles.bold]}>{item.bill_name}</Text>
        <Text style={styles.tableCell}>{ handleCalculateBillValue(item) }</Text>
        <Text style={[styles.tableCell, {display: 'flex', justifyContent: 'flex-end', gap: 5}]}>
            <TouchableOpacity style={styles.buttons}>
              <Image source={edit} style={[styles.logo, { backgroundColor: colors.green[500] }]} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={() => handleRemoveBill(item._id)}>
              <Image source={remove} style={[styles.logo, { backgroundColor: colors.red[500] }]} />
            </TouchableOpacity>
        </Text>
      </View>
    ))}
  </View>
  );
}