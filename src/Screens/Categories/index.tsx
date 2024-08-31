import React, { useContext } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CategoryContext } from "../../Contexts/CategoryContext";
import { colors } from "../../Constants/Colors";

export function Categories({ navigation }: any) {
  const categories = useContext(CategoryContext);

  return (
    <>
      <SafeAreaView
        style={[
          styles.CategoryContainer,
          categories.length ? {} : styles.centerContainer,
        ]}
      >
        {categories.length ? (
          <ScrollView>
            <View style={styles.innerContainer}>
              <View style={styles.tableRegisters}>
                {categories.map((category, index) => {
                  return (
                    <>
                      <View key={index} style={styles.tableRow}>
                        <Text
                          style={[
                            styles.tableCell,
                            styles.bold,
                            styles.tableTitle,
                          ]}
                        >
                          {category.name}
                        </Text>
                        <Text style={[styles.tableCell, styles.tableText]}>
                          {category.description}
                        </Text>
                      </View>
                    </>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        ) : (
          <ScrollView>
            <View style={styles.innerContainer}>
              <Text style={styles.title}>
                📂 Organize suas Finanças com Categorias
              </Text>
              <Text style={styles.text}>
                Criar categorias é o primeiro passo para uma gestão financeira
                realmente eficaz. As categorias ajudam você a dividir suas
                despesas e receitas em grupos específicos, tornando mais fácil
                entender para onde vai o seu dinheiro e de onde ele vem. 🧐
              </Text>
              <Text style={styles.text}>
                Com categorias bem definidas, você poderá visualizar seus gastos
                em diferentes áreas da sua vida, identificar padrões de consumo
                e ajustar seu orçamento conforme necessário. 💡 Quer saber
                quanto está gastando em alimentação, lazer ou transporte? As
                categorias te dão essa visão clara e detalhada.
              </Text>
              <Text style={styles.text}>
                Pronto para começar? 🎯 Clique no botão abaixo para criar sua
                primeira categoria e dar um grande passo em direção ao controle
                total das suas finanças! 💪
              </Text>
              <TouchableOpacity
                style={styles.buttonStart}
                onPress={() => navigation.navigate("CategoriesForms")}
              >
                <Text style={styles.buttonText}> Começar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  CategoryContainer: {
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
  tableRegisters: {
    display: "flex",
    flexDirection: "column",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    gap: 5,
  },
  tableRow: {
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    alignItems: "flex-start",
    borderColor: colors.gray[200],
    borderRadius: 8,
  },
  tableTitle: {
    fontSize: 20,
  },
  tableText: {
    fontSize: 16,
  },
  tableCell: {
    flex: 1,
    padding: 5,
    textTransform: "capitalize",
    fontWeight: "500",
    color: colors.gray[200],
  },
  icons: {
    width: 20,
    height: 20,
    color: "#000",
  },
  buttons: {
    display: "flex",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  bold: {
    fontWeight: "600",
  },
});
