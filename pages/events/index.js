import { getAllEvents } from "../../lib/events";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function EventsPage(props) {
  const router = useRouter();
  function findEventsHandler(year, month) {
    const filterPath = `/events/${year}/${month}`;

    router.push(filterPath);
  }
  return (
    <>
      <Head>
        <title>Scheduled Events</title>
        <meta
          name="description"
          content="All events for your professional development."
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 10,
  };
}
