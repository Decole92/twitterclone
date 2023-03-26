import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CommentModal from "../components/CommentModal";

const Home = ({ newsResults, userRandom }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      console.log("session = true");
      router.push("/");
    } else {
      router.push("/auth/SignInPage");
    }
  }, [session]);
  return (
    <div className="xl max-h-screen mx-auto">
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by Decolemills" />
        <link rel="icon" href="/twitter.ico" />
      </Head>
      <main className="flex min-h-screen mx-auto">
        <Sidebar />
        <Feed />
        <Widgets
          newsResults={newsResults.articles}
          userRandom={userRandom.results}
        />
        <CommentModal />
      </main>
    </div>
  );
};

export default Home;
export async function getServerSideProps() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  let userRandom = [];

  try {
    const res = await fetch(
      "https://randomuser.me/api/?results=30&inc=name,login,picture"
    );

    userRandom = await res.json();
  } catch (e) {
    userRandom = [];
  }

  return {
    props: {
      newsResults,
      userRandom,
    },
  };
}
