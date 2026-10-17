/**
 * SCRIPT.JS - MINUMAN ES SEGAR UMKM
 * Dibuat menggunakan JavaScript Murni tanpa framework
 * Mengatur interaksi menu, tautan WhatsApp dinamis, dan pesan otomatis produk.
 */

// ============================================================================
// 1. ATURAN UTAMA: NOMOR WHATSAPP HANYA DISIMPAN SATU KALI DI SINI
// ============================================================================
const NOMOR_WA = "6281234567890";

// Teks pesan umum default untuk WhatsApp
const PESAN_DEFAULT = "Halo Admin Es Segar Nusantara UMKM, saya ingin tanya info menu minuman es dan cara pesan antar.";

/**
 * Fungsi pembantu untuk membuat tautan WhatsApp yang valid
 * @param {string} nomor - Nomor WhatsApp tanpa simbol
 * @param {string} pesan - Teks pesan otomatis
 * @return {string} Tautan WhatsApp terformat
 */
function buatTautanWhatsApp(nomor, pesan) {
  return "https://wa.me/" + nomor + "?text=" + encodeURIComponent(pesan);
}

/**
 * Fungsi untuk memesan produk minuman es spesifik
 * Dipanggil langsung oleh tombol pada kartu produk
 * @param {string} namaProduk - Nama minuman es yang dipilih
 * @param {number} harga - Harga produk
 */
function pesanProduk(namaProduk, harga) {
  const hargaTeks = "Rp " + harga.toLocaleString('id-ID');
  const pesan = "Halo Admin Es Segar Nusantara UMKM,\n\nSaya tertarik memesan:\n* " + namaProduk + " (" + hargaTeks + ")\n\nMohon info ketersediaan stok, opsi level gula/es, dan ongkir ke alamat saya ya. Terima kasih!";
  
  const urlWA = buatTautanWhatsApp(NOMOR_WA, pesan);
  window.open(urlWA, '_blank');
}

// Inisialisasi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Pasang tautan WhatsApp pada Tombol Header
  const tombolWaHeader = document.getElementById('tombol-wa-header');
  if (tombolWaHeader) {
    tombolWaHeader.href = buatTautanWhatsApp(NOMOR_WA, PESAN_DEFAULT);
    tombolWaHeader.target = "_blank";
    tombolWaHeader.rel = "noopener noreferrer";
  }

  // 2. Pasang tautan WhatsApp pada Tombol Hero
  const tombolWaHero = document.getElementById('tombol-wa-hero');
  if (tombolWaHero) {
    const pesanHero = "Halo Admin Es Segar Nusantara UMKM, saya ingin memesan minuman es segar sekarang. Boleh minta rekomendasi menu paling favorit hari ini?";
    tombolWaHero.href = buatTautanWhatsApp(NOMOR_WA, pesanHero);
    tombolWaHero.target = "_blank";
    tombolWaHero.rel = "noopener noreferrer";
  }

  // 3. Pasang tautan WhatsApp pada Tombol Melayang (Floating WA Button)
  const tombolWaMelayang = document.getElementById('tombol-wa-melayang');
  if (tombolWaMelayang) {
    const pesanMelayang = "Halo Admin Es Segar Nusantara UMKM, saya ingin memesan aneka minuman es segar.";
    tombolWaMelayang.href = buatTautanWhatsApp(NOMOR_WA, pesanMelayang);
    tombolWaMelayang.target = "_blank";
    tombolWaMelayang.rel = "noopener noreferrer";
  }

  // 4. Menu Hamburger untuk HP (Layar 360px & Mobile)
  const tombolHamburger = document.getElementById('tombol-menu-hp');
  const navMenu = document.getElementById('nav-menu');

  if (tombolHamburger && navMenu) {
    tombolHamburger.addEventListener('click', function () {
      tombolHamburger.classList.toggle('aktif');
      navMenu.classList.toggle('aktif');
    });

    // Tutup menu otomatis jika salah satu tautan diklik
    const tautanNav = navMenu.querySelectorAll('.tautan-menu');
    tautanNav.forEach(function (tautan) {
      tautan.addEventListener('click', function () {
        tombolHamburger.classList.remove('aktif');
        navMenu.classList.remove('aktif');
      });
    });
  }

  // 5. Sorot Menu Aktif Saat Halaman Digulir (Scroll Spy)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function () {
    let scrollY = window.pageYOffset;

    sections.forEach(function (current) {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector('.navigasi a[href*=' + sectionId + ']');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navItem) navItem.classList.add('aktif');
      } else {
        if (navItem) navItem.classList.remove('aktif');
      }
    });
  });

});
