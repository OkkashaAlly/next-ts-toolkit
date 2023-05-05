// 'use client'
import { useState } from "react";
import { H3 } from "../typography";

const AsteroidCard = ({ info }: { info: any }) => {
  const [modal, setModal] = useState(false);

  console.log("info: ", info);

  return (
    <>
      <div className=" bg-zinc-800 rounded-lg text-white p-4 px-5 flex items-center">
        <div className="w-[60px]">
          {/* <Image src={info.nasa_jpl_url} width={30} height={30} alt={info.name}/> */}

          <img src={info.nasa_jpl_url} width={30} height={30} alt={info.name} />
        </div>
        <div className="w-[300px] flex items-baseline">
          <small>Name: </small>
          <H3 styles="ml-1">{info.name}</H3>
        </div>
        <div className="w-[200px] flex items-baseline">
          <small>Orbiting Body: </small>
          <p className="ml-1">{info.close_approach_data[0].orbiting_body}</p>
        </div>
        <div className="w-[200px] flex items-baseline">
          <small>Magnitude: </small>
          <p className="ml-1">{info.absolute_magnitude_h}</p>
        </div>
      </div>
      {/*modal */}
      {/* {modal && <Modal/>} */}
    </>
  );
};

export default AsteroidCard;

const Button = ({ children }: { children: React.ReactNode }) => (
  <button
    // onClick={() => setModal(true)}
    type="button"
    className="text-center text-sm bg-pink-500 rounded-full w-full p-2"
  >
    {children}
  </button>
);

const Modal = () => (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50">
    <div className="text-white max-w-screen-xl mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-3/4 h-3/4 md:overflow-y-hidden overflow-y-scroll bg-zinc-800 rounded-lg">
      <div className="flex justify-end pr-3">
        <button
          className="text-4xl font-bold text-pink-500"
          // onClick={() => setModal(false)}
        >
          &times;
        </button>
      </div>
      {/*body */}
      <div className="flex flex-col gap-3 md:flex-row items-center px-6">
        <div className="flex flex-1 justify-center md:justify-start">
          <div className="">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* <img
              src={nft.maker_asset_bundle.assets[0].image_url}
              alt={nft.maker_asset_bundle.assets[0].name}
              className="w-64 h-80 md:h-[400px] md:w-[630px]  rounded-lg"
            /> */}
            image
          </div>
        </div>
        {/*info*/}
        <div className="md:px-4 md:w-1/2">
          <div className="px-2.5 flex flex-col gap-2">
            <H3 styles=" text-base">Name:</H3>
            <small className="break-all font-semibold">Symbol: </small>
            <small className="break-all font-semibold">Address: </small>
            <small className="break-all font-semibold">Sales :</small>
            <small className="break-all font-semibold">
              Token Schema Type :{" "}
            </small>
            <small className="break-all font-semibold">
              Token Meta Data :{" "}
              <a href={"#"} target="_blank" className="underline text-pink-500">
                Click here to open
              </a>
            </small>
          </div>
          <div className="px-2.5 my-3">
            <p className="text-base text-gray-400">Description: </p>
          </div>
          <div className="p-2 pb-3">
            <a
              href={"#"}
              target="_blank"
              className="text-center text-sm bg-pink-500 rounded-full block p-2"
            >
              Buy
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
