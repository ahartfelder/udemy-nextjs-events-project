import EventItem from "./event-item";

import styles from "../../styles/event-list.module.css";

export default function EventsList(props) {
  const { items } = props;

  return (
    <ul className={styles.list}>
      {items.map((event) => (
        <EventItem key={event.id} item={event} />
      ))}
    </ul>
  );
}
