import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Nft, ShyftSdk } from "@shyft-to/js";

import { GetParams, LoadingState } from "../types";

type Param = {
  params: Parameters<ShyftSdk["nft"]["getNftsByOwnerV2"]>[number];
} & Omit<GetParams, "address">;

export const fetchNfts = ({ shyft, params }: Param) =>
  shyft.nft.getNftByOwner(params);

export const getNfts = createAsyncThunk("nft/getNfts", fetchNfts);

export const nftAdapter = createEntityAdapter({
  selectId: (model: Nft) => model.mint,
});

type NftState = {
  loadingState: LoadingState;
};

export const nftSlice = createSlice({
  name: "nft",
  initialState: nftAdapter.getInitialState<NftState>({
    loadingState: "idle",
  }),
  reducers: {
    addMany: nftAdapter.addMany,
  },
  extraReducers(builder) {
    builder
      .addCase(getNfts.pending, (state) => {
        state.loadingState = "pending";
      })
      .addCase(getNfts.rejected, (state) => {
        state.loadingState = "failed";
      })
      .addCase(getNfts.fulfilled, (state, { payload }) => {
        state.loadingState = "success";
        nftAdapter.setAll(state, payload);
      });
  },
});

export const nftReducer = nftSlice.reducer;
export const nftActions = nftSlice.actions;
export const nftSelectors = nftAdapter.getSelectors();
