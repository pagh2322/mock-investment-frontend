import { createGlobalStyle } from "styled-components";
import px2vw from "./utils/px2vw";

const Global = createGlobalStyle`
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Pangolin&display=swap");
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }
  :root {
    // font-size: ${px2vw(48)};
    background-color: $f8f9fa;
    height: 100vh;
  }
`;

export default Global;