"use client";

import { useEffect, useState } from "react";

// COMPONENTS
import { AsteroidList, Loader } from "@/components/shared";
import { H1, H2, H3 } from "@/components/typography";

// REDUX
import { fetchAsteroids } from "@/context/features/asteroids/asteroidsSlice";
import { useAppDispatch, useAppSelector } from "@/context/hooks";

// ====================================
// Home PAGE COMPONENTS ////////
// ====================================
export default function HomePage() {
  // redux
  const dispatch = useAppDispatch();
  const { loading, error, asteroids } = useAppSelector(
    state => state.asteroids
  );

  // state
  const [startDate, setStartDate] = useState("2015-09-07");
  const [endDate, setEndDate] = useState("2015-09-08");

  // fetch asteroids once (on page load)
  useEffect(() => {
    dispatch(fetchAsteroids({ startDate, endDate }));
  }, [startDate, endDate]);

  // RETURN ///////////////////////////
  return (
    <div className="p-6 pb-14 px-8 bg-zinc-900 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        {/*banner */}
        <div className="">
          <Banner />
        </div>
        {/*asteroids list */}
        <div className="mt-8 px-1">
          <div className="flex items-center justify-between flex-col md:flex-row">
            <div className="flex items-baseline flex-col md:flex-row gap-2">
              <H2 styles="text-zinc-300">
                Discover Latest asteroids Collection{" "}
              </H2>
              <small className="text-gray-500 font-light">
                (Please use the date range selectors to get collection of your
                choice)
              </small>
            </div>
            {/* selectors  */}
            <div>
              {/* date range selectors */}
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center justify-center gap-2">
                  <H3 styles="text-zinc-300">From</H3>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="bg-zinc-800 text-zinc-300 rounded-lg p-2"
                  />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <H3 styles="text-zinc-300">To</H3>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="bg-zinc-800 text-zinc-300 rounded-lg p-2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            {loading ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : error ? (
              <div className="flex justify-center">
                <H3 styles="text-zinc-300">{error}</H3>
              </div>
            ) : (
              asteroids && <AsteroidList data={asteroids!} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

////////////////////////////////////////
// EXTENDED COMPONENTS /////////////////
const Banner = () => (
  <div className="relative overflow-hidden flex items-center justify-center h-[200px] rounded-xl bg-[url('../assets/bg-2.jpg')] bg-center">
    <div className="absolute w-48 h-48 bg-white opacity-50 rounded-full -top-24 md:-top-9 -left-24 md:-left-12" />

    <div className="flex flex-col items-center text-center justify-center space-y-3">
      <H1 styles="text-zinc-100 uppercase pb-14">asteroids</H1>
      {/* <H2 styles="text-zinc-100">The largest asteroids collection</H2> */}
    </div>

    <div className="absolute w-72 h-72 bg-white opacity-50 rounded-full -bottom-48 md:-bottom-24 -right-32 md:-right-12" />
  </div>
);
