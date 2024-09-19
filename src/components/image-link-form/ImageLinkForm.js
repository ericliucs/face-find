import "./ImageLinkForm.css"
import FaceRecognition from "../face-recognition/FaceRecognition";
import { useState } from "react";

function ImageLinkForm({ apiCredentials, user, setUser }) {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [faceBox, setFaceBox] = useState({});

  function onInputChange(event) {
    setInput(event.target.value);
  }

  function createBoundingBoxesFromRegions(regions, precisionDigits) {
    setFaceBox(calculateFaceLocation(regions[0].region_info.bounding_box));
    regions.forEach(region => {
      // Accessing and rounding the bounding box values
      const boundingBox = region.region_info.bounding_box;
      const topRow = boundingBox.top_row.toFixed(precisionDigits);
      const leftCol = boundingBox.left_col.toFixed(precisionDigits);
      const bottomRow = boundingBox.bottom_row.toFixed(precisionDigits);
      const rightCol = boundingBox.right_col.toFixed(precisionDigits);

      region.data.concepts.forEach(concept => {
        // Accessing and rounding the concept value
        const name = concept.name;
        const value = concept.value.toFixed(4);
      });
    });
  }

  function calculateFaceLocation(boundingBox) {
    const image = document.getElementById("input-image");
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    let imageRect = image.getBoundingClientRect();

    console.log({
      topRow: boundingBox.top_row * imageHeight + imageRect.y,
      leftColumn: boundingBox.left_col * imageWidth + imageRect.x,
      bottomRow: (document.documentElement.scrollHeight - imageRect.bottom) + imageHeight
          - (boundingBox.bottom_row * imageHeight),
      rightColumn: (document.documentElement.scrollWidth- imageRect.right) + imageWidth
          - (boundingBox.right_col * imageWidth)
    });

    return {
      topRow: boundingBox.top_row * imageHeight + imageRect.y,
      leftColumn: boundingBox.left_col * imageWidth + imageRect.x,
      bottomRow: (document.documentElement.scrollHeight - imageRect.bottom) + imageHeight
        - (boundingBox.bottom_row * imageHeight),
      rightColumn: (document.documentElement.scrollWidth- imageRect.right) + imageWidth
        - (boundingBox.right_col * imageWidth)
    };
  }

  async function onSubmit() {
    if (input.length > 0 && await checkURLForOK(input)) {
      setImageURL(input);
      const requestOptions = createRequestOptions();
      fetch(`https://api.clarifai.com/v2/models/${apiCredentials.modelID}/outputs`, requestOptions)
        .then(response => response.json())
        .then(result => {
          createBoundingBoxesFromRegions(result.outputs[0].data.regions, 4);
          updateEntries();
        })
        .catch(error => {
          console.log(error);
          setFaceBox({});
        });
    }
  }

  async function updateEntries() {
    const imageResponse = await fetch("http://localhost:8080/image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
    const newEntries = await imageResponse.json();
    setUser({
      ...user,
      entries: newEntries
    });
  }

  function createRequestOptions() {
    const body = JSON.stringify({
      user_app_id: {
        user_id: apiCredentials.userID,
        app_id: apiCredentials.appID,
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
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Authorization": "Key " + apiCredentials.PAT
      },
      body: body
    };
  }

  async function checkURLForOK(input) {
    try {
      const response = await fetch(new URL(input));
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  return <div id={"image-link-form"} className={"mt-24 mx-4 p-8 rounded-lg flex flex-col items-center"}>
    <p className={"text-lg"}>Submit a photo or picture for facial recognition!</p>
    <FaceRecognition imageURL={imageURL} faceBox={faceBox} />

    <input type="text"
           className={"mt-2 p-2 bg-white w-11/12 text-black"}
           onChange={onInputChange}
           placeholder={"https://samples.clarifai.com/metro-north.jpg"}>
    </input>

    <button className={"mt-4 p-2 rounded bg-slate-700 shadow-md shadow-blue-500 transition duration-100" +
      " hover:bg-slate-500"} onClick={onSubmit}>
      Detect faces
    </button>
  </div>;
}

export default ImageLinkForm;
