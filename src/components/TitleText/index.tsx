interface TitleTextProps {
  text: string;
  size?: string;
}

const TitleText = (props: TitleTextProps) => {
  return (
    <div
      style={{ fontSize: props.size || "large", fontWeight: "bold", width: "100%" }}
    >
      {props.text}
    </div>
  );
}

export default TitleText;