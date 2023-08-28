const loadData = async (searchText , isShowClicked) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    if(phones.length === 0) {
        notFound();
    }
    else{
        displayData(phones, isShowClicked);
    }
}

// show cards on card container
const displayData = (phones, isShowClicked) =>  {
    const cardContainer = document.getElementById('card-container');
    const showMoreContainer = document.getElementById('show-more-container')

    // console.log(isShowClicked);
    if(phones.length > 12 && !isShowClicked) {
        phones = phones.slice(0, 12);
        showMoreContainer.classList.remove('hidden');
    }
    else {
        showMoreContainer.classList.add('hidden');
    }
    cardContainer.innerHTML ='';
    console.log(phones);
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card mx-4 lg:mx-0 bg-base-100 shadow-xl p-5`;
        phoneCard.innerHTML = `
        <figure class="px-10 py-10 bg-primary rounded-md">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <p class="text-3xl font-semibold">$999</p>
            <div class="card-actions">
            <button onclick="show_detail.showModal(); showDetailModal('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        cardContainer.appendChild(phoneCard);
        loadingSpinner(false);
    });
}

// data not found result 
const notFound = () => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML ='';
    const nullDiv = document.createElement('div');
    nullDiv.innerHTML =`
    <h2 class="text-5xl font-semibold">Your searched phone not found in database</h2>
    `;
    cardContainer.appendChild(nullDiv);
    loadingSpinner(false);
}

// search button handler
function handleSearch() {
    const searchField = document.getElementById('inputField');
    const searchText = searchField.value;
    if(searchText === '') {
        alert('Enter your phone name');
        searchField.value ='';
    }
    else {
        loadData(searchText);
        loadingSpinner(true);
    }  
}

// loading spinner handle

const loadingSpinner =  (isLoading) => {
    const loadingDiv = document.getElementById('loading-spinner');
    if(isLoading) {
        loadingDiv.classList.remove('hidden');
    }
    else {
        loadingDiv.classList.add('hidden');
    }
}

// show more handler 
function showMore()  {
    const searchField = document.getElementById('inputField');
    const searchText = searchField.value;  
    loadData(searchText, true);
}

// show detail handler 
const  showDetailModal = async (Id) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${Id}`);
    const data = await res.json();
    const phoneDetail = data.data
    console.log(phoneDetail);
    const modalContainer =  document.getElementById('modal-container');
    modalContainer.innerHTML ='';
    const modalDetails = document.createElement('div');
    modalDetails.innerHTML = `
    <div class="bg-primary text-center p-5 rounded-md flex justify-center items-center">
    <img src="${phoneDetail?.image}"/>
    </div>
    <h3 class="font-bold text-3xl mt-4">${phoneDetail.name}</h3>
    <p class="py-4 mb-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p><span class="specification-title">Storage: </span><span class="specification-detail">${phoneDetail.mainFeatures.storage}</span></p>
    <p><span class="specification-title">Display Size: </span><span class="specification-detail">${phoneDetail.mainFeatures.displaySize}</span></p>
    <p><span class="specification-title">Chipset: </span><span class="specification-detail">${phoneDetail.mainFeatures.chipSet}</span></p>
    <p><span class="specification-title">Memory: </span><span class="specification-detail">${phoneDetail.mainFeatures.memory}</span></p>
    <p><span class="specification-title">Slug: </span><span class="specification-detail">${phoneDetail.slug}</span></p>
    <p><span class="specification-title">Release Date: </span><span class="specification-detail">${phoneDetail.releaseDate}</span></p>
    <p><span class="specification-title">Brand: </span><span class="specification-detail">${phoneDetail.brand}</span></p>
    <p><span class="specification-title">GPS: </span><span class="specification-detail">${phoneDetail?.others?.GPS ? phoneDetail?.others?.GPS : 'Data not provided'}</span></p>
    `
    modalContainer.appendChild(modalDetails)
}

