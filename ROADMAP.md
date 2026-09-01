# Dream Journal — Roadmap

Lucid dreaming app · Expo + React Native · iOS + Android · freemium modell.

## Tech stack
- Expo + React Native (expo-router, expo-notifications)
- **Auth: Firebase Authentication — Google Sign-In**
- **Adat: Cloud Firestore, offline-first (beépített offline persistence) + auto-szinkron**
  - `users/{uid}/dreams/{id}`, `users/{uid}/settings`, premium a `uid`-hez kötve
  - Működik offline/repülőmódban, net esetén automatikusan szinkronizál eszközök közt
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
- [ ] i18next + expo-localization beállítás, eszköz-nyelv detektálás + nyelvváltó
- [ ] `locales/hu.json`, `locales/en.json`, `locales/de.json` (UI-feliratok)
- [ ] Technika-tartalmak fordítása mindhárom nyelvre
- [ ] Minden UI-szöveg kulcson keresztül (nincs beégetett string)

### Auth & adat
- [ ] Firebase projekt + Google Sign-In (bejelentkező képernyő, `AuthContext`)
- [ ] Firestore `lib/db.js` (offline persistence + szinkron), a régi AsyncStorage-réteg lecserélése

### Fő funkciók — 4 fül
- [x] Technika-tartalmak (Napló, Reality checks, MILD, WBTB, WILD, Álomjelek)
- [ ] 🌙 **Napló**: rögzítés (cím, szöveg, hangulat, lucid kapcsoló, álomjel-címkék, dátum), lista, szerkesztés/törlés, kereső
- [ ] 👁 **Reality Check**: véletlenszerű napi értesítések állítható időablakban + módszer-emlékeztető
- [ ] 📊 **Insights**: lucid arány, streak, leggyakoribb álomjelek, hangulat-eloszlás
- [ ] 📖 **Technikák**: útmutató-képernyők (tartalom kész)

### Extra MVP funkciók (jóváhagyva)
- [ ] 🔒 **PIN / biometrikus zár** — app-belépéskor (free, bizalomépítő)
- [ ] 🔥 **Streak + badgek** — napló-sorozat, mérföldkövek (első lucid álom, 10 lucid álom…) (free, megtartás)
- [ ] ☁️ **Álomjel-felhő + naptár-hőtérkép** — vizuális elemzés (premium horog)

### Monetizáció-váz (MVP-ben struktúra, éles bekötés store-fázisban)
- [ ] `PremiumContext` + `isPremium` flag (fejlesztésben kézzel kapcsolható)
- [ ] `Locked` wrapper + Paywall képernyő
- [ ] `lib/limits.js` — free limitek
- [ ] `lib/ads.js` + `<AdBanner/>` (fejlesztésben no-op, élesben AdMob)

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
