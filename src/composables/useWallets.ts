import { useMemo } from "react";
import {
  PhantomWalletAdapter,
  WalletConnectWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export default function useWallets() {
  return useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new WalletConnectWalletAdapter({
        network: WalletAdapterNetwork.Mainnet,
        options: {},
      }),
    ],
    []
  );
}
