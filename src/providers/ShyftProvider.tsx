import { createContext, useEffect, useState } from "react";

import { ShyftSdk, Network } from "@shyft-to/js";

type ShyftContextParams = {
  instance?: ShyftSdk;
};

export const ShyftContext = createContext<ShyftContextParams>({
  instance: undefined,
});

export default function ShyftProvider({ children }: React.PropsWithChildren) {
  const [instance, setInstance] = useState<ShyftSdk>();

  useEffect(() => {
    setInstance(
      new ShyftSdk({
        apiKey: import.meta.env.VITE_APP_SHYFT_API_KEY!,
        network: Network.Mainnet,
      })
    );
  }, []);

  return instance && (
    <ShyftContext.Provider value={{ instance }}>
      {children}
    </ShyftContext.Provider>
  );
}
