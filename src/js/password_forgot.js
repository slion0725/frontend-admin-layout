if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
// style
import "bootstrap/scss/bootstrap.scss";
import "@mdi/font/scss/materialdesignicons.scss";
// script
import $ from "jquery";
import "popper.js";
import "bootstrap";
// custom style
import "../scss/layout/main.scss";