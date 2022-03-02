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
    phones.slice(0,20).forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 border-0 shadow">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
               <h5 class="card-title">${phone.phone_name}</h5>
               <p class="card-text">brand: ${phone.brand}</p>
               <button class="btn__link border-0 btn-success shadow-none" onclick="loadPhonesByName('${phone.slug}')">details</button>
            </div>
        </div>
        `;
        
        searchResult.appendChild(div);
    })
}

const loadPhonesByName = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data))
}
const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    const divimg = document.createElement('div');
    // divimg.classList.add('');
    divimg.innerHTML = `<img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">`
    const div = document.createElement('div');
    // div.classList.add('');
    const h5 = document.createElement('h5');
    h5.innerText = phone.releaseDate;
    const errorMessage = document.createElement('h6');
    errorMessage.innerText = 'release Date No found';
    errorMessage.classList.add('text-danger')
    if(h5.innerText != ''){
        divimg.appendChild(h5);
    }
    else{
        divimg.appendChild(errorMessage);
    }
    
    div.innerHTML = `
        
            <div class="card-body">
              
              <p class="card-text"><strong class="fw-semi-bolder">Chipset: </strong>${phone.mainFeatures.chipSet}</p>
              <p class="card-text"><strong class="fw-semi-bolder">Display: </strong>${phone.mainFeatures.displaySize}</p>
              <p class="card-text"><strong class="fw-semi-bolder">Memory: </strong>${phone.mainFeatures.memory}</p>
              <p class="card-text"><strong class="fw-semi-bolder">Sensors:                                      </strong>${phone.mainFeatures.sensors}</p>
              <p class="card-text"><strong class="text-secondary">OTHERS: </strong></p>
              <p class="card-text"><strong class="fw-semi-bolder">Bluetooth: </strong>${phone.others.Bluetooth}</p>
              <p class="card-text"><strong class="fw-semi-bolder">GPS: </strong>${phone.others.GPS}</p>
              <p class="card-text"><strong class="fw-semi-bolder">NFC: </strong>${phone.others.NFC}</p>
              <p class="card-text"><strong class="fw-semi-bolder">Radio: </strong>${phone.others.Radio}</p>
              <p class="card-text"><strong class="fw-semi-bolder">WLAN: </strong>${phone.others.WLAN}</p>
              <p class="card-text"><strong class="fw-semi-bolder">USB: </strong>${phone.others.USB}</p>
            </div>
    `;
    
    phoneDetails.appendChild(divimg);
    phoneDetails.appendChild(div);
    phoneDetails.classList.add('card');
}