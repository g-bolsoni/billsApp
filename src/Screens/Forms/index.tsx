import { styles } from "./styles";

import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Switch,
  ScrollView,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useContext, useEffect, useState } from "react";
import { formatCurrency } from "../../Utils/convertValueToReal";

import { IBills } from "./props";
import { handleCreateBill } from "./actions";
import Toast from "react-native-toast-message";
import { handleGetBills } from "../../Components/TableInfo/actions";
import { BillsContext } from "../../Contexts/BillsContext";
import { CategoryContext } from "../../Contexts/CategoryContext";
import React from "react";

const billSchema = z.object({
  bill_name: z.string().min(1, "Por favor, insira um nome."),
  bill_category: z.string().min(1, "Por favor, selecione uma categoria."),
  bill_type: z.enum(["Income", "Expenses"]),
  buy_date: z.string(),
  payment_type: z.string(),
  bill_value: z.string(),
  repeat: z.boolean(),
  installments: z.string(),
  fixed: z.boolean(),
});

type BillFormValues = z.infer<typeof billSchema>;

export function Forms({ navigation }: any) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<BillFormValues>({
    resolver: zodResolver(billSchema),
    defaultValues: {
      bill_type: "Income",
      bill_category: "",
      fixed: false,
      repeat: false,
      installments: "",
      buy_date: new Date().toISOString().split("T")[0],
      payment_type: "pix",
    },
  });

  // Contexts
  const { setBills } = useContext(BillsContext);
  const { categories } = useContext(CategoryContext);

  // States
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [billValue, setBillValue] = useState<string>("");

  const repeatValue = watch("repeat");
  const bill_type = watch("bill_type");

  const categoriesPickerArray = categories.filter((category) => {
    return bill_type === category.category_type;
  });

  // Functions
  useEffect(() => {
    if (categories.length) {
      const defaultCategory = categories.find(
        (category) => category.category_type === bill_type
      );

      if (!defaultCategory) {
        setValue("bill_category", "");
        return;
      }

      setValue("bill_category", defaultCategory.name);
    }
  }, [bill_type, categories, setValue]);

  const onSubmit = async (data: IBills) => {
    const createBill = await handleCreateBill(data);

    if (createBill) {
      await fetchBills();
      Toast.show({
        type: "success",
        text1: "Conta adiconada!",
        position: "top",
        topOffset: 40,
      });

      // Navegar para a Home
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });

      return;
    }
    Toast.show({
      type: "error",
      text1: "Ops, Tente novamente!",
    });
  };

  // fetch atualizar Bills
  const fetchBills = async () => {
    const response = await handleGetBills();

    if (response) {
      setBills(response);
    }
  };

  // Data
  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (
    event: DateTimePickerEvent,
    date?: Date | undefined
  ) => {
    const currentDate = date || new Date();
    setShowDatePicker(false);
    const formattedDate = currentDate.toISOString().split("T")[0];
    setValue("buy_date", formattedDate);
    setSelectedDate(currentDate.toLocaleDateString("pt-BR"));
  };
  // Data
  // Valor
  const handleBlur = (onChange: (value: string) => void) => {
    const formattedText = billValue.replace(",", ".");
    const numberValue = parseFloat(formattedText);
    const valueFormated = formatCurrency(numberValue);
    setBillValue(formatCurrency(numberValue));
    onChange(formattedText);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.cardsContainer}>
          {/* bill_type => Definir se é uma entrada de dinheiro ou se é saida. */}
          <View>
            <Text style={styles.texts}>Tipo</Text>
            <Controller
              control={control}
              name="bill_type"
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue: any) => onChange(itemValue)}
                  style={styles.input}
                >
                  <Picker.Item label="Entrada" value="Income" />
                  <Picker.Item label="Saida" value="Expenses" />
                </Picker>
              )}
            />
            {errors.bill_type && (
              <Text style={styles.error}>
                {errors.bill_type.message?.toString()}
              </Text>
            )}
          </View>

          {/*  bill_name => Descrição */}
          <View>
            <Text style={styles.texts}>Nome</Text>
            <Controller
              control={control}
              name="bill_name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
            />
            {errors.bill_name && (
              <Text style={styles.error}>
                {errors.bill_name.message?.toString()}
              </Text>
            )}
          </View>
          {/* bill_category => Categoria */}

          <View>
            <Text style={styles.texts}>Categoria</Text>
            <Controller
              control={control}
              name="bill_category"
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue: any) => onChange(itemValue)}
                  style={styles.input}
                >
                  {categoriesPickerArray.length > 0 ? (
                    categoriesPickerArray.map((category) => (
                      <Picker.Item
                        key={category._id}
                        label={category.name}
                        value={category.name}
                      />
                    ))
                  ) : (
                    <Picker.Item label="Categoria não encontrada" value="" />
                  )}
                </Picker>
              )}
            />
            {errors.bill_category && (
              <Text style={styles.error}>
                {errors.bill_category.message?.toString()}
              </Text>
            )}
          </View>
          {/* buy_date => Data da compra*/}
          <View>
            <Text style={styles.texts}>Selecione a Data</Text>
            <TouchableOpacity
              onPress={showDatePickerHandler}
              style={styles.dateButton}
            >
              <Text
                style={[
                  styles.dateButtonText,
                  selectedDate ? { textAlign: "left" } : null,
                ]}
              >
                {selectedDate || "Selecionar Data"}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
            {errors.buy_date && (
              <Text style={styles.error}>
                {errors.buy_date.message?.toString()}
              </Text>
            )}
          </View>
          {/* payment_type => Forma de pagamento */}
          <View>
            <Text style={styles.texts}>Tipo de pagamento</Text>
            <Controller
              control={control}
              name="payment_type"
              render={({ field: { onChange, onBlur, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue: any) => onChange(itemValue)}
                  style={styles.input}
                >
                  <Picker.Item label="Pix" value="pix" />
                  <Picker.Item label="Cartão de Crédito" value="credit" />
                  <Picker.Item label="Cartão de Débito" value="debit" />
                </Picker>
              )}
            />
            {errors.payment_type && (
              <Text style={styles.error}>
                {errors.payment_type.message?.toString()}
              </Text>
            )}
          </View>
          {/* bill_value => Valor */}
          <View>
            <Text style={styles.texts}>Valor:</Text>
            <Controller
              control={control}
              name="bill_value"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={() => handleBlur(onChange)}
                  onChangeText={(text) =>
                    setBillValue(text.replace(/[^0-9.,]/g, ""))
                  }
                  value={billValue}
                  keyboardType="numeric"
                  style={styles.input}
                />
              )}
            />
            {errors.bill_value && (
              <Text style={styles.error}>
                {errors.bill_value.message?.toString()}
              </Text>
            )}
          </View>

          {bill_type == "Expenses" && (
            <>
              {/* Fixed => É uma conta fixa? */}
              <View>
                <View style={styles.switchContainer}>
                  <Text style={styles.texts}>É uma conta fixa?</Text>
                  <Controller
                    control={control}
                    name="fixed"
                    render={({ field: { onChange, value } }) => (
                      <Switch
                        onValueChange={onChange}
                        value={value}
                        style={styles.switch}
                      />
                    )}
                  />
                </View>
                {errors.repeat && (
                  <Text style={styles.error}>
                    {errors.repeat.message?.toString()}
                  </Text>
                )}
              </View>

              {/* repeat => Essa conta vai se repetir, ou compra parcelada?*/}
              <View>
                <View style={styles.switchContainer}>
                  <Text style={styles.texts}>Essa contá irá repetir?</Text>
                  <Controller
                    control={control}
                    name="repeat"
                    render={({ field: { onChange, value } }) => (
                      <Switch
                        onValueChange={onChange}
                        value={value}
                        style={styles.switch}
                      />
                    )}
                  />
                </View>
                {errors.repeat && (
                  <Text style={styles.error}>
                    {errors.repeat.message?.toString()}
                  </Text>
                )}
              </View>

              {/* installments => se foi compra parcelada insira quantas parcelas ja pagou/quantas falta. Ex.: 3/8 (Trêz parcelas pagas de oito)*/}
              {repeatValue && (
                <View>
                  <Text style={styles.texts}>Quantas parcelas?</Text>
                  <Controller
                    control={control}
                    name="installments"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        placeholder="3/8"
                      />
                    )}
                  />
                  {errors.installments && (
                    <Text style={styles.error}>
                      {errors.installments.message?.toString()}
                    </Text>
                  )}
                </View>
              )}
            </>
          )}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonBackHome}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}> Voltar </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonSubmit}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}> Enviar </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
