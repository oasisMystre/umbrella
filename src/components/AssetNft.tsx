import { Portfolio } from "@shyft-to/js";

export namespace AssetNft {
  type ItemProps = {
    selected: boolean;
    nft: Portfolio["nfts"][number];
    onSelected: (item: Portfolio["nfts"][number], checked: boolean) => void;
  };
  export function Item({ nft, selected, onSelected }: ItemProps) {
    return (
      <div className="relative h-36 flex flex-col bg-stone-800/50 rounded-md">
        <input
          checked={selected}
          type="checkbox"
          className="absolute left-2 top-2"
          onChange={() => onSelected(nft, !selected)}
        />
        <div className="flex-1">
          {nft.json && "image" in nft.json && (
            <img
              src={nft.json.image as string}
              className="w-full h-full object-full"
            />
          )}
        </div>
        <div className="absolute bottom-0 inset-x-0  p-2 bg-white/10 p-2 rounded-b-md">
          <p className="truncate">{nft.name}</p>
        </div>
      </div>
    );
  }

  export function Template() {
    return (
      <div className="relative h-36 flex flex-col bg-stone-800/50 rounded-md animate-pulse">
        <div className="absolute left-2 top-2 w-6 h-6 bg-white/20 rounded-md" />
        <div className="flex-1" />
        <div className="absolute bottom-0 inset-x-0 bg-white/10 p-2 rounded-b-md">
          <p className="h-6 bg-white/20 truncate rounded-md"></p>
        </div>
      </div>
    );
  }
}
