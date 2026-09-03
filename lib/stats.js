// Derived stats: streak, lucid rate, dream signs, mood breakdown, badges.

const DAY = 24 * 60 * 60 * 1000;

function dayKey(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// Consecutive-day journaling streak ending today (or yesterday).
export function computeStreak(dreams) {
  if (!dreams.length) return 0;
  const days = new Set(dreams.map((d) => dayKey(d.date || d.createdAt)));
  let streak = 0;
  let cursor = new Date();
  // Allow the streak to count if the user hasn't logged *today* yet but did yesterday.
  if (!days.has(dayKey(cursor.getTime()))) cursor = new Date(cursor.getTime() - DAY);
  while (days.has(dayKey(cursor.getTime()))) {
    streak += 1;
    cursor = new Date(cursor.getTime() - DAY);
  }
  return streak;
}

export function lucidStats(dreams) {
  const total = dreams.length;
  const lucid = dreams.filter((d) => d.lucid).length;
  const rate = total ? Math.round((lucid / total) * 100) : 0;
  return { total, lucid, rate };
}

// Tag frequency, most common first. [{ tag, count }]
export function dreamSigns(dreams, limit = 12) {
  const counts = {};
  dreams.forEach((d) =>
    (d.tags || []).forEach((t) => {
      const key = String(t).trim().toLowerCase();
      if (key) counts[key] = (counts[key] || 0) + 1;
    })
  );
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function moodBreakdown(dreams) {
  const counts = {};
  dreams.forEach((d) => {
    const m = d.mood || 'neutral';
    counts[m] = (counts[m] || 0) + 1;
  });
  return counts;
}

// Last N days activity for the heatmap. Returns [{ date, count, lucid }]
export function activityByDay(dreams, days = 84) {
  const map = {};
  dreams.forEach((d) => {
    const k = dayKey(d.date || d.createdAt);
    if (!map[k]) map[k] = { count: 0, lucid: 0 };
    map[k].count += 1;
    if (d.lucid) map[k].lucid += 1;
  });
  const out = [];
  for (let i = days - 1; i >= 0; i--) {
    const ts = Date.now() - i * DAY;
    const k = dayKey(ts);
    out.push({ ts, ...(map[k] || { count: 0, lucid: 0 }) });
  }
  return out;
}

// Earned milestone badges (keys map to badges.* i18n strings).
export function earnedBadges(dreams) {
  const { total, lucid } = lucidStats(dreams);
  const streak = computeStreak(dreams);
  return {
    firstDream: total >= 1,
    firstLucid: lucid >= 1,
    streak7: streak >= 7,
    streak30: streak >= 30,
    lucid10: lucid >= 10,
    dreams50: total >= 50,
  };
}
