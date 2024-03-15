import { useContext } from "react";
import { MoralisContext } from "../providers/MoralisProvider";

export default function useMoralis() {
  return useContext(MoralisContext).instance!;
}
