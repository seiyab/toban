import { createElement } from "react";
import { render } from "react-dom";

import { Root } from "./components/Root";

const domContainer = document.querySelector("#app");
render(createElement(Root), domContainer);
