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
// 1. GERBANG SECURITY SYSTEM KUSTOM & INTEGRASI POPUP RSVP ELEGAN
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: false });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to');
  const guestElement = document.getElementById('guest-name');

  // HASH MASTER TELAH DIPERBAIKI UNTUK PIN "010625"
  const HASH_MASTER = "8407450e795002048146eec75447a60ee3771f642e145251a154ad6c6d4ad2e3";

  let salahHitung = 0;
  let sedangDikunci = false;
  let targetCleanedName = "";
  
  let waktuBlokirDasar = 60; 
  let faktorPengali = 1;

  // 🌟 FUNGSI: Mengunci dan mensinkronkan input Nama di Form RSVP (id="guestName")
  function sinkronkanNamaRSVP(namaAman) {
    const rsvpNameInput = document.getElementById('guestName');
    
    if (rsvpNameInput) {
      rsvpNameInput.value = namaAman; // Paksa isi dengan nama yang aman
      rsvpNameInput.readOnly = true;  // Kunci input agar tidak bisa diedit manual oleh tamu
      
      // Memberikan efek visual bahwa input ini terkunci resmi
      rsvpNameInput.style.backgroundColor = "#f3f4f6"; 
      rsvpNameInput.style.cursor = "not-allowed";
    } else {
      console.warn("Sistem Keamanan: Elemen id='guestName' tidak ditemukan di HTML!");
    }
  }

  async function hitungHashSHA256(teks) {
    const msgBuffer = new TextEncoder().encode(teks);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  const securityModal = document.getElementById('securityModal');
  const modalNormalState = document.getElementById('modalNormalState');
  const modalLockedState = document.getElementById('modalLockedState');
  const miniSecurityAlert = document.getElementById('miniSecurityAlert');

  const modalPinInput = document.getElementById('modalPinInput');
  const modalErrorMessage = document.getElementById('modalErrorMessage');
  const btnSecConfirm = document.getElementById('btnSecConfirm');
  const btnSecCancel = document.getElementById('btnSecCancel');
  const btnSecLockedBack = document.getElementById('btnSecLockedBack');

  function periksaRiwayatBlokir() {
    if (localStorage.getItem('security_breach_detected') === 'true') {
      if (miniSecurityAlert) miniSecurityAlert.style.display = "flex";
    } else {
      if (miniSecurityAlert) miniSecurityAlert.style.display = "none";
    }
  }
  periksaRiwayatBlokir();

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
      
      // SINKRONISASI: Izinkan nama baru masuk form RSVP karena PIN benar
      sinkronkanNamaRSVP(targetCleanedName);

      localStorage.removeItem('security_breach_detected');
      periksaRiwayatBlokir();

      if (guestElement) guestElement.innerText = targetCleanedName;
      
      // Menutup modal utama input PIN
      if (securityModal) securityModal.classList.remove('active');
      
      modalPinInput.value = "";
      if (modalErrorMessage) modalErrorMessage.style.display = "none";
      
      // Memunculkan Modal Pop-up Sukses Profesional yang Baru
      const verifiedSuccessModal = document.getElementById('verifiedSuccessModal');
      const btnSecSuccessClose = document.getElementById('btnSecSuccessClose');
      
      if (verifiedSuccessModal) {
        verifiedSuccessModal.classList.add('active');
      }

      // Menangani penutupan pop-up ketika tombol "Lanjutkan" diklik
      if (btnSecSuccessClose) {
        btnSecSuccessClose.onclick = function() {
          verifiedSuccessModal.classList.remove('active');
          
          // Mengembalikan scroll halaman setelah pop-up sukses ditutup resmi oleh pemilik
          document.body.style.overflow = "auto";
          document.body.style.height = "auto";
        };
      }
      
    } else {
      // PIN SALAH
      salahHitung++;
      
      if (salahHitung >= 3) {
        // AKTIVASI LOCKDOWN EKSPONENSIAL
        sedangDikunci = true;
        
        localStorage.setItem('security_breach_detected', 'true');
        periksaRiwayatBlokir();

        // SINKRONISASI: PIN salah 3x, langsung paksa form RSVP kembali ke nama asli
        const savedOriginalName = localStorage.getItem('guest_original_name');
        if (savedOriginalName) sinkronkanNamaRSVP(savedOriginalName);

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
      
      // SINKRONISASI: Kembalikan nama RSVP ke nama asli saat tombol batal diklik
      sinkronkanNamaRSVP(savedOriginalName);

      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('to', savedOriginalName);
      window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    }
  }

  // 3. INISIALISASI EVENT LISTENERS SECURITY
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
      sinkronkanNamaRSVP(cleanedName); // Set form RSVP untuk Admin
    } else {
      if (!savedOriginalName) {
        localStorage.setItem('guest_original_name', cleanedName);
        guestElement.innerText = cleanedName;
        sinkronkanNamaRSVP(cleanedName); // Set form RSVP kunjungan pertama
      } else {
        if (cleanedName.toLowerCase().trim() === savedOriginalName.toLowerCase().trim()) {
          guestElement.innerText = cleanedName;
          sinkronkanNamaRSVP(cleanedName); // Set form RSVP jika nama cocok
        } else {
          // SINKRONISASI: Deteksi manipulasi URL, langsung paksa form RSVP ke nama asli
          sinkronkanNamaRSVP(savedOriginalName); 

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
    sinkronkanNamaRSVP("Tamu Undangan");
  }

  // 5. PENANGANAN FORM RSVP & PEMICU POPUP KUSTOM ELEGAN
  const wishesForm = document.getElementById('wishesForm');
  if (wishesForm) {
    wishesForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Mencegah halaman reload otomatis
      
      // --- LOGIKA SIMPAN DATA ANDA TETAP BERJALAN DI SINI ---
      
      // BERHASIL: Munculkan Modal Popup Profesional Kustom Anda!
      tampilkanPopupRSVP();

      // Reset Form isi teks (kecuali nama tetap terkunci)
      wishesForm.reset();
      const currentValidName = guestElement ? guestElement.innerText : "Tamu Undangan";
      sinkronkanNamaRSVP(currentValidName);
    });
  }
});

// FUNGSI GLOBAL UNTUK BUKA/TUTUP POPUP RSVP KUSTOM
function tampilkanPopupRSVP() {
  const successModal = document.getElementById('rsvpSuccessModal');
  if (successModal) {
    successModal.classList.add('active');
  }
}

function tutupPopupRSVP() {
  const successModal = document.getElementById('rsvpSuccessModal');
  if (successModal) {
    successModal.classList.remove('active');
  }
}

// =========================================================================
// 1. URL WEB APP GOOGLE APPS SCRIPT ANDA (PASTIKAN LINK BENAR & BERAKHIRAN /exec)
// =========================================================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyQ_YloF6OtJlqydibxLghluIRRyaATltZmbQyK-qsDblejaLgIb65yBSjEvaLOdGesSA/exec";

document.addEventListener("DOMContentLoaded", function () {
  
  // =========================================================================
  // 2. AMBIL NAMA TAMU DARI URL
  // =========================================================================
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to');
  let cleanedName = "";

  if (guestParam) {
    cleanedName = decodeURIComponent(guestParam.replace(/\+/g, ' '));
    
    const guestElement = document.getElementById('guest-name');
    if (guestElement) {
      guestElement.innerText = cleanedName;
    }

    const inputGuestName = document.getElementById('guestName');
    if (inputGuestName) {
      inputGuestName.value = cleanedName;
    }
  }

  // =========================================================================
  // 3. MUAT ANGKA TOTAL DARI SPREADSHEET Saat Web Dibuka
  // =========================================================================
  loadWishesFromLocal();

  // =========================================================================
  // 4. PROSES KIRIM DATA KE GOOGLE SHEETS SAAT FORM DI-SUBMIT
  // =========================================================================
  const wishesForm = document.getElementById('wishesForm');
  if (wishesForm) {
    wishesForm.addEventListener('submit', function (e) {
      e.preventDefault(); 

      const nama = document.getElementById('guestName').value;
      const ucapan = document.getElementById('guestMessage').value;
      const kehadiran = document.getElementById('guestAttendance').value;

      // METODE BARU: Menggunakan URLSearchParams agar Lolos CORS 100%
      const formData = new URLSearchParams();
      formData.append('nama', nama);
      formData.append('kehadiran', kehadiran);

      const submitBtn = wishesForm.querySelector('.btn-submit-wishes');
      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = "Mengirim...";
      submitBtn.disabled = true;

      // Kirim data ke Google Sheets
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData // Kirim sebagai form-urlencoded tanpa header JSON mentah
      })
      .then(response => response.json())
      .then((result) => {
        // Teks Ucapan disimpan di Local Browser (LocalStorage)
        saveWishToLocal(nama, ucapan, kehadiran);

        // SINKRONISASI OTOMATIS: Jeda 1.5 detik agar spreadsheet selesai mencatat
        setTimeout(() => {
          if (typeof loadWishesFromLocal === "function") {
            loadWishesFromLocal();
          }
        }, 1500);

        // Reset form input
        document.getElementById('guestMessage').value = "";
        document.getElementById('guestAttendance').selectedIndex = 0;

        // MENAMPILKAN POPUP MODAL KUSTOM
        const rsvpModal = document.getElementById('rsvpModal');
        const closeRsvpModal = document.getElementById('closeRsvpModal');

        if (rsvpModal && closeRsvpModal) {
          rsvpModal.classList.add('show');

          closeRsvpModal.onclick = function () {
            rsvpModal.classList.remove('show');
          };

          rsvpModal.onclick = function (event) {
            if (event.target === rsvpModal) {
              rsvpModal.classList.remove('show');
            }
          };
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Gagal mengirim data, silakan coba lagi.");
      })
      .finally(() => {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      });
    });
  }
});

// =========================================================================
// 5. SIMPAN UCAPAN KE MEMORI LOKAL BROWSER
// =========================================================================
function saveWishToLocal(nama, ucapan, kehadiran) {
  let wishes = [];
  try {
    wishes = JSON.parse(localStorage.getItem('wedding_wishes')) || [];
  } catch(e) {
    wishes = [];
  }
  
  const newWish = {
    nama: nama,
    ucapan: ucapan,
    kehadiran: kehadiran,
    waktu: new Date().toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' })
  };

  wishes.unshift(newWish); 
  localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
  loadWishesFromLocal();
}

// =========================================================================
// 6. TARIK ANGKA HITUNGAN REAL-TIME DARI SPREADSHEET
// =========================================================================
function loadWishesFromLocal() {
  var wishesList = document.getElementById("wishesList");
  var totalCommentsOpt = document.getElementById("totalComments");
  var countHadirOpt = document.getElementById("countHadir");
  var countTidakHadirOpt = document.getElementById("countTidakHadir");

  if (GOOGLE_SCRIPT_URL) {
    var cacheBusterUrl = GOOGLE_SCRIPT_URL + "?_" + new Date().getTime();

    fetch(cacheBusterUrl, {
      method: "GET",
      redirect: "follow"
    })
    .then(function(response) {
      if (!response.ok) throw new Error("Network error");
      return response.json();
    })
    .then(function(data) {
      if (data) {
        // Angka web diubah secara real-time mengikuti database Google Sheets
        if (totalCommentsOpt) totalCommentsOpt.innerText = data.totalComments || 0;
        if (countHadirOpt) countHadirOpt.innerText = data.hadir || 0;
        if (countTidakHadirOpt) countTidakHadirOpt.innerText = data.tidakHadir || 0;
      }
    })
    .catch(function(err) {
      console.error("Gagal memuat statistik dari Sheets:", err);
    });
  }

  var wishes = [];
  try {
    wishes = JSON.parse(localStorage.getItem("wedding_wishes")) || [];
  } catch(e) {
    wishes = [];
  }
  
  var htmlContent = "";
  wishes.forEach(function(wish) {
    var bgBadge = wish.kehadiran === "Hadir" ? "background-color: #e6f4ea; color: #137333;" : "background-color: #fce8e6; color: #c5221f;";
    
    htmlContent += '<div class="wish-item" style="border-bottom: 1px solid #eee; padding: 12px 0; margin-top: 10px; text-align: left;">' +
                   '<strong style="color: #333; font-size: 0.95rem;">' + (wish.nama || 'Tamu') + '</strong>' +
                   '<span style="font-size: 0.75rem; font-weight: bold; padding: 2px 8px; border-radius: 20px; margin-left: 6px; display: inline-block; ' + bgBadge + '">' +
                   (wish.kehadiran || 'Hadir') +
                   '</span>' +
                   '<p style="margin: 6px 0 4px 0; color: #555; font-size: 0.9rem; line-height: 1.4;">' + (wish.ucapan || '') + '</p>' +
                   '<small style="color: #999; font-size: 0.75rem;">' + (wish.waktu || '') + '</small>' +
                   '</div>';
  });

  if (wishesList) {
    wishesList.innerHTML = htmlContent;
  }
}

function tutupPopupRSVP() {
  const successModal = document.getElementById('rsvpSuccessModal');
  if (successModal) {
    successModal.classList.remove('active');
  }
}

