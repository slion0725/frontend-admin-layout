if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
// ----------------------------------------------------------------------------------------------------
// custom style
import "../scss/table.scss";
// ----------------------------------------------------------------------------------------------------
// script
import $ from "jquery";
import "popper.js";
import "bootstrap";
import "jquery-mousewheel";
import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-colreorder";
import "datatables.net-select";
import select2 from "select2/dist/js/select2.full.min.js";
import zh_TW from "select2/src/js/select2/i18n/zh-TW.js";
import flatpickr from "flatpickr";
import { Mandarin } from "flatpickr/dist/l10n/zh.js";
import rangePlugin from "flatpickr/dist/plugins/rangePlugin.js";
import froala from "froala-editor";
import "./plugins/froala-editor.js";
import ckeditor5 from "@ckeditor/ckeditor5-build-classic";
import "codemirror";
import "summernote/dist/summernote-bs4.min.js";
// ----------------------------------------------------------------------------------------------------
$.fn.dataTableExt.oStdClasses.sWrapper = "dataTables_wrapper dt-bootstrap4";
$.fn.dataTableExt.oStdClasses.sPageButton = "page-item";

var table = $("table").DataTable({
  dom: `
        <'row'<'col-md-12'tr>>
        <'navbar px-0'<i><p>>
    `,
  renderer: "bootstrap",
  displayLength: 10,
  lengthMenu: [[1, 10, 25, 50, 100], [1, 10, 25, 50, 100]],
  pagingType: "simple_numbers",
  language: {
    lengthMenu: "_MENU_",
    processing: "loading",
    paginate: {
      first: "&laquo;",
      previous: "&lsaquo;",
      next: "&rsaquo;",
      last: "&raquo;"
    },
    search: "",
    searchPlaceholder: "Search..."
  },
  select: {
    style: "os",
    className: "bg-dark text-white"
  },
  colReorder: true,
  scrollX: true,
  scrollY: "calc(100vh - 300px)",
  scrollCollapse: true,
  order: [[0, "desc"]]
  //   serverSide: true,
  //   processing: true,
  //   ajax: {
  //     url: "/datatables",
  //     type: "GET"
  //   },
  //   stateSave: false
});

function tablePageLen(size) {
  table.page.len(size).draw();
  $("#tablePageLen").text(size);
}

function closeAllOffcanvas() {
  $("#offcanvas-menu").removeClass("off-canvas-open");
  $(".off-canvas-right").removeClass("off-canvas-open");
}

$("#offcanvas-menu-btn").on("click", function() {
  closeAllOffcanvas();
  $("#offcanvas-menu").toggleClass("off-canvas-open");
});

$("#offcanvas-profile-btn").on("click", function() {
  closeAllOffcanvas();
  $("#offcanvas-profile").toggleClass("off-canvas-open");
});

$("#offcanvas-search-btn").on("click", function() {
  closeAllOffcanvas();
  $("#offcanvas-search").toggleClass("off-canvas-open");
});

$("#offcanvas-show-btn").on("click", function() {
  closeAllOffcanvas();
  $("#offcanvas-show").toggleClass("off-canvas-open");
});

$("#offcanvas-add-btn").on("click", function() {
  closeAllOffcanvas();
  $("#offcanvas-add").toggleClass("off-canvas-open");
});

$("#offcanvas-edit-btn").on("click", function() {
  closeAllOffcanvas();
  $("#offcanvas-edit").toggleClass("off-canvas-open");
});

$("#del-btn").on("click", function() {
  closeAllOffcanvas();
  swal("The Internet?", "That thing is still around?", "warning");
});

$(".btn-offcanvas-close").on("click", function() {
  closeAllOffcanvas();
});

$("[data-navtabs-scroll]").each(function(index, el) {
  // <a class="px-1 py-2 float-right mdi mdi-chevron-right" data-navtabs-scroll="300" href="#"></a>
  // <a class="px-1 py-2 float-left mdi mdi-chevron-left" data-navtabs-scroll="-300" href="#"></a>
  let scrollY = $(el).data("navtabs-scroll");

  $(el).on("click", function() {
    $(this)
      .siblings(".nav-tabs")
      .stop(true, true)
      .animate(
        {
          scrollLeft:
            $(this)
              .siblings(".nav-tabs")
              .scrollLeft() + scrollY
        },
        "slow"
      );
  });
});

$(".scroll-btn, .nav-tabs").mousewheel(function(event) {
  event.preventDefault();
  // console.log(event.deltaX, event.deltaY, event.deltaFactor);
  $(this).scrollLeft($(this).scrollLeft() - event.deltaY * 4);
});

// ckeditor
// CKEDITOR.replace("edit-content");

// flatpickr
flatpickr("#add-birthday, #edit-birthday", {
  locale: Mandarin,
  time_24hr: true,
  dateFormat: "Y/m/d"
});
$("#add-birthday, #edit-birthday").css({ backgroundColor: "#fff" });

// select2
$("#add-tags, #edit-tags").select2({
  language: zh_TW,
  theme: "bootstrap",
  width: "100%",
  placeholder: "Selecte",
  closeOnSelect: false,
  containerCssClass: ":all:"
});

$("#edit-froalaeditor").froalaEditor({
  language: "zh_tw",
  fileUploadURL: "/file/upload",
  imageUploadURL: "/image/upload",
  imageManagerLoadURL: "/image/list",
  toolbarBottom: true,
  zIndex: 3000,
  iconsTemplate: "font_awesome_5"
});

ckeditor5
  .create(document.querySelector("#edit-ckeditor5"), {})
  .then(editor => {
    // console.log("Editor was initialized", editor);
  })
  .catch(err => {
    // console.error(err.stack);
  });

$("#edit-summernote").summernote({
  dialogsInBody:true
});
