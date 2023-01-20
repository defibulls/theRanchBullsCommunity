import {
  CalendarIcon,
  CurrencyDollarIcon,
  TicketIcon,
} from "@heroicons/react/24/solid";

const PresaleDetail = () => {
  return (
    <div className="slider h-fit pb-20 m-auto grid grid-cols-1 md:grid-cols-4 relative overflow-hidden text-white max-w-[90rem] place-items-center">
      <div className="flex flex-col justify-center items-center space-y-2">
        <h1 className="text-gray-500 text-xl font-bold tracking-widest uppercase">
          Presale 1
        </h1>

        <div className="flex justify-center space-x-2 items-center">
          <CalendarIcon className="h-6 text-gray-500" />
          <p className="text-lg">MAR 30 @ 7PM</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <CurrencyDollarIcon className="h-6 text-gray-500" />
          <p className="text-lg">400</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <TicketIcon className="h-6 text-gray-500" />
          <p className="text-lg">250</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <img src="/turtle.png" alt="" className="h-6 grayscale mt-1" />
          <p className="text-lg">2</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <img src="/frog.png" alt="" className="h-6 grayscale mt-1" />
          <p className="text-lg">1</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-2">
        <h1 className="text-gray-500 text-xl font-bold tracking-widest uppercase">
          Presale 2
        </h1>

        <div className="flex justify-center space-x-2 items-center">
          <CalendarIcon className="h-6 text-gray-500" />
          <p className="text-lg">TBA</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <CurrencyDollarIcon className="h-6 text-gray-500" />
          <p className="text-lg">425</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <TicketIcon className="h-6 text-gray-500" />
          <p className="text-lg">400</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <img src="/turtle.png" alt="" className="h-6 grayscale mt-1" />
          <p className="text-lg">2</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <img src="/frog.png" alt="" className="h-6 grayscale mt-1" />
          <p className="text-lg">1</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-2">
        <h1 className="text-gray-500 text-xl font-bold tracking-widest uppercase">
          Presale 3
        </h1>

        <div className="flex justify-center space-x-2 items-center">
          <CalendarIcon className="h-6 text-gray-500" />
          <p className="text-lg">TBA</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <CurrencyDollarIcon className="h-6 text-gray-500" />
          <p className="text-lg">450</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <TicketIcon className="h-6 text-gray-500" />
          <p className="text-lg">550</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <img src="/turtle.png" alt="" className="h-6 grayscale mt-1" />
          <p className="text-lg">2</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <img src="/frog.png" alt="" className="h-6 grayscale mt-1" />
          <p className="text-lg">1</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-2">
        <h1 className="text-gray-500 text-xl font-bold tracking-widest uppercase">
          Public Sale
        </h1>
        <div className="flex justify-center space-x-2 items-center">
          <CalendarIcon className="h-6 text-gray-500" />
          <p className="text-lg">TBA</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <CurrencyDollarIcon className="h-6 text-gray-500" />
          <p className="text-lg">500</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <TicketIcon className="h-6 text-gray-500" />
          <p className="text-lg">3800</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <img src="/turtle.png" alt="" className="h-6 grayscale mt-1" />
          <p className="text-lg">5</p>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <img src="/frog.png" alt="" className="h-6 grayscale mt-1" />
          <p className="text-lg">5</p>
        </div>
      </div>
    </div>
  );
};

export default PresaleDetail;
