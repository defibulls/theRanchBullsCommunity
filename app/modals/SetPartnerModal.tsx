import { XCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useState, useContext, useEffect } from "react";
import { ContractContext } from "../../context/ContractContext";

function Modaluser() {
  const [buddyAddress, setBuddyAddress] = useState("");
  const { mintContract, setOpen } = useContext(ContractContext);
  const [currentBuddy, setCurrentBuddy] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [updating, setUpdating] = useState(false);
  const { data } = useSession();
  //@ts-ignore
  const account = data?.user?.address;

  const getBuddyAddress = async () => {
    const _buddyAddress = await mintContract.methods.myBuddy(account).call();
    setCurrentBuddy(_buddyAddress);
  };

  useEffect(() => {
    if (mintContract) {
      getBuddyAddress();
    }
  }, [mintContract, setOpen]);

  const updateBuddyAddress = async () => {
    setUpdating(true);
    await mintContract.methods.setBuddyAddress(buddyAddress).send({
      //@ts-ignore
      from: data?.user?.address,
    });
    setBuddyAddress("");
    setOpen(false);
    setUpdating(false);
  };

  const style = {
    wrapper: `h-[20rem] z-50 w-[35rem] relative space-y-5 text-white bg-[#000] rounded-3xl p-10 flex flex-col items-center justify-center`,
    title: `font-semibold text-xl mb-6`,
  };

  return (
    <div className={style.wrapper}>
      {currentBuddy == "0x0000000000000000000000000000000000000000" ? (
        <div className="text-xl font-semibold uppercase tracking-widest text-gray-400">
          Update Buddy Address
        </div>
      ) : (
        <div className="text-xl font-semibold uppercase tracking-widest text-gray-400">
          Buddy Address
        </div>
      )}

      <input
        disabled={currentBuddy != "0x0000000000000000000000000000000000000000"}
        value={buddyAddress}
        onChange={(e) => setBuddyAddress(e.target.value)}
        type="text"
        placeholder={currentBuddy}
        className="font-pacifo w-2/3 rounded-lg border-none bg-gray-400 p-2 text-center text-white placeholder-slate-600 outline-none focus:ring-0"
      />
      {currentBuddy == "0x0000000000000000000000000000000000000000" && (
        <button
          disabled={!buddyAddress}
          onClick={() => updateBuddyAddress()}
          className="inline-flex w-1/2 justify-center rounded-md bg-cyan-500 px-4 py-2 text-base font-medium uppercase tracking-wide text-white shadow-sm focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-600 sm:text-sm"
        >
          {updating ? "Updating..." : "Update"}
        </button>
      )}

      <div
        onClick={() => setOpen(false)}
        className="absolute right-8 top-5 cursor-pointer"
      >
        <XCircleIcon className="h-5 text-red-500" />
      </div>
    </div>
  );
}

export default Modaluser;
