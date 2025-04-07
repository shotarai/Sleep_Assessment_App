// components/ui/PasswordInput.tsx
import {
    Input,
    InputField,
    InputIcon,
  } from "@/components/ui/input";
  import { FontAwesome } from '@expo/vector-icons';
  
  type Props = {
    value: string;
    onChange: (value: string) => void;
  };
  
  export default function PasswordInput({ value, onChange }: Props) {
    return (
      <Input
        size="md"
        variant="rounded"
        borderColor="$primary"
      >
        <InputIcon as={() => <FontAwesome name="lock" size={18} color="#999" />} pl="$3" />
        <InputField
          type="password"
          placeholder="パスワード"
          value={value}
          onChangeText={onChange}
          secureTextEntry
          autoCapitalize="none"
        />
      </Input>
    );
  }
  