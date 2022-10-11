let header = document.getElementById("header");

window.onscroll = function () {
  if (
    document.body.scrollTop >= 10 ||
    document.documentElement.scrollTop >= 100
  ) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }
};
