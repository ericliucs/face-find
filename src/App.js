import ImageLinkForm from "./components/image-link-form/ImageLinkForm";
import Logo from "./components/logo/Logo";
import Navigation from "./components/navigation/Navigation";
import Rank from "./components/rank/Rank";
import Credentials from "./components/sign-in/Credentials";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const apiCredentials = {
  PAT: "962ec416fa3349cd82ea135769ae4fcb",
  userID: "ericliu",
  appID: "ztm-face-find",
  modelID: 'face-detection',
};

const particlesOptions= {
  background: {
    color: {
      value: "#000000",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: false,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 120,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 72,
    },
    opacity: {
      value: 0.7,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}

function App() {
  const [init, setInit] = useState(false);
  const [route, setRoute] = useState("sign-in");
  const [user, setUser] = useState({});

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return <div id={"app"} className={"app"}>
    {init && <Particles id="tsparticles" options={particlesOptions} className={"fixed -z-50"}/>}

    <div id={"navbar"} className={"m-4 gap-y-1 flex flex-wrap justify-between text-center"}>
      <Logo />
      {route === "face-find" && <Navigation setRoute={setRoute} setUser={setUser} />}
    </div>

    {route === "sign-in" || route === "register"
      ? <Credentials route={route} setRoute={setRoute} setUser={setUser}/>
      : <div className={"flex flex-col justify-center items-center"}>
          <Rank user={user}/>
          <ImageLinkForm apiCredentials={apiCredentials} user={user} setUser={setUser}/>
        </div>
    }
  </div>;
}

export default App;
