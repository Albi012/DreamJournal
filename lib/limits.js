// Free-tier limits. Everything here is lifted for premium users.
export const LIMITS = {
  // Journal: how many past dreams a free user can browse (writing is unlimited).
  freeArchive: 14,
  // Reality check reminders per day.
  freeReminders: 3,
  premiumReminders: 12,
  // Techniques available on free tier (rest are premium).
  freeTechniques: ['journal', 'reality-checks'],
  // Interstitial ad cadence for free users (every Nth dream save).
  adEvery: 4,
};
