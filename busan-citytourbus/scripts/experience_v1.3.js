function closeAllOverlay() {

    for (var i = 0; i < Object.keys(overlays).length; i++) {
        closeOverlay(i);
    }
}

function handleClick(index) {
    closeAllOverlay();
    function scrollToTop() {
        var currentPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        if (currentPosition > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, currentPosition - currentPosition / 8);
        }
    }

    scrollToTop();

    smoothMove(document.querySelector('#index' + String(index) + ' input[type="hidden"][id="lat"]').value, document.querySelector('#index' + String(index) + ' input[type="hidden"][id="lng"]').value)
    var overlayId = 'overlay_' + String(index);
    overlays[overlayId].setMap(map);
}

function smoothMove(lat, lng) {
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    var moveLatLon = new kakao.maps.LatLng(lat, lng);
    map.panTo(moveLatLon);
}
// 전역 함수로 closeOverlay 선언

function closeOverlay(index) {
    var overlayId = 'overlay_' + String(index);
    overlays[overlayId].setMap(null);
}

function mapViewChanger() {
    var url = window.location.href;
    if (url.indexOf('roadview.html') != -1) {
        window.location.href = 'index.html';
    } else {
        window.location.href = 'roadview.html';
    }

}