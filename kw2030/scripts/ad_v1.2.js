/**
 * 
 * @param {index} index 광고 인덱스
 * @param {imageFileName} imageFileName 이미지파일 이름
 * @param {title} title 광고 타이틀(윗줄)
 * @param {content} content 광고 내용(아랫줄)
 * @param {href} href 클릭시 링크
 */
function newAdvertisement(index, imageFileName, title, content, href) {

    // 새로운 li 요소 생성
    var li = document.createElement('li');
    li.className = 'list-group-item restaurant-item';

    li.innerHTML = `
    <img src="https://dhlife09.github.io/kw2030/images/` + imageFileName + `" alt="Ad Image">
    <div id="ad_index` + String(index) + `">
        <div class="ellipsis"><span class="badge badge-secondary">광고</span> ` + title + `</div>
        <div class="ellipsis">` + content + `</div>
    </div>
`;

    // id가 restaurant-list인 ul 요소에 li 요소 추가
    var ul = document.getElementById('restaurant-list');
    ul.appendChild(li);

    document.getElementById('ad_index' + String(index)).addEventListener('click', function () {
        window.location.href = href; // 링크 주소 설정
    });
}
