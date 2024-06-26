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

function closePopup() {
  document.getElementById("popupForm1").classList.add("hidden1");
  document.getElementById("popupForm3").classList.add("hidden3");
  document.getElementById("popupForm1").reset();
  event.preventDefault();
}
var ticket_json = "";
function display() {
  var content = `<div class='table'><div class='user-header'><span class='headcell' id='taskIDHeader'>TICKET ID
        </span>
        <span class='headcell' id='taskNameHeader'>
          ISSUE
        </span><span class='headcell' id='statusHeader'>
          STATUS
        </span></div>`;
  var htt = new XMLHttpRequest();
  htt.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        res = this.responseText;
        var EID = localStorage.getItem("USERID");
        ticket_json = JSON.parse(res);
        let flag = 0;
        for (let u in ticket_json) {
          if (EID == ticket_json[u].customerID) {
            flag = 1;
            var usr = `<div class='user'><span class='cell'>${ticket_json[u].ticketID}</span><span class='cell'>${ticket_json[u].issue}</span>  
                                <span class='cell'style="margin-left:20px;">${ticket_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${ticket_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span>
                                <button class="btn" onclick="editTicket('${ticket_json[u]._id}')">Manage</button>
                                <button class="btn" onclick="deleteTicket('${ticket_json[u]._id}')">Delete</button>
                                <p/><br></div>`;
              content = content + usr;
            }
            var element = document.getElementById("root");
            element.innerHTML = content + "</div>";
          }
        if (flag == 0) {
          var element = document.getElementById("root");
          element.innerHTML = `<br><br><div class='container' style="margin-left:270px; text-align:center;"><b>You have not raised any tickets so far!!!</b></div></div>`;
            var element1 = document.getElementById("searchroot");
            element1.innerHTML = "";
        }
      }
    }
  };
  htt.open("GET", "http://localhost:5000/customer/getticketbyuser", true);
  htt.send();
}


//Ticket Display Function after search
function searchTickets() {
    const searchTerm = document.getElementById("Searchticket").value;
    const tableBody = document.getElementById("root");
    tableBody.innerHTML = ""; 
  var content = `<div class='table'><div class='user-header'><span class='headcell' id='taskIDHeader'>TICKET ID
        </span>
        <span class='headcell' id='taskNameHeader'>
          ISSUE
        </span><span class='headcell' id='statusHeader'>
          STATUS
        </span></div>`;
  var htt = new XMLHttpRequest();
  htt.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        res = this.responseText;
        var EID = localStorage.getItem("USERID");
        ticket_json = JSON.parse(res);
        let flag = 0;
        for (let u in ticket_json) {
          if (EID == ticket_json[u].customerID) {
            flag = 1;
              var usr = `<div class='user'><span class='cell'>${ticket_json[u].ticketID}</span><span class='cell'>${ticket_json[u].issue}</span>  
                                <span class='cell'style="margin-left:20px;">${ticket_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${ticket_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span>
                                <button class="btn" onclick="editTicket('${ticket_json[u]._id}')">Manage</button>
                                <button class="btn" onclick="deleteTicket('${ticket_json[u]._id}')">Delete</button>
                                <p/><br></div>`;
              content = content + usr;
            }
            var element = document.getElementById("root");
            element.innerHTML = content + "</div>";
          }
        
        if (flag == 0) {
          var element = document.getElementById("root");
          element.innerHTML =
            content +
            "<div class='user'>You have not raised any tickets so far</div></div>";
        }
      }
    }
  };
  htt.open(
    "GET",
    `http://localhost:5000/ticket/search?searchTerm=${searchTerm}`,
    true
  );
  htt.send();
}

//Delete Ticket
function deleteTicket(dltflt) {
  var xxhttp = new XMLHttpRequest();
  xxhttp.open("DELETE", "http://localhost:5000/ticket/" + dltflt, true);
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
        toastr["info"]("Ticket Deleted Successfully!!!");
        display();
      }
    }
  };
}

let TCKID;
//Edit Ticket Details function
function editTicket(tkt) {
    TCKID = tkt;
    var ind = ticket_json.findIndex((e) => e._id === tkt);
  document.getElementById("popupForm1").classList.remove("hidden1");
  document.getElementById("priority").value = ticket_json[ind].priority;
  document.getElementById("issue").value = ticket_json[ind].issue;
}

function updateTicket() {
    var priority = document.getElementById("priority").value;
    var issue = document.getElementById("issue").value;
  if (issue === "") {
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
      toastr["error"]("Provide All the Details!!!","ALERT");
    event.preventDefault();
    return;
  }
  xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
          console.log("HHH");
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
          toastr["info"]("Ticket Details Updated Successfully!!!");         
          display();
      }
    }
  };
  xhttp.open("PUT", "http://localhost:5000/ticket/" + TCKID, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      priority: priority,
      issue: issue,
    })
  );
  document.getElementById("popupForm1").reset();
  document.getElementById("popupForm1").classList.add("hidden1");
  event.preventDefault();
}

function getComments(Id) {
  document.getElementById("popupForm3").classList.remove("hidden3");
  var ind = ticket_json.findIndex((e) => e._id === Id);
  console.log(ind);
  document.getElementById("comment").value = ticket_json[ind].comment;
}
