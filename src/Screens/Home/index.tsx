import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { IBills } from "../Forms/props";
import { Cards } from "../../Components/Cards";
import { GraphsBars } from "../../Components/Graphs/Bar";
import { colors } from "../../Constants/Colors";
import { handleUpdateMonthlyBills } from "./actions";
import { TableInfo } from "../../Components/TableInfo";
import { BillsContext } from "../../Contexts/BillsContext";
import { CategoryContext } from "../../Contexts/CategoryContext";
import { MusicChart } from "../../Components/Graphs/BasicBar";

export function Home({ navigation }: any) {
  const { bills, setBills } = useContext(BillsContext);
  const { categories } = useContext(CategoryContext);

  const checkFirstDayOfMonth = async () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    // Unic key for each month/year
    const key = `executed-${month}-${year}`;

    // Checks if the function has already been executed
    const alreadyExecuted = await AsyncStorage.getItem(key);

    // await AsyncStorage.removeItem(key); //Remove for keys, only test

    if (day === 25 && !alreadyExecuted) {
      // Mark as executed
      await AsyncStorage.setItem(key, "true");

      // Execute the function
      const createdBills = await handleUpdateMonthlyBills();

      const formattedBills: IBills[] = createdBills.map((bill: any) => ({
        bill_name: bill.bill_name,
        bill_category: bill.bill_category,
        bill_type: bill.bill_type,
        buy_date: bill.buy_date,
        payment_type: bill.payment_type,
        bill_value: bill.bill_value,
        repeat: bill.repeat,
        installments: bill.installments,
        fixed: bill.fixed,
        _id: bill._id,
      }));

      setBills((prevBills) => [...prevBills, ...formattedBills]);
    }
  };

  useEffect(() => {
    checkFirstDayOfMonth();

    // Check every 24 hours
    const interval = setInterval(() => {
      checkFirstDayOfMonth();
    }, 86400000); // 24 hours in milliseconds

    // Clears the range when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView
      style={[styles.HomeContainer, bills.length ? {} : styles.centerContainer]}
    >
      {bills.length ? (
        <>
          <Cards />
          <TableInfo navigation={navigation} />
          <GraphsBars />
        </>
      ) : (
        <>
          {categories.length ? (
            <ScrollView>
              <View style={styles.innerContainer}>
                <Text style={styles.title}>Ótimo trabalho! 🎉</Text>
                <Text style={styles.text}>
                  Você configurou suas categorias com sucesso, e agora está
                  pronto para dar o próximo passo na gestão das suas finanças
                  com o GBMoney. 📂✅
                </Text>
                <Text style={styles.text}>
                  Vamos começar criando a sua primeira conta no app. 📝 As
                  contas representam suas fontes de entrada e saída de dinheiro,
                  como sua conta bancária, carteira digital, ou até mesmo o
                  dinheiro em espécie. Com as contas configuradas, você poderá
                  registrar todas as suas transações e acompanhar seus saldos de
                  forma prática e eficiente.
                </Text>
                <Text style={styles.text}>
                  Pronto para começar? Clique no botão abaixo para criar sua
                  primeira conta e continuar organizando suas finanças! 💪💰
                </Text>

                <TouchableOpacity
                  style={styles.buttonStart}
                  onPress={() => navigation.navigate("Forms")}
                >
                  <Text style={styles.buttonText}> Criar Conta</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : (
            <ScrollView>
              <View style={styles.innerContainer}>
                <Text style={styles.title}>Bem-vindo ao GBMoney! 🎉</Text>
                <Text style={styles.text}>
                  Estamos super animados em ter você conosco na jornada para uma
                  gestão financeira mais inteligente e eficiente. Com o GBMoney,
                  você terá o controle total sobre suas finanças pessoais na
                  palma da sua mão. 📊✨
                </Text>
                <Text style={styles.text}>
                  Antes de começarmos a registrar suas transações, há um passo
                  essencial que precisamos dar:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    criar suas categorias!
                  </Text>
                  🗂️ Isso é fundamental para organizar e visualizar suas
                  finanças de forma clara e eficaz. Ao definir suas categorias
                  de despesas e receitas, você garantirá que o GBMoney funcione
                  da melhor maneira para você. 🚀
                </Text>
                <Text style={styles.text}>
                  Você pode acessar a página de categorias através do menu
                  superior esquerdo da tela, ou simplesmente clicar no botão de
                  Começar para ir direto para lá. Assim, você estará pronto para
                  aproveitar tudo o que o GBMoney tem a oferecer! 💪💰
                </Text>
                <Text style={styles.text}>
                  Vamos lá? Estamos aqui para ajudar!
                </Text>

                <TouchableOpacity
                  style={styles.buttonStart}
                  onPress={() => navigation.navigate("Categories")}
                >
                  <Text style={styles.buttonText}> Começar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.gray[700],
  },
  innerContainer: {
    padding: 20,
    alignItems: "center",
    margin: 20,
    borderRadius: 12,
    backgroundColor: colors.gray[600],
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: colors.gray[200],
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: colors.gray[200],
  },
  centerContainer: {
    justifyContent: "center",
  },
  buttonStart: {
    width: 200,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.gray[800],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.gray[200],
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
