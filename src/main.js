// *****************************
//  >>> import "/css/index.css" <<<
//  >>> import IMask from "imask" <<<
// ------------------------------
// não consegui fazer Vite funcionar, 
// tive que adicionar os links direto no index
// ------------------------------
// *******************************
const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")


function setCardType(type){
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#DF6F29", "#C69347"],
    elo: ["#000000", "#000000"],
    hiper: ["#c9bea6", "#9b0000"],
    default: ["#000000", "gray"],
  }
  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src",`/public/cc-${type}.svg`)
}

globalThis.setCardType = setCardType

const securityCode = document.getElementById("security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.getElementById("expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)


const cardNumber = document.getElementById("card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex:
        /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
      cardtype: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^606282|^637095|^637599|^637568/,
      cardtype: "hiper",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
 alert("cartão adicionado!")
})

document.querySelector("form").addEventListener("submit", (event) =>{
 event.preventDefault()
 
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")

  ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILA" : cardHolder.value
})

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value);
})

function updateSecurityCode(code){
  const ccSecutiry = document.querySelector(".cc-security .value")
  ccSecutiry.innerText = code.length === 0 ? "123" : code
}
cardNumberMasked.on("accept", () =>{
 
 const cardType = cardNumberMasked.masked.currentMask.cardtype 
 setCardType(cardType) 
 updateCardNumber(cardNumberMasked.value)
})
function updateCardNumber(number){
 const ccNumber = document.querySelector(".cc-number")
 ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
} 

expirationDateMasked.on("accept", () =>{
  updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(date){
  const ccExpiration = document.querySelector(".cc-extra .value")
  ccExpiration.innerText = date.length === 0 ? "02/32" : date
}

