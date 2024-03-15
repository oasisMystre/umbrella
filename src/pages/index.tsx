import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import AssetDialog from "../components/AssetDialog";
import { useState } from "react";

export default function HomePage() {
  const { connected } = useWallet();
  const [assetDialogVisible, setAssetDialogVisible] = useState(false);

  return (
    <>
      <div className="p-4 flex space-x-4">
        <WalletMultiButton />
        {connected && (
          <button
            className="bg-violet-800 px-4 py-2 text-white rounded"
            onClick={() => setAssetDialogVisible(true)}
          >
            Select Assets
          </button>
        )}
      </div>
      {assetDialogVisible && (
        <AssetDialog
          visible={assetDialogVisible}
          setVisible={setAssetDialogVisible}
        />
      )}
    </>
  );
}
