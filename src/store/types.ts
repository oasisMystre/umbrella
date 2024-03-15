import { ShyftSdk } from "@shyft-to/js";

export type LoadingState = "idle" | "pending" | "success" | "failed";

export type GetParams = {
  shyft: ShyftSdk;
  address: string;
};
