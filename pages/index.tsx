import type { NextPage } from 'next';
import Head from 'next/head';
import { Header, Play, Rounds, Footer } from './components';

const Home: NextPage = () => {

  const roundDifficulites = ["Easy", "Medium", "Hard"];

  return (
    <div>
      <Head>
        <title>Hyperoku</title>
        <meta
          name="description"
          content="An infinite sudoku tournament series"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      
      <main>
        <Play difficulties={roundDifficulites}/>
        <Rounds difficulties={roundDifficulites}/>
      </main>

      <Footer/>
    </div>
  );
};

export default Home;
