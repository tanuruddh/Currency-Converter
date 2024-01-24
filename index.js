const baseURL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


let btn=document.querySelector(".btn");
let dropdowns=document.querySelectorAll(".dropdown select");
let firstCountry=document.querySelector(".from select");
let secondCountry=document.querySelector(".to select");
let msg=document.querySelector(".msg");
let exchange=document.querySelector(".exchange");

async function  updateExchangeRate (){
    let amount=document.querySelector("input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<=1){
        amount.value=1;
        amtVal=1;
    }
    let URL=`${baseURL}/${firstCountry.value.toLowerCase()}/${secondCountry.value.toLowerCase()}.json`
    
    let response= await fetch(URL);
    let data=await response.json();
    let rate=data[secondCountry.value.toLowerCase()];
    let finalAmt=amtVal*rate;
    msg.innerText=`${amtVal} ${firstCountry.value} = ${finalAmt} ${secondCountry.value}`
}

function changeImg(currData,imgPath){
    let img=document.querySelector(`.${imgPath} img`);
    let countryCode=countryList[currData];
    img.src=`https://flagsapi.com/${countryCode}/flat/64.png`;
}

for(let select of dropdowns){
    for(currency in countryList){
        let option=document.createElement("option");
        option.innerText=currency;
        option.value=currency;
        if(select.name==="from" && currency==="USD"){
            option.selected="selected";
        }
        else if(select.name==="to"&& currency==="INR"){
            option.selected="selected";
        }
        select.append(option);
    }
    select.addEventListener("change",(eve)=>{
        changeImg(eve.target.value,select.id);
        
    })
}


btn.addEventListener("click",(eve)=>{
    eve.preventDefault();
    updateExchangeRate();
    
})


window.addEventListener("load",()=>{
    updateExchangeRate();
})

exchange.addEventListener("click",()=>{
    let third=firstCountry.value;
    firstCountry.value=secondCountry.value
    secondCountry.value=third;
    changeImg(firstCountry.value,"from");
    changeImg(secondCountry.value,"to");
    updateExchangeRate();

})

