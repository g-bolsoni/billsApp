import React, { useCallback, useContext, useEffect } from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";

import { styles } from "./styles";
import { IBills } from "./props";
import { handleDeleteBill, handleGetBills } from "./actions";
import { formatCurrency } from "../../Utils/convertValueToReal";

import Toast from "react-native-toast-message";
import { BillsContext } from "../../Contexts/BillsContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function TableInfo({ navigation }: any) {
  const { bills, setBills } = useContext(BillsContext);

  const fetchBills = async () => {
    const response = await handleGetBills();

    if (response) {
      setBills(response);
    }
  };

  const handleCalculateBillValue = (item: IBills) => {
    const value = item.bill_value * (item.bill_type == "Expenses" ? -1 : 1);
    const valueFormated = formatCurrency(value);
    return valueFormated;
  };

  const handleConvertDate = (item: IBills) => {
    const date = new Date(item.buy_date);
    const dateFormated = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    }).format(date);
    return dateFormated;
  };

  const handleRemoveBill = async (bill_id: string) => {
    const response = await handleDeleteBill(bill_id);
    if (!response.ok) {
      Toast.show({
        type: "error",
        text1: response.message,
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: response.message,
    });

    // Atualize a lista de contas diretamente do backend após a remoção
    await fetchBills();
  };

  return (
    <>
      <TouchableOpacity
        style={styles.buttonTransaction}
        onPress={() => navigation.navigate("Forms")}
      >
        <Text style={styles.buttonText}> Nova Transação </Text>
      </TouchableOpacity>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Nome</Text>
          <Text style={styles.tableHeader}>Valor</Text>
          <Text style={styles.tableHeader}>Data</Text>
          <Text style={styles.tableHeader}></Text>
        </View>
        <View style={styles.tableRegisters}>
          {bills.map((item, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                item.bill_type == "Expenses" ? styles.expenses : styles.income,
              ]}
            >
              <Text style={[styles.tableCell, styles.bold]}>
                {item.bill_name}
              </Text>
              <Text style={styles.tableCell}>
                {handleCalculateBillValue(item)}
              </Text>
              <Text style={styles.tableCell}>{handleConvertDate(item)}</Text>

              <Text
                style={[
                  styles.tableCell,
                  {
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    gap: 5,
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => handleRemoveBill(item._id)}
                >
                  <Icon name="trash-can-outline" size={20} />
                </TouchableOpacity>
              </Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}
