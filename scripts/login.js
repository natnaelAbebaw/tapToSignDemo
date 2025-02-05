const url = new URL("https://taptosign.com/taptoSignSalesPersonLogin");

// Set headers
const headers = {
  accept: "*/*",
  "accept-encoding": "gzip",
  "accept-language": "en-US,en;q=0.9",
  "content-length": "0",
  "content-type": "text/plain; charset=utf-8",
};

const loginForm = document.getElementById("login-form");

const email = document.getElementById("Email");
const password = document.getElementById("Password");
console.log(loginForm);

loginForm.addEventListener("submit", function (e) {
  console.log("ok");
  e.preventDefault();
  if (!email.value && !password.value) {
    return;
  }

  let formData = {
    EmailId: email.value,
    Password: password.value,
    LoginType: 0,
    DeviceType: 2,
  };

  console.log(email.value, password.value);

  fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.auth_token);

      document.cookie = `auth_token=${data.auth_token}; path=/; Secure; SameSite=None`;
      document.cookie = `auth_token=${data.auth_token}; path=/; Secure; domain=taptosign.com; SameSite=None`;

      window.location.href = "/index.html";
    })

    .catch((error) => console.error("Error:", error));
});

// Make the POST request
