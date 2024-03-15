import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import useShyft from "./useShyft";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { cNftSelectors, getCNfts } from "../store/slices/cnft";

export default function useCNfts() {
  const shyft = useShyft();
  const { publicKey } = useWallet();
  const dispatch = useAppDispatch();

  const { loadingState, ...state } = useAppSelector((state) => state.cNft);
  const cNfts = cNftSelectors.selectAll(state);

  useEffect(() => {
    if (publicKey)
      dispatch(
        getCNfts({
          shyft,
          params: { walletAddress: publicKey.toBase58() },
        })
      )
        .unwrap()
        .catch(console.log);
  }, [publicKey]);

  return { loadingState, cNfts };
}
