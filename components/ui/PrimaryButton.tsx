import { HStack } from "@/components/ui/hstack"
import {
  Button,
  ButtonText,
} from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  label: string;
  onPress: () => void;
  icon?: React.ComponentProps<typeof FontAwesome>['name'];
  loading?: boolean;
};

export default function PrimaryButton({ label, onPress, icon, loading = false }: Props) {
  return (
    <Button
      size="lg"
      variant="solid"
      action="primary"
      borderRadius="$md"
      onPress={onPress}
      isDisabled={loading}
    >
      {loading ? (
        <Spinner color="$white" />
      ) : (
        <HStack space="sm" alignItems="center">
          {icon && <FontAwesome name={icon} size={18} color="#fff" />}
          <ButtonText>{label}</ButtonText>
        </HStack>
      )}
    </Button>
  );
}
