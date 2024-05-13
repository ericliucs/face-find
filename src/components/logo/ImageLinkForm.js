import "./ImageLinkForm.css"
import FaceRecognition from "../face-recognition/FaceRecognition";

function ImageLinkForm({ onInputChange, onSubmit, imageURL, faceBox }) {
  return <div id={"image-link-form"} className={"mt-24 p-8 rounded-lg flex flex-col items-center"}>
    <p className={"text-lg"}>Submit a photo or picture for facial recognition!</p>
    <FaceRecognition imageURL={imageURL} faceBox={faceBox} />
    <input type="text" className={"mt-2 p-2 bg-white w-11/12 text-black"} onChange={onInputChange}></input>
    <button className={"mt-4 p-2 rounded bg-slate-700 shadow-md shadow-blue-500 transition duration-100" +
      " hover:bg-slate-500"} onClick={onSubmit}>
      Detect faces
    </button>
  </div>;
}

export default ImageLinkForm;
