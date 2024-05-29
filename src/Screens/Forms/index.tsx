import { Text, TouchableOpacity, View, TextInput, Button, StyleSheet, Switch } from "react-native";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Header } from "../../Components/Header";
import { IBills } from "../../Components/Cards/props";
import { colors } from "../../Constants/Colors";

const billSchema = z.object({
    bill_name: z.string().min(1, 'Bill name is required'),
    bill_category: z.string(),
    bill_type: z.enum(['Income', 'Expenses']),
    buy_date: z.date(),
    payment_type: z.string(),
    bill_value: z.number(),
    repeat: z.boolean(),
    installments: z.string(),
    fixed: z.boolean(),
});
type BillFormValues = z.infer<typeof billSchema>;

export function Forms({ navigation }: any) {
    const { control, handleSubmit, setValue, formState: { errors }, watch } = useForm<BillFormValues>({
        resolver: zodResolver(billSchema),
        defaultValues: {
            buy_date: new Date(),
            repeat: false,
        }
    });

    const repeatValue = watch('repeat');

    const onSubmit: SubmitHandler<BillFormValues> = (data) => {
        console.log(data);
        // Trate os dados do formulário aqui
    };

    return (
        <>


            <View style={styles.container}>

                {/* bill_name */}
                <View>
                    <Text>Name:</Text>
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
                    {errors.bill_name && <Text style={styles.error}>{errors.bill_name.message?.toString()}</Text>}
                </View>
                {/* bill_category */}
                <View>
                    <Text>Categoria:</Text>
                    <Controller
                        control={control}
                        name="bill_category"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                style={styles.input}
                            />
                        )}
                    />
                    {errors.bill_category && <Text style={styles.error}>{errors.bill_category.message?.toString()}</Text>}
                </View>
                {/* bill_type */}
                <View>
                    <Text>Tipo:</Text>
                    <Controller
                        control={control}
                        name="bill_type"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Picker
                                selectedValue={value}
                                onValueChange={itemValue => onChange(itemValue)}
                                style={styles.input}
                            >
                                <Picker.Item label="Entrada" value="Income" />
                                <Picker.Item label="Saida" value="Expenses" />
                            </Picker>
                        )}
                    />
                    {errors.bill_type && <Text style={styles.error}>{errors.bill_type.message?.toString()}</Text>}
                </View>
                {/* buy_date */}
                <View>
                    <Text>Data de Compra:</Text>
                    <Controller
                        control={control}
                        name="buy_date"
                        render={({ field: { onChange, value } }) => (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={value}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    const date = selectedDate || new Date(); // Fallback para uma nova data caso selectedDate seja undefined
                                    setValue('buy_date', date);
                                    onChange(date);
                                }}
                            />
                        )}
                    />
                    {errors.buy_date && <Text style={styles.error}>{errors.buy_date.message?.toString()}</Text>}
                </View>
                {/* payment_type */}
                <View>
                    <Text>Tipo de pagamento</Text>
                    <Controller
                        control={control}
                        name="payment_type"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Picker
                                selectedValue={value}
                                onValueChange={itemValue => onChange(itemValue)}
                                style={styles.input}
                            >
                                <Picker.Item label="Pix" value="pix" />
                                <Picker.Item label="Cartão de Crédito" value="credit" />
                                <Picker.Item label="Cartão de Débito" value="debit" />
                            </Picker>
                        )}
                    />
                    {errors.payment_type && <Text style={styles.error}>{errors.payment_type.message?.toString()}</Text>}
                </View>
                {/* bill_value */}
                <View>
                    <Text>Valor da Conta:</Text>
                    <Controller
                        control={control}
                        name="bill_value"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value ? value.toString() : ''}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                        )}
                    />
                    {errors.bill_value && <Text style={styles.error}>{errors.bill_value.message?.toString()}</Text>}
                </View>
                {/* fixed */}
                <View>
                    <Text>Conta Fixa?</Text>
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
                    {errors.repeat && <Text style={styles.error}>{errors.repeat.message?.toString()}</Text>}
                </View>
                {/* repeat */}
                <View>
                    <Text>Repetir:</Text>
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
                    {errors.repeat && <Text style={styles.error}>{errors.repeat.message?.toString()}</Text>}
                </View>
                {/* installments */}
                {repeatValue &&
                    <View>
                        <Text>Quantas parcelas?</Text>
                        <Controller
                            control={control}
                            name="installments"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={styles.input}
                                />
                            )}
                        />
                        {errors.installments && <Text style={styles.error}>{errors.installments.message?.toString()}</Text>}
                    </View>
                }



                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.buttonBackHome} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.buttonText}> Página Inicial </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonBackHome} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.buttonText}> Enviar </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    buttonBackHome: {
        display: 'flex',
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: colors.gray[400],
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        borderRadius: 8,
        marginBottom: 20
    },
    buttonsContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.gray[700]
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        padding: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    switch: {
        marginTop: 10,
        marginBottom: 10,
    },
});