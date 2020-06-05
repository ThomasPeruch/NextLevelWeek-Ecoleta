function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res)=>{return res.json()})
    .then( states => {
        for(let state of states){
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
        }   
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    console.log(event.target.value)

    const ufValue = event.target.value

    const indexOfSelectedState=  event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a cidade</option> "
    
    citySelect.disabled = true
    fetch(url)
    .then((res)=>{return res.json()})
    .then( cities => {
        
        for(const city of cities){
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
        }   

        citySelect.disabled = false
    })

}

document.querySelector("select[name=uf]")
    .addEventListener("change",getCities)
// itens de coleta
//pegar todos li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(let item of itemsToCollect){
   item.addEventListener("click",handleSelectedItem) 
}
const collectedItems = document.querySelector("input[name=items]")
let selectedItems = [];

function handleSelectedItem(event){
    const itemLi =  event.target
    //adicionar ou remover uma classe com javaScript
    itemLi.classList.toggle("selected")

    const itemId =itemLi.dataset.id

//verificar se existem itens selecionados, se sim pega-los

    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound = item == itemId // sera true or false
        return itemFound
    })

//se ja estiver selecionados, tirar da seleção
if(alreadySelected >=0 ){
    const filteredItems = selectedItems.filter(item =>{
        const itemIsDifferent = item !=itemId
        return itemIsDifferent      
    })
    selectedItems = filteredItems
}else{
    //se não seleciona-los
    //atualizar o cmapo escondido com dados(itens) selecionados
    selectedItems.push(itemId)
}
    collectedItems.value = selectedItems

}
    

