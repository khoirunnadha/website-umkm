"use strict";

console.log("P09 JavaScript aktif");

// 1. Data Produk (Array of Objects)
const produkUmkm = [
  { nama: "Kopi Tubruk Signature", kategori: "Kopi", harga: 20000, stok: 15 },
  { nama: "Cold Brew Aren", kategori: "Kopi", harga: 27000, stok: 3 },
  { nama: "Kopi Arabika", kategori: "Kopi", harga: 40000, stok: 0 },
  { nama: "Kopi Vietnam Drip", kategori: "Kopi", harga: 25000, stok: 8 },
  { nama: "Paket Kopi & Cokelat", kategori: "Bundling", harga: 50000, stok: 5 },
];

console.table(produkUmkm);

// 2. Formatter Currency Rupiah
const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

// 3. Status Stok (Conditional)
function statusStok(stok) {
  if (stok === 0) {
    return { label: "Habis", className: "empty" };
  }
  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }
  return { label: "Tersedia", className: "" };
}

// 4. Label Kategori (Switch Case)
function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";
    case "Bundling":
      return "Paket hemat";
    default:
      return "Produk UMKM";
  }
}

// 5. Render Data ke DOM
function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  // Guard Clause agar halaman lain tidak error
  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

    if (produk.stok > 0) {
      jumlahTersedia += 1;
    }

    markup += `
      <article class="js-product-card">
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);