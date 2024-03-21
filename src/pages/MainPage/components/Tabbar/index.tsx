import { SyntheticEvent } from "react";
import { Nav } from "react-bootstrap"

interface TabbarProps {
  selected: string;
  handleTab: (eventKey: string | null, event: SyntheticEvent<unknown, Event>) => void;
}

const Tabbar = (props: TabbarProps) => {
  const tabStyle = (tab: string) => {
    return {
      color: tab === props.selected ? "black" : "gray"
    };
  }

  return (
    <Nav fill variant="underline" defaultActiveKey="today" onSelect={props.handleTab}>
      <Nav.Item>
        <Nav.Link eventKey="my-stock" style={tabStyle("my-stock")}>My stock</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="today" style={tabStyle("today")}>Today</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="news" style={tabStyle("news")}>News</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Tabbar;