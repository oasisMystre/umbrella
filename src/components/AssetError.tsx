import { MdError } from "react-icons/md";

export default function AssetError() {
  return (
    <div className="m-auto flex flex-col space-y-4">
      <div className="self-center w-12 h-12 flex flex-col items-center justify-center bg-white rounded-md">
        <MdError className="text-3xl text-red-500" />
      </div>
      <div className="flex flex-col text-center">
        <h1 className="text-xl font-bold">Oops! We are sorry.</h1>
        <p className="text-white/70">
          We can't load your assets. Please try again!
        </p>
      </div>
    </div>
  );
}
