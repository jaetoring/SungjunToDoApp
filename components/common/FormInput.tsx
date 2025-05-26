// components/common/FormInput.tsx
import { Text, TextInput, View } from "react-native";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  isValid?: boolean;
  touched?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
  successMessage?: string;
  errorMessage?: string;
}

const FormInput = ({
  value,
  onChangeText,
  placeholder,
  isValid = true,
  touched = false,
  secureTextEntry = false,
  keyboardType = "default",
  successMessage,
  errorMessage,
}: InputProps) => {
  const borderColor = !touched
    ? "border-gray-300"
    : isValid
    ? "border-green-400"
    : "border-red-400";

  const messageColor = isValid ? "text-green-500" : "text-red-500";

  return (
    <View className="mb-4">
      <TextInput
        className={`w-full border rounded-xl p-4 bg-white ${borderColor}`}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
      {touched && (successMessage || errorMessage) && (
        <Text className={`text-sm ml-1 mt-1 ${messageColor}`}>
          {isValid ? successMessage : errorMessage}
        </Text>
      )}
    </View>
  );
};

export default FormInput;
