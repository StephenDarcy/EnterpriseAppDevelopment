function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let data = { username: username, password: password };

  if (confirmUsername(username)) {
    createRequest(data);
  } else {
    alert("Error invalid username");
  }
}

function confirmUsername(user) {
  var regex = /^[a-zA-Z0-9]+$/;
  if (user.search(regex) === -1) {
    return false;
  } else return true;
}

async function createRequest(payload) {
  await fetch("/users/login", {
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
