import type { GetServerSideProps, NextPage } from "next";
import { getDatabase } from "../../../src/database";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const gamename: string = context.query.games;
  const mongodb = await getDatabase();
  const games = await mongodb
    .db()
    .collection("games")
    .find({ slug: gamename })
    .toArray();
  const serialized = JSON.stringify(games);

  return {
    props: {
      games: serialized,
    },
  };
};

const Game: NextPage = (props) => {
  const test = JSON.parse(props.games);
  function imageIfHaveOne (){
    if (test[0].hasOwnProperty("cover")){
      return <img src={test[0].cover.url} />
    } else {
      return <img src = {"https://as1.ftcdn.net/v2/jpg/02/30/26/76/1000_F_230267677_1vZFvqpLu1Sk6fITUzii9BXqs6l8ZRJR.jpg"}/>
    }
  }
  return (
    <div>
      <p>{test[0].name}</p>
      {
        imageIfHaveOne()
      }
    </div>
  );
};

export default Game;
