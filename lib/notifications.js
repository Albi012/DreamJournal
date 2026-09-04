import * as Notifications from 'expo-notifications';

// Native-only module: guard so an unsupported platform (web) can't crash the app.
try {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
} catch (e) {}

const PROMPTS = [
  'Álmodsz most? Végezz egy reality checket! 👁',
  'Nézz a kezedre — valóság vagy álom?',
  'Fogd be az orrod. Tudsz lélegezni?',
];

// Schedule N daily repeating reminders at spread-out random times within
// the [startHour, endHour] window.
export async function scheduleReminders(settings) {
  await cancelReminders();
  const { reminderCount, startHour, endHour } = settings;
  const span = Math.max(1, endHour - startHour);
  const step = span / reminderCount;

  for (let i = 0; i < reminderCount; i++) {
    const base = startHour + step * i;
    const jitter = Math.random() * step;
    const at = base + jitter;
    const hour = Math.min(23, Math.floor(at));
    const minute = Math.floor((at - hour) * 60);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Lucida',
        body: PROMPTS[i % PROMPTS.length],
      },
      trigger: { hour, minute, repeats: true },
    });
  }
}

export async function cancelReminders() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (e) {}
}
