import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import GlobalStyles from "./components/GlobalStyles";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const container = document.getElementById("root");

const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <GlobalStyles>
                <App />
                {/* <ReactQueryDevtools /> */}
            </GlobalStyles>
        </Provider>
    </QueryClientProvider>
);
