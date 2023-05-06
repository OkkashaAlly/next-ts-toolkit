import { useState } from "react";
import AsteroidCard from "./AsteroidCard";

const AsteroidList = ({ data }: { data: any[] }) => {
  const step = 5;
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(step);

  const handleNext = () => {
    setPage(prev => prev + 1);
    setStart(prev => prev + step);
    setEnd(prev => prev + step);
  };

  const handlePrev = () => {
    setPage(prev => prev - 1);
    setStart(prev => prev - step);
    setEnd(prev => prev - step);
  };
  
  return (
    <>
      <div className="">
        <div className="border-b border-b-zinc-700 text-zinc-300 p-4 px-5 flex items-center font-semibold">
          <div className="w-[60px]">{/* <small>Image: </small> */}</div>
          <div className="w-[300px] flex items-baseline">
            <small>Name </small>
          </div>
          <div className="w-[200px] flex items-baseline">
            <small>Orbiting Body </small>
          </div>
          <div className="w-[200px] flex items-baseline">
            <small>Relative Velocity </small>
          </div>
          <div className="w-[200px] flex items-baseline">
            <small>Magnitude </small>
          </div>
          <div className="w-[200px] flex items-baseline">
            <small>Approach Date </small>
          </div>
          <div className="w-[200px] flex items-baseline ">
            <small className="mx-auto">Link </small>
          </div>
        </div>
        {data.slice(start, end).map((item, i) => (
          <AsteroidCard key={i} info={item} />
        ))}
      </div>
      {/* pagination  */}
      <Pagination handleNext={handleNext} handlePrev={handlePrev} />
    </>
  );
};

export default AsteroidList;

const Pagination = ({
  handleNext,
  handlePrev,
}: {
  handleNext: () => void;
  handlePrev: () => void;
}) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        className="bg-zinc-800 text-zinc-300 rounded-md px-3 py-1"
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        className="bg-zinc-800 text-zinc-300 rounded-md px-3 py-1"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};
