export default function parseDate(inputDate: string): string {
  const fecha = new Date(inputDate);

  const year = inputDate.substring(0, 4);
  const month = inputDate.substring(5, 7);
  const day = inputDate.substring(8, 10);
  const hours = padZero(String(fecha.getHours() % 12 || 12));
  const minutes = padZero(inputDate.substring(14, 16));
  const ampm = fecha.getHours() >= 12 ? "PM" : "AM";

  return `${day}-${month}-${year} / ${hours}:${minutes} ${ampm}`;
}

function padZero(num: string): string {
  return num.padStart(2, "0");
}
