import { getFeaturedEvents } from "../lib/events";
import EventList from "../components/events/event-list";
import Head from "next/head";

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Learn with our professional events.</title>
        <meta
          name="description"
          content="Find a perfect event for your career growth."
        />
      </Head>
      <nav>
        <EventList items={props.featuredEvents} />
      </nav>
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}
