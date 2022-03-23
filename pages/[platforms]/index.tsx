/* eslint-disable react/jsx-key */
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import { getDatabase } from "../../src/database";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const PlatformName: string = context.query.platforms
  const ParsedPlatformName = PlatformName.replace("-", " ")
  const mongodb = await getDatabase();
  const platforms = await mongodb.db().collection("games").find({ "platform.name" : ParsedPlatformName}).toArray();
  const serialized = JSON.stringify(platforms);

  return {
    props: {
      platforms: serialized,
      platformNames : PlatformName
    },
  };
};

const Game: NextPage = (props) => {
  const gamesPerPlatform = JSON.parse(props.platforms);
  const gamesNamesPerPlatformArray = gamesPerPlatform.map((element) => [element.name, element.cover.url, element.slug])

  function displayGames (games: []) {
    const allThoseGames = games.map((element) => <div><Link href={`${props.platformNames}/${element[2]}`}><a><p>{element[0]}</p> <img src={element[1]}/></a></Link></div>)
    return (
    <div>
      {allThoseGames}
    </div>
    )
  }
  return (
    <div>
      {displayGames(gamesNamesPerPlatformArray)}

    </div>
  );
};

export default Game;
