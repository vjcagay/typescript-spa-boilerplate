import "../css/styles.scss";

import dll from "./dll";
import message from "./message";

const app = document.getElementById("app");

app.innerHTML = dll(message);
