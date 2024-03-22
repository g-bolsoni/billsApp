import { Text, TouchableOpacity, View } from "react-native";
import { Header } from "../../Components/Header";

export function Forms({navigation}: any) {
    return (
        <>
            <Header />
            <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
                <Text > Voltar Home </Text>
            </TouchableOpacity>
            <View>
                <Text>Forms Works</Text>
            </View>
        </>
    );
}