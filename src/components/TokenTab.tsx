import { useState } from "react";
import { Tab } from "@headlessui/react";

import { AssetInfo } from "../lib/shyft";
import { LoadingState } from "../store/types";

import AssetEmpty from "./AssetEmpty";
import AssetError from "./AssetError";
import { AssetToken } from "./AssetToken";
import LoadingTemplate, { LoadingWrapper } from "./LoadingTemplate";

type TokenTabProps = {
  state: LoadingState;
  tokens: AssetInfo[];
};

export default function TokenTab({ state, tokens }: TokenTabProps) {
  const [selectedAssets, setSelectedAssets] = useState<Map<string, AssetInfo>>(
    new Map()
  );
  return (
    <Tab.Panel className="flex-1 flex flex-col space-y-2 overflow-y-scroll">
      <LoadingTemplate
        state={state}
        failed={<AssetError />}
        loading={<LoadingWrapper children={<AssetToken.Template />} />}
        success={() => {
          return tokens.length > 0 ? (
            tokens.map((token, index) => (
              <AssetToken.Item
                key={index}
                token={token}
                selected={selectedAssets.has(token.address)}
                onSelected={(token, checked) => {
                  setSelectedAssets((assets) => {
                    if (checked) assets.set(token.address, token);
                    else assets.delete(token.address);
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
    </Tab.Panel>
  );
}
