# Dream Journal — Roadmap

Lucid dreaming app · Expo + React Native · iOS + Android · freemium modell.

## Dizájn irány — "Lágy hajnal" (B)
Világos, nyugodt, editorial. Krém + levendula háttér, meleg amber/rózsa akcent, szilva
tinta, lágy árnyékok. Display: Fraunces (serif), body: Manrope. Lucid jelvény: amber.
Színek: `lib/theme.js`.

## Tech stack
- Expo **SDK 57** + React Native 0.86 (expo-router, expo-notifications)
- **Auth: Firebase Authentication — Google Sign-In**
- **Adat: Cloud Firestore**
  - `users/{uid}/dreams/{id}`, `users/{uid}/meta/settings`, premium a `uid`-hez kötve
  - ⚠️ **Offline-first megjegyzés:** a Firebase *JS* SDK nem tud lemezre cache-elni
    React Native alatt (IndexedDB-t igényelne), ezért most memória-cache fut.
    A valódi offline-first + eszközök közti szinkronhoz a store-buildben
    **@react-native-firebase/firestore**-ra kell váltani (natív SDK, lemezre ment;
    dev build kell hozzá, Expo Go-ban nem fut).
- PIN / biometrikus zár a login mellett (helyi védelem az intim adatra)
- **Többnyelvűség (i18n): `i18next` + `react-i18next` + `expo-localization`**
  - Nyelvek: **magyar, angol, német** (mind LTR); alap/fallback: angol
  - Minden UI-szöveg fordítási kulcson (`locales/{hu,en,de}.json`), nyelvváltó a beállításokban
  - Technika-tartalmak mindhárom nyelven; új nyelv = csak egy új JSON, kód-változtatás nélkül
- Store build: EAS Build + EAS Submit
- Előfizetés: RevenueCat (`react-native-purchases`), user `uid`-hez kötve
- Reklám (free): Google AdMob (`react-native-google-mobile-ads`)
- Egyetlen `isPremium` flag vezérli a limiteket + reklámot + zárolt funkciókat

## Freemium felosztás
| Funkció | Free | Premium |
|---|---|---|
| Álomnapló írás | ✅ | ✅ korlátlan + teljes archívum |
| Hangulat, lucid jelölés | ✅ | ✅ |
| Reality check értesítés | napi max 3 | korlátlan, egyéni |
| Alap statisztika (lucid arány, streak) | ✅ | ✅ |
| Álomjel-elemzés, felhő, hőtérkép, trendek | ❌ | ✅ |
| Adat-export / backup | ❌ | ✅ |
| Haladó technikák (MILD/WBTB/WILD) | ❌ | ✅ |
| Kereső + címke-szűrés | korlátozott | ✅ |
| Reklám | ✅ van | ❌ nincs |

---

## MVP (első kiadás)

### Többnyelvűség (i18n)
- [x] i18next + expo-localization beállítás, eszköz-nyelv detektálás + nyelvváltó
- [x] `locales/hu.json`, `locales/en.json`, `locales/de.json` (UI-feliratok, teljes paritás)
- [ ] Technika-tartalmak fordítása mindhárom nyelvre (jelenleg HU)
- [x] Minden UI-szöveg kulcson keresztül (nincs beégetett string)

### Auth & adat
- [x] Bejelentkező képernyő + `AuthContext` + vendég mód (Google gomb kész, valós OAuth a configgal aktiválható)
- [x] Firestore `lib/db.js` (offline persistence + szinkron), vendég = lokális fallback
- [ ] Valódi Firebase config + Google OAuth client ID-k behelyezése
- [ ] Váltás `@react-native-firebase/firestore`-ra a valódi offline persistence-hez (dev build)

### Fő funkciók — 4 fül
- [x] Technika-tartalmak (Napló, Reality checks, MILD, WBTB, WILD, Álomjelek)
- [x] 🌙 **Napló**: rögzítés (cím, szöveg, hangulat, lucid kapcsoló, álomjel-címkék, dátum), lista, szerkesztés/törlés, kereső
- [x] 👁 **Reality Check**: véletlenszerű napi értesítések állítható időablakban + módszer-emlékeztető
- [x] 📊 **Insights**: lucid arány, streak, leggyakoribb álomjelek, hangulat-eloszlás
- [x] 📖 **Technikák**: útmutató-képernyők (tartalom kész)

### Extra MVP funkciók (jóváhagyva)
- [x] 🔒 **PIN / biometrikus zár** — app-belépéskor (free, bizalomépítő)
- [x] 🔥 **Streak + badgek** — napló-sorozat, mérföldkövek (első lucid álom, 10 lucid álom…) (free, megtartás)
- [x] ☁️ **Álomjel-felhő + naptár-hőtérkép** — vizuális elemzés (premium horog)

### Monetizáció-váz (MVP-ben struktúra, éles bekötés store-fázisban)
- [x] `PremiumContext` + `isPremium` flag (paywall dev-kapcsolóval tesztelhető)
- [x] `Locked` wrapper + Paywall képernyő
- [x] `lib/limits.js` — free limitek
- [x] `lib/ads.js` + `<AdBanner/>` (fejlesztésben no-op, élesben AdMob)

### Store-fázis
- [ ] `eas.json`, ikon (1024×1024), splash, screenshotok
- [ ] Privacy Policy (érzékeny adat — minden lokális!)
- [ ] GDPR/UMP consent, iOS ATT
- [ ] RevenueCat + AdMob valós bekötés (App ID-k, dev build)
- [ ] Onboarding képernyő + adat-export
- [ ] `STORE.md` lépésről-lépésre útmutató

---

## Későbbi fázisok (roadmap)
- [ ] 🤖 **AI álomértelmezés / összefoglaló** (erős premium horog)
- [ ] 🎙 **Hangalapú naplózás** (speech-to-text ébredéskor)
- [ ] ☁️ **Felhő-backup / szinkron** eszközök közt
- [ ] ⏰ **Okos ébresztő** (REM-ciklus becslés WBTB-hez)
- [ ] 🎧 **Nyugtató hangok / guided MILD meditáció**
- [ ] 🔊 **Audio cue WILD-hez** (REM-ablakban lejátszott trigger)
- [ ] 🎯 **Kihívások** (30 napos lucid challenge)
- [ ] 👥 **Anonim közösség / álom-feed + közös statisztikák**
- [ ] 🎨 **Témák / testreszabás, szimbólum-szótár**
- [ ] 📱 **Widget / lock-screen gyors rögzítés**
