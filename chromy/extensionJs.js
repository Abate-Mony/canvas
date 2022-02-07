let myLeads = [];
const inputEl = document.getElementById("inputEl");
const inputBtn = document.getElementById("inputBtn");
const ulEl = document.getElementById("ulEl");
let leadsFromLocalStorage = localStorage.getItem("myleads");
let saveTab = document.getElementById("tab_btn");
leadsFromLocalStorage = JSON.parse(leadsFromLocalStorage)
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function saveLead(e) {
    if (e.key === "Enter") {
        myLeads.push(inputEl.value);
        inputEl.value = ""
        myLeads = JSON.stringify(myLeads);
        localStorage.setItem("myleads", myLeads);
        myLeads = JSON.parse(myLeads);
        render(myLeads);
    }
}

saveTab.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myleads", JSON.stringify(myLeads));
        render(myLeads);
    })

});

function render(Leads) {
    let listItems = "";
    for (let i = 0; i < Leads.length; ++i) {
        listItems += `
    <li>
    <a target='_blank' href='${Leads[i]}' >${Leads[i]}</a>
            </li>`;
    }
    ulEl.innerHTML = listItems;
}
inputEl.addEventListener("keypress", saveLead);
inputBtn.addEventListener("dblclick", function() {
        localStorage.clear();
        myLeads = [];
        render(myLeads);
    })
