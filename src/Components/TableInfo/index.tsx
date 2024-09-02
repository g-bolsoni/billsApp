import React, { useContext } from "react";
import { TouchableOpacity, Text, View, ScrollView } from "react-native";

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
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonTransaction}
          onPress={() => navigation.navigate("Forms")}
        >
          <Text style={styles.buttonText}> Nova Transação </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.table}>
          <View style={styles.tableRegisters}>
            {bills.map((item, index) => (
              <View
                key={item._id}
                style={[
                  styles.tableRow,
                  item.bill_type == "Expenses"
                    ? styles.expenses
                    : styles.income,
                ]}
              >
                <View>
                  <View style={styles.titleCards}>
                    <Text style={[styles.textCell, styles.bold]}>
                      {item.bill_name}
                    </Text>
                    <Text style={styles.textDate}>
                      {handleConvertDate(item)}
                    </Text>
                  </View>

                  <View style={styles.valuesContainer}>
                    <Text style={styles.textCell}>
                      {handleCalculateBillValue(item)}
                    </Text>
                    {item.installments && (
                      <Text style={styles.textDate}>({item.installments})</Text>
                    )}
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => handleRemoveBill(item._id)}
                >
                  <Icon name="trash-can-outline" size={20} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
