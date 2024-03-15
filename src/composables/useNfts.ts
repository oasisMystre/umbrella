import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchNfts,
  getNfts,
  nftActions,
  nftSelectors,
} from "../store/slices/nft";
import useShyft from "./useShyft";

export default function useNfts() {
  const shyft = useShyft();
  const { publicKey } = useWallet();
  const dispatch = useAppDispatch();

  const { loadingState, totalPage, ...state } = useAppSelector(
    (state) => state.nft
  );
  const nfts = nftSelectors.selectAll(state);

  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    if (publicKey)
      dispatch(getNfts({ shyft, address: publicKey.toBase58() }))
        .unwrap()
        .catch(console.log);
  }, [publicKey]);

  const loadMore = async () => {
    const { nfts, page } = await fetchNfts({
      shyft,
      address: publicKey!.toBase58(),
    });

    setPage(page);
    dispatch(nftActions.addMany(nfts));
  };

  return { loadingState, nfts, loadMore, canLoadMore: page < totalPage };
}
