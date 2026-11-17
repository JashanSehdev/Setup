"use client";
import { ReactNode } from "react";
import Snackbar from "./snackbar";
import ReduxProvider from "./redux-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { shadcnDarkTheme } from "./mui-theme";
import AuthNavigator from "./auth-navigator.provider";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={shadcnDarkTheme}>
      <CssBaseline />
      <ReduxProvider>
        <AuthNavigator>
          <Snackbar>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </Snackbar>
        </AuthNavigator>
      </ReduxProvider>
    </ThemeProvider>
  );
}
