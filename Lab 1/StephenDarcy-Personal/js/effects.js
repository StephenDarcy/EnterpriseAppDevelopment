$(".social-btn").hover(
  function () {
    $(this).addClass("animate__animated animate__tada");
  },
  function () {
    $(this).removeClass("animate__animated animate__tada");
  }
);

$(".subheadings").hover(
  function () {
    $(this).addClass("animate__animated animate__rubberBand");
  },
  function () {
    $(this).removeClass("animate__animated animate__rubberBand");
  }
);
