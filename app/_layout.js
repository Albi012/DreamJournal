import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import '../lib/i18n';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { PremiumProvider } from '../context/PremiumContext';
import { LockProvider, useLock } from '../context/LockContext';
import { DreamsProvider } from '../context/DreamsContext';
import { theme } from '../lib/theme';
import LoginScreen from '../screens/LoginScreen';
import LockScreen from '../screens/LockScreen';

function Gate() {
  const { session, loading } = useAuth();
  const { locked, ready: lockReady } = useLock();

  if (loading || !lockReady) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    );
  }

  if (!session) return <LoginScreen />;
  if (locked) return <LockScreen />;

  return (
    <DreamsProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.bg } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="dream" options={{ presentation: 'modal' }} />
        <Stack.Screen name="paywall" options={{ presentation: 'modal' }} />
        <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
        <Stack.Screen name="technique/[id]" />
      </Stack>
    </DreamsProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PremiumProvider>
          <LockProvider>
            <StatusBar style="dark" />
            <Gate />
          </LockProvider>
        </PremiumProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
