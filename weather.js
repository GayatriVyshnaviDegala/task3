const apiKey = "35677d19dc05f09f36bd9c1c63fb89a2";

window.onload = () => {

    const savedCity =
        localStorage.getItem("lastCity");

    if(savedCity){

        document.getElementById("cityInput").value =
            savedCity;

        getWeather();
    }
};

async function getWeather(){

    const city =
        document.getElementById("cityInput").value;

    const result =
        document.getElementById("weatherResult");

    const loading =
        document.getElementById("loading");

    if(city === ""){
        alert("Please enter a city name");
        return;
    }

    loading.style.display = "block";
    result.innerHTML = "";

    try{

        const response =
            await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data =
            await response.json();

        localStorage.setItem(
            "lastCity",
            city
        );

        const date =
            new Date().toLocaleString();

        result.innerHTML = `

        <div class="weather-info">

            <div class="city">
                ${data.name}
            </div>

            <p>${date}</p>

            <img
            src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">

            <div class="temp">
                ${Math.round(data.main.temp)}°C
            </div>

            <h3>
                ${data.weather[0].main}
            </h3>

            <div class="details">

                <div class="detail-box">
                    💧
                    <br>
                    ${data.main.humidity}%
                    <br>
                    Humidity
                </div>

                <div class="detail-box">
                    🌬
                    <br>
                    ${data.wind.speed}
                    <br>
                    Wind
                </div>

                <div class="detail-box">
                    🌡
                    <br>
                    ${data.main.feels_like}°C
                    <br>
                    Feels Like
                </div>

            </div>

        </div>
        `;

    }
    catch(error){

        result.innerHTML = `
        <h3>
            ❌ ${error.message}
        </h3>
        `;
    }

    loading.style.display = "none";
}

document
.getElementById("cityInput")
.addEventListener(
    "keypress",
    function(event){

        if(event.key==="Enter"){
            getWeather();
        }
    }
);