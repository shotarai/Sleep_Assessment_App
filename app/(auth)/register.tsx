// app/(auth)/register.tsx
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Box } from "@/components/ui/box"
import { VStack } from "@/components/ui/vstack"
import { Heading } from "@/components/ui/heading"
import EmailInput from '@/components/ui/EmailInput';
import PasswordInput from '@/components/ui/PasswordInput';
import PrimaryButton from '@/components/ui/PrimaryButton';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        await sendEmailVerification(user);
        Alert.alert('確認メールを送信しました');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        Alert.alert('不明なエラーが発生しました');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <Box flex={1} justifyContent="center" px="$6" bg="$background">
        <VStack space="lg">
          <Heading size="xl" textAlign="center" color="$textDark">
            新規登録
          </Heading>

          <EmailInput value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />

          <PrimaryButton
            label="登録する"
            onPress={handleRegister}
            icon="user-plus"
            loading={loading}
          />
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  );
}
