import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./app/store";
import InternetConnectionService from "./services/internetConnectionService";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
      <QueryClientProvider client={queryClient}>
  <Provider store={store}>
      <InternetConnectionService>
        <Router>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </Router>
  </InternetConnectionService>
    </Provider>
      </QueryClientProvider>
);
