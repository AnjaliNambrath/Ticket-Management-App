//Checking for new Ticket notification
setInterval(displayNotification, 1000);

window.onload = function () {
  const accessT = localStorage.getItem("token");
  if (!accessT) {
    location.href = "/userlogin.html";
    return;
  }
  display();
};

function displayNotification() {
  fetchNewTasks();
}

function fetchNewTasks() {
  var userName = localStorage.getItem("AGENTUSER");
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var newTasks = JSON.parse(this.responseText);
        console.log(newTasks);
        if (newTasks.length > 0) {
          let notificationMessage = "You have new ticket assigned:\n";
          console.log("You have new tasks");
          newTasks.forEach(function (task) {
            notificationMessage += `<br>Ticket ID: ${task.ticketID}, Issue: ${task.issue}\n`;
          });
          display();
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
            timeOut: 0,
            extendedTimeOut: 0,
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
            tapToDismiss: false,
          };
          toastr["success"](`${notificationMessage}`, "New Notification");
        }
      }
    }
  };
  xhr.open("GET", `http://localhost:5000/ticket/notifications/${userName}`, true);
  xhr.send();
}

function logout() {
  localStorage.removeItem("AGENTUSER");
  localStorage.removeItem("AGENTEMAIL");
  localStorage.removeItem("USERID");
  localStorage.removeItem("token");
  location.href = "/userlogin.html";
}

var NAME = localStorage.getItem("AGENTUSER");
var task_json = "";

//Ticket Display Function
function display() {
  var content = `<div class="links">
                <button> HEY ${NAME} ! HERE IS YOUR ASSIGNED TICKETS </button>
        </div>
        <div class='table'><div class='user-header'><span class='headcell' id='taskIDHeader'>TICKET ID
          <div class="sort-buttons">
            <button onclick="sortData('ticketID', 'asc')">▲</button>
            <button onclick="sortData('ticketID', 'desc')">▼</button>
          </div>
        </span>
        <span class='headcell' id='taskNameHeader'>
          ISSUE
          <div class="sort-buttons">
            <button onclick="sortData('issue', 'asc')">▲</button>
            <button onclick="sortData('issue', 'desc')">▼</button>
          </div>
        </span><span class='headcell' id='statusHeader'>
          STATUS
          <div class="sort-buttons">
            <button onclick="sortData('status', 'asc')">▲</button>
            <button onclick="sortData('status', 'desc')">▼</button>
          </div>
        </span><span class='headcell' id='endDateHeader'>
          PRIORITY
          <div class="sort-buttons">
            <button onclick="sortData('priority', 'asc')">▲</button>
            <button onclick="sortData('priority', 'desc')">▼</button>
          </div>
        </span></div>`;
  var htt = new XMLHttpRequest();
  htt.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        res = this.responseText;
        task_json = JSON.parse(res);
        let flag = 0;
        for (let u in task_json) {
          if (task_json[u].assignedTo != null) {
            if (NAME == task_json[u].assignedTo.agentName){
            flag = 1;
            if (task_json[u].status == "Resolved") {
              var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                                <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span></span><span class='cell'>${task_json[u].priority}</span>
                                <button style="margin-left:50px;background-color: rgb(13, 97, 13);" class="Cbtn" disabled>Ticket Resolved</button>
                                <p/><br></div>`;
              content = content + usr;
            } else if (task_json[u].status == "Closed") {
              var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                                <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span><span class='cell'>${task_json[u].priority}</span>
                                <button style="margin-left:50px;background-color:rgb(216, 24, 24);" class="Cbtn" disabled>Ticket Closed</button>
                                <p/><br></div>`;
              content = content + usr;
            } else if (
              task_json[u].status == "In-Progress" ||
              task_json[u].status == "Open"
            ) {
              var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                                <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span><span class='cell'>${task_json[u].priority}</span>
                                <button style="margin-left:20px;background-color: black;" class="btn" id="showFormButton" onclick="seditTicket('${task_json[u]._id}')">Update Status</button>
                                <button style="margin-left:20px;background-color: black;" class="btn" id="showFormButton" onclick="assignTask('${task_json[u]._id}')">Assign Agent</button>
                                <p/><br></div>`;
              content = content + usr;
            } else {
              var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                                <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span><span class='cell'>${task_json[u].priority}</span>
                                <button style="margin-left:20px;background-color: black;" class="btn" id="showFormButton" onclick="seditTicket('${task_json[u]._id}')">Update Status</button>
                                <button style="margin-left:20px;background-color: black;" class="btn" id="showFormButton" onclick="assignTask('${task_json[u]._id}')">Assign Agent</button>
                                <p/><br></div>`;
              content = content + usr;
            }
            var element = document.getElementById("root");
            element.innerHTML = content + "</div>";
          }
        }
      }
        console.log(flag);
        if (flag == 0) {
          var element = document.getElementById("root");
          element.innerHTML = `<br><br><div class='container' style="margin-left:270px; text-align:center;"><b>You have no tickets assigned so far!!!</b></div></div>`;
          var element1 = document.getElementById("searchroot");
          element1.innerHTML = "";
        }      
      }
    }
  };
  htt.open("GET", "http://localhost:5000/ticket", true);
  htt.send();
}

function closePopup() {
  document.getElementById("popupForm").classList.add("hidden");
}

let STASKID;

function seditTicket(tkId) {
  document.getElementById("popupForm").classList.remove("hidden");
  STASKID = tkId;
  var ind = task_json.findIndex((e) => e._id === tkId);
  console.log(ind);
  document.getElementById("supresence").value = task_json[ind].status;
  // document.getElementById("comment").value = task_json[ind].comment;
}

//Update status of Ticket
function updateStatus() {
  document.getElementById("popupForm").classList.add("hidden");
  var supstatus = document.getElementById("supresence").value;
  var comment = document.getElementById("comments").value;
  if (comment ==="") {
    comment = "No Comment"
  }
  xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        display();
      }
    }
  };
  xhttp.open("PUT", "http://localhost:5000/ticket/" + STASKID, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      status: supstatus,
      comment: comment,
    })
  );
  event.preventDefault();
  document.getElementById("supdateForm").reset();
}

function closePopup() {
  document.getElementById("popupForm").classList.add("hidden");
  document.getElementById("popupForm3").classList.add("hidden3");
  document.getElementById("popupForm2").classList.add("hidden2");
}

function getComments(Id) {
  document.getElementById("popupForm3").classList.remove("hidden3");
  var ind = task_json.findIndex((e) => e._id === Id);
  console.log(ind);
  document.getElementById("comment").value = task_json[ind].comment;
}

//Ticket Display Function after search
function searchTickets() {
  const searchTerm = document.getElementById("Searchtickets").value;
  const tableBody = document.getElementById("root");
  tableBody.innerHTML = ""; // Clear existing content
  var content = `<div class="links">
                <button> HEY ${NAME} ! HERE IS YOUR ASSIGNED TICKETS </button>
        </div>
        <div class='table'><div class='user-header'><span class='headcell' id='taskIDHeader'>TICKET ID
          <div class="sort-buttons">
            <button onclick="sortData('ticketID', 'asc')">▲</button>
            <button onclick="sortData('ticketID', 'desc')">▼</button>
          </div>
        </span>
        <span class='headcell' id='taskNameHeader'>
          ISSUE
          <div class="sort-buttons">
            <button onclick="sortData('issue', 'asc')">▲</button>
            <button onclick="sortData('issue', 'desc')">▼</button>
          </div>
        </span><span class='headcell' id='statusHeader'>
          STATUS
          <div class="sort-buttons">
            <button onclick="sortData('status', 'asc')">▲</button>
            <button onclick="sortData('status', 'desc')">▼</button>
          </div>
        </span><span class='headcell' id='endDateHeader'>
          PRIORITY
          <div class="sort-buttons">
            <button onclick="sortData('priority', 'asc')">▲</button>
            <button onclick="sortData('priority', 'desc')">▼</button>
          </div>
        </span></div>`;

  var htt = new XMLHttpRequest();
  htt.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        res = this.responseText;
        task_json = JSON.parse(res);
        console.log(task_json);
        let flag = 0;
        for (let u in task_json) {
          if (task_json[u].assignedTo != null) {
            if (NAME == task_json[u].assignedTo.agentName){
            flag = 1;
            if (task_json[u].status == "Resolved") {
              var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                                <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span></span><span class='cell'>${task_json[u].priority}</span>
                                <button style="margin-left:50px;background-color: rgb(13, 97, 13);" class="Cbtn" disabled>Ticket Resolved</button>
                                <p/><br></div>`;
              content = content + usr;
            } else if (task_json[u].status == "Closed") {
              var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                                <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span><span class='cell'>${task_json[u].priority}</span>
                                <button style="margin-left:50px;background-color:rgb(216, 24, 24);" class="Cbtn" disabled>Ticket Closed</button>
                                <p/><br></div>`;
              content = content + usr;
            } else if (
              task_json[u].status == "In-Progress" ||
              task_json[u].status == "Open"
            ) {
              var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                                <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span><span class='cell'>${task_json[u].priority}</span>
                                <button style="margin-left:20px;background-color: black;" class="btn" id="showFormButton" onclick="seditTicket('${task_json[u]._id}')">Update Status</button>
                                <button style="margin-left:20px;background-color: black;" class="btn" id="showFormButton" onclick="assignTask('${task_json[u]._id}')">Assign Agent</button>
                                <p/><br></div>`;
              content = content + usr;
            } else {
              var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                                <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span><span class='cell'>${task_json[u].priority}</span>
                                <button style="margin-left:20px;background-color: black;" class="btn" id="showFormButton" onclick="seditTicket('${task_json[u]._id}')">Update Status</button>
                                <button style="margin-left:20px;background-color: black;" class="btn" id="showFormButton" onclick="assignTask('${task_json[u]._id}')">Assign Agent</button>
                                <p/><br></div>`;
              content = content + usr;
            }
            var element = document.getElementById("root");
            element.innerHTML = content + "</div>";
          }
        }
      }
        if (flag == 0) {
    //       var element = document.getElementById("root");
    //       element.innerHTML = `<div id="searchroot">
    // <input type="text" id="Searchtickets" style="margin-left:650px;" oninput="searchTickets()"
    //     placeholder="Search for Ticket Details Here">
    //     </div><br><br><div class='container' style="margin-left:-70px; text-align:center;"><b>No details matched your search criteria!!!</b></div></div>`;
    //       var element1 = document.getElementById("searchroot");
    //       element1.innerHTML = "";
    display();
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
    toastr["error"]("No details matched your search criteria!!!");
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

//filtering Logic
function sortData(field, order) {
  task_json.sort(function (a, b) {
    console.log("BS", task_json);
    var aValue = a[field];
    var bValue = b[field];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return order === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    }
  });
  console.log("AS", task_json);

  updateDisplay();
}

//Display ticket after filtering
function updateDisplay() {
  console.log("HAIII");
  var content = `<div class="links">
                <button> HEY ${NAME} ! HERE IS YOUR ASSIGNED TICKETS </button>
        </div>
        <div class='table'><div class='user-header'><span class='headcell' id='taskIDHeader'>TICKET ID
          <div class="sort-buttons">
            <button onclick="sortData('ticketID', 'asc')">▲</button>
            <button onclick="sortData('ticketID', 'desc')">▼</button>
          </div>
        </span>
        <span class='headcell' id='taskNameHeader'>
          ISSUE
          <div class="sort-buttons">
            <button onclick="sortData('issue', 'asc')">▲</button>
            <button onclick="sortData('issue', 'desc')">▼</button>
          </div>
        </span><span class='headcell' id='statusHeader'>
          STATUS
          <div class="sort-buttons">
            <button onclick="sortData('status', 'asc')">▲</button>
            <button onclick="sortData('status', 'desc')">▼</button>
          </div>
        </span><span class='headcell' id='endDateHeader'>
          PRIORITY
          <div class="sort-buttons">
            <button onclick="sortData('priority', 'asc')">▲</button>
            <button onclick="sortData('priority', 'desc')">▼</button>
          </div>
        </span></div>`;
  var element = document.getElementById("root");
  element.innerHTML = content + "</div>";
  for (let u in task_json) {
    if (task_json[u].assignedTo != null) {
            if (NAME == task_json[u].assignedTo.agentName){
      flag = 1;
      if (task_json[u].status == "Resolved") {
        var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                                <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span></span><span class='cell'>${task_json[u].priority}</span>
                                <button style="margin-left:50px;background-color: rgb(13, 97, 13);" class="Cbtn" disabled>Ticket Resolved</button>
                                <p/><br></div>`;
        content = content + usr;
      } else if (task_json[u].status == "Closed") {
        var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                                <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span><span class='cell'>${task_json[u].priority}</span>
                                <button style="margin-left:50px;background-color:rgb(216, 24, 24);" class="Cbtn" disabled>Ticket Closed</button>
                                <p/><br></div>`;
        content = content + usr;
      } else if (
        task_json[u].status == "In-Progress" ||
        task_json[u].status == "Open"
      ) {
        var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                                <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span><span class='cell'>${task_json[u].priority}</span>
                                <button style="margin-left:20px;background-color: black;" class="btn" id="showFormButton" onclick="seditTicket('${task_json[u]._id}')">Update Status</button>
                                <button style="margin-left:20px;background-color: black;" class="btn" id="showFormButton" onclick="assignTask('${task_json[u]._id}')">Assign Agent</button>
                                <p/><br></div>`;
        content = content + usr;
      } else {
        var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                                <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span><span class='cell'>${task_json[u].priority}</span>
                                <button style="margin-left:20px;background-color: black;" class="btn" id="showFormButton" onclick="seditTicket('${task_json[u]._id}')">Update Status</button>
                                <button style="margin-left:20px;background-color: black;" class="btn" id="showFormButton" onclick="assignTask('${task_json[u]._id}')">Assign Agent</button>
                                <p/><br></div>`;
        content = content + usr;
      }
      var element = document.getElementById("root");
      element.innerHTML = content + "</div>";
    }
  }
}
  if (flag == 0) {
    var element = document.getElementById("root");
    element.innerHTML = `<br><br><div class='container' style="margin-left:270px; text-align:center;"><b>You have no tickets assigned so far!!!</b></div></div>`;
    var element1 = document.getElementById("searchroot");
    element1.innerHTML = "";
  }
}


let TICKETID;

function assignTask(tid) {
  TICKETID = tid;
  console.log(TICKETID);
  document.getElementById("popupForm2").classList.remove("hidden2");
  fetchDesignations();
}

// Function to fetch designations from the backend
function fetchDesignations() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var designations = JSON.parse(this.responseText);
      populateDesignationDropdown(designations);
    }
  };
  xhttp.open("GET", "http://localhost:5000/designations", true);
  xhttp.send();
}

// Function to populate the designation dropdown
function populateDesignationDropdown(designations) {
  var dropdown = document.getElementById("designationDropdown");
  dropdown.innerHTML = '<option value="">Select Designation</option>';
  designations.forEach(function (designation) {
    var option = document.createElement("option");
    option.value = designation;
    option.text = designation;
    dropdown.add(option);
  });
}

// Function to fetch agents based on selected designation
function fetchAgentsByDesignation() {
  var designation = document.getElementById("designationDropdown").value;
  if (!designation) {
    document.getElementById("agentDropdown").disabled = true;
    return;
  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var agents = JSON.parse(this.responseText);
      console.log(agents);
      populateAgentDropdown(agents);
    }
  };
  xhttp.open(
    "GET",
    "http://localhost:5000/designations/agents/" + designation,
    true
  );
  xhttp.send();
}

// Function to populate the agent dropdown
function populateAgentDropdown(agents) {
  var dropdown = document.getElementById("agentDropdown");
  dropdown.innerHTML = '<option value="">Select Agent</option>';
  agents.forEach(function (agent) {
    var option = document.createElement("option");
    option.value = agent._id;
    option.text = agent.agentName;
    dropdown.add(option);
  });
  dropdown.disabled = false;
}

function assignToAgent() {
  var agentName = document.getElementById("agentDropdown").value;
  console.log(agentName);
  xhttp = new XMLHttpRequest();
  console.log(TICKETID);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      console.log(this.status);
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
        toastr["info"]("Ticket has been assigned Successfully!!!");
        display();
      }
    }
  };
  xhttp.open("PUT", "http://localhost:5000/ticket/" + TICKETID, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(
    JSON.stringify({
      assignedTo: agentName,
      New_Notification: true,
    })
  );
  var dropdown = document.getElementById("agentDropdown");
  dropdown.disabled = true;
  dropdown.innerHTML = '<option value="">Select Agent</option>';
  document.getElementById("popupForm2").classList.add("hidden2");
  event.preventDefault();
}

