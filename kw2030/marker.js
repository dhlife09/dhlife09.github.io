        // 지도에 마커를 표시합니다 
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(37.6198738, 127.0586527)
        });

        // 커스텀 오버레이에 표시할 컨텐츠 입니다
        // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
        // 별도의 이벤트 메소드를 제공하지 않습니다 
        var content = '<div class="wrap">' +
            '    <div class="info">' +
            '        <div class="title">' +
            '            카츠3.3 광운대점' +
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
            '        </div>' +
            '        <div class="body">' +
            '            <div class="img">' +
            '                <img src="https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2Fab105a084e2731488e81189900dc31ac0d89a1b0%3Foriginal" width="73" height="70">' +
            '           </div>' +
            '            <div class="desc">' +
            '                <div class="ellipsis">광운대 80주년 기념관 1층</div>' +
            '                <div class="ellipsis">영업시간: 월~금 11:00 ~ 20:00</div>' +
            '                <div class="ellipsis">평균가격: 6,000원</div>' +
            '                <div class="ellipsis"><a href="#" class="link">📖메뉴</a> <a href="javascript:kw_swal()" class="link">♥️ 쿠폰</a></div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '</div>';

        // 마커 위에 커스텀오버레이를 표시합니다
        // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
        var overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: marker.getPosition()
        });

        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        kakao.maps.event.addListener(marker, 'click', function () {
            overlay.setMap(map);
        });