import { Network, ShyftSdk } from "@shyft-to/js";
import { loadPortfolio } from "./shyft";

async function main() {
  const shyft = new ShyftSdk({
    network: Network.Mainnet,
    apiKey: process.env.VITE_APP_SHYFT_API_KEY!,
  });

  const info = await loadPortfolio(
    shyft,
    "E9Sq8hSnH4zSuScu53gykLEFCqrVU9DD1i6FjD4Et5Mf"
  );
  console.log(info);
}

main().catch(console.log);
