import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Box } from "@/components/ui/box"
import { VStack } from "@/components/ui/vstack"
import { Heading } from "@/components/ui/heading"
import {
  Button,
  ButtonText,
} from '@/components/ui/button';
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
} from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from "@/components/ui/text";

export default function CheckScreen() {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleNext = () => {
    router.push({
      pathname: '/questionscreen',
      params: { checked: String(isChecked) },
    });
  };

  return (
    <Box className="flex-1 bg-background px-6 pt-[40px]" style={{ paddingTop: insets.top + 40 }}>
      <Heading className="text-center text-2xl text-text font-bold min-h-[64px]">
        Ouraアプリ確認の有無
      </Heading>

      <VStack className="flex-1 justify-start gap-10 items-center w-full mt-12">
        <Text className="text-text text-xl">今日はOuraアプリを確認していません</Text>

        <Checkbox
          value="checked"
          isChecked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          size="lg"
          className="mt-6"
        >
          <CheckboxIndicator className="w-24 h-24 rounded-full">
            <CheckboxIcon as={CheckIcon} className="w-12 h-12" />
          </CheckboxIndicator>
        </Checkbox>

        <Button
          size="lg"
          action="primary"
          className="rounded-md mt-8"
          onPress={handleNext}
        >
          <ButtonText>決定</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
