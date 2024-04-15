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

//get the html elements for dom manipulation
const input = document.getElementById("input");
const search = document.getElementById("search");
const form = document.querySelector(".form");
const book = document.querySelector(".book");
const formSubmit = document.getElementById("form-submit");
const cancel = document.getElementById("cancel");

//endpoint for university listing api
const urlSearch = "http://universities.hipolabs.com/search?name=";
search.addEventListener("click", function () {

  //get the value of the input field
  const inputValue = input.value;

  //fetch the university names 
  fetch(`${urlSearch}${inputValue}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        return response.json();
      }
    })
    .then((universities) => showUniversities(universities))
    .catch((err) => {
      console.log("fetch error", err);
    });
  //this function should render the data fetched on the webpage

  const info = document.querySelector(".info");

  //create a function that will called in the fetched response data  to render the fetched 
  function showUniversities(universities) {
    /* const ul = document.querySelector(".ul-list"); */
    console.log("ul:", ul);
    if (universities) {
      //console.log(typeof universities);
      //iterate over the universities object returned from the response
      const ul = document.querySelector(".ul-list");

      universities.forEach((university) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
          <p>${university.name}<p>
          <p>${university.country}<p>
          <a href=${university.web_pages}>${university.web_pages}</a>
      `;
        ul.appendChild(listItem);
      });
    } else {
      alert("No university found");
    }
  }
    
  });
});
