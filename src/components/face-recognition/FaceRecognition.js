import "./FaceRecognition.css";

function FaceRecognition({ imageURL, faceBox }) {
  return <div className={"my-2"}>
    {imageURL &&
      <img id={"input-image"} src={imageURL} alt={"The user-submitted file for facial recognition."} width={"500px"}>
    </img>}
      <div className={"bounding-box"} style={{
    top: faceBox.topRow,
    right: faceBox.rightColumn,
    bottom: faceBox.bottomRow,
    left: faceBox.leftColumn
    }}></div>
  </div>;
}

export default FaceRecognition;
