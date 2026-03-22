import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import {
  greenThemeLight, greenThemeDark,
  bwThemeLight, bwThemeDark,
  blueThemeLight, blueThemeDark,
  redThemeLight, redThemeDark,
  orangeThemeLight, orangeThemeDark,
  purpleThemeLight, purpleThemeDark,
  pinkThemeLight, pinkThemeDark,
  yellowThemeLight, yellowThemeDark,
} from '../../theme/theme';
import './ThemeSwitcher.css';

const themes = [
  { name: 'Green', light: greenThemeLight, dark: greenThemeDark, color: '#3fc337' },
  { name: 'Blue', light: blueThemeLight, dark: blueThemeDark, color: '#545fc4' },
  { name: 'Red', light: redThemeLight, dark: redThemeDark, color: '#f03939' },
  { name: 'Orange', light: orangeThemeLight, dark: orangeThemeDark, color: '#f56539' },
  { name: 'Purple', light: purpleThemeLight, dark: purpleThemeDark, color: '#823ae0' },
  { name: 'Pink', light: pinkThemeLight, dark: pinkThemeDark, color: '#ff4f93' },
  { name: 'Yellow', light: yellowThemeLight, dark: yellowThemeDark, color: '#E9AD35' },
  { name: 'B&W', light: bwThemeLight, dark: bwThemeDark, color: '#B6B6B6' },
];

function ThemeSwitcher() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const handleThemeChange = (themeOption, isDark) => {
    changeTheme(isDark ? themeOption.dark : themeOption.light);
  };

  const isDark = theme.type === 'dark';

  return (
    <div className="theme-switcher">
      <button
        className="theme-switcher-toggle"
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: theme.primary,
          color: theme.secondary,
        }}
        aria-label="Toggle theme switcher"
      >
        {open ? '✕' : '🎨'}
      </button>
      {open && (
        <div
          className="theme-switcher-panel"
          style={{
            backgroundColor: theme.secondary,
            border: `2px solid ${theme.primary30}`,
          }}
        >
          <div className="theme-switcher-mode">
            <button
              className={`mode-btn ${!isDark ? 'active' : ''}`}
              onClick={() => {
                const currentTheme = themes.find(t => t.color === theme.primary);
                if (currentTheme) handleThemeChange(currentTheme, false);
              }}
              style={{
                backgroundColor: !isDark ? theme.primary : 'transparent',
                color: !isDark ? theme.secondary : theme.tertiary,
                border: `2px solid ${theme.primary}`,
              }}
            >
              Light
            </button>
            <button
              className={`mode-btn ${isDark ? 'active' : ''}`}
              onClick={() => {
                const currentTheme = themes.find(t => t.color === theme.primary);
                if (currentTheme) handleThemeChange(currentTheme, true);
              }}
              style={{
                backgroundColor: isDark ? theme.primary : 'transparent',
                color: isDark ? theme.secondary : theme.tertiary,
                border: `2px solid ${theme.primary}`,
              }}
            >
              Dark
            </button>
          </div>
          <div className="theme-switcher-colors">
            {themes.map((t) => (
              <button
                key={t.name}
                className={`color-btn ${theme.primary === t.color ? 'active' : ''}`}
                onClick={() => handleThemeChange(t, isDark)}
                style={{ backgroundColor: t.color }}
                aria-label={`${t.name} theme`}
                title={t.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeSwitcher;
