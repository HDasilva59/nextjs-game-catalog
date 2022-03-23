import type { GetServerSideProps, NextPage } from "next";
import { getDatabase } from "../../../src/database";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const gamename: string = context.query.games
  const mongodb = await getDatabase();
  const games = await mongodb.db().collection("games").find({ "slug": gamename }).toArray();
  const serialized = JSON.stringify(games);

  return {
    props: {
      games: serialized,
    },
  };
};

const Game: NextPage = (props) => {
  const test = JSON.parse(props.games);
  console.log(test);
  return (
    <div>
      <p>{test[0].name}</p>
      <img src={test[0].cover.url} />
    </div>
  );
};

export default Game;
