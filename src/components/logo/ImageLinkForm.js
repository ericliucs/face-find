import "./ImageLinkForm.css"

function ImageLinkForm() {
  return <div id={"image-link-form"} className={"mt-24 p-8 rounded-lg flex flex-col items-center"}>
    <p className={"text-lg"}>Submit a photo or picture for facial recognition!</p>
    <input type="text" className={"mt-2 p-2 bg-white w-1/2"}></input>
    <button className={"mt-4 p-2 rounded bg-slate-700 shadow-md shadow-blue-500 transition duration-100" +
      " hover:bg-slate-500"}>
      Detect faces
    </button>
  </div>;
}

export default ImageLinkForm;
