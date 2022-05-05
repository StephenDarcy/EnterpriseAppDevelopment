function register() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let password2 = document.getElementById("password2").value;

  let data = { username: username, password: password };

  if (confirmPasswords(password, password2) && confirmUsername(username)) {
    createRequest(data);
  } else {
    alert("Error username/password does not meet the requirements");
  }

  console.log(username, password);
}

function confirmPasswords(pass1, pass2) {
  var regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
  if (pass1 == pass2) {
    if (pass1.search(regex) === -1) {
      return false;
    } else return true;
  } else return false;
}

function confirmUsername(user) {
  var regex = /^[a-zA-Z0-9]+$/;
  if (user.search(regex) === -1) {
    return false;
  } else return true;
}

async function createRequest(payload) {
  await fetch("/users/", {
    method: "POST",
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
      $("#alert").html(data);
      if (data == "success") {
        window.location.pathname = "/home";
      }
    });
  });
}
