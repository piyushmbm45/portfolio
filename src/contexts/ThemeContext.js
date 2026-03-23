import React, { createContext, useState } from 'react';

import { themeData } from '../data/themeData';
import {
  greenThemeLight,
  greenThemeDark,
  bwThemeLight,
  bwThemeDark,
  blueThemeLight,
  blueThemeDark,
  redThemeLight,
  redThemeDark,
  orangeThemeLight,
  orangeThemeDark,
  purpleThemeLight,
  purpleThemeDark,
  pinkThemeLight,
  pinkThemeDark,
  yellowThemeLight,
  yellowThemeDark,
} from '../theme/theme';

const themeMap = {
  '#3fc337': { light: greenThemeLight, dark: greenThemeDark },
  '#545fc4': { light: blueThemeLight, dark: blueThemeDark },
  '#f03939': { light: redThemeLight, dark: redThemeDark },
  '#f56539': { light: orangeThemeLight, dark: orangeThemeDark },
  '#823ae0': { light: purpleThemeLight, dark: purpleThemeDark },
  '#ff4f93': { light: pinkThemeLight, dark: pinkThemeDark },
  '#E9AD35': { light: yellowThemeLight, dark: yellowThemeDark },
  '#000000': { light: bwThemeLight, dark: bwThemeDark },
  '#B6B6B6': { light: bwThemeLight, dark: bwThemeDark },
};

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
      const { color, mode } = JSON.parse(saved);
      const entry = themeMap[color];
      if (entry) return mode === 'dark' ? entry.dark : entry.light;
    }
  } catch (e) {
    // ignore
  }
  return themeData.theme;
}

export const ThemeContext = createContext();

function ThemeContextProvider(props) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const setHandleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem(
        'portfolio-theme',
        JSON.stringify({
          color: newTheme.primary,
          mode: newTheme.type,
        })
      );
    } catch (e) {
      // ignore
    }
  };

  const value = { theme, drawerOpen, setHandleDrawer, changeTheme };
  return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>;
}

export default ThemeContextProvider;
