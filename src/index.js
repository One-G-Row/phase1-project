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

  //get the countries then filter the universities by country
  const urlFilter = "http://universities.hipolabs.com/search?country=";
  const input_value = input.value;
  fetch(`${urlFilter}${input_value}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response error");
      } else {
        return response.json();
      }
    })
    .then((countries) => filterSearch(countries))
    .catch((err) => {
      console.log("data error", err);
    });
  function filterSearch(countries) {
    countries.forEach((country) => {
      if (country === input_value) {
        const ulList = document.querySelector(".ul-list");
        const newLi = document.createElement("li");

        newLi.innerHTML = `
            <p>${country.name}</p>
            <a href=${country.web_pages}>${country.web_pages}</a>
            `;
        ulList.appendChild(newLi);
      }
    });
  }

//set a condition that if container is hidden show the container with the list of universities, country and email addresses
  const containerList = document.querySelector(".container");
if (containerList.style.display === "none") {
  containerList.style.display = "block";
} else {
  containerList.style.display = "none";
}
  });

//clear inputs from the input search field
//clear output from innerHTML using the cancel button
// const ul = document.querySelector(".ul-list");
const inputSearch = document.querySelector(".input-search");
cancel.addEventListener("click", cancelButton);
function cancelButton() {
  ul.innerHTML = "";
  inputSearch.value = "";
  //containerList.remove()
}

//link book appointment button with the form
//when the button is clicked the form pops up
book.addEventListener("click", popupForm);
function popupForm() {
  //event.preventDefault();
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

//add an event listener submit to the form
form.addEventListener("submit", function (event) {
  //store the inputs values in a variable
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const school = document.getElementById("country").value;
  const email = document.getElementById("email").value;
  const contact = document.getElementById("phone-number").value;
  const date = document.getElementById("date").value;

  //destructure the variable inputs and store them in one variable
  const inputValues = [firstName, lastName, school, email, contact, date];
  console.log(inputValues);
  event.preventDefault();
  //if form input elements are empty display message of enter valid details
  //if they are filled output a success message
  if (
    firstName === "" ||
    lastName === "" ||
    school === "" ||
    email === "" ||
    contact === "" ||
    date === ""
  ) {
    formSubmit.innerHTML = "Enter valid details!";
    formSubmit.style.color = "red";
  } else {
    formSubmit.innerHTML = "your appointment was booked successfully!";
    formSubmit.style.color = "green";
  }

  //get the inputs value from the inputs field created in html
const inputs = document.querySelectorAll(".inputs");

  //clear the form after the submit button is clicked
  form.reset();

  //clear the innerHTML of the form once display message is shown

  form.addEventListener("click", function () {
    formSubmit.innerHTML = "";
  });
}); 

//get the country elemtn in the form
const countryDropdown = document.getElementById("country");

countryDropdown.addEventListener("click", listCountries);

//get a list of countries from api
fetch("https://api.first.org/data/v1/countries/")
  .then((response) => response.json())
  .then((data) => listCountries(data))
  .catch((err) => {
    console.log("Cannot get the countries", err);
  });

//access the countries key in the data object
//call listCountries function to render the countries list in the countries dropdown button
function listCountries(data) {
  if (data && data.hasOwnProperty("data")) {
    for (let countryCode in data.data) {
      let countryData = data.data[countryCode];
      let option = document.createElement("option");
      option.innerHTML = countryData.country;
      countryDropdown.appendChild(option);
    }
  }
}


});
