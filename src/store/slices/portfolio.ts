import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ShyftSdk } from "@shyft-to/js";

import { LoadingState } from "../types";
import { Asset, loadPortfolio } from "../../lib/shyft";

type GetPortfolioParams = {
  shyft: ShyftSdk;
  address: string;
};

export const getPortfolio = createAsyncThunk(
  "portfolia/getPortfolio",
  ({ shyft, address }: GetPortfolioParams) => loadPortfolio(shyft, address)
);

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    loadingState: "idle" as LoadingState,
    portfolio: null as Asset | null,
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
