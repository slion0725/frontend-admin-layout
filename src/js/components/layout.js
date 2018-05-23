import $ from "jquery";
import "popper.js";
import "bootstrap";
import "holderjs";

// jquery-mousewheel
import "jquery-mousewheel";

const layout = () => {
  $(".btn-offcanvas-close").on("click", function() {
    $(".off-canvas").removeClass("off-canvas-open");
  });
  
  $(".offcanvas-toggle").on("click", function() {
    $(".off-canvas").removeClass("off-canvas-open");
    $("#" + $(this).data('offcanvas')).toggleClass("off-canvas-open");
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
}

export default layout;