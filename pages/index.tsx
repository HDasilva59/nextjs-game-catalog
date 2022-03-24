import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getDatabase } from "../src/database";

export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();

  const games = await mongodb.db().collection("games").find().toArray();
  const serialized = JSON.stringify(games);
  const platforms = games.map((element) => element.platform.name);
  return {
    props: {
      games: serialized,
      platforms: platforms,
    },
  };
};

const Home: NextPage = (props) => {
  const test2 = props.platforms;
  const uniqueArray = test2.filter(function (item, pos) {
    return test2.indexOf(item) == pos;
  });
  function platformsParsed(array: []) {
    const parsedelements = array.map((element: string) => {
      return element.replace(" ", "-");
    });
    return parsedelements.map((element) => (
      <li key={element + "list on homepage"}>
        <Link href={`/${element}`}>
          <a>{element}</a>
        </Link>
      </li>
    ));
  }
  return (
    <div>
      <Link href={"/none"}>
        <a>Login</a>
      </Link>
      <Link href={"/allgames"}><a>All games</a></Link>
      <ul>{platformsParsed(uniqueArray)}</ul>
    </div>
  );
};

export default Home;
