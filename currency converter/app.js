const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const btn = document.querySelector("form button");
for(let select of dropdowns){
    for(currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value =currcode;
        if(select.name === "from" && currcode === "USD"){
            newoption.selected = "selected";
        }
        else if(select.name === "to" && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    })
}
const updateflag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateexchangerate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1){
        amtval = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let data1 = data[fromcurr.value.toLowerCase()];
    let rate = data1[tocurr.value.toLowerCase()];
    let finalamt = amtval * rate;
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateexchangerate();
});
window.addEventListener("load", () => {
    updateexchangerate();
});
