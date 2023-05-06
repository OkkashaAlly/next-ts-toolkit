"use client";

import { Loader } from "@/components/shared";
import { H2 } from "@/components/typography";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import globeImg from "@/assets/globe-2.jpg";
import { FaAngleLeft, FaHeart, FaRegHeart } from "react-icons/fa";

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
      setLoading(false);

      // TODO: save to localStorage here - request rate limit during development
      // localStorage.setItem("asteroid", JSON.stringify(data));
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

  // load from localStorage if asteroid is null - request rate limit during development
  // useEffect(() => {
  //   const asteroid = localStorage.getItem("asteroid");
  //   if (asteroid) setAsteroid(JSON.parse(asteroid));
  // }, []);

  return (
    <div className="p-6 pb-14 px-8 bg-zinc-900 text-zinc-300 min-h-screen">
      <div className="max-w-screen-xl w-[80%] mx-auto h-full">
        <div className="flex items-center justify-between">
          <Link
            href=".."
            className="p-2 bg-zinc-800  rounded-md flex gap-2 items-center w-fit"
          >
            <FaAngleLeft className="ml-2" />
            <span>Back</span>
          </Link>
          <div>
            <LikeButton />
          </div>
        </div>
        <>
          {loading ? (
            <div className="h-[800px] w-full flex justify-center items-center">
              <Loader />
            </div>
          ) : error ? (
            <H2 styles="mt-4">{error}</H2>
          ) : (
            asteroid && (
              <div className="flex gap-14 mt-5 p-6 bg-zinc-800  rounded-lg ">
                {/*image */}
                <div className="rounded-md bg-[#ffc5ad] text-zinc-900 overflow-hidden">
                  <Image
                    src={globeImg}
                    width={450}
                    height={450}
                    alt={asteroid.name}
                  />
                </div>
                {/*asteroid details */}
                <div className="space-y-4">
                  <div className="flex gap-2 items-baseline">
                    <small className="text-zinc-500">Name: </small>{" "}
                    <H2>{asteroid.name}</H2>
                  </div>
                  {/* row 1 */}
                  <div className="flex">
                    <div className="px-1 w-[200px]">
                      <small className="text-zinc-500">Orbiting Body</small>
                      <p>{asteroid.close_approach_data[0].orbiting_body}</p>
                    </div>
                    <div className="w-[200px] ">
                      <small className="text-zinc-500">Relative Velocity</small>
                      <div className="flex items-baseline">
                        <p>
                          {Number(
                            asteroid.close_approach_data[0].relative_velocity
                              .kilometers_per_hour
                          ).toFixed(2)}
                          <small className="text-gray-500 font-light ml-1">
                            km/h
                          </small>
                        </p>
                      </div>
                    </div>
                    <div className="w-[200px]">
                      <small className="text-zinc-500">Magnitude</small>
                      <p>{asteroid.absolute_magnitude_h}</p>
                    </div>
                  </div>
                  {/* row 2 */}
                  <div className="flex">
                    <div className="px-1 w-[200px]">
                      <small className="text-zinc-500">
                        First Observation{" "}
                      </small>
                      <p>{asteroid.orbital_data.first_observation_date}</p>
                    </div>
                    <div className="px-1 w-[200px]">
                      <small className="text-zinc-500">Last Observation </small>
                      <p>{asteroid.orbital_data.last_observation_date}</p>
                    </div>

                    <div className="w-[200px]">
                      <small className="text-zinc-500">Inclination</small>
                      <p>{asteroid.orbital_data.inclination}</p>
                    </div>
                  </div>
                  {/* row 3 */}
                  <div className="flex">
                    <div className="px-1 w-[200px]">
                      <small className="text-zinc-500">Aphelion distance</small>
                      <p>
                        {Number(
                          asteroid.orbital_data.aphelion_distance
                        ).toFixed(14)}
                      </p>
                    </div>
                    <div className="w-[200px] ">
                      <small className="text-zinc-500">Data arc</small>
                      <div className="flex items-baseline">
                        <p>
                          {Number(asteroid.orbital_data.data_arc_in_days)}
                          <small className="text-gray-500 font-light ml-1">
                            days
                          </small>
                        </p>
                      </div>
                    </div>
                    <div className="w-[200px]">
                      <small className="text-zinc-500">Equinox</small>
                      <p>{asteroid.orbital_data.equinox}</p>
                    </div>
                  </div>
                  {/* row 4 */}
                  <div className="space-y-2.5">
                    <div className="px-1 ">
                      <small className="text-zinc-500">
                        Orbit class description
                      </small>
                      <p>
                        {
                          asteroid.orbital_data.orbit_class
                            .orbit_class_description
                        }
                      </p>
                    </div>
                    <div className="px-1 ">
                      <small className="text-zinc-500">Orbit class range</small>
                      <p>
                        {asteroid.orbital_data.orbit_class.orbit_class_range}
                      </p>
                    </div>
                    <div className="px-1 ">
                      <small className="text-zinc-500">Orbit class type</small>
                      <p>
                        {asteroid.orbital_data.orbit_class.orbit_class_type}
                      </p>
                    </div>
                  </div>
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

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <button className="p-2 bg-zinc-800  rounded-full" onClick={handleLike}>
      {liked ? (
        <FaHeart className="fill-[#ffc5ad] w-6 h-6" />
      ) : (
        <FaRegHeart className="fill-zinc-300 w-6 h-6" />
      )}
    </button>
  );
};
