import { Stack, useRouter } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signOut } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { themeColors } from "@/components/styles/common";

export default function FlowLayout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      router.replace("/(auth)/login");
    } catch (error) {
      console.log("ログアウト失敗:", error);
    }
  };

  return (
    <GluestackUIProvider mode="light"><Stack
        screenOptions={{
          header: () => (
            <SafeAreaView edges={["top"]} style={styles.safeArea}>
              <StatusBar style="dark" animated />

              <View style={[styles.headerContainer, { backgroundColor: themeColors.background }]}>
                {/* 戻るボタン */}
                <TouchableOpacity onPress={router.back}>
                  <Text style={styles.backText}>← 戻る</Text>
                </TouchableOpacity>

                {/* タイトル */}
                <Text style={styles.headerTitle}>Sleep App</Text>

                {/* ログアウトボタン */}
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.logoutText}>ログアウト</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          ),
        }}
      /></GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: themeColors.background,
  },
  headerContainer: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  backText: {
    fontSize: 16,
    color: themeColors.secondary,
  },
  logoutText: {
    fontSize: 16,
    color: themeColors.danger,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: themeColors.text,
  },
});
