import { getAllEvents, getEventById } from "../../lib/events";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/error-alert/error-alert";
import Head from "next/head";

export default function EventDetailsPage(props) {
  const { event } = props;
  const headElement = (
    <Head>
      <title>{event ? event.title : "No event found!"}</title>
      <meta
        name="description"
        content={event ? event.description : "Ops, this event doesn't exist."}
      />
    </Head>
  );

  if (!event) {
    return (
      <>
        {headElement}
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
      </>
    );
  }

  return (
    <>
      {headElement}
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export async function getStaticProps(context) {
  const { eventId } = context.params;
  const event = await getEventById(eventId);
  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map(({ id }) => ({ params: { eventId: id } }));
  return {
    paths,
    fallback: "blocking",
  };
}
