/*

kakaomap 렌더링

*/
var mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(37.6194277, 127.05982),
        level: 3
    };

var map = new kakao.maps.Map(mapContainer, mapOption);
var overlays = {};