import { useRouter, useLocalSearchParams } from 'expo-router';
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { themeColors } from '@/components/styles/themeColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { db, auth } from "@/lib/firebase";
import { doc, setDoc } from 'firebase/firestore';
import { ActivityIndicator } from 'react-native';

export default function ResultScreen() {
  const router = useRouter();
  const { checked, sleepQuality } = useLocalSearchParams();
  const isChecked = checked === 'true';
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  const userEmail = auth.currentUser?.email || "unknown@example.com";
  const checkText = isChecked ? 'Ouraアプリの確認をしていない' : 'Ouraアプリを確認してしまった';
  const sleepText = sleepQuality ? `睡眠の質：「${sleepQuality}」` : '睡眠の質は未入力です';

  const handleSubmit = async () => {
    setIsLoading(true);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const timestamp = `${year}/${month}/${day}/${hours}:${minutes}:${seconds}`;
    const data = {
      checkbox: {
        Ouraアプリ: checkText ?? "未入力",
      },
      question: {
        解答: sleepQuality ?? "未入力",
      },
    };
    const currentUserEmail = auth.currentUser?.email || "unknown";
    const docRef = doc(db, "2025", currentUserEmail);
    try {
      await setDoc(docRef, { [timestamp]: data }, { merge: true });
      router.replace("/completescreen");
    } catch (error) {
      console.error("送信に失敗しました", error);
      setIsLoading(false);
    }
  };

  return (
    <Box className="flex-1 bg-background px-6 pt-[40px]" style={{ paddingTop: insets.top + 40 }}>
      <Heading className="text-center text-2xl text-text font-bold min-h-[64px]">
        今日の結果
      </Heading>

      <VStack className="flex-1 justify-start gap-10 items-center w-full mt-12">
        <Box className="flex-row justify-left items-center w-full px-2 border-b border-gray-300 pb-2">
          <Text className="text-xl text-text">{userEmail} さん</Text>
        </Box>

        <VStack className="gap-4 w-full">
          <Box className="flex-row justify-between items-center w-full px-2">
            <Text className="text-xl text-text">{checkText}</Text>
            <Pressable
              onPress={() => router.push(`/checkscreen?checked=${checked}`)}
              className="p-2"
            >
              <AntDesign name="edit" size={20} color={themeColors.text} />
            </Pressable>
          </Box>

          <Box className="flex-row justify-between items-center w-full px-2">
            <Text className="text-xl text-text">{sleepText}</Text>
            <Pressable
              onPress={() => router.push(`/questionscreen?checked=${checked}`)}
              className="p-2"
            >
              <AntDesign name="edit" size={20} color={themeColors.text} />
            </Pressable>
          </Box>
        </VStack>

        <Button
          size="lg"
          action="primary"
          className="rounded-lg mt-12"
          onPress={handleSubmit}
          isDisabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <ButtonText className="text-xl">データを送信</ButtonText>
          )}
        </Button>
      </VStack>
    </Box>
  );
}
