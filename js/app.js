const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data))
}

const displaySearchResult = phones => {
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 border-0 shadow">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
               <h5 class="card-title">${phone.phone_name}</h5>
               <p class="card-text">brand: ${phone.brand}</p>
               <button class="btn__link" onclick="loadPhonesByName('${phone.slug}')">details</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadPhonesByName = phoneId => {
    // console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data))
}
const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.releaseDate}</h5>
              <div class="row row-cols-md-6">
              </div>
              <p class="card-text"><strong class="fw-semi-bolder">Chipset: </strong>${phone.mainFeatures.chipSet}</p>
              <p class="card-text"><strong class="fw-semi-bolder">Display: </strong>${phone.mainFeatures.displaySize}</p>
              <p class="card-text"><strong class="fw-semi-bolder">Memory: </strong>${phone.mainFeatures.memory}</p>
              <p class="card-text"><strong class="fw-semi-bolder">Sensors: </strong>${phone.mainFeatures.sensors}</p>
              <p class="card-text"><strong class="text-secondary">OTHERS: </strong></p>
              <p class="card-text"><strong class="fw-semi-bolder">Bluetooth: </strong>${phone.others.Bluetooth}</p>
              <p class="card-text"><strong class="fw-semi-bolder">GPS: </strong>${phone.others.GPS}</p>
              <p class="card-text"><strong class="fw-semi-bolder">NFC: </strong>${phone.others.NFC}</p>
              <p class="card-text"><strong class="fw-semi-bolder">Radio: </strong>${phone.others.Radio}</p>
              <p class="card-text"><strong class="fw-semi-bolder">WLAN: </strong>${phone.others.WLAN}</p>
              <p class="card-text"><strong class="fw-semi-bolder">USB: </strong>${phone.others.USB}</p>
            </div>
    `;
    phoneDetails.appendChild(div);
}