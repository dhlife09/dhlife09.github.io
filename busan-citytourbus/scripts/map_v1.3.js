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

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


/*
로드뷰
*/

var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

var position = new kakao.maps.LatLng(35.1138657, 129.0399564);

// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
roadviewClient.getNearestPanoId(position, 50, function(panoId) {
    roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
});

function mapViewChanger() {
    var mapDiv = document.getElementById("map");
    var roadviewDiv = document.getElementById("roadview");
  
    if (mapDiv.style.display === "none") {
      mapDiv.style.display = "block";
      roadviewDiv.style.display = "none";
    } else {
      mapDiv.style.display = "none";
      roadviewDiv.style.display = "block";
    }
  }