// components/ui/EmailInput.tsx
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
  
  export default function EmailInput({ value, onChange }: Props) {
    return (
      <Input
        size="md"
        variant="rounded"
        borderColor="$primary"
        isDisabled={false}
        isInvalid={false}
      >
        <InputIcon as={() => <FontAwesome name="envelope" size={18} color="#999" />} pl="$3" />
        <InputField
          type="text"
          placeholder="メールアドレス"
          value={value}
          onChangeText={onChange}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Input>
    );
  }
  