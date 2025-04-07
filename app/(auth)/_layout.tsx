import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { themeColors } from '@/components/styles/themeColors';

export default function AuthTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.gray,
        tabBarStyle: {
          backgroundColor: themeColors.background,
          borderTopWidth: 1,
          borderTopColor: themeColors.border,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 14,
        },
      }}
    >
      <Tabs.Screen
        name="login"
        options={{
          title: 'ログイン',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <FontAwesome name="sign-in" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: '新規登録',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <FontAwesome name="user-plus" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
