import React from 'react';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { theme } from '../../lib/theme';
import { MoonIcon, EyeIcon, ChartIcon, BookIcon } from '../../components/Icons';

const c = theme.colors;

export default function TabsLayout() {
  const { t } = useTranslation();
  const color = (focused) => (focused ? c.primary : c.textFaint);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.textFaint,
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 24,
          height: 64,
          borderRadius: 24,
          backgroundColor: '#fff',
          borderTopWidth: 0,
          paddingBottom: 0,
          shadowColor: '#96788c',
          shadowOpacity: 0.16,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          elevation: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: 2 },
        tabBarItemStyle: { paddingTop: 10 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.journal'),
          tabBarIcon: ({ focused }) => <MoonIcon size={23} color={color(focused)} />,
        }}
      />
      <Tabs.Screen
        name="reality"
        options={{
          title: t('tabs.reality'),
          tabBarIcon: ({ focused }) => <EyeIcon size={23} color={color(focused)} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: t('tabs.insights'),
          tabBarIcon: ({ focused }) => <ChartIcon size={23} color={color(focused)} />,
        }}
      />
      <Tabs.Screen
        name="techniques"
        options={{
          title: t('tabs.techniques'),
          tabBarIcon: ({ focused }) => <BookIcon size={23} color={color(focused)} />,
        }}
      />
    </Tabs>
  );
}
