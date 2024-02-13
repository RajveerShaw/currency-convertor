const URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropDown = document.querySelectorAll(".fromTo select"); //first mistake is that we need to add querySelectorAll not querySelector for dropdowns.
let but = document.querySelector("#but");
let fromCurr = document.querySelector("#from select");
let toCurr = document.querySelector("#to select");

for(let select of dropDown){ // for array kind we use of. Here each select is taken one by one
  for(countyC in countryList){ // for objects in is used
    newOption = document.createElement("option");
    newOption.innerText = countyC;
    newOption.value = countyC;
    if(select.name==="country1" && countyC==="USD")
    {
      newOption.selected = "selected";
    }
    if(select.name==="country2" && countyC==="INR")
    {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt)=>{
    changeFlag(evt.target)
  })
};

const changeFlag = (element) =>{
  let currC = element.value;
  let countryC = countryList[currC];
  let newSrc = `https://flagsapi.com/${countryC}/flat/64.png`
  // if(element.name==="country1"){
  //   let flag = document.querySelector("#dropdown1 img")
  //   flag.src = newSrc;
  // }
  // if(element.name==="country2"){
  //   let flag = document.querySelector("#dropdown2 img")
  //   flag.src = newSrc;
  // }
  //OR
  let image = element.parentElement.querySelector("img");
  image.src = newSrc;
};



const updateExchange = async (evt) =>{
  evt.preventDefault();
  let amount = document.querySelector("#txt");
  let convert = document.querySelector("#convert");
  if(amount.value===""||amount.value<0)
  {
    amount.value = "1";
  }
  const baseURL = `${URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(baseURL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let newAmount = rate*amount.value;
  convert.innerText = `${amount.value} ${fromCurr.value} = ${newAmount} ${toCurr.value}`;
}

but.addEventListener("click", updateExchange);
window.addEventListener("load",updateExchange);