if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
/**
 * style
 */
import "../scss/dashboard.scss";
/**
 * plugin
 */
import $ from "jquery";
import "popper.js";
import "bootstrap";
import { Vue } from "../plugins/vue";
/**
 * script
 */
// vue
new Vue({
  el: "#app",
  data: {
    search: {},
    datatables: {}
  }
});

// layout
import layout from "./components/layout";
layout();
