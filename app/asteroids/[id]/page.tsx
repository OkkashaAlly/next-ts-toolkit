"use client";

import { Loader } from "@/components/shared";
import { H2 } from "@/components/typography";
import Link from "next/link";
import { useEffect, useState } from "react";

// import { FaAngleLeft } from "react-icons/fa";

const ViewPage = ({ params }: { params: { id: string } }) => {
  const API_URL = `https://api.nasa.gov/neo/rest/v1/neo/${params.id}?api_key=DEMO_KEY`;

  const [asteroid, setAsteroid] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  // fetching asteroids from
  const fetchAsteroid = async () => {
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
      setAsteroid(data);
    } catch (error: any) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  // fetch asteroids once (on page load)
  useEffect(() => {
    (async () => {
      await fetchAsteroid();
    })();
  }, []);

  console.log("Asteroid: ", asteroid);

  return (
    <div className="p-6 pb-14 px-8 bg-zinc-900 text-zinc-300 min-h-screen">
      <div className="max-w-screen-xl mx-auto h-full">
        <div className="">
          <Link href=".." className="p-2 bg-zinc-800  rounded-md">
            {/* <FaAngleLeft className="ml-2"/> */}
            <span>Back</span>
          </Link>
        </div>
        <>
          {loading ? (
            <div className="h-full w-full flex justify-center items-center">
              <Loader />
            </div>
          ) : error ? (
            <H2 styles="mt-4">{error}</H2>
          ) : (
            asteroid && (
              <div className="flex gap-14 mt-5">
                {/*image */}
                <div className="rounded-md bg-[#ffc5ad] w-[400px] h-[400px] flex items-center justify-center">
                  <span>Globe model goes here</span>
                </div>
                {/*asteroid details */}
                <div className="px-1">
                  <H2>{asteroid.name}</H2>
                </div>
              </div>
            )
          )}
        </>
      </div>
    </div>
  );
};

export default ViewPage;
