import { useEffect } from "react";

import { Portfolio } from "@shyft-to/js";
import { useWallet } from "@solana/wallet-adapter-react";

import useShyft from "./useShyft";
import { LoadingState } from "../store/types";
import { getPortfolio } from "../store/slices/portfolio";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function usePortfolio(): [LoadingState, Portfolio | null] {
  const shyft = useShyft();
  const { publicKey } = useWallet();
  const dispatch = useAppDispatch();

  const { loadingState, portfolio } = useAppSelector(
    (state) => state.portfolio
  );

  useEffect(() => {
    dispatch(getPortfolio({ shyft, address: publicKey!.toBase58() }))
      .unwrap()
      .catch(console.log);
  }, []);

  return [loadingState, portfolio];
}
