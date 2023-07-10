/*

 This script requires SweetAlert2 !
 
 Tickets & Promotions

*/

function ticket(shopname) {
    Swal.fire({
        title: '<strong>' + shopname +' 식권🎫</strong>',
        icon: 'info',
        html:
          '<b>' + shopname + '</b>에서 식권을 통해 더 저렴한 가격으로 이용해보세요!<br><br>' +
          '학기중에는 <b>최대5%</b>, 방학중에는 <b>최대10%할인된</b> 금액으로 이용할 수 있습니다.<br><br>' +
          '구매한 식권을 사용하려면 문자메시지를 확인해주세요.',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '식권 구매하기',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '확인',
        cancelButtonAriaLabel: 'Thumbs down'
      })
}

function generateHash(text) {
    var currentDate = new Date();
    var currentTime = currentDate.toLocaleTimeString();
    text = currentTime + text
    var hash = 0;
    if (text.length === 0) {
        return hash;
    }

    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);
        hash = (hash << 5) - hash + charCode;
        hash |= 0; // 32비트 정수로 변환
    }

    return hash.toString(16);
}

function swal_promotion(Type, Title, Promotion) {
    if (Type == "info") {
        Swal.fire(
            Title + " 프로모션",
            Promotion,
            'info'
        )
    } else if (Type == "image") {
        swal.fire({
            title: Title + " 프로모션",
            text: Promotion,
            imageUrl: "https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=" + generateHash(Title + Promotion),
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: '쿠폰 로딩 중..',
        });
    }
}