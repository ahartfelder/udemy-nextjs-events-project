import { useRef, useState } from "react";
import styles from "../../styles/events-search.module.css";
import Button from "../ui/button";

export default function EventsSearch(props) {
  const [isLoading, setIsLoading] = useState(false);
  const yearSelectRef = useRef();
  const monthSelectRef = useRef();

  function submitClick(event) {
    setIsLoading(true);
    event.preventDefault();

    const selectedYear = yearSelectRef.current.value;
    const selectedMonth = monthSelectRef.current.value;

    props.onSearch(selectedYear, selectedMonth);
  }

  return (
    <form className={styles.form}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearSelectRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthSelectRef}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <Button onClick={submitClick} loading={isLoading}>
          {isLoading ? "Loading..." : "Find Events"}
        </Button>
      </div>
    </form>
  );
}
