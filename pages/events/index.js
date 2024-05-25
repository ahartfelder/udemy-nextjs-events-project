import { getAllEvents } from "../../lib/events";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/navigation";

export default function EventsPage(props) {
  const router = useRouter();
  function findEventsHandler(year, month) {
    const filterPath = `/events/${year}/${month}`;

    router.push(filterPath);
  }
  return (
    <>
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
