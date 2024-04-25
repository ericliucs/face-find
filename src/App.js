import ImageLinkForm from "./components/logo/ImageLinkForm";
import Logo from "./components/logo/Logo";
import Navigation from "./components/navigation/Navigation";

function App() {
  return <div id={"app"} className={"app"}>
    <div id={"navbar"} className={"flex justify-between text-center"}>
      <Logo />
      <Navigation />
    </div>
    <div className={"flex flex-col justify-center items-center"}>
      <ImageLinkForm />
    </div>
  </div>;
}

export default App;
