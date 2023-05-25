/*

 This script requires SweetAlert2 !
 
 Tickets & Promotions

*/

function ticket(shopname) {
    Swal.fire({
        title: '<strong>' + shopname +' <u>식권</u></strong>',
        icon: 'info',
        html:
          '<b>' + shopname + '</b>에서 식권을 통해 더 저렴한 가격으로 이용해보세요.' +
          '<a href="//sweetalert2.github.io">links</a> ' +
          'and other HTML tags',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i>',
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