const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");
function getTime() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today =  month + "월  " + day + "일    ";
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${today} ${hours}:${minutes}:${seconds}`;
  clockTitle.innerText = `${today} ${hours < 10 ? `0${  hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();