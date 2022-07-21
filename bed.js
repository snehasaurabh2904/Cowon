let lat;
let lng;
let respo;
let r;

const SectionInfo = document.querySelector(".userBeds__avail");
// console.log(SectionInfo.children[0].localName);
// const SectionDeepInfo = document.querySelector('.userBeds--info');
// console.log(SectionDeepInfo);

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman & Nicobar Islands",
  "Chandigarh",
  "Dadra & Nagar Haveli",
  "Daman & Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

///Random Number for Bed
function RandomBeds(data) {
  return Math.trunc(data / 10 + Math.random() * 100);
}

///Error Handling if data Is not Fetched
function renderError(toShow) {
  SectionInfo.insertAdjacentHTML(
    "afterbegin",
    `<p class="userBeds--info">${toShow} 😕.</p>`
  );
}

////////////////////GEOCODING///////////////////////////
function whereAmI(lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then((response) => {
      console.log(response);
      if (!response.ok)
        throw new Error(
          `Some Error in GeoCoding💥💢💥 : ${response.status}. Try Again!!`
        );
      //console.log(response.json());
      return response.json();
    }) //error check
    .then((resp) => {
      respo = resp;
      //console.log(respo);
      console.log(`You are in ${resp.city}, ${resp.country}`, resp);
      if (SectionInfo.children.length != 0) {
        const ele = document.querySelector(".userBeds--info");
        //console.log(ele);
        ele.remove();
      }
      return fetch("https://api.rootnet.in/covid19-in/hospitals/beds");

      // SectionInfo.insertAdjacentHTML('afterbegin', `<p class="userBeds--info">Currently Total Number of beds Available in ${resp.city}, ${resp.state} are  -- </p>`)
      // return fetch(`https://restcountries.eu/rest/v2/name/${resp.country}`);
    })
    .then((fetch_bed) => {
      //console.log(fetch_bed);
      return fetch_bed.json();
    })
    .then((final) => {
      //console.log(respo.state);
      const dataBeds = final.data.regional[states.indexOf(respo.state)];
      console.log(dataBeds);

      r = RandomBeds(dataBeds.urbanHospitals);

      SectionInfo.insertAdjacentHTML(
        "afterbegin",
        `<p class="userBeds--info">Currently Total Number of beds Available in <u>${
          respo.city
        }</u>, <u>${respo.state}</u> are <u>${RandomBeds(
          dataBeds.urbanBeds
        )}</u> and there are total <u>${r}</u> Hospitals around you.</p>
        <a class="nav__link nav__link--btn btn--show-modal" href="./form.html">Book Your Bed</a>`
      );
      // if(final.length==2 && final[1].name == 'India')
      // renderCountry(final[1]);
      // else
      // renderCountry(final[0]);
    })
    .catch((err) => {
      console.error(`${err}. Try Again!!`);
      renderError(`Something Went Wrong: ${err.message}. Try Again!!`);
    })
    .finally(() => {
      SectionInfo.style.opacity = 1;
      SectionInfo.style.transform = "translateY(0)";
    });
}

// ///////////////////PROMISIFYING GOLOCATION API///////////////
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

//----------->Checking for older browser compatibility as Gelocation api is a Browser API<---------//

if (navigator.geolocation)
  //calling getCurrentPosition function to know Latitude and Longitude
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      //console.log(longitude, latitude);
      lat = latitude;
      lng = longitude;
      //console.log(`https://www.google.com/maps/@${lat},${lng}`);

      const coords = [latitude, longitude];

      whereAmI(lat, lng);

      //Adding Leaflet Map to our page
      const map = L.map("map").setView(coords, 15);

      // https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
      // http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}
      // https://{s}.tile.openstreetmap.fr/{z}/{x}/{y}.png
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // map.on('click', function(mapEvent){//this function will be called by a map event
      //   console.log(mapEvent);
      //   const {lat, lng} = mapEvent.latlng;
      //   console.log(lat,lng);

      //   whereAmI(lat,lng);

      //   L.marker([lat,lng]).addTo(map)
      //   .bindPopup('')
      //   .openPopup();

      // });

      //   console.log(r);
      //   var myIcon = L.icon({
      //     iconUrl: 'my-icon.png',
      //     iconSize: [38, 95],
      //     iconAnchor: [22, 94],
      //     popupAnchor: [-3, -76],
      //     shadowUrl: 'my-icon-shadow.png',
      //     shadowSize: [68, 95],
      //     shadowAnchor: [22, 94]
      // });

      // L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

      var greenIcon = new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      L.marker(coords, { icon: greenIcon })
        .addTo(map)
        .bindPopup("Here you are")
        .openPopup();

      console.log(map);
    },
    function () {
      alert("Could Not get your Position");
    }
  );

/*
//--->GEOLOCATION API(it is an Browser API)<-----
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position, position.coords.longitude);
      const { longitude } = position.coords;
      const { latitude } = position.coords;
      lat = latitude;
      lng = longitude;
      console.log(`https://www.google.com/maps/@${latitude},${longitude},15z`);

      const coords = [latitude, longitude];

      ////////////////////// LEAFLET Library for importing Map to our Application /////////////////////////

      map = L.map('map').setView(coords, 11);
      //openstreetmap https://a.tiles.mapbox.com/v3/mapbox.world-bright/{z}/{x}/{y}.png
      //https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //this .on()-method is not coming from Javascript, This method is available on Leaflet Library
      //Handling Clicks on the Map
      map.on('click', function (mapE) {
        mapEvent = mapE;

        form.classList.remove('hidden');
        inputDistance.focus();
      });
      //console.log(map);
    },
    function () {
      alert('Could not get your Position 😕');
    }
  );


  L.marker([lat, lng])
  .addTo(map)
  .bindPopup(
    L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: 'running-popup',
    })
  )
  .setPopupContent('Workout is 💖')
  .openPopup();
  */
