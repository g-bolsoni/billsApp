import { Controller, useForm } from "react-hook-form";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

import { Picker } from "@react-native-picker/picker";
import { zodResolver } from "@hookform/resolvers/zod";

import { colors } from "../../Constants/Colors";
import { useContext, useState } from "react";
import { formatCurrency } from "../../Utils/convertValueToReal";
import { ICategory } from "../Categories/props";
import { handleCreateCategory } from "./actions";
import Toast from "react-native-toast-message";
import { CategoryContext } from "../../Contexts/CategoryContext";
import { handleGetCategories } from "../Categories/actions";

//Zod
const CategoySchema = z.object({
  name: z.string().min(1, "O nome da categoria é obrigatório!"),
  description: z.string(),
  category_type: z.enum(["Income", "Expenses"]),
  budget: z.string(),
  isActive: z.boolean(),
  color: z.string(),
  icon: z.string(),
});

type CategoryValues = z.infer<typeof CategoySchema>;

export function CategoryForms({ navigation }: any) {
  const [categoryValue, setCategoryValue] = useState<string>("");
  const { setCategories } = useContext(CategoryContext);

  const fetchCategories = async () => {
    const response = await handleGetCategories();

    if (response) {
      setCategories(response);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryValues>({
    resolver: zodResolver(CategoySchema),
    defaultValues: {
      category_type: "Income",
      isActive: true,
      color: "#FF5733",
      icon: "fa-utensils",
    },
  });

  // Functions
  const onSubmit = async (data: ICategory) => {
    const createCategory = await handleCreateCategory(data);

    if (!createCategory) {
      Toast.show({
        type: "error",
        text1: "Ops, Tente novamente!",
      });
      return;
    }

    await fetchCategories();

    Toast.show({
      type: "success",
      text1: "Conta adiconada!",
      position: "top",
      topOffset: 40,
    });

    // Navegar para a página de categorias
    navigation.reset({
      index: 0,
      routes: [{ name: "Categories" }],
    });
  };

  // Budget
  const handleBlur = (onChange: (value: string) => void) => {
    const formattedText = categoryValue.replace(",", ".");
    const numberValue = parseFloat(formattedText);
    const valueFormated = formatCurrency(numberValue);
    setCategoryValue(formatCurrency(numberValue));
    onChange(formattedText);
  };

  return (
    <SafeAreaView style={styles.CategoryFormsContainer}>
      <View style={styles.containerForm}>
        {/* Name => Adiciona um nome para a categoria. */}
        <View style={styles.formItem}>
          <Text style={styles.texts}>Nome da Categoria</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.error}>{errors.name.message?.toString()}</Text>
          )}
        </View>

        {/* Description => Adiciona uma descrição para a categoria. */}
        <View style={styles.formItem}>
          <Text style={styles.texts}>Descrição</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
          />
          {errors.description && (
            <Text style={styles.error}>
              {errors.description.message?.toString()}
            </Text>
          )}
        </View>

        {/* Type => Definir se é uma entrada de dinheiro ou se é saida. */}
        <View style={styles.formItem}>
          <Text style={styles.texts}>Tipo de Categoria</Text>
          <Controller
            control={control}
            name="category_type"
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={styles.input}
              >
                <Picker.Item label="Entrada" value="Income" />
                <Picker.Item label="Saida" value="Expenses" />
              </Picker>
            )}
          />
          {errors.category_type && (
            <Text style={styles.error}>
              {errors.category_type.message?.toString()}
            </Text>
          )}
        </View>

        {/* Budget => Define um orçamento maximo */}
        <View style={styles.formItem}>
          <Text style={styles.texts}>Orçamento</Text>
          <Controller
            control={control}
            name="budget"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={() => handleBlur(onChange)}
                onChangeText={(text) =>
                  setCategoryValue(text.replace(/[^0-9.,]/g, ""))
                }
                value={categoryValue}
                keyboardType="numeric"
                style={styles.input}
              />
            )}
          />
          {errors.budget && (
            <Text style={styles.error}>
              {errors.budget.message?.toString()}
            </Text>
          )}
        </View>

        {/* Botões */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.buttonBackHome}
            onPress={() => navigation.navigate("Categories")}
          >
            <Text style={styles.buttonText}> Voltar </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSubmit}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}> Criar Categoria </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  CategoryFormsContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.gray[700],
  },
  containerForm: {
    padding: 10,
    alignItems: "center",
    margin: 10,
    borderRadius: 12,
    backgroundColor: colors.gray[600],
  },
  formItem: {
    width: "100%",
  },

  texts: {
    fontSize: 18,
    color: colors.gray[200],
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray[500],
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    color: colors.gray[200],
    backgroundColor: colors.gray[700],
  },
  error: {
    color: colors.red[500],
    marginBottom: 10,
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonBackHome: {
    display: "flex",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.gray[400],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonSubmit: {
    display: "flex",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.green[500],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});
