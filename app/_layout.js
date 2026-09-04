import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import '../lib/i18n';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { PremiumProvider } from '../context/PremiumContext';
import { LockProvider, useLock } from '../context/LockContext';
import { DreamsProvider } from '../context/DreamsContext';
import { theme } from '../lib/theme';

// Keeps the user on the right side of the auth / lock gates.
// The navigator is always mounted (expo-router requires it); we redirect
// declaratively instead of swapping the tree out.
function useAuthGate() {
  const { session, loading } = useAuth();
  const { locked, ready: lockReady } = useLock();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading || !lockReady) return;

    const atLogin = segments[0] === 'login';
    const atLock = segments[0] === 'lock';

    if (!session && !atLogin) {
      router.replace('/login');
    } else if (session && locked && !atLock) {
      router.replace('/lock');
    } else if (session && !locked && (atLogin || atLock)) {
      router.replace('/');
    }
  }, [session, loading, locked, lockReady, segments, router]);
}

function RootNavigator() {
  useAuthGate();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.bg },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" options={{ animation: 'fade' }} />
      <Stack.Screen name="lock" options={{ animation: 'fade', gestureEnabled: false }} />
      <Stack.Screen name="dream" options={{ presentation: 'modal' }} />
      <Stack.Screen name="paywall" options={{ presentation: 'modal' }} />
      <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
      <Stack.Screen name="set-pin" options={{ presentation: 'modal' }} />
      <Stack.Screen name="technique/[id]" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PremiumProvider>
          <LockProvider>
            <DreamsProvider>
              <StatusBar style="dark" />
              <RootNavigator />
            </DreamsProvider>
          </LockProvider>
        </PremiumProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
