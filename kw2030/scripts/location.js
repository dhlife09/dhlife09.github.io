if (navigator.geolocation) {
    // 위치 정보를 가져오는데 성공한 경우 실행될 콜백 함수
    function info(position) {
        var user_latitude = position.coords.latitude;  // 위도
        var user_longitude = position.coords.longitude;  // 경도
        console.log("위도: " + user_latitude + ", 경도: " + user_longitude);
        smoothMove(user_latitude, user_longitude);
        for (var i = 0; i < Object.keys(overlays).length; i++) {
            temp_lat = document.querySelector('#index' + String(i) + ' input[type="hidden"][id="lat"]').value;
            temp_lng = document.querySelector('#index' + String(i) + ' input[type="hidden"][id="lng"]').value;
            temp_time = calculateWalkTime(user_latitude, user_longitude, temp_lat, temp_lng);  //here
            document.getElementById("walktime_idx" + String(i)).textContent = temp_time;
        }
    }

    // 위치 정보를 가져오는데 실패한 경우 실행될 콜백 함수
    function error() {
        Swal.fire(
            '위치정보 가져오기 실패',
            '위치정보를 사용하면 현재 있는 곳에서 식당까지 거리를 볼 수 있습니다.',
            'error'
        )
    }

    // 위치 정보 요청
    navigator.geolocation.getCurrentPosition(info, error);
} else {
    Swal.fire(
        '위치정보 가져오기 실패',
        '위치정보를 지원하지 않는 기기나 브라우저 입니다.',
        'error'
    )
}