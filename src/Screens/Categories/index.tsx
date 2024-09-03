import React, { useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CategoryContext } from "../../Contexts/CategoryContext";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../Constants/Colors";
import { handleDeleteCategory, handleGetCategories } from "./actions";
import Toast from "react-native-toast-message";

export function Categories({ navigation }: any) {
  const { categories, setCategories } = useContext(CategoryContext);

  const fetchCategories = async () => {
    const response = await handleGetCategories();

    if (response) {
      setCategories(response);
    }
  };

  const handleRemoveCategory = async (category_id: string) => {
    const response = await handleDeleteCategory(category_id);

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

    await fetchCategories();
  };

  return (
    <>
      <SafeAreaView
        style={[
          styles.CategoryContainer,
          categories.length ? {} : styles.centerContainer,
        ]}
      >
        <ScrollView>
          {categories.length ? (
            <>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.buttonTransaction}
                  onPress={() => navigation.navigate("CategoriesForms")}
                >
                  <Text style={styles.buttonTextTable}>
                    Adicionar Categoria
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.innerContainer}>
                <View style={styles.tableRegisters}>
                  {categories.map((category) => (
                    <View key={category._id} style={styles.tableRow}>
                      <View style={styles.categoryInfo}>
                        <Text style={styles.tableTitle}>{category.name}</Text>
                        <Text style={styles.tableText}>
                          {category.description}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={styles.buttonRemove}
                        onPress={() => handleRemoveCategory(category._id)}
                      >
                        <Icon
                          name="trash-can-outline"
                          size={20}
                          color={colors.gray[200]}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            </>
          ) : (
            <View
              style={[
                styles.innerContainer,
                { alignItems: "center", backgroundColor: colors.gray[600] },
              ]}
            >
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
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
