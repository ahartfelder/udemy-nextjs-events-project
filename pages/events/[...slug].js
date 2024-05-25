import { getFilteredEvents } from "../../lib/events";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/error-alert/error-alert";
import Head from "next/head";

export default function EventsFilter(props) {
  const { hasError, events, date } = props;
  const headElement = (
    <Head>
      <title>
        {`Available events for ${new Date(
          date.year,
          date.month
        ).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}`}
      </title>
      <meta
        name="description"
        content={`All our events for ${new Date(
          date.year,
          date.month
        ).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}`}
      />
    </Head>
  );

  if (!events || events.length === 0 || hasError) {
    return (
      <>
        {headElement}
        <ErrorAlert>
          <p>No events found for the choosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  return (
    <>
      {headElement}
      <ResultsTitle date={new Date(date.year, date.month)} />
      <EventList items={events} />
    </>
  );
}

export async function getServerSideProps(context) {
  const [year, month] = context.params.slug.map((param) => parseInt(param));

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2020 ||
    month > 12 ||
    month < 1
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const date = { year, month: month - 1 };

  const events = await getFilteredEvents(date);
  await new Promise((resolve) => setTimeout(() => resolve(), 3000));

  return {
    props: {
      events,
      date,
    },
  };
}
