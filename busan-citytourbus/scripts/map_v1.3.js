/*

kakaomap 렌더링

*/
var mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(35.1138657, 129.0399564),
        level: 3
    };

var map = new kakao.maps.Map(mapContainer, mapOption);
var overlays = {};