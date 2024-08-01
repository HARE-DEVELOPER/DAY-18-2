document.addEventListener('DOMContentLoaded', function() {
    const addressDataDiv = document.getElementById('addressData');
    const fetchButton = document.getElementById('fetchButton');
    const apiKey = 'YOUR_API_KEY';  // Replace with your actual API key
  
    fetchButton.addEventListener('click', fetchAddressData);
  
    function fetchAddressData() {
      const apiUrl = `https://us-street.api.smartystreets.com/street-address?auth-id=${apiKey}&street=1600+Amphitheatre+Parkway&city=Mountain+View&state=CA&zipcode=94043`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.length === 0) {
            addressDataDiv.innerHTML = '<p>No address data found.</p>';
          } else {
            const address = data[0];
            addressDataDiv.innerHTML = `
              <div class="address">
                <p><strong>Delivery Line 1:</strong> ${address.delivery_line_1}</p>
                <p><strong>Last Line:</strong> ${address.last_line}</p>
                <p><strong>City:</strong> ${address.components.city_name}</p>
                <p><strong>State:</strong> ${address.components.state_abbreviation}</p>
                <p><strong>ZIP Code:</strong> ${address.components.zipcode}-${address.components.plus4_code}</p>
              </div>
            `;
          }
        })
        .catch(error => {
          addressDataDiv.innerHTML = '<p>An error occurred while fetching address data.</p>';
          console.error('Error fetching address data:', error);
        });
    }
  });
  