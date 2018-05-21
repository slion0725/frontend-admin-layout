import "datatables.net";
import "datatables.net-bs4";
import "datatables.net-colreorder";
import "datatables.net-select";

$.fn.dataTableExt.oStdClasses.sWrapper = "dataTables_wrapper dt-bootstrap4";
$.fn.dataTableExt.oStdClasses.sPageButton = "page-item";

const datatables_config = {
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
};

export { datatables_config };