import { SyntheticEvent } from "react";
import { Nav } from "react-bootstrap"
import { COLORS } from "../../../../constants/colors";

interface TabbarProps {
  selected: string;
  handleTab: (eventKey: string | null, event: SyntheticEvent<unknown, Event>) => void;
}

const Tabbar = (props: TabbarProps) => {
  const tabStyle = (tab: string) => {
    return {
      color: tab === props.selected ? COLORS.PRIMARY : COLORS.SECONDAY,
      fontSize: "medium",
    };
  }

  return (
    <Nav fill variant="underline" defaultActiveKey="chart" onSelect={props.handleTab}>
      <Nav.Item>
        <Nav.Link eventKey="chart" style={tabStyle("chart")}>Chart</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="financials" style={tabStyle("financials")}>Financials</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="my-stock" style={tabStyle("my-stock")}>My stock</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="forum" style={tabStyle("forum")}>Forum</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Tabbar;