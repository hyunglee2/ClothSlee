const API_KEY = config.apikey;
const COORDS = "coords";
const weather = document.querySelector(".js-weather");
const where = document.querySelector(".js-where");





//데이터 얻기 : fetch 사용
function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric` //섭씨단위 사용
    ).then (function(response){        // 데이터 불러온 뒤 함수 호출
        return response.json();
    }).then (function(json){
        const temperature = json.main.temp;     //jason 데이터 보고 가져올 항목의 알맞은 위치 찾아 입력하기
        const place = json.name;
        /*const description = json.weather[0].description;*/ //날씨 정보 
        where.innerText = `${place} `;
        weather.innerText = `${temperature}`+"˚C";

        // 날씨에 따라 추천 옷차림 이미지와 텍스트로 출력
        var fname = "";
        if (temperature >= 27) {
            fname = "https://res.cloudinary.com/dvg06dahq/image/upload/v1607955309/1_g3d8fz.png";
            clothesName.innerHTML = '"나시티, 반바지, 민소매" 를 입는것을 추천해요!';
        } else if ( temperature >=23 && temperature < 27 ){
            fname = "https://res.cloudinary.com/dvg06dahq/image/upload/v1607955310/2_ngynpr.png"
            clothesName.innerHTML = '"반팔, 얇은 셔츠, 얇은 긴팔, 반바지, 면바지" 를 입는것을 추천해요!';
        } else if ( temperature >= 20&& temperature <23 ){
            fname = "https://res.cloudinary.com/dvg06dahq/image/upload/v1607955308/3_msxdh8.png"
            clothesName.innerHTML = '"긴팔티, 가디건, 후드티, 면바지, 슬랙스" 를 입는것을 추천해요!';
        } else if ( temperature >= 17&& temperature <20 ){
            fname = "https://res.cloudinary.com/dvg06dahq/image/upload/v1607955310/4_lhnp1l.png"
            clothesName.innerHTML = '"니트, 가디건, 후드티, 맨투맨, 청바지" 를 입는것을 추천해요!';
        } else if ( temperature >= 12&& temperature <17 ){
            fname = "https://res.cloudinary.com/dvg06dahq/image/upload/v1607955310/5_l8v1eo.png"
            clothesName.innerHTML = '"자켓, 셔츠, 가디건, 간절기 야상, 살색 스타킹" 을 입는것을 추천해요!';
        } else if ( temperature >= 10&& temperature <12 ){
            fname = "https://res.cloudinary.com/dvg06dahq/image/upload/v1607955308/6_orlsks.png"
            clothesName.innerHTML = '"트렌치 코트, 간절기 야상, 여러겹" 을 입는것을 추천해요!';
        } else if ( temperature >= 6&& temperature <10 ){
            fname = "https://res.cloudinary.com/dvg06dahq/image/upload/v1607955309/7_gqqquk.png"
            clothesName.innerHTML = '"코트, 가죽 자켓" 을 입는것을 추천해요!';
        } else {
            fname="https://res.cloudinary.com/dvg06dahq/image/upload/v1607955312/8_chpejz.png";
            clothesName.innerHTML = '"겨울 옷 (야상, 패딩, 목도리 등)" 을 입는것을 추천해요!';
        }
        document.getElementById("js-clothes").src=fname;
        
        

    });
}




// 유저 위치 저장 : 한 번 저장되면 새로고침 해도 다시 묻지 않음
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
} 

// 위치 확인 성공 시 처리 ( 위치 정보 세션 스토리지에 저장)
function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude:latitude,
        longitude:longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude)
    

} 

// 실패 시 처리
function handleGeoError(){

    console.log('cannot access geo location');
                           
} 

// 좌표 요청 함수
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
       askForCoords();
    } else { 
       const parsedCoords = JSON.parse(loadedCoords);
       getWeather(parsedCoords.latitude, parsedCoords.longitude);
        
    }
} 





function init(){

    loadCoords();
    
}

init();

var scale = 1;

function zoomIn(){
    scale*=1.2;
    zoomIn();
}
function zoom(){
    document.body.style.zoom=scale;
}
