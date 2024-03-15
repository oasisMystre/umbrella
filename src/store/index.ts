import { configureStore } from "@reduxjs/toolkit";

import { nftReducer } from "./slices/nft";
import { portfolioReducer } from "./slices/portfolio";
import { cNftReducer } from "./slices/cnft";

export const store = configureStore({
  reducer: {
    nft: nftReducer,
    cNft: cNftReducer,
    portfolio: portfolioReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
