function Navigation({ setRoute, setUser }) {
  function signOut() {
    setUser({});
    setRoute("sign-in");
  }

  return <nav className={"flex justify-end"}>
    <button className={"min-h-20 px-2 rounded-lg bg-slate-800 align-middle text-xl transition duration-100" +
      " hover:bg-slate-700"} onClick={signOut}>Sign Out</button>
  </nav>;
}

export default Navigation;
