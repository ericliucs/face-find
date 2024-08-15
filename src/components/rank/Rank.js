function Rank({ user }) {
  return <div id={"rank"} className={"mt-24 m-2 flex flex-col justify-center items-center font-bold"}>
    <div className={"text-2xl"}>
      {`${user.name}, your current rank is...`}
    </div>
    <div className={"text-3xl"}>
      {"#5"}
    </div>
    <div className={"text-2xl"}>
      {`with ${user.entries} entries.`}
    </div>
  </div>;
}

export default Rank;
