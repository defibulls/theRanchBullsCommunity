import React from "react";

const ShepherdAlert = ({ setOpen, setShow }: any) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-fit w-full">
      <div className="rounded-lg shadow-lg bg-gray-800 text-white">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                onClick={() => setShow(false)}
                className="h-6 w-6 text-red-500 rotate-45 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <p className="text-sm leading-5 w-72 font-medium">
                Using a shepherd is optional, but please keep in mind that those
                who do not use a shepherd may not be eligible for certain
                rewards and bonuses.
              </p>
            </div>
            <div>
              <button
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-0"
                onClick={() => setOpen(true)}
              >
                Set Shepherd Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShepherdAlert;
