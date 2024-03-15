import clsx from "clsx";
import { MdClose } from "react-icons/md";

import { Tab } from "@headlessui/react";

import { assetTabs } from "../config/tabs";
import useNfts from "../composables/useNfts";
import useCNfts from "../composables/useCNfts";
import usePortfolio from "../composables/usePortfolio";

import NftTab from "./NftTab";
import TokenTab from "./TokenTab";

type AssetDialogProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AssetDialog({ visible, setVisible }: AssetDialogProps) {
  const [loadingState, portfolio] = usePortfolio();
  const { loadingState: nftsLoadingState, nfts } = useNfts();
  const { loadingState: cNftsLoadingState, cNfts } = useCNfts();

  return (
    <div className="fixed inset-0 flex flex-col bg-black/50 lt-md:pt-16 md:items-center md:justify-center overflow-y-scroll">
      <div
        className={clsx(
          "flex-1 flex flex-col space-y-8 bg-stone-950 pt-4 rounded-t-xl md:rounded-b-xl md:min-w-lg md:max-h-lg overflow-y-scroll",
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
        </header>
        <Tab.Group
          as="div"
          className="flex-1 flex flex-col space-y-4 px-4 overflow-y-scroll"
        >
          <Tab.List className="flex space-x-4">
            {assetTabs.map((tab, index) => (
              <Tab key={index}>
                {({ selected }) => (
                  <button
                    className={clsx([selected ? "tab-active" : "tab-inactive"])}
                  >
                    {tab}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="flex-1 flex flex-col overflow-y-scroll">
            <TokenTab
              state={loadingState}
              tokens={portfolio?.tokens ?? []}
            />
            
            <NftTab
              key="nfts"
              state={nftsLoadingState}
              nfts={nfts}
            />
            <NftTab
              key="cnfts"
              state={cNftsLoadingState}
              nfts={cNfts}
            />
          </Tab.Panels>
        </Tab.Group>
        <div className="lt-md:absolute bottom-0 inset-x-0 flex flex-col p-4">
          <button className="w-full bg-purple-800 py-3 rounded-md hover:bg-purple-800/70 active:bg-purple-800">
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
