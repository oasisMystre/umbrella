import moralis from "moralis";
import { createContext, useEffect, useState } from "react";

type MoralisContextParams = {
  instance?: typeof moralis;
};

export const MoralisContext = createContext<MoralisContextParams>({
  instance: undefined,
});

export default function MoralisProvider({ children }: React.PropsWithChildren) {
  const [instance, setInstance] = useState<typeof moralis>();

  useEffect(() => {
    moralis
      .start({
        apiKey: import.meta.env.VITE_APP_MORALIS_API_KEY!,
      })
      .then(() => setInstance(moralis));
  }, []);

  return (
    instance && (
      <MoralisContext.Provider value={{ instance }}>
        {children}
      </MoralisContext.Provider>
    )
  );
}
