// Ad abstraction. In development / Expo Go this is a no-op so nothing breaks.
// In the store build, wire react-native-google-mobile-ads here and gate every
// call on isPremium (premium users see no ads).
//
// Usage:
//   import { showInterstitialMaybe } from '../lib/ads';
//   await showInterstitialMaybe({ isPremium, dreamCount });
import { LIMITS } from './limits';

let interstitialLoaded = false;

export function initAds() {
  // Placeholder: AdMob init goes here in the native build.
  interstitialLoaded = true;
}

// Show an interstitial only for free users, every Nth dream save.
export async function showInterstitialMaybe({ isPremium, dreamCount }) {
  if (isPremium) return false;
  if (!dreamCount || dreamCount % LIMITS.adEvery !== 0) return false;
  // Placeholder: interstitial.show() in the native build.
  return false;
}

// Whether a banner should render (free users only).
export function shouldShowBanner(isPremium) {
  return !isPremium;
}
