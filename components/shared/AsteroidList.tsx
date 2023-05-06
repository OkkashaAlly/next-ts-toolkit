import AsteroidCard from "./AsteroidCard";

const AsteroidList = ({ data }: { data: any[] }) => {
  return (
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
      {data.map((asteroid: any) => (
        <AsteroidCard key={asteroid.id} info={asteroid} />
      ))}
    </div>
  );
};

export default AsteroidList;
