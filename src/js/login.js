if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
/**
 * style
 */
import "../scss/login.scss";
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

new Vue({
  el: "#app",
  data: {
    form: {}
  },
  methods: {
    onSubmit() {
      this.$validator.validate().then(result => {
        if (!result) {
          return;
        }
        this.$refs.login.submit();
      });
    }
  }
});
