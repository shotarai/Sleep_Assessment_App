import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

export default function CompleteScreen() {
  const insets = useSafeAreaInsets();

  return (
    <Box className="flex-1 bg-background px-6 pt-[40px]" style={{ paddingTop: insets.top + 40 }}>
      <VStack className="gap-8 items-center w-full">
        <AntDesign name="checkcircle" size={64} color="green" />

        <Heading className="text-center text-2xl text-text font-bold">
          データ送信が完了しました
        </Heading>

        <Text className="text-xl text-text text-center">
          ご協力ありがとうございました！{"\n"}アプリを閉じて下さい
        </Text>
      </VStack>
    </Box>
  );
}
