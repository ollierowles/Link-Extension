// Const cannot be reassigned unlike let
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById('tab-btn')
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const storage = localStorage

let myLeads = []
let leadsFromLocal = JSON.parse(localStorage.getItem('myLeads'))

if(leadsFromLocal){
    myLeads=leadsFromLocal
    getLeads(myLeads)
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    getLeads(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value=''
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    getLeads(myLeads)
    console.log(localStorage.getItem('myLeads'))
})

tabBtn.addEventListener("click", function(){

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs[0].url)
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        getLeads(myLeads)
    })

})


function getLeads(leads){
    let listItems = ""
    for (let i=0; i<leads.length; i++){
        //listItems += "<li><a href='" + myLeads[i] +"' target='_blank'>" + myLeads[i] + "</a></li>"
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `

    }
    ulEl.innerHTML=listItems
}

