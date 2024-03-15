import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Portfolio, ShyftSdk } from "@shyft-to/js";

import { LoadingState } from "../types";

type GetPortfolioParams = {
  shyft: ShyftSdk;
  address: string;
};

export const getPortfolio = createAsyncThunk(
  "portfolia/getPortfolio",
  ({ shyft, address }: GetPortfolioParams) =>
    shyft.wallet.getPortfolio({ wallet: address })
);

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    loadingState: "idle" as LoadingState,
    portfolio: null as Portfolio | null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPortfolio.pending, (state) => {
        state.loadingState = "pending";
      })
      .addCase(getPortfolio.rejected, (state) => {
        state.loadingState = "failed";
      })
      .addCase(getPortfolio.fulfilled, (state, { payload }) => {
        state.loadingState = "success";
        state.portfolio = payload;
      });
  },
});


export const portfolioReducer = portfolioSlice.reducer;