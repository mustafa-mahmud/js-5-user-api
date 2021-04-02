'use strict';

const container = document.querySelector('.container');
const add = document.querySelector('.add');
const sort = document.querySelector('.sort');
const double = document.querySelector('.double');
const millionier = document.querySelector('.millionier');
const reset = document.querySelector('.reset');
const info = document.querySelector('.info');
const total = document.querySelector('.total');

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
    resetData = data;
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

  info.innerHTML = output;
}

function currencyFormate(money) {
  const currency = money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return currency;
}

function sortMoney() {
  data = data.sort((a, b) => {
    return a.money - b.money;
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

//Events==========================
add.addEventListener('click', () => fetchData(url));
sort.addEventListener('click', sortMoney);
double.addEventListener('click', doubleMoney);
millionier.addEventListener('click', millionierPerson);
