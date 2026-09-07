const promoButton = document.querySelector('#promoButton');

promoButton.addEventListener('click', () => {
    promoButton.textContent = "Promo: beli 2 gratis tester";
    console.log("Promo kopi Nusa Berhasil ditampilkan");
});