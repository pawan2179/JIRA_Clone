let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalContainer = document.querySelector(".modal-cont");
let mainContainer = document.querySelector(".main-cont")
let textAreaContainer = document.querySelector(".text-area-cont");
let showFlag = false;
let colors = ["green", "yellow", "orange", "red"];
let defaultTicketPriority = colors[0];
let allPriorityColor = document.querySelectorAll(".priority-color");
let selectedPriorityColor = colors[0];
let removeFlag = false;
let ticketsArr = [];

let toolboxColors = document.querySelectorAll(".color");

let lockClass = "fa-lock";
let unlockClass = "fa-unlock";

for(let i = 0; i < toolboxColors.length; i++) {
    toolboxColors[i].addEventListener("click", (event) => {
        let currentToolboxColor = toolboxColors[i].classList[1];

        let filteredArr = ticketsArr.filter((ticketObj, idx) => {
            return currentToolboxColor === ticketObj.ticketColor
        })

        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        for(let i = 0; i < allTicketsCont.length; i++) {
            allTicketsCont[i].remove();
        }

        filteredArr.forEach((ticketObj, idx) => {
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.id);
        })
    })

    toolboxColors[i].addEventListener("dblclick", (event) => {
        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        for(let i = 0; i < allTicketsCont.length; i++) {
            allTicketsCont[i].remove();
        }

        for(let i = 0; i < ticketsArr.length; i++) {
            createTicket(ticketsArr[i].ticketColor, ticketsArr[i].ticketTask, ticketsArr[i].id);
        }
    })
}

allPriorityColor.forEach(element => {
    element.addEventListener("click", (event) => {
        allPriorityColor.forEach(priorityColor => {
            priorityColor.classList.remove("selected-priority")
        })
        element.classList.add("selected-priority");

        selectedPriorityColor = element.classList[1];
    })
});

addBtn.addEventListener("click", (event) => {
    showFlag = !showFlag;
    if(showFlag) {
        modalContainer.style.display = "flex";
    }
    else {
        modalContainer.style.display = "none";
    }
});

removeBtn.addEventListener("click", (event) => {
    removeFlag = !removeFlag
});

modalContainer.addEventListener("keydown", (event) => {
    let key = event.key;
    if(key == "Shift") {
        createTicket(selectedPriorityColor, textAreaContainer.value);
        textAreaContainer.value = "";
        modalContainer.style.display = "none";
        showFlag = false;
    }
})

function createTicket(ticketColor, ticketTask, ticketId) {
    let id = ticketId || shortid();
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${id}</div>
        <div class="ticket-details">${ticketTask}</div>
        <div class="ticket-lock">
            <i class="fa-solid fa-lock"></i>
        </div>
    `;
    mainContainer.appendChild(ticketCont);
    if (!ticketId) {
        ticketsArr.push({ticketColor, ticketTask, id});
    }

    handleRemove(ticketCont);
    handleLock(ticketCont);
    handleColor(ticketCont)
}

function handleRemove(ticket) {
    if(removeFlag) {
        ticket.remove();
    }
}

function handleLock(ticketCont) {
    let ticketLockElement = ticketCont.querySelector(".ticket-lock");
    let ticketLock = ticketLockElement.children[0];
    let ticketTextArea = ticketCont.querySelector(".ticket-details");
    ticketLock.addEventListener("click", (event) => {
        if(ticketLock.classList.contains(lockClass)) {
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unlockClass);
            ticketTextArea.setAttribute("contenteditable", "true");
        }
        else {
            ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            ticketTextArea.setAttribute("contenteditable", "false");
        }
    })
}

function handleColor(ticketCont) {
    let ticketColor = ticketCont.querySelector(".ticket-color");
    ticketColor.addEventListener("click", (event) => {
        let currentTicketColor = ticketColor.classList[1];
        let currentColorIndex = colors.findIndex((color) => {
            return color === currentTicketColor;
        })
        let nextColorIndex = (currentColorIndex + 1) % colors.length
        let nextTicketColor = colors[nextColorIndex];

        ticketColor.classList.remove(currentTicketColor);
        ticketColor.classList.add(nextTicketColor);
    });
}