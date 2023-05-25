function calculateWalkTime(lat1, lng1, lat2, lng2) {
    const walkingSpeed = 5; // 걷는 속도 (단위: km/h)

    function haversineDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // 지구의 반지름 (단위: km)

        // 라디안으로 변환
        const lat1Rad = (lat1 * Math.PI) / 180;
        const lng1Rad = (lng1 * Math.PI) / 180;
        const lat2Rad = (lat2 * Math.PI) / 180;
        const lng2Rad = (lng2 * Math.PI) / 180;

        // 위도와 경도의 차이 계산
        const dLat = lat2Rad - lat1Rad;
        const dLng = lng2Rad - lng1Rad;

        // Haversine 공식을 사용하여 거리 계산
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;
    }

    const distance = haversineDistance(lat1, lng1, lat2, lng2);

    // 속도와 거리를 이용하여 걷는 시간 계산 (단위: 시간)
    const walkTimeHours = distance / walkingSpeed;

    // 시간과 분으로 분리
    const walkTimeMinutes = walkTimeHours * 60;
    const hours = Math.floor(walkTimeMinutes / 60);
    const minutes = Math.round(walkTimeMinutes % 60) + 2;   // 보정(2분)

    if (hours == 0) {
        return '걸어서 ' + minutes + '분';
    } else {
        return '걸어서 ' + hours + '시간' + minutes + '분';
    }

}

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