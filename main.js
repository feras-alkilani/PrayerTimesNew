



let cities = [
  // "الرياض","الشرقية","القصيم","مكة المكرمة"
  {
    arabicName: "الرياض",
    name: "Ar Riyāḑ"
  },
  {
    arabicName: "الشرقية",
    name: "Ash Sharqīyah"
  },
  {
    arabicName: "القصيم",
    name: "Al Qaşīm"
  },
  {
    arabicName: "مكة المكرمة",
    name: "Makkah al Mukarramah"
  },
  {
    arabicName: "ايندهوفن",
    name: "NL-NB"
  }
]


for(let city of cities) {
  const content = `

  <option >${city.arabicName}</option>
  `
  document.getElementById("cities-select").innerHTML += content;
  
}


document.getElementById('cities-select').addEventListener("change",function() {


  let cityName = ""
  for (let city of cities) {

    if(city.arabicName === this.value){
      cityName = city.name;
    }

    document.querySelector("#city-name").innerHTML = this.value;

  }

  getPrayersTimingsOfCity (cityName);

  console.log(this.value);

});




function getPrayersTimingsOfCity(cityName) {


 

  let params = {
    country : "SA",
    city : cityName //"Makkah al Mukarramah"
  }

  axios.get('http://api.aladhan.com/v1/timingsByCity', {
  params: params
})
.then(function (response) {

  const timings = response.data.data.timings;
  fillTimeForPrayer("fajr-time",timings.Fajr)
  fillTimeForPrayer("sunrise-time",timings.Sunrise)
  fillTimeForPrayer("dhuhr-time",timings.Dhuhr)
  fillTimeForPrayer("asr-time",timings.Asr)
  fillTimeForPrayer("maghrib-time",timings.Maghrib)
  fillTimeForPrayer("isha-time",timings.Isha)



  const readableDate = response.data.data.date.readable;
  const weekDay = response.data.data.date.hijri.weekday.ar;


  document.getElementById("fer").innerHTML = `${weekDay} ${readableDate} `;
  
})
.catch(function (error) {
  console.log(error);
})
}





getPrayersTimingsOfCity ("Ar Riyāḑ");

function fillTimeForPrayer(id,time) {
  document.getElementById(id).innerHTML = time;
}

