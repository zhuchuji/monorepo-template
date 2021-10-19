---
name: README
menu: web-ui
---

# @live/web-ui

### Getting start

```bash
npm install @live/web-ui
```

Be aware that you must include the `ThemeProvider` first.

```tsx
// App.tsx
import { ThemeProvider } from '@live/web-ui';
const App = () => (
  <ThemeProvider>
    <Page />
  </ThemeProvider>
);

// Page.tsx
import { Button } from '@live/web-ui';
const Page = () => <Button>button</Button>;
```
