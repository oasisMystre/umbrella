import clsx from "clsx";
import { useState } from "react";
import { MdClose } from "react-icons/md";

import { Tab } from "@headlessui/react";
import { NftMetadata, TokenBalance } from "@shyft-to/js";

import usePortfolio from "../composables/usePortfolio";

import { AssetNft } from "./AssetNft";
import AssetError from "./AssetError";
import AssetEmpty from "./AssetEmpty";
import { AssetToken } from "./AssetTokenTab";
import LoadingTemplate, { LoadingWrapper } from "./LoadingTemplate";

type AssetDialogProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AssetDialog({ visible, setVisible }: AssetDialogProps) {
  const [loadingState, portfolio] = usePortfolio();
  const [selectedAssets, setSelectedAssets] = useState<
    Map<string, Omit<TokenBalance, "info"> | NftMetadata>
  >(new Map());

  return (
    <div className="fixed inset-0 flex flex-col bg-black/50 lt-md:pt-16 md:items-center md:justify-center overflow-y-scroll">
      <div
        className={clsx(
          "flex-1 flex flex-col space-y-8 bg-stone-950 py-4 rounded-t-xl md:rounded-b-xl md:min-w-lg md:max-h-sm",
          { "animate-bounce-in": visible }
        )}
      >
        <header className="flex items-center px-2">
          <button
            className="icon-btn"
            onClick={() => setVisible(false)}
          >
            <MdClose />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-extrabold">Assets</h1>
            <p className="text-stone-300">Select assets you want to transfer</p>
          </div>
          <div>
            {selectedAssets.size > 0 && (
              <button className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-500/70 active:bg-green-600">
                Transfer
              </button>
            )}
          </div>
        </header>
        <Tab.Group
          as="div"
          className="flex-1 flex flex-col space-y-4 px-4 overflow-y-scroll"
        >
          <Tab.List className="flex space-x-4">
            <Tab>
              {({ selected }) => (
                <button
                  className={clsx([selected ? "tab-active" : "tab-inactive"])}
                >
                  Tokens
                </button>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <button
                  className={clsx([selected ? "tab-active" : "tab-inactive"])}
                >
                  Nfts
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="flex-1 flex flex-col">
            <Tab.Panel className="flex-1 flex flex-col space-y-2 overflow-y-scroll">
              <LoadingTemplate
                state={loadingState}
                failed={<AssetError />}
                loading={<LoadingWrapper children={<AssetToken.Template />} />}
                success={() => {
                  return portfolio && portfolio.tokens.length > 0 ? (
                    portfolio.tokens.map((token, index) => (
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
            <Tab.Panel
              className={clsx(
                "flex-1 grid gap-2",
                loadingState === "failed" ||
                  (portfolio && portfolio.nfts.length < 1)
                  ? "grid-cols-1"
                  : "grid-cols-3"
              )}
            >
              <LoadingTemplate
                state={loadingState}
                failed={<AssetError />}
                loading={<LoadingWrapper children={<AssetNft.Template />} />}
                success={() => {
                  return portfolio && portfolio.nfts.length > 0 ? (
                    portfolio.nfts.map((nft, index) => (
                      <AssetNft.Item
                        key={index}
                        nft={nft}
                        selected={selectedAssets.has(nft.address)}
                        onSelected={(token, checked) => {
                          setSelectedAssets((assets) => {
                            if (checked) assets.set(token.address, nft);
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
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
