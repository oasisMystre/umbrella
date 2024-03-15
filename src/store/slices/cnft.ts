import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Nft, ShyftSdk } from "@shyft-to/js";

import { GetParams, LoadingState } from "../types";

type Param = {
  params: Parameters<ShyftSdk["nft"]["compressed"]["readAll"]>[number];
} & Omit<GetParams, "address">;

export const fetchCNfts = ({ shyft, params }: Param) =>
  shyft.nft.compressed.readAll(params);

export const getCNfts = createAsyncThunk("nft/getCNfts", fetchCNfts);

export const cNftAdapter = createEntityAdapter({
  selectId: (model: Nft) => model.mint,
});

type CNftState = {
  loadingState: LoadingState;
};

export const cNftSlice = createSlice({
  name: "cnft",
  initialState: cNftAdapter.getInitialState<CNftState>({
    loadingState: "idle",
  }),
  reducers: {
    addMany: cNftAdapter.addMany,
  },
  extraReducers(builder) {
    builder
      .addCase(getCNfts.pending, (state) => {
        state.loadingState = "pending";
      })
      .addCase(getCNfts.rejected, (state) => {
        state.loadingState = "failed";
      })
      .addCase(getCNfts.fulfilled, (state, { payload }) => {
        state.loadingState = "success";
        cNftAdapter.setAll(state, payload);
      });
  },
});

export const cNftReducer = cNftSlice.reducer;
export const cNftActions = cNftSlice.actions;
export const cNftSelectors = cNftAdapter.getSelectors();
