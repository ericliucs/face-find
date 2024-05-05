import ImageLinkForm from "./components/logo/ImageLinkForm";
import Logo from "./components/logo/Logo";
import Navigation from "./components/navigation/Navigation";
import Rank from "./components/rank/Rank";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const PAT = "962ec416fa3349cd82ea135769ae4fcb";
const USER_ID = "ericliu";
const APP_ID = "ztm-face-find";
const MODEL_ID = 'face-detection';

const particlesOptions = {
  background: {
    color: {
      value: "#000000",
    },
  },
  fpsLimit: 144,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: true,
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
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  function onInputChange(event) {
    setInput(event.target.value);
  }

  async function onSubmit() {
    if (input.length > 0 && await checkURLForOK(input)) {
      setImageURL(input);
      const requestOptions = createRequestOptions();
      fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions)
        .then(response => response.json())
        .then(result => {
          createBoundingBoxesFromRegions(result.outputs[0].data.regions);
        })
        .catch(error => console.log(error));
    }
  }

  async function checkURLForOK(input) {
    try {
      const response = await fetch(new URL(input));
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  function createRequestOptions() {
    const body = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID
      },
      inputs: [
        {
          data: {
            image: {
              //url: "https://samples.clarifai.com/metro-north.jpg"
              url: input
            }
          }
        }
      ]
    });

    return {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": "Key " + PAT
      },
      body: body
    };
  }

  function createBoundingBoxesFromRegions(regions) {
    regions.forEach(region => {
      // Accessing and rounding the bounding box values
      const boundingBox = region.region_info.bounding_box;
      const topRow = boundingBox.top_row.toFixed(3);
      const leftCol = boundingBox.left_col.toFixed(3);
      const bottomRow = boundingBox.bottom_row.toFixed(3);
      const rightCol = boundingBox.right_col.toFixed(3);

      region.data.concepts.forEach(concept => {
        // Accessing and rounding the concept value
        const name = concept.name;
        const value = concept.value.toFixed(4);

        console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
      });
    });
  }

  return <div id={"app"} className={"app"}>
    {init &&
      <Particles id="tsparticles" options={particlesOptions} className={"fixed -z-50"}/>}
    <div id={"navbar"} className={"flex justify-between text-center"}>
      <Logo />
      <Navigation />
    </div>
    <div className={"flex flex-col justify-center items-center"}>
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} imageURL={imageURL}/>
    </div>
  </div>;
}

export default App;
