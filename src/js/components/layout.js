const layout = () => {
  $(".btn-offcanvas-close").on("click", function() {
    $(".off-canvas").removeClass("off-canvas-open");
  });
  
  $(".offcanvas-toggle").on("click", function() {
    $(".off-canvas").removeClass("off-canvas-open");
    $("#" + $(this).data('offcanvas')).toggleClass("off-canvas-open");
  });
  
}

export default layout;