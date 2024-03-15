import clsx from "clsx";
import { Nft } from "@shyft-to/js";

import { useState } from "react";
import { Tab } from "@headlessui/react";

import { LoadingState } from "../store/types";

import AssetEmpty from "./AssetEmpty";
import AssetError from "./AssetError";
import { AssetNft } from "./AssetNft";
import LoadingTemplate, { LoadingWrapper } from "./LoadingTemplate";


type NftTabProps = {
  state: LoadingState;
  nfts: Nft[];
};

export default function NftTab({ state, nfts }: NftTabProps) {
  const [selectedAssets, setSelectedAssets] = useState<Map<string, Nft>>(
    new Map()
  );

  return (
    <Tab.Panel className="flex-1 flex flex-col space-y-4">
      <div
        className={clsx(
          "flex-1 grid gap-2 pb-16",
          state === "failed" || (state === "success" && nfts.length < 1)
            ? "grid-cols-1"
            : "grid-cols-3"
        )}
      >
        <LoadingTemplate
          state={state}
          failed={<AssetError />}
          loading={<LoadingWrapper children={<AssetNft.Template />} />}
          success={() => {
            return nfts.length > 0 ? (
              nfts.map((nft, index) => (
                <AssetNft.Item
                  key={index}
                  nft={nft}
                  selected={selectedAssets.has(nft.mint)}
                  onSelected={(nft, checked) => {
                    setSelectedAssets((assets) => {
                      if (checked) assets.set(nft.mint, nft);
                      else assets.delete(nft.mint);
                      return new Map(assets);
                    });
                  }}
                />
              ))
            ) : (
              <AssetEmpty />
            );
          }}
        />
      </div>
    </Tab.Panel>
  );
}
