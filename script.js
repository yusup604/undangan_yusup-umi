// Inisialisasi library efek timbul (AOS)
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,
    once: false
  });

  // Ambil nama tamu dari parameter URL (contoh: domain.com/?to=Budi)
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to');
  
  if (guestParam) {
    const guestElement = document.getElementById('guest-name');
    if (guestElement) {
      // Ditambahkan pembersih kode URL agar nama tampil normal (misal %26 menjadi &)
    const cleanedName = decodeURIComponent(guestParam.replace(/\+/g, ' '));
    guestElement.innerText = cleanedName;
    }
  }
});

// Fungsi saat tombol "Buka Undangan" diklik
function openInvitation() {
  // 1. Putar Musik Latar
  const music = document.getElementById('bgMusic');
  if (music) {
    music.play().catch(error => {
      console.log("Autoplay ditahan browser, musik akan menyala setelah interaksi pengguna.");
    });
  }

  // 2. Scroll Halus ke Cover Dalam / Opening (Page 2)
  const nextSection = document.getElementById('opening');
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Tanggal Acara: 12 Desember 2026 (Bulan di JS menggunakan indeks 0-11, jadi Desember = 11)
const targetDate = new Date(2026, 11, 12, 12, 0, 0).getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // KODE AMAN: Simpan elemen ke dalam variabel dahulu
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Cek satu per satu: Jika elemennya ditemukan di HTML, baru isi angkanya
    if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
    if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
  }
}


// KODE PERBAIKAN UNTUK MENGGANTIKAN BLOK KODE TERSEBUT
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Jalankan hitung mundur dengan aman setelah halaman siap
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 2. Fungsi tombol Lihat Rekening
  const btnToggleBank = document.getElementById('btnToggleBank');
  const bankContainer = document.getElementById('bankContainer');

  if (btnToggleBank && bankContainer) {
    btnToggleBank.addEventListener('click', function() {
      // Toggle tampil/sembunyi kelas hidden
      bankContainer.classList.toggle('hidden');

      // Scroll halus ke arah kartu saat dibuka
      if (!bankContainer.classList.contains('hidden')) {
        bankContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
});


// Fungsi Copy Nomor Rekening
function copyText(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const textToCopy = element.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert('Nomor rekening berhasil disalin!');
    }).catch(err => {
      console.error('Gagal menyalin: ', err);
    });
  }
}

// =================================================================
// 1. GERBANG KEAMANAN NAMA TAMU (ANTI-MANIPULASI URL LINTAS PERANGKAT)
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: false });
  }

  // PIN Master Anda (Sensitif huruf besar/kecil atau angka)
  const PIN_MASTER = "010626"; 

  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to');
  const guestElement = document.getElementById('guest-name');

  if (guestElement) {
    if (guestParam) {
      // 1. Bersihkan teks spasi (+) dan simbol khusus seperti %26 menjadi &
      const cleanedName = decodeURIComponent(guestParam.replace(/\+/g, ' '));
      
      // 2. Ambil data memori yang tersimpan di perangkat saat ini
      const savedOriginalName = localStorage.getItem('guest_original_name');
      const isAdmin = localStorage.getItem('invitation_admin') === 'true';

      // =============================================================
      // PETA LOGIKA PERANGKAT
      // =============================================================
      if (isAdmin) {
        // KONDISI A: HP ANDA (ADMINISTRATOR)
        // Bebas ganti nama ke siapa saja di URL tanpa terhalang popup PIN lagi
        guestElement.innerText = cleanedName;
      } else {
        // KONDISI B: HP ORANG LAIN / TAMU BIAYA
        if (!savedOriginalName) {
          // JIKA KUNJUNGAN PERTAMA DI HP TAMU:
          // Kunci nama pertama ini ke dalam memori internal HP mereka
          localStorage.setItem('guest_original_name', cleanedName);
          guestElement.innerText = cleanedName;
        } else {
          // JIKA KUNJUNGAN KEDUA DST (Mencoba Mengubah Nama di URL):
          // Bandingkan nama di URL sekarang dengan nama asli awal yang terkunci di memori HP
          if (cleanedName.toLowerCase().trim() === savedOriginalName.toLowerCase().trim()) {
            // Jika nama di URL tidak diubah-ubah, tampilkan nama mereka dengan ramah
            guestElement.innerText = cleanedName;
          } else {
            // 🚨 DETEKSI MANIPULASI: TANTANG DENGAN POPUP INPUT PIN
            const inputPIN = prompt("⚠️ Perubahan identitas tamu dideteksi.\nMasukkan PIN Keamanan jika Anda adalah Pemilik Undangan:");

            if (inputPIN === PIN_MASTER) {
              // JIKA PIN BENAR (Ini adalah HP Anda yang sedang membuat nama baru):
              alert("👑 PIN Benar! Perangkat Anda sekarang resmi menjadi Administrator.");
              localStorage.setItem('invitation_admin', 'true'); // Kunci status Admin permanen di HP Anda
              localStorage.setItem('guest_original_name', cleanedName); // Perbarui memori nama baru
              guestElement.innerText = cleanedName;
            } else {
              // JIKA PIN SALAH / DI-CANCEL (Ini adalah HP Tamu Iseng):
              alert("❌ PIN Salah atau Dibatalkan! Nama diblokir dan dikunci kembali.");
              
              // Paksa teks di layar kembali ke nama asli awal tamu tersebut
              guestElement.innerText = savedOriginalName;
              
              // Paksa URL di browser kembali terkunci ke nama asli awal tamu
              urlParams.set('to', savedOriginalName);
              window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
            }
          }
        }
      }
    } else {
      // Jika link dibuka polosan tanpa nama (?to= tidak ada)
      guestElement.innerText = "Tamu Undangan";
    }
  }
});
