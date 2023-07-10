function rateRestaurant() {
    Swal.fire({
        title: '식당 이용하고 <strong><a href="javascript:void()">식권 적립하기</a></strong>',
        icon: 'info',
        html:
            '지난번에 이용하신 <b>미식성</b>은 어떠셨나요?<br>' +
            '식당을 이용하시고 장소에 어울리는 <span class="badge badge-dark">#해시태그</span>를 알려주세요.<br>' +
            '10번 평가 시 식권1장을 드립니다.',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '평가하기',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
            '취소',
        cancelButtonAriaLabel: 'Thumbs down'
    })
}