import styles from "../../styles/event-item.module.css";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRight from "../icons/arrow-right-icon";
import Image from "next/image";

export default function EventItem(props) {
  const { title, image, date, location, id } = props.item;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "<br>");

  return (
    <li className={styles.item}>
      <Image src={"/" + image} alt={title} width={500} height={350} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time dateTime={date}>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address dangerouslySetInnerHTML={{ __html: formattedAddress }} />
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={`/events/${id}`}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRight />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
