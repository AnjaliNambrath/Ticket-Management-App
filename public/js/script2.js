window.onload = function () {
  const accessT = localStorage.getItem("token");
  if (!accessT) {
    location.href = "/userlogin.html";
    return;
  }
  getProfile();
  display();
};

function logout() {
  localStorage.removeItem("token");
  location.href = "/userlogin.html";
}
let USERNAME = localStorage.getItem("USER");
let userID = localStorage.getItem("USERID");
let EMAIL = localStorage.getItem("EMAIL");
function display() {
  var content = `<br><div class="links">
                    <button> Hello ${USERNAME} ! How can I help you today? </button>
            </div>`;

  var element = document.getElementById("root");
  element.innerHTML = content;
}

//Show form to riase ticket
function visibileUserForm() {
  document.getElementById("popupForm2").classList.remove("hidden2");
}

function closePopup2() {
  document.getElementById("popupForm2").classList.add("hidden2");
  document.getElementById("popupForm2").reset();
  event.preventDefault();
}

function closePopup() {
  document.getElementById("popupForm1").classList.add("hidden1");
  document.getElementById("popupForm1").reset();
  event.preventDefault();
}

//function to create the ticket
function addTicket() {
  var issue = document.getElementById("issue").value;
  var priority = document.getElementById("priority").value;
  var status = "Open";
  var comment = "No Comments";
  var assignedTo = null;
  var cusID = userID;
  var xhttp = new XMLHttpRequest();
  if (issue == "") {
    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-bottom-left",
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
    toastr["error"]("Provide desciption of the Issue.", "ALERT!!!");
    event.preventDefault();
    return;
  }
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        display();
      }
    }
  };
  xhttp.open("POST", "http://localhost:5000/customer/raiseticket", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      assignedTo: assignedTo,
      customerID: cusID,
      issue: issue,
      status: status,
      priority: priority,
      comment: comment,
      New_Notification: true,
    })  
  );
  toastr.options = {
    closeButton: false,
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
  toastr["info"]("Ticket Added Successfully!!!");

  document.getElementById("popupForm2").reset();
  document.getElementById("popupForm2").classList.add("hidden2");
  event.preventDefault();
}

var upform;

var user_json = "";
//Agent Details Display Function
function getProfile() {
  var htt = new XMLHttpRequest();
  htt.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        res = this.responseText;
        user_json = JSON.parse(res);
        localStorage.setItem("USER", user_json.fullName);
        display();
      }
    }
  };
  htt.open("GET", "http://localhost:5000/customer/userById/" + userID, true);
  htt.send();
}

//Edit Task Details function
function editProfile() {
  document.getElementById("popupForm1").classList.remove("hidden1");
  document.getElementById("phone").value = user_json.phone;
  // document.getElementById("name").value = user_json.fullName;
  document.getElementById("emailid").value = user_json.email;
}

function updateProfile() {
  var phone = document.getElementById("phone").value;
  // var name = document.getElementById("name").value;
  var emailid = document.getElementById("emailid").value;
  if (phone === "" || emailid === "") {
    toastr.options = {
      closeButton: false,
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
    toastr["error"]("Provide All the Details!!!", "ALERT");
    event.preventDefault();
    return;
  }
  xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        getProfile();
        toastr.options = {
          closeButton: false,
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
        toastr["info"]("Profile Updated Successfully!!!");
      }
    }
  };
  xhttp.open("PUT", "http://localhost:5000/customer/" + userID, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      phone: phone,
      email: emailid,
    })
  );

  document.getElementById("popupForm1").reset();
  document.getElementById("popupForm1").classList.add("hidden1");
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
        if (res.uniqueemail && res.uniqueemail != EMAIL) {
          toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: false,
            progressBar: false,
            positionClass: "toast-top-center",
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
          toastr["warning"](
            "Email ID already registered!<br>Please use a different Email ID"
          );
          document.getElementById("emailid").value = EMAIL;
        }
      }
    }
  };
  ttp.open("GET", `http://localhost:5000/checkemail?email=${Email}`, true);
  ttp.send();
}
