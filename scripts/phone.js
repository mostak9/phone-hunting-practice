const loadData = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayData(phones);
}

const displayData = (phones) =>  {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML ='';
    // console.log(phones);
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl p-5`;
        phoneCard.innerHTML = `
        <figure class="px-10 py-10 bg-primary rounded-md">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <p class="text-3xl font-semibold">$999</p>
            <div class="card-actions">
            <button class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        cardContainer.appendChild(phoneCard);
    });
}

// search button handler
function handleSearch() {
    const searchField = document.getElementById('inputField');
    const searchText = searchField.value;
    loadData(searchText);
}


