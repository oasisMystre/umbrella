import { useContext } from "react";
import { ShyftContext } from "../providers/ShyftProvider";

export default function useShyft() {
  return useContext(ShyftContext).instance!;
}
