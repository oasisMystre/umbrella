import { ShyftSdk, TokenBalance, TokenInfo } from "@shyft-to/js";

import { Cache } from "./cache";

async function getTokenInfo(shyft: ShyftSdk, address: string) {
  const cachedInfo = Cache.instance.get<TokenInfo>(address);
  if (cachedInfo) return cachedInfo;

  const networkInfo = await shyft.token.getInfo({
    tokenAddress: address,
  });

  Cache.instance.set(address, networkInfo);

  return networkInfo;
}

export async function loadPortfolio(shyft: ShyftSdk, wallet: string) {
  const portfolio = await shyft.wallet.getPortfolio({
    wallet,
  });

  const solanaTokenInfo = {
    address: wallet,
    balance: portfolio.sol_balance,
    info: {
      name: "Solana",
      symbol: "SOL",
      image: "/sol.png",
    },
  } as unknown as Omit<TokenBalance, "info"> & { info: TokenInfo };

  const tokens = (
    await Promise.all(
      portfolio.tokens.map(async (token) => {
        const info = await getTokenInfo(shyft, token.address).catch(() => null);
        return {
          ...token,
          info,
        };
      })
    )
  )
    .concat([solanaTokenInfo])
    .reverse();

  const nfts = portfolio.nfts;

  return { ...portfolio, tokens, nfts };
}

export type Asset = Awaited<ReturnType<typeof loadPortfolio>>;
export type AssetInfo = Asset["tokens"][number];
