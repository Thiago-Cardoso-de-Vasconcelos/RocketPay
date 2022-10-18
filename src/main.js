// *****************************
//  >>> import "/css/index.css" <<<
// ------------------------------

// não consegui fazer funcionar, tive que adicionar o css
// direto no head <link rel="stylesheet" href="/src/css/index.css">

// *******************************


const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")


function setCardType(type){
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
  }
  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
}

setCardType("mastercard")