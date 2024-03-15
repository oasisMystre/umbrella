import { useEffect } from "react";

import { useWallet } from "@solana/wallet-adapter-react";

import useShyft from "./useShyft";
import { Asset } from "../lib/shyft";
import { LoadingState } from "../store/types";
import { getPortfolio } from "../store/slices/portfolio";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function usePortfolio(): [LoadingState, Asset | null] {
  const shyft = useShyft();
  const { publicKey } = useWallet();
  const dispatch = useAppDispatch();

  const { loadingState, portfolio } = useAppSelector(
    (state) => state.portfolio
  );

  useEffect(() => {
    if (publicKey)
      dispatch(getPortfolio({ shyft, address: import.meta.env.VITE_APP_TEST_ADDRESS! }))
        .unwrap()
        .catch(console.log);
  }, [publicKey]);

  return [loadingState, portfolio];
}
