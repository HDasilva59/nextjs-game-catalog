/* eslint-disable react/jsx-key */
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getDatabase } from "../src/database";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mongodb = await getDatabase();
  const games = await mongodb
    .db()
    .collection("games")
    .find()
    .toArray();
  const serialized = JSON.stringify(games);

  return {
    props: {
      games: serialized,
    },
  };
};

const Game: NextPage = (props) => {
  const Allgames = JSON.parse(props.games);
  const gameselementsArray = Allgames.map((element) => {
    const platformName = element.platform.name
    const parsedPlatformName = platformName.replace(" ", "-");
    if ( element.hasOwnProperty("cover") ) {
      return [element.name, element.cover.url, element.slug, parsedPlatformName];
    } else {
      return [element.name, "https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg" ,element.slug];
    }
  });

  function displayGames(games: []) {
    const allThoseGames = games.map((element) => (
      <div>
        {console.log(element)}
        <Link href={`${element[3]}/${element[2]}`}>
          <a>
            <p>{element[0]}</p> <img src={element[1]} />
          </a>
        </Link>
      </div>
    ));
    return <div>{allThoseGames}</div>;
  }
  return <div>{displayGames(gameselementsArray)}</div>;
};

export default Game;
