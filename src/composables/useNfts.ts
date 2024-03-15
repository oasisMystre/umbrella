import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getNfts, nftSelectors } from "../store/slices/nft";
import useShyft from "./useShyft";

export default function useNfts() {
  const shyft = useShyft();
  const { publicKey } = useWallet();
  const dispatch = useAppDispatch();

  const { loadingState, ...state } = useAppSelector((state) => state.nft);
  const nfts = nftSelectors.selectAll(state);

  useEffect(() => {
    if (publicKey)
      dispatch(
        getNfts({
          shyft,
          params: { owner: import.meta.env.VITE_APP_TEST_ADDRESS! },
        })
      )
        .unwrap()
        .catch(console.log);
  }, [publicKey]);

  return { loadingState, nfts };
}
