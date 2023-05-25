/*

 This script requires SweetAlert2 !
 
 Tickets & Promotions

*/

function ticket(shopname) {
    Swal.fire({
        title: shopname + ' 식권(정기권)',
        text: "식권 시스템을 이용하면 더 저렴한 가격으로 이용할 수 있습니다.    \n점심_10일권: 49,500원(10%할인)",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '식권 구매/이용'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
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