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

var task_json = [];
//Ticket Display Function
function display() {
  var content = `<div class='table'><div class='user-header'><span class='headcell' id='taskIDHeader'>TICKET ID
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
          CUSTOMER
          <div class="sort-buttons">
            <button onclick="sortData('customerName', 'asc')">▲</button>
            <button onclick="sortData('customerName', 'desc')">▼</button>
          </div>
        </span><span class='headcell' id='assignedToHeader'>
          ASSIGNED TO
          <div class="sort-buttons">
            <button onclick="sortData('assignedTo', 'asc')">▲</button>
            <button onclick="sortData('assignedTo', 'desc')">▼</button>
          </div>
        </span></div>`;

  var htt = new XMLHttpRequest();
  htt.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        res = this.responseText;
        task_json = JSON.parse(res);
        for (let u in task_json) {
          if (task_json[u].assignedTo == null) {
            var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                    <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span><span class='cell'>${task_json[u].customerID.fullName}</span>
                    <button class="btn" onclick="assignTask('${task_json[u]._id}')">ASSIGN TICKET</button></div>`;
            content = content + usr;
          } else {
            var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                    <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span>
                    <span class='cell'>${task_json[u].customerID.fullName}</span>
                    <span class='cell'>${task_json[u].assignedTo.agentName}</span><p/><br></div>`;
            content = content + usr;
          }
          var element = document.getElementById("root");
          element.innerHTML = content + "</div>";
        }
      }
    }
  };
  htt.open("GET", "http://localhost:5000/ticket", true);
  htt.send();
}

//Ticket Display Function after search
function searchTickets() {
  const searchTerm = document.getElementById("Searchticket").value;
  const tableBody = document.getElementById("root");
  tableBody.innerHTML = ""; // Clear existing content
  var content = `<div class='table'><div class='user-header'><span class='headcell' id='taskIDHeader'>TICKET ID
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
          CUSTOMER
          <div class="sort-buttons">
            <button onclick="sortData('customerName', 'asc')">▲</button>
            <button onclick="sortData('customerName', 'desc')">▼</button>
          </div>
        </span><span class='headcell' id='assignedToHeader'>
          ASSIGNED TO
          <div class="sort-buttons">
            <button onclick="sortData('assignedTo', 'asc')">▲</button>
            <button onclick="sortData('assignedTo', 'desc')">▼</button>
          </div>
        </span></div>`;

  var htt = new XMLHttpRequest();
  htt.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        res = this.responseText;
        task_json = JSON.parse(res);
        for (let u in task_json) {
          if (task_json[u].assignedTo == null) {
            var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                    <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span><span class='cell'>${task_json[u].customerID.fullName}</span>
                    <button class="btn" onclick="assignTask('${task_json[u]._id}')">ASSIGN TICKET</button></div>`;
            content = content + usr;
          } else {
            var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                    <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span>
                    <span class='cell'>${task_json[u].customerID.fullName}</span>
                    <span class='cell'>${task_json[u].assignedTo.agentName}</span><p/><br></div>`;
            content = content + usr;
          }
          var element = document.getElementById("root");
          element.innerHTML = content + "</div>";
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
  var content = `<div class='table'><div class='user-header'><span class='headcell' id='taskIDHeader'>TICKET ID
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
          CUSTOMER
          <div class="sort-buttons">
            <button onclick="sortData('customerName', 'asc')">▲</button>
            <button onclick="sortData('customerName', 'desc')">▼</button>
          </div>
        </span><span class='headcell' id='assignedToHeader'>
          ASSIGNED TO
          <div class="sort-buttons">
            <button onclick="sortData('assignedTo', 'asc')">▲</button>
            <button onclick="sortData('assignedTo', 'desc')">▼</button>
          </div>
        </span></div>`;
  var element = document.getElementById("root");
  element.innerHTML = content + "</div>";
  for (let u in task_json) {
    if (task_json[u].assignedTo == null) {
      var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                    <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span><span class='cell'>${task_json[u].customerID.fullName}</span>
                    <button class="btn" onclick="assignTask('${task_json[u]._id}')">ASSIGN TICKET</button></div>`;
      content = content + usr;
    } else {
      var usr = `<div class='user'><span class='cell'>${task_json[u].ticketID}</span><span class='cell'>${task_json[u].issue}</span>  
                    <span class='cell'>${task_json[u].status}<button title="Click to see comments" id="showFormButton" onclick="getComments('${task_json[u]._id}')"><i class="bi bi-chat-left-text"></i></button></span>
                    <span class='cell'>${task_json[u].customerID.fullName}</span>
                    <span class='cell'>${task_json[u].assignedTo.agentName}</span><p/><br></div>`;
      content = content + usr;
    }
    var element = document.getElementById("root");
    element.innerHTML = content + "</div>";
  }
}

function closePopup() {
  document.getElementById("popupForm2").classList.add("hidden2");
  document.getElementById("popupForm3").classList.add("hidden3");
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
  var agentID = document.getElementById("agentDropdown").value;
  console.log(agentID);
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
      assignedTo: agentID,
    })
  );
  var dropdown = document.getElementById("agentDropdown");
  dropdown.disabled = true;
  dropdown.innerHTML = '<option value="">Select Agent</option>';
  document.getElementById("popupForm2").classList.add("hidden2");
  event.preventDefault();
}


function getComments(Id) {
  document.getElementById("popupForm3").classList.remove("hidden3");
  var ind = task_json.findIndex((e) => e._id === Id);
  console.log(ind);
  document.getElementById("comment").value = task_json[ind].comment;
}