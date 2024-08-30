import React, { useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Header } from "../../Components/Header";
import { colors } from "../../Constants/Colors";
import { TableInfo } from "../../Components/TableInfo";
import { BillsContext } from "../../Contexts/BillsContext";
import { Cards } from "../../Components/Cards";

export function Home({ navigation }: any) {
  const bills = useContext(BillsContext);

  return (
    <SafeAreaView
      style={[styles.HomeContainer, bills.length ? {} : styles.centerContainer]}
    >
      <Header navigation={navigation} />
      {bills.length ? (
        <>
          <Cards />
          <ScrollView>
            <TableInfo />
          </ScrollView>
        </>
      ) : (
        <>
          <ScrollView>
            <View style={styles.innerContainer}>
              <Text style={styles.title}>Bem-vindo ao GBMoney! 🎉</Text>
              <Text style={styles.text}>
                Estamos super animados em ter você conosco na jornada para uma
                gestão financeira mais inteligente e eficiente. Com o GBMoney,
                você terá o controle total sobre suas finanças pessoais na palma
                da sua mão. 📊✨
              </Text>
              <Text style={styles.text}>
                Antes de começarmos a registrar suas transações, há um passo
                essencial que precisamos dar:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  criar suas categorias!
                </Text>
                🗂️ Isso é fundamental para organizar e visualizar suas finanças
                de forma clara e eficaz. Ao definir suas categorias de despesas
                e receitas, você garantirá que o GBMoney funcione da melhor
                maneira para você. 🚀
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
