import Tilt from "react-parallax-tilt";

function Logo() {
  return (
    <Tilt className={"w-64 flex"}>
      <h1 className={"min-h-20 p-4 rounded-lg text-4xl text-wrap bg-slate-800 transition duration-100 cursor-default" +
        " hover:bg-slate-700"}>
        face-find 👀
      </h1>
    </Tilt>
  );
}

export default Logo;
