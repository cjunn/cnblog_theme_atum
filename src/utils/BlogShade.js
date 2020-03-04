import $ from "jquery";

export default {
  close: () => {
    if ($("#shade_animal_wrap").length == 0) {
      return;
    }

    function closeShape() {
      $("#page_begin_html").remove();
    }

    $("#shade_animal_wrap")[0].addEventListener('transitionend', closeShape);
    $("#shade_animal_wrap")[0].addEventListener('webkitTransitionEnd', closeShape);
    $("#shade_animal_wrap").css("opacity", "0");
  }
}
