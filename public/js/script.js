function userLogin() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log("token");
        var restoken = JSON.parse(this.responseText);
        console.log(restoken);
        localStorage.setItem("token", JSON.stringify(restoken.token));
        if (restoken.role == "customer"){
          localStorage.setItem("USERID", restoken._id);
          localStorage.setItem("EMAIL", restoken.email);
          localStorage.setItem("USER", restoken.fullName);
        }else{
          localStorage.setItem("USERID", restoken._id);
          localStorage.setItem("AGENTEMAIL", restoken.email);
          localStorage.setItem("AGENTUSER", restoken.fullName);
        }
        checkUser(restoken);
      }
    }
  };
  xhttp.open("POST", "http://localhost:5000/auth/sign_in", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify({ email: email, password: password }));
  event.preventDefault();
}

function userRegister() {
  var phone = document.getElementById("phone").value;
  var name = document.getElementById("name").value;
  var emailid = document.getElementById("emailid").value;
  var pass = document.getElementById("pass").value;
  var xhhttp = new XMLHttpRequest();
  if (phone == "" || name == "" || emailid == "" || pass == "") {
    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-bottom-right",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    toastr["error"]("Provide All the Details.", "ALERT!!!");
    event.preventDefault();
    return;
  }
  xhhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        location.href = "/userlogin.html";
        alert("Successfully Registered, Please Sign In");
      }
    } 
  };
  xhhttp.open("POST", "http://localhost:5000/auth/userregister", true);
  xhhttp.setRequestHeader("Content-type", "application/json");
  xhhttp.send(
    JSON.stringify({
      phone: phone,
      fullName: name,
      email: emailid,
      password: pass,
    })
  );
  event.preventDefault();
}


function checkEmailUnique() {
  var Email = document.getElementById("emailid").value;
  var ttp = new XMLHttpRequest();
  ttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var res = JSON.parse(this.responseText);
        console.log(res);
        if (res.uniqueemail) {
          document.getElementById("idError").innerHTML =
            "Email ID already registered!<br>Please use a different Email ID";
          document.getElementById("emailid").value = "";
        } else {
          document.getElementById("idError").innerHTML = "";
        }
      }
    }
  };
  ttp.open("GET", `http://localhost:5000/checkemail?email=${Email}`, true);
  ttp.send();
}

function checkUser(restoken) {
  var xxhttp = new XMLHttpRequest();
  xxhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var res = JSON.parse(this.responseText);
        if (res.email === "admin@gmail.com") {
          location.href = "/adminDashboard.html";
        } else if (res.role === "agent") {
          location.href = "/agentDashboard.html";
        } else {
          location.href = "/customerDashboard.html";
        }
      } else {
        alert("Invalid token. Please try again.");
        location.href = "/userlogin.html";
      }
    }
  };
  xxhttp.open("GET", "http://localhost:5000/profile", true);
  xxhttp.setRequestHeader("Authorization", "JWT " + restoken.token);
  xxhttp.send();
  event.preventDefault();
}