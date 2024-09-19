function Rank({ user }) {
  return <div id={"rank"} className={"mt-24 m-2 flex flex-col justify-center items-center font-bold"}>
    <div className={"text-2xl"}>
      {`Hi ${user.name}, you've submitted`}
    </div>
    <div className={"text-2xl"}>
      {`${user.entries} entries.`}
    </div>
  </div>;
}

export default Rank;
