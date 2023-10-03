const reset = document.querySelector(".reset");
const input = document.querySelector(".input");
const apply = document.querySelector(".apply");
const result = document.querySelector(".result");
const loading = document.querySelector(".loading");

input.addEventListener("keyup", function (event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    fetchWeather(input.value);
  }
});

apply.addEventListener("click", function () {
  fetchWeather(input.value);
});

function fetchWeather(inputValue) {
  if (inputValue.trim() === "") {
    resetWeather();
    return;
  }

  loading.classList.add("active");

  fetch(
    `http://api.weatherapi.com/v1/current.json?key=7fdaa613ab034242a5274544230909&q=${inputValue}&aqi=no`,
    { mode: "cors" }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerText = `Temperature: ${data.current.temp_c}`;

      const iconUrl = `https:${data.current.condition.icon}`;

      const imgElement = document.createElement("img");
      imgElement.src = iconUrl;
      result.appendChild(imgElement);

      document.body.style.backgroundImage = `url('${iconUrl}')`;
      document.body.style.backgroundRepeat = "repeat";
    })
    .catch((error) => console.log("Error", error))
    .finally(() => {
      loading.classList.remove("active");
    });
}

reset.addEventListener("click", function () {
  resetWeather();
});

function resetWeather() {
  input.value = "";
  result.innerHTML = "";
  document.body.style.removeProperty("background-image");
  document.body.style.removeProperty("background-repeat");
}
