function rateRestaurant() {
    Swal.fire({
        title: '식당 이용하고 <strong>식권 적립하기</strong>',
        icon: 'info',
        html:
            '지난번에 이용하신 <b><span href="javascript:void()">미식성</span></b>은 어떠셨나요?<br>' +
            '식당을 이용하시고 장소에 어울리는 해시태그를 알려주세요.<br>' +
            '10번 평가 시 식권1장을 드립니다.',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fas fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
            '<i class="fas fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
    })
}