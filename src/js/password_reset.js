if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
// ----------------------------------------------------------------------------------------------------
// style
import "bootstrap/scss/bootstrap.scss";
import "@mdi/font/scss/materialdesignicons.scss";
// ----------------------------------------------------------------------------------------------------
// custom style
import "../scss/password_reset.scss";
// ----------------------------------------------------------------------------------------------------
// script
import $ from "jquery";
import "popper.js";
import "bootstrap";
// ----------------------------------------------------------------------------------------------------