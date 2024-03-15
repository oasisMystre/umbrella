import { useCallback, useEffect, useState } from "react";
import { Network, TokenBalance, TokenInfo } from "@shyft-to/js";

import useShyft from "./useShyft";

export default function useTokenInfo(token: Omit<TokenBalance, "info">) {
  const shyft = useShyft();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const getTokenInfo = useCallback(
    () =>
      shyft.token.getInfo({
        network: Network.Mainnet,
        tokenAddress: token.address,
      }),
    [token]
  );

  useEffect(() => {
    getTokenInfo().then(setTokenInfo);
  }, [token]);

  return tokenInfo;
}
