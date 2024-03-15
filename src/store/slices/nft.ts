import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Nft } from "@shyft-to/js";

import { GetParams, LoadingState } from "../types";

type Param = { page?: number } & GetParams;

export const fetchNfts = ({ shyft, address, page }: Param) =>
  shyft.nft.getNftsByOwnerV2({
    page,
    owner: address,
  });

export const getNfts = createAsyncThunk("nft/getNfts", fetchNfts);

export const nftAdapter = createEntityAdapter({
  selectId: (model: Nft) => model.mint,
});

type NftState = {
  totalPage: number;
  loadingState: LoadingState;
};

export const nftSlice = createSlice({
  name: "nft",
  initialState: nftAdapter.getInitialState<NftState>({
    totalPage: 0,
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
        state.totalPage = payload.total_pages;
        nftAdapter.setAll(state, payload.nfts);
      });
  },
});

export const nftReducer = nftSlice.reducer;
export const nftActions = nftSlice.actions;
export const nftSelectors = nftAdapter.getSelectors();
