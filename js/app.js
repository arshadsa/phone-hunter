document.getElementById('error-message').style.display = 'none';

const searchPhone = () => {  
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
    // .catch(error => displayError(error));
  }
}

const displayError = error => {
  document.getElementById('error-message').style.display = 'block';
}

const displaySearchResults = phones => {
  const searchResult = document.getElementById('search-result');
  searchResult.textContent = '';
  
  if (phones.length == 0) {
    // show no result found;
  }

  phones.forEach(phone => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div onclick="loadPhoneDetail('${phone.slug}')" class="card" style="width: 18rem;">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    `;
    searchResult.appendChild(div);
  });
}

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
    ${phone.releaseDate? `<p>Release Date: ${phone.releaseDate}`:'No release date found! <br>'}
    ${phone.mainFeatures? `<strong>Features:</strong> <br> ${displayFeatures(phone.mainFeatures)}`:''}
    ${phone.others? `<strong>Others:</strong> <br> ${displayFeatures(phone.others)}`:''}
  </div>
</div>
  `;
  phoneDetail.appendChild(div);
}

const displayFeatures = features => {
  
  let items = '';

  for (const [key, value] of Object.entries(features)) {
    if(key === 'sensors')
    { items = items + `<strong>${key}:</strong> ${value.join(', ')}.<br>`
    }else{
      items = items + `<strong>${key}:</strong> ${value}<br>`;
    }
  }
  return items;
}