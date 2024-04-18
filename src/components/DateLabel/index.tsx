const elapsedTime = (date: string): string => {
	const start = new Date(date);
	const end = new Date();

	const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
	if (seconds < 60) return 'Just now';

	const minutes = seconds / 60;
	if (minutes < 60) return `${Math.floor(minutes)} minute${Math.floor(minutes) !== 1 ? 's' : ''} ago`;

	const hours = minutes / 60;
	if (hours < 24) return `${Math.floor(hours)} hour${Math.floor(hours) !== 1 ? 's' : ''} ago`;

	const days = hours / 24;
	if (days < 7) return `${Math.floor(days)} day${Math.floor(days) !== 1 ? 's' : ''} ago`;

	return `${start.toLocaleDateString()}`;
};

interface DateLabelProps {
  date: string;
}

const DateLabel = (props: DateLabelProps) => {
  return (
    <span style={{ color: "gray", fontSize: "small" }}>
      {elapsedTime(props.date)}
    </span>
  )
};

export default DateLabel;