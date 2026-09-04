# 🌙 Lucida — Lucid Dreaming App

Álomnapló és lucid álom tréning app. Expo + React Native (iOS + Android).
Dizájn: "Lágy hajnal" — világos, nyugodt, editorial.

## Funkciók
- **🌙 Napló** — álmok rögzítése (cím, szöveg, hangulat, lucid jelölés, álomjel-címkék), lista, kereső, szerkesztés
- **👁 Reality Check** — véletlenszerű napi értesítések állítható időablakban
- **📊 Insights** — lucid arány, streak, badgek, hangulat-eloszlás, álomjel-felhő + naptár-hőtérkép (prémium)
- **📖 Technikák** — Napló, Reality checks, MILD, WBTB, WILD, Álomjelek útmutatók
- **🔒 App-zár** — PIN + biometria
- **Többnyelvű** — magyar, angol, német (eszköz-nyelv szerint, váltható)
- **Freemium** — `isPremium` flag vezérli a limiteket + reklámot; paywall dev-kapcsolóval tesztelhető

## Futtatás
```bash
npm install
npx expo start
```
Nyisd meg az **Expo Go** appban (QR-kód), vagy `w` a webhez.

> Megjegyzés: az AdMob és a valós Google-login **development/EAS buildet** igényel
> (Expo Go-ban a reklám no-op, a Google gomb a config beállításáig placeholder).

## Konfiguráció a store-kiadáshoz
1. **Firebase** — cseréld a `lib/firebase.js` placeholder configját a valódi projekt kulcsaira.
2. **Google Sign-In** — állítsd be az OAuth client ID-kat (expo-auth-session).
3. **RevenueCat** — kösd be a `react-native-purchases`-t a `PremiumContext`-be és a Paywallba.
4. **AdMob** — kösd be a `react-native-google-mobile-ads`-t a `lib/ads.js`-be és az `<AdBanner/>`-be.

Részletes terv és állapot: [`ROADMAP.md`](./ROADMAP.md).

## Struktúra
```
app/            expo-router képernyők (tabs, dream, paywall, settings, technique, set-pin)
screens/        login + lock (nem route-olt)
components/     Screen, Card, DreamCard, MoodPicker, Locked, AdBanner, ikonok
context/        Auth, Premium, Lock, Dreams providerek
lib/            firebase, db, i18n, stats, ads, limits, notifications, theme, techniques
locales/        hu / en / de fordítások
```

## Futtatás böngészőből (GitHub Codespaces)

Nem kell semmit telepíteni a gépre, és a telefon **mobilnetről** is csatlakozhat.

1. A repó GitHub-oldalán: zöld **`< > Code`** gomb → **Codespaces** fül →
   **Create codespace on `claude/lucid-dreaming-app-5iw2jh`**
2. Megnyílik egy VS Code a böngészőben, és magától lefuttatja az `npm install`-t
   (a `.devcontainer` beállítás miatt) — ez az első alkalommal pár perc.
3. A Codespace termináljába írd:
   ```bash
   npx expo start --tunnel
   ```
4. Olvasd be a megjelenő QR-kódot az **Expo Go** appal. Mivel tunnel megy,
   a telefonnak nem kell közös hálózaton lennie a szerverrel.

A kód szerkeszthető is ott, és mentéskor a telefonon azonnal frissül.
