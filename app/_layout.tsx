import { Stack, useRootNavigationState, useRouter, useSegments } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signOut } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { themeColors } from "@/components/styles/common";
import { Text } from "@/components/ui/text";

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();

  const currentPage = segments[segments.length - 1];
  const isAuthScreen = ["login", "register", "completescreen"].includes(currentPage);

  const navigationState = useRootNavigationState();
  const canGoBack = navigationState?.routes.length > 1;

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      router.replace("/(auth)/login");
    } catch (err) {
      console.log("ログアウト失敗", err);
    }
  };

  return (
    <GluestackUIProvider mode="light">
      <Stack
        screenOptions={{
          header: () => (
            <SafeAreaView edges={["top"]} style={{ backgroundColor: themeColors.background }}>
              <StatusBar style="dark" animated />
              <View
                style={{
                  height: 64,
                  paddingHorizontal: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderColor: "#ddd",
                }}
              >
                <TouchableOpacity
                  disabled={!canGoBack || isAuthScreen}
                  onPress={canGoBack && !isAuthScreen ? router.back : undefined}
                >
                  <Ionicons
                    name="arrow-back"
                    size={28}
                    color={canGoBack && !isAuthScreen ? themeColors.secondary : "#ccc"}
                  />
                </TouchableOpacity>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="bed" size={28} color={themeColors.text} />
                  <Text style={{ marginLeft: 8, fontSize: 20, color: themeColors.text, fontWeight: "bold" }}>
                    Sleep Inventory
                  </Text>
                </View>

                <TouchableOpacity disabled={isAuthScreen} onPress={!isAuthScreen ? handleLogout : undefined}>
                  <Ionicons name="log-out-outline" size={28} color={!isAuthScreen ? themeColors.danger : "#ccc"} />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          ),
        }}
      />
    </GluestackUIProvider>
  );
}
