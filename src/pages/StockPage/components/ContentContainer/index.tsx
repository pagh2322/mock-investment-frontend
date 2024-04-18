import Chart from "../Chart";
import Financials from "../Financials";
import Forum from "../Forum";
import MyStock from "../MyStock";

export interface ContentContainerProps {
  currentTab: string;
  code: string;
  end: string;
  curr: number;
}

const ContentContainer = (props: ContentContainerProps) => {
  return (
    (() => {
      switch (props.currentTab) {
        case "chart":
          return <Chart code={props.code} end={props.end} />;
        case "financials":
          return <Financials code={props.code}/>
        case "my-stock":
          return <MyStock code={props.code} curr={props.curr} />
        case "forum":
          return <Forum code={props.code}/>
        default:
          return null;
      }
    })()
  );
};

export default ContentContainer;