import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import Svg, { Path } from 'react-native-svg';
import { Screen } from '../components/ui';
import { MoonIcon } from '../components/Icons';
import { theme } from '../lib/theme';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured } from '../lib/firebase';

const c = theme.colors;

function GoogleG({ size = 20 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.2 17.6 9.5 24 9.5z" />
      <Path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.3 5.7c4.3-4 6.8-9.9 6.8-17.4z" />
      <Path fill="#FBBC05" d="M10.4 28.3c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-7.8-6.1C.9 15.9 0 19.8 0 24s.9 8.1 2.6 11.4l7.8-6.1z" />
      <Path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.3-5.7c-2 1.4-4.7 2.3-7.9 2.3-6.4 0-11.7-3.7-13.6-8.9l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
    </Svg>
  );
}

export default function LoginScreen() {
  const { t } = useTranslation();
  const { continueAsGuest, setGoogleUser } = useAuth();
  const [busy, setBusy] = useState(false);

  const onGoogle = async () => {
    if (!isFirebaseConfigured) {
      Alert.alert(
        'Google bejelentkezés',
        'Add meg a valódi Firebase configot a lib/firebase.js fájlban a Google-belépéshez. Addig használd a vendég módot.'
      );
      return;
    }
    // Real flow (wired once config + OAuth client IDs are set):
    // const cred = GoogleAuthProvider.credential(idToken);
    // const res = await signInWithCredential(auth, cred);
    // setGoogleUser(res.user);
    setBusy(true);
    setTimeout(() => setBusy(false), 400);
  };

  return (
    <Screen>
      <View style={styles.wrap}>
        <View style={styles.brandWrap}>
          <View style={styles.logo}>
            <MoonIcon size={40} color={c.primary} fill="rgba(138,95,128,0.12)" />
          </View>
          <Text style={styles.brand}>Lucida</Text>
          <Text style={styles.tagline}>{t('auth.tagline')}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.googleBtn} onPress={onGoogle} disabled={busy}>
            {busy ? <ActivityIndicator color={c.primaryDeep} /> : <GoogleG />}
            <Text style={styles.googleText}>{t('auth.google')}</Text>
          </Pressable>

          <Pressable style={styles.guestBtn} onPress={continueAsGuest}>
            <Text style={styles.guestText}>{t('auth.guest')}</Text>
          </Pressable>
          <Text style={styles.note}>{t('auth.guestNote')}</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 30, paddingTop: 120, paddingBottom: 50 },
  brandWrap: { alignItems: 'center' },
  logo: {
    width: 88, height: 88, borderRadius: 44, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
    shadowColor: '#96788c', shadowOpacity: 0.15, shadowRadius: 20, shadowOffset: { width: 0, height: 10 },
  },
  brand: { fontSize: 42, fontWeight: '600', color: c.primaryDeep, letterSpacing: 0.5 },
  tagline: { marginTop: 10, fontSize: 15, color: c.textMuted, textAlign: 'center' },
  actions: { gap: 12 },
  googleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: '#fff', paddingVertical: 15, borderRadius: 16,
    shadowColor: '#96788c', shadowOpacity: 0.12, shadowRadius: 14, shadowOffset: { width: 0, height: 6 },
  },
  googleText: { fontSize: 15, fontWeight: '700', color: c.text },
  guestBtn: { alignItems: 'center', paddingVertical: 14, borderRadius: 16, backgroundColor: c.chipBg },
  guestText: { fontSize: 15, fontWeight: '600', color: c.primary },
  note: { textAlign: 'center', fontSize: 12, color: c.textFaint, marginTop: 4 },
});
