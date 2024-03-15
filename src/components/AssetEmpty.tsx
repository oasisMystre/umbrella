import { MdWallet } from "react-icons/md";

export default function AssetEmpty() {
  return (
    <div className="m-auto flex flex-col space-y-4">
      <div className="self-center w-12 h-12 flex flex-col items-center justify-center bg-white rounded-md">
        <MdWallet className="text-3xl text-violet-700" />
      </div>
      <div className="flex flex-col text-center">
        <h1 className="text-xl font-bold">No asset found</h1>
        <p className="text-white/70">You don't have any asset!</p>
      </div>
    </div>
  );
}
