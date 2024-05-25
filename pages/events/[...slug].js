import { getFilteredEvents } from "../../lib/events";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/error-alert/error-alert";

export default function EventsFilter(props) {
  const { hasError, events, date } = props;
  if (!events) {
    return <p>Loading...</p>;
  }

  if (!events || events.length === 0 || hasError) {
    return (
      <>
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
    <div>
      <ResultsTitle date={new Date(date.year, date.month)} />
      <EventList items={events} />
    </div>
  );
}

export async function getServerSideProps(context) {
  await new Promise((resolve) => setTimeout(() => resolve(), 3000));
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

  return {
    props: {
      events,
      date,
    },
  };
}
