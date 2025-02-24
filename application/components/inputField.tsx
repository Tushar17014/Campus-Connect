import {
    TextInput,
    View,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from "react-native";
import { InputFieldProps } from "~/types/type";

const InputField = ({
    label,
    secureTextEntry = false,
    labelStyle,
    containerStyle,
    inputStyle,
    className,
    placeholder,
    ...props
}: InputFieldProps) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View className="my-2 w-full">
                    <Text className={`text-lg mb-3 ${labelStyle} text-white`}>
                        {label}
                    </Text>
                    <TextInput
                        className={`p-4 text-[15px] ${inputStyle} text-left  bg-black border border-gray-400 rounded-lg text-white`}
                        secureTextEntry={secureTextEntry}
                        placeholder={placeholder}
                        {...props}
                    />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default InputField;