let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const clearBtn = document.getElementById("clear-btn")
const tabBtn = document.getElementById("tab-btn")

let leadsFromLocalStorage = JSON .parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

inputBtn.addEventListener("click", function(){
    let httpsInput = "https://"
    httpsInput += inputEl.value
    myLeads.push(httpsInput)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads)
})

clearBtn.addEventListener("click", function(){
    clearLeads()
    renderLeads(myLeads)
})
tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
})

function renderLeads(leads){
    let listItems = ""
    for(let i=0; i < leads.length ; i++){
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
    `
    }
    ulEl.innerHTML = listItems
}
function clearLeads(){
    myLeads = []
    localStorage.clear()
}

