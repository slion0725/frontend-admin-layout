if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
/**
 * style
 */
import "../scss/table.scss";
/**
 * plugin
 */
import $ from "jquery";
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

// sweetalert2
import swal from "sweetalert2";
$("#del-btn").on("click", function() {
  $(".off-canvas").removeClass("off-canvas-open");
  swal({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(result => {
    if (result.value) {
      swal("Deleted!", "Your file has been deleted.", "success");
    }
  });
});

// datatable
import { datatables_config } from "../plugins/datatables.js";
var table = $("table").DataTable(datatables_config);

function tablePageLen(size) {
  table.page.len(size).draw();
  $("#tablePageLen").text(size);
}

// flatpickr
import flatpickr from "flatpickr";
import { Mandarin } from "flatpickr/dist/l10n/zh.js";
import rangePlugin from "flatpickr/dist/plugins/rangePlugin.js";
flatpickr("#add-birthday, #edit-birthday", {
  locale: Mandarin,
  time_24hr: true,
  dateFormat: "Y/m/d"
});
$("#add-birthday, #edit-birthday").css({ backgroundColor: "#fff" });

// select2
import { select2, select2_lang } from "../plugins/select2.js";
$("#add-tags, #edit-tags").select2({
  language: select2_lang,
  theme: "bootstrap",
  width: "100%",
  placeholder: "Selecte",
  closeOnSelect: false,
  containerCssClass: ":all:"
});

// froala-editor
import froala from "froala-editor";
import "../plugins/froala-editor.js";
$("#edit-froalaeditor").froalaEditor({
  language: "zh_tw",
  fileUploadURL: "/file/upload",
  imageUploadURL: "/image/upload",
  imageManagerLoadURL: "/image/list",
  toolbarBottom: true,
  zIndex: 3000,
  iconsTemplate: "font_awesome_5"
});

// ckeditor
import ckeditor5 from "@ckeditor/ckeditor5-build-classic";
ckeditor5
  .create(document.querySelector("#edit-ckeditor5"), {})
  .then(editor => {
    // console.log("Editor was initialized", editor);
  })
  .catch(err => {
    // console.error(err.stack);
  });

// summernote
import "codemirror";
import "summernote/dist/summernote-bs4.min.js";

$("#edit-summernote").summernote({
  dialogsInBody: true
});

// croppie
import "croppie/croppie.js";

let edit_croppie = new Croppie($("#edit-croppie-preview").get(0), {
  enableExif: true,
  viewport: {
    width: 300,
    height: 200,
    type: "square"
  },
  boundary: {
    width: 400,
    height: 400
  }
});

$("#edit-croppie").on("change", function(event) {
  if (event.target.files.length == 0) {
    return;
  }

  let files = event.target.files;

  let reader = new FileReader();

  reader.onload = function(ev) {
    if (!files[0].type.match("image.*")) {
      return;
    }

    edit_croppie.bind({
      url: ev.target.result
    });

    $("#edit-croppie-preview")
      .parent(".col-sm-12")
      .removeClass("d-none");

    $("#edit-croppie-display")
      .parent(".col-sm-12")
      .addClass("d-none");
  };

  reader.readAsDataURL(files[0]);
});

$("#edit-croppie-clip").on("click", function() {
  edit_croppie.result("blob").then(function(blob) {
    if (!blob) {
      return;
    }

    let reader = new FileReader();

    reader.onload = function(ev) {
      $("#edit-croppie-display").prop("src", ev.target.result);
    };

    reader.readAsDataURL(blob);

    $("#edit-croppie-preview")
      .parent(".col-sm-12")
      .addClass("d-none");

    $("#edit-croppie-display")
      .parent(".col-sm-12")
      .removeClass("d-none");
  });
});

// fancybox
window.$ = window.jQuery = $;
const fancybox = require("@fancyapps/fancybox");
$('[data-fancybox="gallery"]').fancybox({
  thumbs: {
    autoStart: true
  }
});

// tinymce
import tinymce from "../plugins/tinymce.js";

tinymce.init({
  selector: "#edit-tinymce",
  skin: false
});

// filepond
import FilePond from "../plugins/filepond.js";

FilePond.create($("#edit-filepond-circle").get(0), {
  labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
  imagePreviewHeight: 170,
  imageCropAspectRatio: "1:1",
  imageResizeTargetWidth: 200,
  imageResizeTargetHeight: 200
});

FilePond.create($("#edit-filepond").get(0), {
  maxFiles: 10,
  maxFileSize: "3MB",
  allowMultiple: true
});

// uppy
import Uppy from "uppy/lib/core";
import Dashboard from "uppy/lib/plugins/Dashboard";
import Tus from "uppy/lib/plugins/Tus";

Uppy({ autoProceed: false })
  .use(Dashboard, { trigger: "#edit-uppy" })
  .use(Tus, { endpoint: "upload-file-url" })
  .run()
  .on("complete", result => {
    console.log("Upload result:", result);
  });
