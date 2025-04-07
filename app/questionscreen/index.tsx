import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { themeColors } from '@/components/styles/themeColors';

export default function QuestionScreen() {
  const router = useRouter();
  const { checked } = useLocalSearchParams();
  const isChecked = checked === 'true';

  const answers = [
    '大幅に良くなっている',
    'やや良くなっている',
    '変わらない',
    'やや悪くなっている',
    '大幅に悪くなっている',
  ];

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedAnswer) {
      router.push({
        pathname: '/resultscreen',
        params: {
          checked: String(isChecked),
          sleepQuality: selectedAnswer,
        },
      });
    }
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg={themeColors.background} px="$6">
      <VStack space="$xl" w="$full">
        <Heading size="lg" textAlign="center" color={themeColors.text} className={`mb-4`}>
          昨日と比べて、今日の睡眠の質はどうでしたか？
        </Heading>

        <VStack space="$md" className={`mb-4`}>
          {answers.map((answer) => {
            const isSelected = selectedAnswer === answer;
            return (
              <Pressable
                key={answer}
                onPress={() => setSelectedAnswer(answer)}
                className={`px-6 py-4 my-2 rounded-lg ${isSelected ? 'bg-primary-500' : 'bg-gray-200'}`}
              >
                <Text className={isSelected ? 'text-white font-bold text-center' : 'text-black text-center'}>
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
          className={`rounded-lg`}
          onPress={handleNext}
        >
          <ButtonText>決定</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
