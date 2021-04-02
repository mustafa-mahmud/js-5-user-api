'use strict';

const container = document.querySelector('.container');
const infoEl = document.querySelector('.info');
const balanceEl = document.querySelector('.balance i');

const addBtn = document.querySelector('.add');
const sortBtn = document.querySelector('.sort');
const doubleBtn = document.querySelector('.double');
const millionierBtn = document.querySelector('.millionier');
const resetBtn = document.querySelector('.reset');
const totalBtn = document.querySelector('.total');

const url = 'https://randomuser.me/api/';
let data = [];
let resetData = [];
let output = '';
let status = true;

async function fetchData(url) {
  const response = await fetch(url);
  const {
    results: [
      {
        name: { title, first, last },
        picture: { large },
      },
    ],
  } = await response.json();

  data.push({
    image: large,
    name: `${title} ${first} ${last}`,
    money: Math.floor(Math.random() * 1000000),
  });

  if (status && data.length === 4) {
    resetData = [...data];
    status = false;
  }

  display();
}

function init() {
  fetchData(url);
  fetchData(url);
  fetchData(url);
  fetchData(url);
}

init();

function display() {
  output = '';
  output += `
		${data
      .map((el) => {
        return `<p>
						<img src="${el.image}" alt="${el.name}" />
						<span class="name">${el.name}</span> 
						<span class="money">$${currencyFormate(el.money)}</span>
				</p>`;
      })
      .join('')}
	`;

  infoEl.innerHTML = output;
}

function currencyFormate(money) {
  const currency = money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return currency;
}

function sortMoney() {
  data = data.sort((a, b) => {
    return b.money - a.money;
  });

  display();
}

function doubleMoney() {
  data = data.map((el) => ({
    image: el.image,
    name: el.name,
    money: el.money * 2,
  }));

  display();
}

function millionierPerson() {
  const ckMillionior = data.filter((el) => el.money >= 1000000);

  if (ckMillionior.length > 0) data = ckMillionior;

  display();
}

function totalMoney() {
  const onlyMoneys = data.map((el) => el.money);
  const totalMoney = onlyMoneys.reduce((a, b) => a + b);

  const totalCurrency = currencyFormate(totalMoney);

  balanceEl.textContent = '$' + totalCurrency;
}

function resetAll() {
  data = [...resetData];
  console.log(resetData);
  display();
}

//Events==========================
addBtn.addEventListener('click', () => fetchData(url));
sortBtn.addEventListener('click', sortMoney);
doubleBtn.addEventListener('click', doubleMoney);
millionierBtn.addEventListener('click', millionierPerson);
totalBtn.addEventListener('click', totalMoney);
resetBtn.addEventListener('click', resetAll);
