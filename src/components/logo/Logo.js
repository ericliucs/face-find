import Tilt from "react-parallax-tilt";

function Logo() {
  return <div className={"m-8"}>
    <Tilt className={"w-64"}>
      <h1 className={"p-4 rounded-lg text-4xl bg-slate-900 transition duration-100 hover:bg-slate-800"}>
        face-find 👀
      </h1>
    </Tilt>
  </div>;
}

export default Logo;
