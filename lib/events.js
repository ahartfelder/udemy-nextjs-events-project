export async function getAllEvents() {
  const result = await fetch(
    "https://nextjs-events-94691-default-rtdb.firebaseio.com/events.json"
  );
  const data = await result.json();
  return Object.keys(data).reduce((arr, key) => {
    arr.push({ ...data[key], id: key });
    return arr;
  }, []);
}

export async function getFeaturedEvents() {
  const events = await getAllEvents();
  return events.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const events = await getAllEvents();
  return events.find((event) => event.id === id) || "";
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const events = await getAllEvents();
  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
}
