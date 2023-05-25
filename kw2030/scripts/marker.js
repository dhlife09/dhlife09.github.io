/**
 * 
 * @param {index} index 인덱스 번호 
 * @param {latitude} Lat 위도
 * @param {longitude} Lng 경도
 * @param {title} Title 타이틀(식당명)
 * @param {imageurl} imageUrl 이미지 주소
 * @param {location} Location 위치
 * @param {time} Time 영업시간
 * @param {price} Price 평군 가격대(0,000)
 * @param {menu} Menu 메뉴판 (이미지) URL
 * @param {promotion} Promotion 프로모션 내용(없을경우 공란)
 * @param {tag} Tag 식당 태그
 * @param {swaltype} SwalType info, image(프로모션용으로 적합)
 * @param {supportticket} SupportTicket 식권 지원 여부(bool) 
 */
function newmarker(index, Lat, Lng, Title, imageUrl, Location, Time, Price, Menu, Promotion, Tag, SwalType, SupportTicket) {
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(Lat, Lng)
    });

    var js_promotion = 'javascript:swal_promotion(`' + SwalType + '`, `' + Title + '`, `' + Promotion + '`)'    // 프로모션 alert
    if (Promotion != '') {
        MenuNPrice = '                <div class="ellipsis"><a href="' + Menu + '" class="link" target="_blank">📖메뉴</a> <a href="' + js_promotion + '" class="link">🎁프로모션</a> ';
    } else {
        MenuNPrice = '                <div class="ellipsis"><a href="' + Menu + '" class="link" target="_blank">📖메뉴</a> ';
    }

    if (SupportTicket) {
        MenuNPrice = MenuNPrice + `<a href="javascript:ticket('` + Title + `')" class="link">🎫식권</a></div>`;
    } else {
        MenuNPrice = MenuNPrice + `</div>`;
    }

    var content = '<div class="wrap">' +
        '    <div class="info">' +
        '        <div class="title">' +
        '            ' + Title +
        '            <div class="close" onclick="closeOverlay(' + index + ')" title="닫기"></div>' +
        '        </div>' +
        '        <div class="body">' +
        '            <div class="img">' +
        '                <img src="https://dhlife09.github.io/kw2030/images/' + imageUrl + '" width="73" height="70">' +
        '           </div>' +
        '            <div class="desc">' +
        '                <div class="ellipsis">' + Location + '</div>' +
        '                <div class="ellipsis">영업시간: ' + Time + '</div>' +
        '                <div class="ellipsis">평균가격: ' + Price + '원</div>' +
        MenuNPrice +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';

    var overlayId = 'overlay_' + String(index); // 동적 변수 이름 생성
    overlays[overlayId] = new kakao.maps.CustomOverlay({
        content: content,
        //map: map,   // 해당 옵션이 활성화되어있을 경우 인포윈도우가 기본으로 노출됨
        position: marker.getPosition()
    });

    kakao.maps.event.addListener(marker, 'click', function () {
        closeAllOverlay();
        smoothMove(Lat, Lng);
        overlays[overlayId].setMap(map);
    });

    // 새로운 li 요소 생성
    var li = document.createElement('li');
    li.className = 'list-group-item restaurant-item';
    if (Promotion != '') {
        liTags = `                <div class="ellipsis"><span class="badge badge-secondary">` + Tag + `</span> <span class="badge badge-danger"><a href="` + js_promotion + `" style="color: inherit; text-decoration: inherit;">프로모션🎁</a></span> `;
    } else {
        liTags = `                <div class="ellipsis"><span class="badge badge-secondary">` + Tag + `</span> `;
    }

    if (SupportTicket) {
        liTags = liTags + `<span class="badge badge-primary"><a href="javascript:ticket('` + Title + `')"  style="color: inherit; text-decoration: inherit;">식권🎫</a></span> `;
    } else {
        liTags = liTags + `</div>`;
    }

    li.innerHTML = `
    <img src="https://dhlife09.github.io/kw2030/images/` + imageUrl + `" alt="Restaurant Image">
    <div id="index` + index + `">
        <h4>` + Title + ` <span style="font-size: 15px;" id="walktime_idx` + index + `"></span></h4> 
        ` + liTags + `
        <div class="ellipsis">영업시간: ` + Time + `</div>
        <div class="ellipsis">평균가격: ` + Price + `원</div>
        <input type="hidden" id="lat" value="` + Lat + `">
        <input type="hidden" id="lng" value="` + Lng + `">
    </div>
`;

    // id가 restaurant-list인 ul 요소에 li 요소 추가
    var ul = document.getElementById('restaurant-list');
    ul.appendChild(li);

    // div 클릭시 이벤트 추가
    var divElement = document.getElementById('index' + String(index));
    var myArgument = String(index);

    divElement.addEventListener('click', handleClick.bind(null, myArgument));
}
