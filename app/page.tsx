"use client";

import { useEffect, useState } from "react";

// COMPONENTS
import { AsteroidList, Loader } from "@/components/shared";
import { H1, H2, H3 } from "@/components/typography";

// ====================================
// Home PAGE COMPONENTS ////////
// ====================================
export default function HomePage() {
  const [asteroids, setAsteroids] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [startDate, setStartDate] = useState("2015-09-07");
  const [endDate, setEndDate] = useState("2015-09-08");

  // CONSTANTS
  const API_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=DEMO_KEY`;

  // fetching asteroids from
  const fetchAsteroids = async () => {
    // request options
    const options = { method: "GET", headers: { accept: "application/json" } };
    // error handling
    const handleError = (err: any) => {
      setError(err.message);
      throw new Error(err);
    };

    try {
      setLoading(true);
      const res = await fetch(API_URL, options);
      const data = await res.json();
      if (data.error) handleError(data.error);

      const asteroids = [
        ...data.near_earth_objects[startDate],
        ...data.near_earth_objects[endDate],
      ];

      setAsteroids(asteroids);
      setLoading(false);

      // save to local storage
      localStorage.setItem("asteroids", JSON.stringify(asteroids));
      
    } catch (error: any) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  console.log("Asteroids: ", asteroids);

  // fetch asteroids once (on page load)
  useEffect(() => {
    (async () => {
      await fetchAsteroids();
    })();
  }, [startDate, endDate]);

  // load from localStorage if asteroids is null
  useEffect(() => {
    const asteroids = localStorage.getItem("asteroids");
    if (asteroids) setAsteroids(JSON.parse(asteroids));
  }, []);
    

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
              <AsteroidList data={asteroids} />
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
