const main =  document.getElementById("main");
const addUserBtn =  document.getElementById("add_user");
const doubleBtn =  document.getElementById("double");
const showMillionariesBtn =  document.getElementById("show_millionaries");
const sortBtn =  document.getElementById("sort");
const calculateBTn =  document.getElementById("calculate_weath");


let data = [];

getRandomUser()
getRandomUser()
getRandomUser()

//fetch data
 async function getRandomUser () {
    const res = await fetch("https://randomuser.me/api")
    const data = await res.json()

    const user = data.results[0]

    const newUser = {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random() * 1000000)

    }

   addData(newUser)
    
}

//add new object to array data
function addData (obj) {
    data.push(obj)

    updateDom()
}

//double everyone  money
function doubleMoney () {
    data =  data.map( user => {
        return {...user, money : user.money * 2}
    })

    updateDom()
}

//sort by richest
function sortByRichest () {
    data.sort((a, b) => b.money - a.money );

    updateDom()
}

//show millionaries
function showMillionaries () {
    data = data.filter((user) => {
        return user.money > 1000000
    })

    updateDom()
}

//calculate All money
function calculateAll () {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML =  `<h3>Total Wealth : <strong>${formatMoney(wealth)}</strong></h3>`

    main.appendChild(wealthEl);
}

//Update DOM

function updateDom (providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'
    providedData.forEach((item, index) => {
        const element =  document.createElement('div');
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name} </strong> <strong>${formatMoney(item.money)}</strong>`

        main.appendChild(element)
    })
}

//Format money
function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest)
showMillionariesBtn.addEventListener('click', showMillionaries);
calculateBTn.addEventListener('click', calculateAll)