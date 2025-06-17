import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { themeColors } from '@/components/styles/themeColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AbsoluteScreen() {
  const router = useRouter();
  const { checked, relativeSleepQuality, absoluteSleepQuality } = useLocalSearchParams();
  const isChecked = checked === 'true';
  const insets = useSafeAreaInsets();

  const answers = [
    '大幅に良い',
    '良い',
    '普通',
    '悪い',
    '大幅に悪い',
  ];

  // 編集時は既存の値を初期値として設定
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(
    (absoluteSleepQuality as string) || null
  );

  const handleNext = () => {
    if (selectedAnswer) {
      router.push({
        pathname: '/resultscreen',
        params: {
          checked: String(isChecked),
          relativeSleepQuality: relativeSleepQuality as string,
          absoluteSleepQuality: selectedAnswer,
        },
      });
    }
  };

  return (
    <Box className="flex-1 bg-background px-6 pt-[35px]" style={{ paddingTop: insets.top + 35 }}>
      <Heading className="text-center text-2xl text-text font-bold min-h-[64px]">
        今日の睡眠を5段階で評価してください
      </Heading>

      <VStack className="flex-1 justify-start gap-8 items-center w-full mt-8">
        <VStack className="gap-2 w-full">
          {answers.map((answer) => {
            const isSelected = selectedAnswer === answer;
            return (
              <Pressable
                key={answer}
                onPress={() => setSelectedAnswer(answer)}
                className={`px-6 py-4 my-2 rounded-lg ${isSelected ? 'bg-primary-500' : 'bg-gray-200'}`}
              >
                <Text className={isSelected ? 'text-white font-bold text-center text-xl' : 'text-black text-center text-xl'}>
                  {answer}
                </Text>
              </Pressable>
            );
          })}
        </VStack>

        <Button
          size="lg"
          action="primary"
          isDisabled={!selectedAnswer}
          className="rounded-lg mt-2 w-1/3"
          onPress={handleNext}
        >
          <ButtonText className="text-xl">決定</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
