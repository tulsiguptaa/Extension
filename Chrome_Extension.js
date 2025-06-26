const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const tab_btn = document.getElementById("save-tab")
const leadsfrom = JSON.parse(localStorage.getItem("myLeads"))
const del_btn = document.getElementById("delete-btn")

let myLeads = []
if (leadsfrom) {
    myLeads = leadsfrom
    render(myLeads)
}

// local storage save the data even after refreshing the web page

del_btn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


tab_btn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"

        // const li = document.createElement("li")
        // li.textContent = myLeads[i]
        // ulEl.append(li)

        // listItems += "<li><a href='#' target='_blank'>" + myLeads[i] + "</a></li>"

        // ` can used to break into multiple lines
        // template strings ${}
        listItems += `<li>     
         <a href='${leads[i]}' target='_blank'>
         ${leads[i]}
         </a>
         </li>`
    }
    ulEl.innerHTML = listItems
}
