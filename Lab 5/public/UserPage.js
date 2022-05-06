let confirmButton = document.getElementById("confirm-btn");
let cancelButton = document.getElementById("cancel-btn");
let editButton = document.getElementById("edit-btn");
let pro = document.getElementById("pro");
let firstname = document.getElementById("firstname");
let username = document.getElementById("username");
let surname = document.getElementById("surname");
let dob = document.getElementById("dob");
let gender = document.getElementById("gender");
let address = document.getElementById("address");
let profession = document.getElementById("profession");
let city = document.getElementById("city");
let civil = document.getElementById("civil");
let salary = document.getElementById("salary");
let hobbies = document.getElementById("hobbies");
let sport = document.getElementById("sport");
let country = document.getElementById("country");

cancelButton.style.display = "none";
confirmButton.style.display = "none";

$(document).ready(function () {
  populateUser();
});

async function populateUser() {
  await fetch("/users/getUser/", {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then((res) => {
    res.json().then((data) => {
      console.log(data);
      username.innerHTML = data.username;
      pro.innerHTML = data.profession;
      firstname.value = data.firstname;
      surname.value = data.surname;
      dob.value = data.dob;
      gender.value = data.gender;
      address.value = data.address;
      profession.value = data.profession;
      city.value = data.city;
      civil.value = data.civil;
      salary.value = data.salary;
      hobbies.value = data.hobbies;
      sport.value = data.sport;
      country.value = data.country;
    });
  });
}

// stores original values if user cancels update
let originalFirst,
  originalSurname,
  originalDob,
  originalGender,
  originalAddress,
  originalProfession,
  originalCity,
  originalCivil,
  originalSalary,
  originalHobbies,
  originalSport,
  originalCountry;

function cancelUpdate() {
  // restore original values
  // store original values when user presses edit
  firstname.value = originalFirst;
  surname.value = originalSurname;
  dob.value = originalDob;
  gender.value = originalGender;
  address.value = originalAddress;
  profession.value = originalProfession;
  city.value = originalCity;
  civil.value = originalCivil;
  salary.value = originalSalary;
  hobbies.value = originalHobbies;
  sport.value = originalSport;
  country.value = originalCountry;

  editButton.style.display = "";
  cancelButton.style.display = "none";
  confirmButton.style.display = "none";

  hex.disabled = true;
  rgb.disabled = true;
  hsl.disabled = true;
  name.disabled = true;
}

function editOne() {
  // store original values when user presses edit
  originalFirst = firstname.value;
  originalSurname = surname.value;
  originalDob = dob.value;
  originalGender = gender.value;
  originalAddress = address.value;
  originalProfession = profession.value;
  originalCity = city.value;
  originalCivil = civil.value;
  originalSalary = salary.value;
  originalHobbies = hobbies.value;
  originalSport = sport.value;
  originalCountry = country.value;

  firstname.disabled = false;
  surname.disabled = false;
  dob.disabled = false;
  gender.disabled = false;
  address.disabled = false;
  profession.disabled = false;
  city.disabled = false;
  civil.disabled = false;
  salary.disabled = false;
  hobbies.disabled = false;
  sport.disabled = false;
  country.disabled = false;

  editButton.style.display = "none";
  cancelButton.style.display = "";
  confirmButton.style.display = "";
}

function confirmUpdate() {
  let data = {
    firstname: firstname.value,
    surname: surname.value,
    dob: dob.value,
    gender: gender.value,
    address: address.value,
    profession: profession.value,
    city: city.value,
    civil: civil.value,
    salary: salary.value,
    hobbies: hobbies.value,
    sport: sport.value,
    country: country.value,
  };

  updateProfile(data);
}

async function updateProfile(payload) {
  await fetch("/users/", {
    method: "PUT",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(payload),
  }).then((res) => {
    res.json().then((data) => {
      if (data == "success") {
        alert("Updated!");
      }
    });
  });
}

async function logout() {
  await fetch("/users/logout", {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then(() => {
    window.location.pathname = "/";
  });
}
