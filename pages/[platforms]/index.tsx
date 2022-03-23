import type { GetServerSideProps, NextPage } from "next";
import { getDatabase } from "../../src/database";

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context)
  const PlatformName: string = context.query.platforms
  const ParsedPlatformName = PlatformName.replace("-", " ")
  console.log(ParsedPlatformName)
  const mongodb = await getDatabase();
  const games = await mongodb.db().collection("games").find({ platform: { name: ParsedPlatformName } }).toArray();
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
