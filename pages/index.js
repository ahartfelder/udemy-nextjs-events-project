import { getFeaturedEvents } from "../lib/events";
import EventList from "../components/events/event-list";

export default function Home(props) {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <EventList items={props.featuredEvents} />
      </nav>
    </div>
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
