const rates = {}
let currencies = []
let currentcurrency = ''
const elementUSD = document.querySelector('[data-value="USD"]')
const elementEUR = document.querySelector('[data-value="EUR"]')

const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#current-currency');

getCurrencies()

select.addEventListener('change', function(e){
    currentcurrency = e.target.value
    changeCours()
})

function changeCours () {
    if(currentcurrency === 'UAH'){
        setCurse(1)
    }else{
        const currentrate = currencies.find((item) => item.cc === currentcurrency).rate
        setCurse(currentrate)
    }
}

function setCurse (currentrate) {
    const usdRate = currencies.find((item) => item.cc === 'USD').rate
    const eurRate = currencies.find((item) => item.cc === 'EUR').rate
    const rateUSD = usdRate / currentrate
    const rateEUR = eurRate / currentrate
    elementUSD.textContent = rateUSD.toFixed(2);
    elementEUR.textContent = rateEUR.toFixed(2);
}

async function getCurrencies(){
    const response = await fetch ('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    const result = await response.json();
    currencies = result
    const currencyNames = result.map(item => item.cc)
    const selectOptions = currencyNames.map(item => `<option value='${item}'>${item}</option>`)
    select.insertAdjacentHTML('beforeend', selectOptions.join(''))
    setCurse(1)

} 

input.oninput = convertValue
select.oninput = convertValue

function convertValue(){
    result.value = (parseFloat(input.value) / rates[select.value]).toFixed(2)
}

const menu = document.getElementById('navigation');
const pages = document.querySelectorAll('.page')
menu.addEventListener('click', function (e){
    e.preventDefault()
    if(e.target.classList.contains('nav-link')){
        pages.forEach(element => element.classList.add('d-none'));
        const {link} = e.target.dataset
        const page = document.querySelector(`.page.${link}`)
        page.classList.remove('d-none')
    }
})
const outputValue = document.getElementById('output-value')
const currentInput = document.getElementById('inputCurrent');
currentInput.addEventListener('blur', function(e){
    const [amaunt, currencyFrom, , currencyTo] = this.value.split(' ')
    const currencyFromRate = currencies.find((item) => item.cc === currencyFrom).rate
    const currencyToRate = currencies.find((item) => item.cc === currencyTo).rate
    const newCourse = amaunt*(currencyFromRate / currencyToRate)
    outputValue.textContent = newCourse.toFixed(2)
})

