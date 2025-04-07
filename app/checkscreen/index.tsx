import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Box } from "@/components/ui/box"
import { VStack } from "@/components/ui/vstack"
import { Heading } from "@/components/ui/heading"
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox"
import {
  Button,
  ButtonText,
} from '@/components/ui/button';
import { CheckIcon } from "@/components/ui/icon"

export default function CheckScreen() {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    router.push({
      pathname: '/questionscreen',
      params: { checked: String(isChecked) },
    });
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="$background" px="$6">
      <VStack space="3xl" alignItems="center" w="$full">
        <Heading size="lg" textAlign="center" color="$textDark">
          Ouraアプリ確認の遵守状況
        </Heading>

        <Checkbox
          size="md"
          isChecked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        >
          <CheckboxIndicator mr="$2">
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel fontSize="$md">今日はOuraアプリを確認していません</CheckboxLabel>
        </Checkbox>

        <Button
          size="lg"
          action="primary"
          borderRadius="$md"
          onPress={handleNext}
          isDisabled={!isChecked}
        >
          <ButtonText>決定</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
