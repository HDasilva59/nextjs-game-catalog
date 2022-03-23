import type { GetServerSideProps, NextPage } from "next";
import { getDatabase } from "../src/database";

export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();

  const games = await mongodb.db().collection("games").find().toArray();
  const serialized = JSON.stringify(games);

  return {
    props: {
      games: serialized,
    },
  };
};

const Home: NextPage = (props) => {
  const test = JSON.parse(props.games);
  console.log(typeof test);
  return (
    <div>
      <p>{test[0]._id}</p>
      <img src={test[0].platform.platform_logo_url} />
    </div>
  );
};

export default Home;
