window.onload = function () {
  const accessT = localStorage.getItem("token");
  if (!accessT) {
    location.href = "/userlogin.html";
    return;
  }
  display();
};

function logout() {
  localStorage.removeItem("token");
  location.href = "/userlogin.html";
}

function closePopup3() {
  document.getElementById("popupForm3").classList.add("hidden3");
  event.preventDefault();
}
function closePopup2() {
  document.getElementById("popupForm2").classList.add("hidden2");
  event.preventDefault();
}


//Show form to add agent
function visibileUserForm() {
  document.getElementById("popupForm2").classList.remove("hidden2");
}

// //Show form to update agent
// function visibileUserFormUpdate() {
//   document.getElementById("popupForm3").classList.remove("hidden3");
// }

var user_json = "";
//Agent Details Display Function
function display() {
  var content =
    "<div class='table'><div class='user-header'><span class='headcell'>AGENT ID</span><span class='headcell'>AGENT NAME</span><span class='headcell'>DESIGNATION</span></div>";
  var htt = new XMLHttpRequest();
  htt.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        res = this.responseText;
        user_json = JSON.parse(res);
        // var AUthUSER = localStorage.getItem("EMPLOYEEID");
        for (let u in user_json) {
          if (user_json[u].email == "admin@gmail.com") {
            continue;
          } else {
            var usr = `<div class='user'><span class='cell'>${user_json[u].agentID}</span><span class='cell'>${user_json[u].agentName}</span>&nbsp;&nbsp;
                    <span class='cell'>${user_json[u].designation}</span>&nbsp;&nbsp;
                    <button class="btn" onclick="editAgent('${user_json[u]._id}')">Manage</button>
                    <button class="btn" onclick="deleteAgent('${user_json[u]._id}')">Delete</button><p/><br></div>`;
            content = content + usr;
          }
        }
        var element = document.getElementById("root");
        element.innerHTML = content + "</div>";
      }
    }
  };
  htt.open("GET", "http://localhost:5000/agent", true);
  htt.send();
}

//Agent Display Function after search
function searchAgent() {
  const searchTerm = document.getElementById("agentSearch").value;
  var content =
    "<div class='table'><div class='user-header'><span class='headcell'>AGENT ID</span><span class='headcell'>AGENT NAME</span><span class='headcell'>DESIGNATION</span></div>";
  var htt = new XMLHttpRequest();
  htt.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        res = this.responseText;
        user_json = JSON.parse(res);
        // var AUthUSER = localStorage.getItem("EMPLOYEEID");
        for (let u in user_json) {
          if (user_json[u].email == "admin@gmail.com") {
            continue;
          } else {
            var usr = `<div class='user'><span class='cell'>${user_json[u].agentID}</span><span class='cell'>${user_json[u].agentName}</span>&nbsp;&nbsp;
                    <span class='cell'>${user_json[u].designation}</span>&nbsp;&nbsp;
                    <button class="btn" onclick="editAgent('${user_json[u]._id}')">Manage</button>
                    <button class="btn" onclick="deleteAgent('${user_json[u]._id}')">Delete</button><p/><br></div>`;
            content = content + usr;
          }
        }
        var element = document.getElementById("root");
        element.innerHTML = content + "</div>";
      }
    }
  };
  htt.open(
    "GET",
    `http://localhost:5000/agent/search?searchTerm=${searchTerm}`,
    true
  );
  htt.send();
}

function checkAgentIDUnique(){
    if (document.getElementById("agentnum").value){
      var Agentid = document.getElementById("agentnum").value;
    }else{
       var Agentid = document.getElementById("upagentnum").value; 
    }
    var ttp = new XMLHttpRequest();
    ttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var res = JSON.parse(this.responseText)
          if(res.unique){
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
                "Agent ID already registered!<br>Please use a different Agent ID"
              );
              document.getElementById("agentnum").value = "";
              event.preventDefault();
              return;
          }
        }
      }
    };
    ttp.open(
      "GET",
      `http://localhost:5000/checkagentid?AgentID=${Agentid}`,
      true
    );
    ttp.send();
}

//function to add the agent
function addAgent() {
  // var agentid = document.getElementById("agentnum").value;
  var agentname = document.getElementById("agentname").value;
  var designation = document.getElementById("designation").value;
  var emailid = agentname.toLowerCase().replace(" ", "") + "@zoh.com";
  var pass = agentname.toLowerCase().replace(" ", "");
  var xhttp = new XMLHttpRequest();
  if (agentname == "") {
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
    toastr["error"]("Provide All the Details.", "ALERT!!!");
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
  xhttp.open("POST", "http://localhost:5000/auth/agentregister", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      // agentID: agentid,
      agentName: agentname,
      designation: designation,
      email: emailid,
      password: pass,
    })
  );
   toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
  toastr["info"]("Agent Added Successfully!!!");
 
  document.getElementById("popupForm2").reset();
  document.getElementById("popupForm2").classList.add("hidden2");
  event.preventDefault();
}


function deleteAgent(dltflt) {
  var xxhttp = new XMLHttpRequest();
  xxhttp.open("DELETE", "http://localhost:5000/agent/" + dltflt, true);
  xxhttp.send();
  xxhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
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
          toastr["info"]("Agent Deleted Successfully!!!");
        display();
      }
    }
  };
}

let AGENTID;
var upform;

//Edit Task Details function
function editAgent(tkId) {
  document.getElementById("popupForm3").classList.remove("hidden3");
  AGENTID = tkId;
  var ind = user_json.findIndex((e) => e._id === tkId);
  console.log(ind);
  document.getElementById("upagentnum").value = user_json[ind].agentID;
  document.getElementById("upagentname").value = user_json[ind].agentName;
  document.getElementById("updesignation").value = user_json[ind].designation;
}

function updateAgent() {
  console.log("HAI");
  var upid = document.getElementById("upagentnum").value;
  var upname = document.getElementById("upagentname").value;
  var updesignation = document.getElementById("updesignation").value;
  if (upid === "" || upname === "") {
    alert("Provide All the Details!!!");
    event.preventDefault();
    return;
  }
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        display();
      }
    }
  };
  console.log(AGENTID);
  xhttp.open("PUT", "http://localhost:5000/agent/" + AGENTID, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      agentID: upid,
      agentName: upname,
      designation: updesignation,
    })
  );
  event.preventDefault();
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
  toastr["info"]("Agent Details Updated Successfully!!!");

  document.getElementById("popupForm3").reset();
  document.getElementById("popupForm3").classList.add("hidden3");
}
