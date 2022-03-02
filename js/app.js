document.getElementById('error-message').style.display = 'none';
document.getElementById('phone-details-message').style.display = 'none';
document.getElementById('search-result-message').style.display = 'none';
document.getElementById('show-more').style.display = 'none';


// Clear results
const clearResults = () => {
  document.getElementById('search-result').innerText='';
  document.getElementById('phone-details').innerText='';
  
}

// Phone Search Function
const searchPhone = (showall = false, text = '') => {  
  clearResults();
  const searchField = document.getElementById('search-field');
  let searchText = searchField.value;
  document.getElementById('search-term').innerText = searchText;
  if (text !== '')
  {
    document.getElementById('search-term').innerText = text;
  }
  // clear data
  searchField.value = '';
  if(searchText == '' && text !== '')
  {
    searchText = text;
  }

  document.getElementById('error-message').style.display = 'none';
  document.getElementById('phone-details-message').style.display = 'none';
  document.getElementById('search-result-message').style.display = 'none';
  document.getElementById('show-more').style.display = 'none';
  if (searchText == ''){
    
  }
  else {    
    // load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResults(data.data, showall))
    .catch(error => displayError(error));
  }
}

// Error Display Function
const displayError = error => {
  document.getElementById('error-message').style.display = 'block';
}

// Show all
const showAll = () => {
  searchText = document.getElementById('search-term').innerText;
  searchPhone(true, searchText);  
}

// Search Result Display Function
const displaySearchResults = (phones, showall) => {
  if(phones.length >= 20 && showall === false){
    phones = phones.slice(0, 20);
    document.getElementById('show-more').style.display = 'block';
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
    <div class="card">
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
  document.getElementById('search-result-message').style.display = 'block';
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
  <div class="card mx-auto my-4">
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
  document.getElementById('phone-details-message').style.display = 'block';
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
