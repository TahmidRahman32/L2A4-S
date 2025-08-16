import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { ThemeProvider } from "./components/theme-provider.tsx";
import { RouterProvider } from "react-router";
import router from "./Router/index.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <Provider store={store}>
            <RouterProvider router={router} />
            <Toaster />
         </Provider>
      </ThemeProvider>
   </StrictMode>
);
