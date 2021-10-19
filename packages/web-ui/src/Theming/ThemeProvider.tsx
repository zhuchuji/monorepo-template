import React, { createContext } from 'react';
import { createGlobalStyle } from 'styled-components';

interface IThemeConfig {
  color: {
    primary: string;
    secondary: string;
    warning: string;
    success: string;
    error: string;
  };
  iconfont: {
    source: string;
  };
}

export type ITheme = Partial<IThemeConfig>;

const DEFAULT_THEME: IThemeConfig = {
  color: {
    primary: '#F79807',
    secondary: '#F79807',
    warning: '#FAAD15',
    success: '#53C31C',
    error: '#FF4D4F',
  },
  iconfont: {
    source: 'https://at.alicdn.com/t/font_1999020_az72ovu8asp.js',
  },
};

const ThemeContext = createContext<IThemeConfig>(DEFAULT_THEME);

const ThemeProvider: React.FC<{ theme?: ITheme }> = ({ theme, children }) => (
  <ThemeContext.Provider value={mergeTheme(theme)}>
    <ResetStyle />
    {children}
  </ThemeContext.Provider>
);
export default ThemeProvider;
export { ThemeContext };

function mergeObject(toObject: any, fromObject: any): any {
  for (const key in fromObject) {
    if (fromObject[key] instanceof Array) {
      toObject[key] = fromObject[key];
    } else if (typeof fromObject[key] === 'object') {
      toObject[key] = {};
      mergeObject(toObject[key], fromObject[key]);
    } else {
      toObject[key] = fromObject[key];
    }
  }
}

function mergeTheme(theme: ITheme = {}): IThemeConfig {
  const mergedTheme: IThemeConfig = { ...DEFAULT_THEME };
  mergeObject(mergedTheme, theme);
  return mergedTheme;
}

const ResetStyle = createGlobalStyle`
html,
body,
p,
ol,
ul,
li,
dl,
dt,
dd,
blockquote,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}

ul {
  list-style: none;
}

button,
input,
select,
textarea {
  margin: 0;
}

html {
  box-sizing: border-box;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "Source Han Sans SC", "Source Han Sans CN", "Source Han Sans TC","WenQuanYi Micro Hei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.2;
}

a {
  text-decoration: none;
}

*, *::before, *::after {
  box-sizing: inherit;
}

img,
video {
  height: auto;
  max-width: 100%;
}

iframe {
  border: 0;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,
th {
  padding: 0;
}

td:not([align]),
th:not([align]) {
  text-align: left;
}
`;
