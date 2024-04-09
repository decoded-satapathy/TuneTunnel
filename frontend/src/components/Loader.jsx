import { loadiermotion } from "../assets";
export default function Loader({ title }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <img
        src={loadiermotion}
        alt="loader"
        className="w-32 h-32 object-contain"
      ></img>
      <h1 className="text-white">{title || "Loading"}</h1>
    </div>
  );
}
