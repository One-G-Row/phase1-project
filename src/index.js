const ul = document.querySelector(".ul-list");
//use dom content addEventListener to make sure the html file parses first
document.addEventListener("DOMContentLoaded", function () {
  //get the elements to hide the rest of the body content
  const contentVisible = document.querySelector(".content-visible");
  const start = document.querySelector(".start");
  const contentHidden = document.querySelector(".content-hidden");

//hide content of the page until the get started button is clicked
start.addEventListener("click", hide);
function hide(event) {
  event.preventDefault();
  //hide the  content displayed as the initial content
  contentVisible.style.display = "none";

  //show the content that is hidden
  contentHidden.style.display = "block";
}

});
