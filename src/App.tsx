import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import { store } from "./store";
import MoralisProvider from "./providers/MoralisProvider";
import ShyftProvider from "./providers/ShyftProvider";
import useWallets from "./composables/useWallets";

type AppProps = {
  router: ReturnType<typeof createBrowserRouter>;
};

export default function App({ router }: AppProps) {
  const wallets = useWallets();

  return (
    <MoralisProvider>
      <ShyftProvider>
        <ConnectionProvider
          endpoint={import.meta.env.VITE_APP_SOLANA_RPC_ENDPOINT!}
        >
          <WalletProvider wallets={wallets} autoConnect>
            <Provider store={store}>
              <WalletModalProvider>
                <div className="fixed inset-0 bg-black text-white flex flex-col font-sans">
                  <RouterProvider router={router} />
                </div>
              </WalletModalProvider>
            </Provider>
          </WalletProvider>
        </ConnectionProvider>
      </ShyftProvider>
    </MoralisProvider>
  );
}
