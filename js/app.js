document.getElementById('error-message').style.display = 'none';

// Clear results
const clearResults = () => {
  document.getElementById('search-result').innerText='';
  document.getElementById('phone-details').innerText='';
}

// Phone Search Function
const searchPhone = () => {  
  clearResults();
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // clear data
  searchField.value = '';
  document.getElementById('error-message').style.display = 'none';
  if (searchText == ''){
    
  }
  else {    
    // load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResults(data.data))
    .catch(error => displayError(error));
  }
}

// Error Display Function
const displayError = error => {
  document.getElementById('error-message').style.display = 'block';
}

// Search Result Display Function
const displaySearchResults = phones => {
  if(phones.length >= 20){
    phones = phones.slice(0, 20);
  } else if (phones.length === 0) {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('error-message').innerText = 'No phone found!';
    return true;
  }
  const searchResult = document.getElementById('search-result');
  searchResult.textContent = '';
  
  if (phones.length == 0) {
    // show no result found;
  }
  phones.forEach(phone => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <h5 class="card-title">Brand: ${phone.brand}</h5>
        <a onclick="loadPhoneDetail('${phone.slug}')" href="#" class="btn btn-primary">Details</a>
      </div>
    </div>
    `;
    searchResult.appendChild(div);
  });
}

// Phone Detail Load Function
const loadPhoneDetail = id => {
  
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayPhoneDetail(data.data));
}

const displayPhoneDetail = phone => {
  const phoneDetail = document.getElementById('phone-details');
  phoneDetail.innerText = '';
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="card mx-auto my-4" style="width: 18rem;">
  <img src="${phone.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${phone.name}</h5>
    ${phone.releaseDate? `<p class='mb-0'><span class='text-danger fw-bold'>Release Date:</span> ${phone.releaseDate} </p>`:`<p class='text-danger fw-bold mb-0'> No release date found!</p>`}
    ${phone.mainFeatures? `<p class='mb-0'><span class='text-danger fw-bold fs-5'>Features:</span> <br> ${displayFeatures(phone.mainFeatures)} </p>`:''}
    ${phone.others? `<p class='mb-0'><span class='text-danger fw-bold fs-5'>Others:</span> <br> ${displayFeatures(phone.others)} </p>`:''}
  </div>
</div>
  `;
  phoneDetail.appendChild(div);
}

// Feature display Function
const displayFeatures = features => {
  
  let items = '';

  for (const [key, value] of Object.entries(features)) {
    if(key === 'sensors')
    { items = items + `<span class='text-danger fw-bold fs-5'>${capitalizeFirstLetter(key)}:</span> ${value.join(', ')}.<br>`
    }else{
      items = items + `<strong>${capitalizeFirstLetter(key)}:</strong> ${value}<br>`;
    }
  }
  return items;
}

// First Letter Capitalize Function
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}