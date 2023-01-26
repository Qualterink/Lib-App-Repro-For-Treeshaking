import { createApp } from "vue";
import App from "./App.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// @ts-ignore
import { fas as fasPro } from "@fortawesome/pro-solid-svg-icons";

library.add(fasPro);

const app = createApp(App);

app.component("fa", FontAwesomeIcon).mount("#app");
