// app/resultscreen/index.tsx
import { useLocalSearchParams } from 'expo-router';
import { Box } from "@/components/ui/box"
import { VStack } from "@/components/ui/vstack"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"

export default function ResultScreen() {
  const { checked, sleepQuality } = useLocalSearchParams();

  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="$background" px="$6">
      <VStack space="$6" alignItems="center">
        <Heading size="xl" color="$textDark" textAlign="center">
          結果画面
        </Heading>

        <Text fontSize="$md" color="$textDark">
          Ouraデータ未確認: {checked === 'true' ? 'はい' : 'いいえ'}
        </Text>

        <Text fontSize="$md" color="$textDark">
          今日の睡眠の質: {sleepQuality}
        </Text>
      </VStack>
    </Box>
  );
}
