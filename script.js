const brands = document.getElementById('auto');
const button = document.querySelector('.button');
const price = document.querySelector('.price');
const models = document.querySelector('.models');
const owners = document.querySelector('.owners');

const engineVolume = form.elements.engineVolume;
const carCondition = form.elements.conditionType;

const reno = [
    { model: 'Logan', price: 6000 },
    { model: 'Sandero', price: 7000 },
    { model: 'Duster', price: 8000 }
];
const opel = [
    { model: 'Astra', price: 16000 },
    { model: 'Corsa', price: 17000 },
    { model: 'Zafira', price: 18000 }
];

const mazda = [
    { model: 'CX-60', price: 26000 },
    { model: 'CX-5', price: 27000 },
    { model: 'CX-30', price: 38000 }

];

const jaguar = [
    { model: 'F-PACE', price: 36000 },
    { model: 'F-TYPE', price: 37000 },
    { model: 'XF', price: 38000 }
];
const priceFuel = {
    baseprice: 1000,
    petrol: 2000,
    diesel: 3000,
    gas: 4000,
    electric: 4500
}

const priceByOwners = {
    increase: 1500,
    decrease: -1000
}

const paymentWayPrice = {
    cash: -5000,
    card: 1000,
    invoice: 2000
}
const priceForLiter = 450;

brands.addEventListener("change", changeModels);

function changeModels() {
    if (brands.value == "reno") {
        cleanForm();
        reno.forEach(function (el) {
            let modelOption = document.createElement('option');
            models.appendChild(modelOption);
            modelOption.value = el.model;
            modelOption.innerHTML = `${el.model}`;
        });
    } else if (brands.value == "opel") {
        cleanForm();
        opel.forEach(function (el) {
            let modelOption = document.createElement('option');
            models.appendChild(modelOption);
            modelOption.value = el.model;
            modelOption.innerHTML = `${el.model}`;

        });
    } else if (brands.value == "mazda") {
        cleanForm();
        mazda.forEach(function (el) {
            let modelOption = document.createElement('option');
            models.appendChild(modelOption);
            modelOption.value = el.model;
            modelOption.innerHTML = `${el.model}`;
        });

    } else {
        cleanForm();
        jaguar.forEach(function (el) {
            let modelOption = document.createElement('option');
            models.appendChild(modelOption);
            modelOption.value = el.model;
            modelOption.innerHTML = `${el.model}`;
        });
    }
}

changeModels();

function cleanForm() {
    models.innerHTML = '';
}

function countFuelPrice() {
    if (document.getElementById('petrol').checked) {
        return priceFuel.petrol;
    } else if (document.getElementById('diesel').checked) {
        return priceFuel.diesel;
    } else if (document.getElementById('gas').checked) {
        return priceFuel.gas;
    } else {
        return priceFuel.electric;
    }
}


function checkAutoPrice() {
    if (carCondition.value === 'new') {
        owners.innerHTML = '';
        let conditionPrice = 0;
        conditionPrice = priceFuel.baseprice;
        return conditionPrice;
    } else if (carCondition.value === 'used') {
        getConditionPrice();
        let conditionPrice = 0;
        conditionPrice = conditionPrice + getOwnersPrice();
        return conditionPrice;
    };
}


for (let i = 0; i < carCondition.length; i++) {
    carCondition[i].onchange = checkAutoPrice;
}
function getConditionPrice() {
    let displayOwners = `
        <div class="owners__question">
                    <div class="owners__question_head">Выберите количество владельцев</div>
                </div>
                <div class="owners__number">
                    <div class="number-option">
                        <input class="number-option__choice" type="radio" id="lessOwners"
                            name="numberOfOwners" value="one-two"/>
                        <label class="number-option__choice" for="lessOwners">Один-два владельца</label>
                    </div>
                    <div class="number__option">
                        <input class="number-option__choice" type="radio" id="moreOwners"
                            name="numberOfOwners" value="moreThanThree" />
                        <label class="number-option__choice" for="moreOwners">Три и более владельцев</label>
                    </div>
                </div>`;
    owners.innerHTML = displayOwners;
}
function getOwnersPrice() {
    if (document.getElementById('lessOwners').checked) {
        return priceByOwners.increase;
    } else {
        return priceByOwners.decrease;
    }
}
function countPaymentPrice() {
    if (document.getElementById('cash').checked) {
        return paymentWayPrice.cash;
    } else if (document.getElementById('invoice').checked) {
        return paymentWayPrice.invoice;
    } else {
        return paymentWayPrice.card;
    }
}


button.onclick = () => {
    models.addEventListener("change", countPrice());
}


function countPrice() {
    let selectedModel = models.options.selectedIndex;
    function getModelPrice() {
        if (brands.value == "reno") {
            return reno[selectedModel].price;
        } else if (brands.value == "opel") {
            return opel[selectedModel].price;
        } else if (brands.value == "mazda") {
            return mazda[selectedModel].price;
        } else {
            return jaguar[selectedModel].price;
        }
    }
    const priceOfEngineVolume = priceForLiter * engineVolume.value;
    let sum = 0;
    sum = sum + getModelPrice() + countFuelPrice() + priceOfEngineVolume + checkAutoPrice() + countPaymentPrice();

    let showPrice = `Стоимость автомобиля составляет <strong> ${sum}</strong> рублей`;
    price.innerHTML = showPrice;
}
