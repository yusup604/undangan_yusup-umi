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
// 1. GERBANG SECURITY SYSTEM KUSTOM (EXPONENTIAL BACKOFF & PERMANENT ALERT)
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: false });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to');
  const guestElement = document.getElementById('guest-name');

  const HASH_MASTER = "b90e97f4eae90b89fae27840e851ea9802d84f8d512a58bf5460f926b5ab4717"; 

  let salahHitung = 0;
  let sedangDikunci = false;
  let targetCleanedName = "";
  
  let waktuBlokirDasar = 60; 
  let faktorPengali = 1;

  async function hitungHashSHA256(teks) {
    const msgBuffer = new TextEncoder().encode(teks);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  const securityModal = document.getElementById('securityModal');
  const modalNormalState = document.getElementById('modalNormalState');
  const modalLockedState = document.getElementById('modalLockedState');
  const miniSecurityAlert = document.getElementById('miniSecurityAlert'); // Elemen tanda mini baru

  const modalPinInput = document.getElementById('modalPinInput');
  const modalErrorMessage = document.getElementById('modalErrorMessage');
  const btnSecConfirm = document.getElementById('btnSecConfirm');
  const btnSecCancel = document.getElementById('btnSecCancel');
  const btnSecLockedBack = document.getElementById('btnSecLockedBack');

  // 🌟 PERBAIKAN BARU: Periksa apakah perangkat ini punya riwayat pernah diblokir saat web dibuka
  function periksaRiwayatBlokir() {
    if (localStorage.getItem('security_breach_detected') === 'true') {
      if (miniSecurityAlert) miniSecurityAlert.style.display = "flex";
    } else {
      if (miniSecurityAlert) miniSecurityAlert.style.display = "none";
    }
  }
  periksaRiwayatBlokir(); // Jalankan langsung saat DOM siap

  // 1. FUNGSI UTAMA: PROSES VERIFIKASI PIN
  async function prosesVerifikasiPIN() {
    if (!modalPinInput || sedangDikunci) return;
    
    const inputUser = modalPinInput.value;
    const hashInputUser = await hitungHashSHA256(inputUser);

    if (hashInputUser === HASH_MASTER) {
      // AKSES DISETUJUI
      salahHitung = 0;
      faktorPengali = 1; 
      localStorage.setItem('invitation_admin', 'true');
      localStorage.setItem('guest_original_name', targetCleanedName);
      
      // 🌟 PERBAIKAN BARU: Hapus tanda "ACCESS LOCKED" mini secara permanen karena pemilik sah berhasil masuk
      localStorage.removeItem('security_breach_detected');
      periksaRiwayatBlokir();

      if (guestElement) guestElement.innerText = targetCleanedName;
      if (securityModal) securityModal.classList.remove('active');
      
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";

      modalPinInput.value = "";
      if (modalErrorMessage) modalErrorMessage.style.display = "none";
      alert("👑 Akses Terverifikasi! Status Perangkat Diperbarui Sebagai Pemilik.");
    } else {
      // PIN SALAH
      salahHitung++;
      
      if (salahHitung >= 3) {
        // AKTIVASI LOCKDOWN EKSPOENSIAL
        sedangDikunci = true;
        
        // 🌟 PERBAIKAN BARU: Simpan status pembobolan ke memori agar tanda mini terus muncul kedepannya
        localStorage.setItem('security_breach_detected', 'true');
        periksaRiwayatBlokir();

        if (modalNormalState) modalNormalState.style.display = "none";
        if (modalLockedState) modalLockedState.style.display = "block";
        
        let durasiBlokirAktif = waktuBlokirDasar * faktorPengali;
        
        setTimeout(() => {
          sedangDikunci = false;
          salahHitung = 0;
          faktorPengali = faktorPengali * 2; 
          
          if (modalNormalState) modalNormalState.style.display = "block";
          if (modalLockedState) modalLockedState.style.display = "none";
          
          if (modalPinInput) {
            modalPinInput.value = "";
            modalPinInput.focus();
          }
          if (modalErrorMessage) modalErrorMessage.style.display = "none";
        }, durasiBlokirAktif * 1000);
        
      } else {
        if (modalErrorMessage) {
          modalErrorMessage.style.display = "block";
          modalErrorMessage.innerText = `PIN Salah! Akses Ditolak. (${salahHitung}/3)`;
        }
        modalPinInput.value = "";
        modalPinInput.focus();
      }
    }
  }

  // 2. FUNGSI UTAMA: PEMBATALAN AKSES / KEMBALI
  function batalkanVerifikasi() {
    const savedOriginalName = localStorage.getItem('guest_original_name');
    if (securityModal) securityModal.classList.remove('active');
    
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";

    if (modalPinInput) modalPinInput.value = "";
    if (modalErrorMessage) modalErrorMessage.style.display = "none";
    if (!sedangDikunci) salahHitung = 0; 
    
    if (guestElement && savedOriginalName) {
      guestElement.innerText = savedOriginalName;
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('to', savedOriginalName);
      window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    }
  }

  // 3. INISIALISASI EVENT LISTENERS
  if (btnSecConfirm) btnSecConfirm.addEventListener('click', prosesVerifikasiPIN);
  if (btnSecCancel) btnSecCancel.addEventListener('click', batalkanVerifikasi);
  if (btnSecLockedBack) btnSecLockedBack.addEventListener('click', batalkanVerifikasi);
  
  if (modalPinInput) {
    modalPinInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') prosesVerifikasiPIN();
    });
    modalPinInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  }

  // 4. LOGIKA VALIDASI ALUR DETEKSI PARAMETER URL
  if (guestElement && guestParam) {
    const cleanedName = decodeURIComponent(guestParam.replace(/\+/g, ' '));
    targetCleanedName = cleanedName; 
    
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
          if (securityModal) {
            securityModal.classList.add('active');
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
          }
          if (modalPinInput) modalPinInput.focus();
        }
      }
    }
  } else if (guestElement) {
    guestElement.innerText = "Tamu Undangan";
  }
});

