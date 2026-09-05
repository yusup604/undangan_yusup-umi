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
// 1. GERBANG SECURITY SYSTEM KUSTOM (VERSI ANTI-HACKING TOOLS / HASHED)
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: false });
  }

  // Tools hacking/scanning tidak akan bisa menebak PIN asli dari kode acak ini.
  const HASH_MASTER = "nhzkn"; 

  // Fungsi internal untuk mengubah input ketikan menjadi kode Hash
  function hitungHash(teks) {
    let hash = 0;
    for (let i = 0; i < teks.length; i++) {
      hash = (hash << 5) - hash + teks.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(36).substring(0, 5);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to');
  const guestElement = document.getElementById('guest-name');

  // Deklarasi Elemen Modal Kustom
  const securityModal = document.getElementById('securityModal');
  const modalPinInput = document.getElementById('modalPinInput');
  const modalErrorMessage = document.getElementById('modalErrorMessage');
  const btnSecConfirm = document.getElementById('btnSecConfirm');
  const btnSecCancel = document.getElementById('btnSecCancel');

  if (guestElement && guestParam) {
    const cleanedName = decodeURIComponent(guestParam.replace(/\+/g, ' '));
    const savedOriginalName = localStorage.getItem('guest_original_name');
    const isAdmin = localStorage.getItem('invitation_admin') === 'true';

    if (isAdmin) {
      guestElement.innerText = cleanedName;
    } else {
      if (!savedOriginalName) {
        localStorage.setItem('guest_original_name', cleanedName);
        guestElement.innerText = cleanedName;
      } else {
        if (cleanedName.toLowerCase().trim() === savedOriginalName.toLowerCase().trim()) {
          guestElement.innerText = cleanedName;
        } else {
          // 🚨 TERDETEKSI PERUBAHAN NAMA: Munculkan Modal Kustom
          if (securityModal) securityModal.classList.add('active');
          if (modalPinInput) modalPinInput.focus();

          btnSecConfirm.addEventListener('click', prosesVerifikasiPIN);
          modalPinInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') prosesVerifikasiPIN();
          });

          function prosesVerifikasiPIN() {
            const inputUser = modalPinInput.value;
            
            // 2. PERBAIKAN UTAMA: Ubah input user menjadi Hash, lalu bandingkan hasilnya
            const hashInputUser = hitungHash(inputUser);

            if (hashInputUser === HASH_MASTER) {
              
              localStorage.setItem('invitation_admin', 'true');
              localStorage.setItem('guest_original_name', cleanedName);
              guestElement.innerText = cleanedName;
              securityModal.classList.remove('active');
              modalPinInput.value = "";
              modalErrorMessage.style.display = "none";
              alert("👑 Akses Terverifikasi! Status Perangkat Diperbarui Sebagai Pemilik.");
            } else {
              // PIN SALAH
              modalErrorMessage.style.display = "block";
              modalPinInput.value = "";
              modalPinInput.focus();
            }
          }

          btnSecCancel.addEventListener('click', () => {
            securityModal.classList.remove('active');
            modalPinInput.value = "";
            modalErrorMessage.style.display = "none";
            
            guestElement.innerText = savedOriginalName;
            urlParams.set('to', savedOriginalName);
            window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
          });
        }
      }
    }
  } else if (guestElement) {
    guestElement.innerText = "Tamu Undangan";
  }
});
