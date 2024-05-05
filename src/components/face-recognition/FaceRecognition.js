function FaceRecognition({ imageURL }) {
  return <div className={"my-2"}>
    <img src={imageURL} alt={"The user-submitted file for facial recognition."}></img>
  </div>;
}

export default FaceRecognition;
