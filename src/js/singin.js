if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

// style
import "bootstrap/scss/bootstrap.scss";
import "@mdi/font/scss/materialdesignicons.scss";

// custom style
import "../scss/singin.scss";

// script
import $ from "jquery";
import "popper.js";
import "jquery-mousewheel";
import "bootstrap";
