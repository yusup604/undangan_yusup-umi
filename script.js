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


// KODE lihat rekening
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
// Fungsi Copy Nomor Rekening Versi Profesional (Tanpa Alert)
function copyText(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const textToCopy = element.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      
      // KODE PERBAIKAN: Memanggil fungsi notifikasi melayang
      showToastNotification('Nomor rekening berhasil disalin!');
      
    }).catch(err => {
      console.error('Gagal menyalin: ', err);
    });
  }
}

// Fungsi Tambahan untuk Membuat Efek Pop-up Melayang Elegan dengan Ikon
function showToastNotification(message) {
  // 1. Cek apakah elemen toast sudah ada di halaman, jika belum buat baru
  let toast = document.getElementById('customToastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'customToastNotification';
    toast.className = 'toast-popup';
    document.body.appendChild(toast);
  }

  // 2. Isi dengan ikon ceklist hijau (SVG) dan teks pesan
  toast.innerHTML = `
    <svg class="toast-icon-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;
  
  // 3. Tambahkan class untuk memicu animasi muncul
  toast.classList.add('show-toast');

  // 4. Hilangkan kembali secara otomatis setelah 2 detik
  setTimeout(() => {
    toast.classList.remove('show-toast');
  }, 2000);
}


// =================================================================
// SYSTEM KEAMANAN UNDANGAN WEB - ANTI-FORWARDING & VIA PARAMETER URL
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: false });
  }

  // 1. KONFIGURASI KUNCI MASTER UTAMA
  const HASH_MASTER = "18bb9c2bedb9671a8db2f6532c7f559ca4b292b0d43f839392f01beb2e9d213d";

  let salahHitung = 0;
  let sedangDikunci = false;
  let targetCleanedName = "";
  let waktuBlokirDasar = 60; 
  let faktorPengali = 1;

  // Mengambil Elemen HTML Berdasarkan ID Resmi
  const securityModal = document.getElementById('securityModal');
  const modalNormalState = document.getElementById('modalNormalState');
  const modalLockedState = document.getElementById('modalLockedState');
  const modalPinInput = document.getElementById('modalPinInput');
  const modalErrorMessage = document.getElementById('modalErrorMessage');
  const btnSecConfirm = document.getElementById('btnSecConfirm');
  const btnSecCancel = document.getElementById('btnSecCancel');
  const btnSecLockedBack = document.getElementById('btnSecLockedBack');
  const guestElement = document.getElementById('guest-name');
  const miniSecurityAlert = document.getElementById('miniSecurityAlert');

  // A. FUNGSI HASH SHA-256 (Case-Insensitive Fix)
  async function hitungHashSHA256(teks) {
    const msgBuffer = new TextEncoder().encode(teks);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return Array.from(new Uint8Array(hashBuffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('')
                .toLowerCase(); 
  }

  // B. PENGUNCIAN & SINKRONISASI INPUT FORM RSVP
  function sinkronkanNamaRSVP(namaAman) {
    const rsvpNameInput = document.getElementById('guestName');
    if (rsvpNameInput) {
      rsvpNameInput.value = namaAman;
      rsvpNameInput.readOnly = true; 
      rsvpNameInput.style.backgroundColor = "#f3f4f6"; 
      rsvpNameInput.style.cursor = "not-allowed";
    }
  }

  // C. LOCKDOWN TOTAL (Anti-Bypass Tampilan)
  function aktifkanLockdownTotal() {
    if (securityModal) {
      securityModal.classList.add('active');
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    }
    if (modalPinInput) modalPinInput.focus();
  }

  // D. PROTEKSI MATI TOMBOL BATAL (Mencegah Bypass)
  function batalkanVerifikasi() {
    alert("Akses Ditolak! Tautan ini dilindungi keamanan enkripsi. Anda tidak bisa keluar tanpa PIN resmi.");
    aktifkanLockdownTotal(); 
  }

  function periksaRiwayatBlokir() {
    if (localStorage.getItem('security_breach_detected') === 'true') {
      if (miniSecurityAlert) miniSecurityAlert.style.display = "flex";
    } else {
      if (miniSecurityAlert) miniSecurityAlert.style.display = "none";
    }
  }
  periksaRiwayatBlokir();
  // E. VERIFIKASI PIN UTAMA ADMIN
  async function prosesVerifikasiPIN() {
    if (!modalPinInput || sedangDikunci) return;
    const inputUser = modalPinInput.value;
    const hashInputUser = await hitungHashSHA256(inputUser);

    if (hashInputUser === HASH_MASTER) {
      salahHitung = 0;
      faktorPengali = 1;
      localStorage.setItem('akses_sah_lokal', 'TOKEN_BYPASS_ADMIN');
      localStorage.setItem('guest_original_name', 'Admin Owner');
      localStorage.removeItem('security_breach_detected');
      periksaRiwayatBlokir();
      
      if (modalErrorMessage) modalErrorMessage.style.display = "none";
      if (securityModal) securityModal.classList.remove('active');
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
      
      const verifiedSuccessModal = document.getElementById('verifiedSuccessModal');
      if (verifiedSuccessModal) verifiedSuccessModal.classList.add('active');
      
      const btnSecSuccessClose = document.getElementById('btnSecSuccessClose');
      if (btnSecSuccessClose) {
        btnSecSuccessClose.onclick = function() {
          verifiedSuccessModal.classList.remove('active');
          const checkParams = new URLSearchParams(window.location.search);
          if (checkParams.get('to')?.toLowerCase() === 'admin owner') {
             window.location.reload();
          }
        };
      }
    } else {
      salahHitung++;
      if (salahHitung >= 3) {
        sedangDikunci = true;
        localStorage.setItem('security_breach_detected', 'true');
        periksaRiwayatBlokir();

        if (modalNormalState) modalNormalState.style.display = "none";
        if (modalLockedState) modalLockedState.style.display = "block";
        
        let durasiBlokirAktif = waktuBlokirDasar * faktorPengali;
        setTimeout(() => {
          sedangDikunci = false;
          salahHitung = 0;
          faktorPengali *= 2;
          if (modalNormalState) modalNormalState.style.display = "block";
          if (modalLockedState) modalLockedState.style.display = "none";
          modalPinInput.value = "";
          modalPinInput.focus();
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

  // F. FUNGSI UNTUK MENGAKTIFKAN LOGIKA TOMBOL GENERATOR DI PANEL ADMIN
  function aktifkanLogikaTombolAdmin() {
    let activeMode = "wa";
    const tabWA = document.getElementById('tabWA');
    const tabCetak = document.getElementById('tabCetak');
    const wrapperWAInput = document.getElementById('wrapperWAInput');
    const btnGen = document.getElementById('btnGen');

    if (!tabWA || !tabCetak || !btnGen) return;

    tabWA.onclick = () => {
      activeMode = "wa";
      tabWA.classList.add('active');
      tabCetak.classList.remove('active');
      if (wrapperWAInput) wrapperWAInput.style.display = "block";
    };

    tabCetak.onclick = () => {
      activeMode = "cetak";
      tabCetak.classList.add('active');
      tabWA.classList.remove('active');
      if (wrapperWAInput) wrapperWAInput.style.display = "none";
    };

    btnGen.onclick = async () => {
      const nama = document.getElementById('admNama').value.trim();
      const rawWA = document.getElementById('admWA') ? document.getElementById('admWA').value.trim() : "";
      if (!nama) return alert("Nama tamu tidak boleh kosong!");
      
      const urlFormat = encodeURIComponent(nama).replace(/%20/g, '+');
      let hasilLinkBelakang = "";
      const btnAction = document.getElementById('btnActionEkstra');
      
      if (activeMode === "wa") {
        const angkaSaja = rawWA.replace(/\D/g, ''); 
        if (angkaSaja.length < 4) return alert("Nomor WA harus menyertakan minimal 4 angka terakhir!");
        
        let formattedWA = angkaSaja;
        if (formattedWA.startsWith('0')) {
          formattedWA = '62' + formattedWA.slice(1);
        }

        const empatAngkaTerakhir = angkaSaja.slice(-4);
        const hashWA = await hitungHashSHA256(empatAngkaTerakhir);
        
        hasilLinkBelakang = `/index.html?to=${urlFormat}&v=${hashWA}&type=wa`;
        document.getElementById('labelHasil').innerText = "Link Belakang Akses WhatsApp:";
        document.getElementById('txtHasil').value = hasilLinkBelakang;
        
        btnAction.style.display = "block";
        btnAction.className = "admin-btn-action wa-action";
        btnAction.innerText = "🚀 Klik Untuk Langsung Kirim Ke WhatsApp Tamu";
        btnAction.onclick = () => {
          const domainAsli = window.location.origin + window.location.pathname.replace('index.html', '').replace('admin.html', '');
          const linkLengkapUntukKirim = domainAsli + hasilLinkBelakang.substring(1);
          const teksPesan = `Halo ${nama}, kami mengundang Anda ke acara pernikahan kami. Silakan buka tautan berikut untuk melihat undangan resmi Anda: ${linkLengkapUntukKirim}`;
          
          window.open(`https://wa.me{formattedWA}?text=${encodeURIComponent(teksPesan)}`, '_blank');
        };
      } else {
        hasilLinkBelakang = `/index.html?to=${urlFormat}&type=cetak`;
        document.getElementById('labelHasil').innerText = "Link Belakang Khusus Cetak QR Code:";
        document.getElementById('txtHasil').value = hasilLinkBelakang;
        
        btnAction.style.display = "block";
        btnAction.className = "admin-btn-action cetak-action";
        btnAction.innerText = "📋 Salin Teks Link Untuk Generator QR Code";
        btnAction.onclick = () => {
          navigator.clipboard.writeText(hasilLinkBelakang);
          alert("Link cetak berhasil disalin!");
        };
      }
      
      document.getElementById('admHasil').style.display = "block";
      navigator.clipboard.writeText(hasilLinkBelakang);
      alert("Proses berhasil! Tautan otomatis disalin ke clipboard Anda.");
    };
  }
  // G. EVALUASI PARAMETER URL & VERIFIKASI ANTI-FORWARDING
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to');
  const vParam = urlParams.get('v'); 
  const typeParam = urlParams.get('type') || 'pribadi';

  const tokenLokal = localStorage.getItem('akses_sah_lokal');
  const savedOriginalName = localStorage.getItem('guest_original_name');
  const isAdminBypass = (tokenLokal === 'TOKEN_BYPASS_ADMIN');

  if (guestParam) {
    const decodedName = decodeURIComponent(guestParam.replace(/\+/g, ' '));
    targetCleanedName = decodedName;

    if (decodedName.toLowerCase().trim() === "admin owner") {
      if (!isAdminBypass) {
        alert("Akses Terbatas! Silakan verifikasi PIN Admin Anda terlebih dahulu.");
        aktifkanLockdownTotal();
        return; 
      }

      if (guestElement) guestElement.innerText = "Admin Owner";
      sinkronkanNamaRSVP("Admin Owner");

      if (!document.getElementById('adminPanelWrapper')) {
        document.body.insertAdjacentHTML('beforeend', `
          <div id="adminPanelWrapper" class="admin-overlay">
            <div class="admin-card">
              <div class="admin-header">
                <div class="admin-icon">🔒</div>
                <h2>Admin Control Panel</h2>
                <p>URL Generator Sesuai Tema Sistem Keamanan</p>
              </div>
              <div class="admin-form-group">
                <label>1. Jalur Distribusi Undangan:</label>
                <div class="admin-tabs">
                  <button id="tabWA" class="tab-btn active">📲 Jalur WhatsApp</button>
                  <button id="tabCetak" class="tab-btn">🖨️ Undangan Cetak (QR)</button>
                </div>
              </div>
              <div class="admin-form-group">
                <label>2. Nama Tamu / Komunitas:</label>
                <input type="text" id="admNama" placeholder="Contoh: Yuliana Putri" class="admin-input">
              </div>
              <div id="wrapperWAInput" class="admin-form-group">
                <label>3. Nomor Kontak WhatsApp:</label>
                <input type="text" id="admWA" placeholder="Contoh: 081234567890" class="admin-input">
              </div>
              <button id="btnGen" class="admin-btn-primary">Generate & Siapkan Akses</button>
              <div id="admHasil" class="admin-result-box" style="display:none;">
                <strong id="labelHasil">Link Akses Hasil Generator:</strong>
                <textarea id="txtHasil" readonly class="admin-textarea"></textarea>
                <button id="btnActionEkstra" class="admin-btn-action"></button>
              </div>
            </div>
          </div>
        `);
      }
      
      aktifkanLogikaTombolAdmin(); 
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
      return; 
    }

    if (isAdminBypass) {
      if (guestElement) guestElement.innerText = decodedName;
      sinkronkanNamaRSVP(decodedName);
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
      return; 
    }

    if (typeParam === 'cetak') {
      localStorage.setItem('akses_sah_lokal', 'CETAK_QR_MEMBER');
      localStorage.setItem('guest_original_name', decodedName); 
      bukaUndanganNormal(decodedName);
    } else if (typeParam === 'wa' && vParam) {
      const waVerifyModal = document.getElementById('waVerifyModal');
      const waVerifyMessage = document.getElementById('waVerifyMessage');
      const waVerifyInput = document.getElementById('waVerifyInput');
      const waVerifyError = document.getElementById('waVerifyError');
      const btnWaConfirm = document.getElementById('btnWaConfirm');
      const btnWaCancel = document.getElementById('btnWaCancel');

      let salahHitungWA = 0;

      if (waVerifyModal && waVerifyMessage) {
        waVerifyMessage.innerText = `Halo ${decodedName}!\nDemi keamanan privasi Anda, mohon masukkan 4 angka terakhir nomor WhatsApp Anda untuk memverifikasi undangan resmi ini:`;
        
        waVerifyModal.classList.add('active');
        document.body.style.overflow = "hidden";
        if (waVerifyInput) {
          waVerifyInput.value = "";
          waVerifyInput.focus();
        }

        async function eksekusiVerifikasiKustom() {
          const userInputHP = waVerifyInput.value.trim().replace(/\D/g, ''); 
          if (!userInputHP) return;

          const hashInputUser = await hitungHashSHA256(userInputHP);
          if (hashInputUser === vParam.toLowerCase()) {
            localStorage.setItem('akses_sah_lokal', 'USER_VALIDATED');
            localStorage.setItem('guest_original_name', decodedName); 
            
            waVerifyModal.classList.remove('active');
            if (waVerifyError) waVerifyError.style.display = "none";
            bukaUndanganNormal(decodedName);
          } else {
            salahHitungWA++;
            if (salahHitungWA >= 3) {
              waVerifyModal.classList.remove('active');
              if (waVerifyError) waVerifyError.style.display = "none";
              localStorage.setItem('security_breach_detected', 'true');
              periksaRiwayatBlokir();
              
              if (modalNormalState) modalNormalState.style.display = "none";
              if (modalLockedState) modalLockedState.style.display = "block";
              aktifkanLockdownTotal();
            } else {
              if (waVerifyError) {
                waVerifyError.style.display = "block";
                waVerifyError.innerText = `Angka identitas tidak sesuai! Kesempatan tersisa: ${3 - salahHitungWA}`;
              }
              waVerifyInput.value = "";
              waVerifyInput.focus();
            }
          }
        }

        btnWaConfirm.onclick = eksekusiVerifikasiKustom;
        waVerifyInput.onkeypress = (e) => {
          if (e.key === 'Enter') eksekusiVerifikasiKustom();
        };

        btnWaCancel.onclick = () => {
          waVerifyModal.classList.remove('active');
          if (waVerifyError) waVerifyError.style.display = "none";
          aktifkanLockdownTotal(); 
        };
      } else {
        aktifkanLockdownTotal();
      }
    } else {
      aktifkanLockdownTotal();
    }

  } else {
    if (isAdminBypass) {
      if (guestElement) guestElement.innerText = "Admin Owner";
      sinkronkanNamaRSVP("Admin Owner");
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    } else if (tokenLokal && savedOriginalName) {
      if (guestElement) guestElement.innerText = savedOriginalName;
      sinkronkanNamaRSVP(savedOriginalName);
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    } else {
      aktifkanLockdownTotal(); 
    }
  }

  function bukaUndanganNormal(namaTamu) {
    if (guestElement) guestElement.innerText = namaTamu;
    sinkronkanNamaRSVP(namaTamu);
    window.history.replaceState({}, document.title, window.location.pathname);
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  }

  if (btnSecConfirm) btnSecConfirm.addEventListener('click', prosesVerifikasiPIN);
  if (btnSecCancel) btnSecCancel.addEventListener('click', batalkanVerifikasi);
  if (btnSecLockedBack) btnSecLockedBack.addEventListener('click', batalkanVerifikasi);
  if (modalPinInput) {
    modalPinInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') prosesVerifikasiPIN();
    });
  }

  const wishesForm = document.getElementById('wishesForm');
  if (wishesForm) {
    wishesForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const successModal = document.getElementById('rsvpSuccessModal');
      if (successModal) successModal.classList.add('active');
      wishesForm.reset();
      const currentValidName = localStorage.getItem('guest_original_name') || "Tamu Undangan";
      sinkronkanNamaRSVP(currentValidName);
    });
  }
});

// =========================================================================
// 1. URL WEB APP GOOGLE APPS SCRIPT ANDA (PASTIKAN LINK BENAR & BERAKHIRAN /exec)
// =========================================================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyQ_YloF6OtJlqydibxLghluIRRyaATltZmbQyK-qsDblejaLgIb65yBSjEvaLOdGesSA/exec";

document.addEventListener("DOMContentLoaded", function () {
  // AMBIL NAMA TAMU DARI URL PARAMETER DENGAN AMAN (?to=Nama+Tamu)
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to');
  if (guestParam) {
    const cleanedName = decodeURIComponent(guestParam.replace(/\+/g, ' '));
    const guestElement = document.getElementById('guest-name');
    if (guestElement) guestElement.innerText = cleanedName;

    const inputGuestName = document.getElementById('guestName');
    if (inputGuestName) inputGuestName.value = cleanedName;
  }

  // Muat data lokal saat web pertama kali dibuka
  loadWishesFromLocal();
});

// =========================================================================
// 4. PROSES UTAMA AMBIL DATA & KIRIM (METODE LANGSUNG FORM ELEMENT)
// =========================================================================
function kirimRsvpData(event, formElement) {
  event.preventDefault(); // Cegah reload halaman

  // MENGAMBIL DATA LANGSUNG DARI ELEMEN INPUT (Anti Gagal / Anti Kosong)
  const nama = formElement.querySelector('[name="nama"]').value;
  const ucapan = formElement.querySelector('[name="ucapan"]').value;
  const kehadiran = formElement.querySelector('[name="kehadiran"]').value;

  // --- UTAMAKAN PROSES LOKAL: TAMPILKAN SEKETIKA ---
  saveWishToLocal(nama, ucapan, kehadiran);

  // Menyusun objek JSON murni dari hasil tangkapan formulir
  const payloadData = {
    nama: nama,
    kehadiran: kehadiran,
    ucapan: ucapan
  };

  // Ubah status tombol menjadi loading
  const submitBtn = formElement.querySelector('.btn-submit-wishes');
  let originalBtnText = "Kirim";
  if (submitBtn) {
    originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Mengirim...";
    submitBtn.disabled = true;
  }

  // Bersihkan kolom ucapan & select kehadiran agar siap diisi tamu lain
  formElement.querySelector('[name="ucapan"]').value = "";
  formElement.querySelector('[name="kehadiran"]').selectedIndex = 0;

  // Menampilkan popup modal sukses sesuai dengan class CSS modal Anda
  const rsvpModal = document.querySelector('.rsvp-modal-overlay');
  const closeRsvpModal = document.querySelector('.rsvp-modal-btn');
  if (rsvpModal) {
    rsvpModal.classList.add('show'); 
    if (closeRsvpModal) {
      closeRsvpModal.onclick = function () {
        rsvpModal.classList.remove('show');
      };
    }
  }

  // --- KIRIM KE SPREADSHEET DI LATAR BELAKANG ---
  fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(payloadData)
  })
  .then(() => {
    console.log("Berhasil terkirim ke Spreadsheet.");
    setTimeout(() => { loadWishesFromLocal(); }, 2000);
  })
  .catch((error) => {
    console.error('Koneksi latar belakang terhambat:', error);
  })
  .finally(() => {
    if (submitBtn) {
      submitBtn.innerText = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

// =========================================================================
// 5. SIMPAN UCAPAN KE MEMORI LOKAL BROWSER (LOCALSTORAGE)
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
  renderWishesHTML(wishes);
}

// =========================================================================
// 6. FUNGSI UNTUK MERENDER DAFTAR UCAPAN KE HTML ELEMEN #wishesList
// =========================================================================
function renderWishesHTML(wishes) {
  const wishesList = document.getElementById("wishesList");
  if (!wishesList) return;

  if (wishes.length === 0) {
    wishesList.innerHTML = '<p style="color: #888; text-align: center; font-size: 0.9rem; padding: 15px 0;">Belum ada ucapan. Silakan tulis ucapan pertama Anda!</p>';
    return;
  }

  let htmlContent = "";
  wishes.forEach(function(wish) {
    const bgBadge = wish.kehadiran === "Hadir" ? "background-color: #e6f4ea; color: #137333;" : "background-color: #fce8e6; color: #c5221f;";
    
    htmlContent += '<div class="wish-item" style="border-bottom: 1px solid #eee; padding: 12px 0; margin-top: 10px; text-align: left;">' +
                   '<strong style="color: #333 !important; font-size: 0.95rem; display: inline-block;">' + (wish.nama || 'Tamu') + '</strong>' +
                   '<span style="font-size: 0.75rem; font-weight: bold; padding: 2px 8px; border-radius: 20px; margin-left: 6px; display: inline-block; ' + bgBadge + '">' +
                   (wish.kehadiran || 'Hadir') +
                   '</span>' +
                   '<div class="teks-ucapan-tamu" style="margin: 8px 0 !important; color: #1e293b !important; font-size: 0.9rem !important; line-height: 1.5 !important; display: block !important; visibility: visible !important; opacity: 1 !important; font-weight: normal !important; word-break: break-word;">' + 
                     (wish.ucapan || 'Teks ucapan terdeteksi kosong') + 
                   '</div>' + 
                   '<small style="color: #999; font-size: 0.75rem; display: block; margin-top: 4px;">' + (wish.waktu || '') + '</small>' +
                   '</div>';
  });

  wishesList.innerHTML = htmlContent;
}

// =========================================================================
// 7. TARIK ANGKA HITUNGAN STATISTIK DARI SPREADSHEET
// =========================================================================
function loadWishesFromLocal() {
  const totalCommentsOpt = document.getElementById("totalComments");
  const countHadirOpt = document.getElementById("countHadir");
  const countTidakHadirOpt = document.getElementById("countTidakHadir");

  if (GOOGLE_SCRIPT_URL) {
    const cacheBusterUrl = GOOGLE_SCRIPT_URL + "?_" + new Date().getTime();
    fetch(cacheBusterUrl, { method: "GET", redirect: "follow" })
    .then(res => res.json())
    .then(data => {
      if (data) {
        if (totalCommentsOpt) totalCommentsOpt.innerText = data.totalComments || 0;
        if (countHadirOpt) countHadirOpt.innerText = data.hadir || 0;
        if (countTidakHadirOpt) countTidakHadirOpt.innerText = data.tidakHadir || 0;
      }
    })
    .catch(err => console.error("Gagal memperbarui counter dashboard dari Sheets:", err));
  }

  let wishes = [];
  try {
    wishes = JSON.parse(localStorage.getItem("wedding_wishes")) || [];
  } catch(e) {
    wishes = [];
  }
  renderWishesHTML(wishes);
}

// Fungsi untuk membuka & menutup menu melayang
function toggleCustomSelect(element) {
  const wrapper = element.parentElement;
  wrapper.classList.toggle('open');
}

// Fungsi untuk memilih opsi kehadiran
function selectOption(element) {
  const value = element.getAttribute('data-value');
  const wrapper = element.closest('.custom-select-wrapper');
  
  // 1. Update teks di tombol utama
  const triggerText = wrapper.querySelector('.trigger-text');
  triggerText.textContent = element.textContent.trim();
  
  // 2. Masukkan nilai ke input hidden agar bisa dikirim saat submit form
  const hiddenInput = document.getElementById('guestAttendance');
  hiddenInput.value = value;
  
  // 3. Tutup kembali menu dropdown
  wrapper.classList.remove('open');
}

// Menutup dropdown otomatis jika user mengklik di luar area dropdown
window.addEventListener('click', function(e) {
  const dropdown = document.getElementById('customDropdown');
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});


// Fungsi ketika salah satu opsi (Hadir / Tidak Hadir) dipilih tamu
function selectCustomOption(optionElement) {
  const val = optionElement.getAttribute('data-value');
  const wrapper = optionElement.closest('.custom-select-wrapper');
  
  // 1. Ambil elemen input hidden dan ganti nilainya
  const inputHidden = wrapper.querySelector('#guestAttendance');
  inputHidden.value = val;
  
  // 2. Ganti teks tampilan utama box sesuai pilihan
  const triggerText = wrapper.querySelector('#selectedText');
  triggerText.innerText = val;
  triggerText.style.color = "#0f172a"; // Ubah teks menjadi warna gelap solid
  
  // 3. Tutup kembali dropdown melayang
  wrapper.classList.remove('open');
}

// Otomatis menutup dropdown jika tamu tidak sengaja mengeklik area luar form
window.addEventListener('click', function(e) {
  const wrapper = document.querySelector('.custom-select-wrapper');
  if (wrapper && !wrapper.contains(e.target)) {
    wrapper.classList.remove('open');
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // 1. Ambil parameter URL (Case-Insensitive untuk 'to')
  const urlParams = new URLSearchParams(window.location.search);
  let namaTamu = urlParams.get('to') || urlParams.get('To') || urlParams.get('TO');

  // DOM Elemen Utama
  const heroTitle = document.getElementById("dynamic-hero-title");
  const heroDate = document.getElementById("dynamic-hero-date");
  const guestElement = document.getElementById("guest-name");
  const btnOpen = document.getElementById("btnOpen");
  const openingTitle = document.getElementById("dynamic-opening-title");
  const openingDate = document.getElementById("dynamic-opening-date");

  // DOM Elemen Profil Mempelai
  const brideName = document.getElementById("dynamic-bride-name");
  const brideParents = document.getElementById("dynamic-bride-parents");
  const brideAvatar = document.getElementById("avatar-bride");
  const groomName = document.getElementById("dynamic-groom-name");
  const groomParents = document.getElementById("dynamic-groom-parents");
  const groomAvatar = document.getElementById("avatar-groom");

  // DOM Elemen Waktu & Lokasi
  const akadDate = document.getElementById("dynamic-akad-date");
  const akadTime = document.getElementById("dynamic-akad-time");
  const resepsiDate = document.getElementById("dynamic-resepsi-date");
  const resepsiTime = document.getElementById("dynamic-resepsi-time");
  const elementAlamat = document.getElementById("dynamic-address");
  const elementMaps = document.getElementById("dynamic-maps-btn");

  // DOM Elemen Konten & Finansial
  const storyImg = document.getElementById("dynamic-story-img");
  const featuredBanner = document.getElementById("dynamic-gallery-featured"); // <- SUDAH DITAMBAHKAN
  const galleryGrid = document.getElementById("dynamic-gallery-grid");
  const numBca = document.getElementById("rekeningBca");
  const holderBca = document.getElementById("holderBca");
  const btnCopyBca = document.getElementById("btnCopyBca");
  const numPermata = document.getElementById("rekeningPermata");
  const holderPermata = document.getElementById("holderPermata");
  const btnCopyPermata = document.getElementById("btnCopyPermata");

  // DOM Elemen Penutup & Watermark
  const closingTitle = document.getElementById("dynamic-closing-title");
  const watermarkText = document.getElementById("dynamic-watermark"); 

  // FUNGSI SANITASI DATA (Mencegah XSS)
  function bersihkanTeks(input) {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
  }

  // JIKA TAUTAN SAH (Parameter nama tamu ada dan valid)
  if (namaTamu && namaTamu.trim() !== "") {
    
    // Gunakan textContent untuk keamanan text input
    if (heroTitle) heroTitle.textContent = "Umi & Yusup";
    if (heroDate) heroDate.textContent = "SABTU, 12 DESEMBER 2026";
    if (guestElement) guestElement.innerHTML = bersihkanTeks(namaTamu);

    if (openingTitle) openingTitle.textContent = "UMI & YUSUP";
    if (openingDate) openingDate.textContent = "SABTU, 12 DESEMBER 2026";

    if (brideName) brideName.textContent = "Umiyati Hidayah";
    if (brideParents) brideParents.innerHTML = "Putri pertama dari<br>Bapak Tutu<br>dan Ibu Rita Anggraini";
    if (brideAvatar) {
      brideAvatar.src = "assets/w-umi-992x.jpeg"; 
      brideAvatar.style.display = "block";       
    }

    if (groomName) groomName.textContent = "Yusup Supriadi, S.Kom.";
    if (groomParents) groomParents.innerHTML = "Putra ketiga dari<br>Bapak Ood<br>dan Ibu Enok Rohana";
    if (groomAvatar) {
      groomAvatar.src = "assets/g-ysp-110z.jpeg"; 
      groomAvatar.style.display = "block";       
    }

    if (akadDate) akadDate.textContent = "SABTU, 12 DESEMBER 2026";
    if (akadTime) akadTime.textContent = "PUKUL : 09.00 - 10.00 WIB";
    if (resepsiDate) resepsiDate.textContent = "SABTU, 12 DESEMBER 2026";
    if (resepsiTime) resepsiTime.textContent = "PUKUL : 11.00 - SELESAI";

    if (elementAlamat) {
      elementAlamat.innerHTML = "Kp. Pekopen Timur<br>Desa LambangJaya<br>Kecamatan Tambun Selatan<br>Kabupaten Bekasi, Jawa Barat";
    }

    if (elementMaps) {
      elementMaps.style.display = "inline-flex"; 
      elementMaps.onclick = function(e) {
        e.preventDefault(); 
        window.open("https://github.io", "_blank"); 
      };
    }

    if (storyImg) {
      storyImg.src = "assets/stry-mn-772v.jpeg"; 
      storyImg.style.display = "block";
    }

    // MENAMPILKAN FOTO BANNER UTAMA SAAT AKSES LEGAL
    if (featuredBanner) {
      featuredBanner.src = "assets/gallery-featured.jpeg"; // <- SUDAH DITAMBAHKAN
      featuredBanner.style.display = "block";
    }

    if (galleryGrid) {
      const listFotoDisamarkan = [
        "assets/gal-v1-92k.jpeg", "assets/gal-v2-11x.jpeg", "assets/gal-v3-84z.jpeg",
        "assets/gal-v4-33m.jpeg", "assets/gal-v5-75p.jpeg", "assets/gal-v6-09r.jpeg"
      ];
      let HTMLKontenGaleri = "";
      listFotoDisamarkan.forEach(function(jalurFoto, index) {
        HTMLKontenGaleri += `
          <div class="gallery-item">
            <img src="${jalurFoto}" alt="Our Moment ${index + 1}" loading="lazy">
          </div>
        `;
      });
      galleryGrid.innerHTML = HTMLKontenGaleri;
    }

    // Suntik Data Rekening Finansial
    if (numBca) numBca.textContent = "087782588635";
    if (holderBca) holderBca.textContent = "UMIYATI HIDAYAH";
    if (btnCopyBca) btnCopyBca.style.display = "inline-block";

    if (numPermata) numPermata.textContent = "04144021652";
    if (holderPermata) holderPermata.textContent = "YUSUP SUPRIADI";
    if (btnCopyPermata) btnCopyPermata.style.display = "inline-block";

    if (closingTitle) closingTitle.textContent = "Umi & Yusup";
    
    if (watermarkText) watermarkText.textContent = "Made by love: Yusup Supriadi";

  } else {
    // JIKA AKSES TANPA PARAMETER / ILLEGAL = KUNCI TOTAL DATA
    if (heroTitle) heroTitle.innerHTML = "<span style='color:red; font-size:24px;'>Akses Terkunci</span>";
    if (heroDate) heroDate.innerHTML = "<span style='color:red;'>Gunakan Tautan Resmi Undangan</span>";
    if (guestElement) guestElement.textContent = "Tamu Tidak Dikenal";
    
    if (btnOpen) {
      btnOpen.disabled = true;
      btnOpen.style.opacity = "0.5";
      btnOpen.style.cursor = "not-allowed";
    }

    if (openingTitle) openingTitle.innerHTML = "<span style='color:red; font-size:20px;'>Terkunci</span>";
    if (openingDate) openingDate.innerHTML = "<span style='color:red;'>Akses Terbatas</span>";
    
    if (akadDate) akadDate.innerHTML = "<span style='color:red;'>Terkunci</span>";
    if (akadTime) akadTime.innerHTML = "<span style='color:red;'>Terkunci</span>";
    if (resepsiDate) resepsiDate.innerHTML = "<span style='color:red;'>Terkunci</span>";
    if (resepsiTime) resepsiTime.innerHTML = "<span style='color:red;'>Terkunci</span>";

    if (elementAlamat) {
      elementAlamat.innerHTML = "<span style='color:red; font-weight:bold;'>Akses Terbatas. Silakan gunakan tautan resmi undangan Anda.</span>";
    }
    if (elementMaps) elementMaps.style.display = "none"; 

    if (brideName) brideName.innerHTML = "<span style='color:red; font-size:16px;'>Data Terkunci</span>";
    if (groomName) groomName.innerHTML = "<span style='color:red; font-size:16px;'>Data Terkunci</span>";
    if (brideParents) brideParents.innerText = "Silakan masuk lewat tautan resmi.";
    if (groomParents) groomParents.innerText = "Silakan masuk lewat tautan resmi.";
    
    if (brideAvatar) { brideAvatar.src = ""; brideAvatar.style.display = "none"; }
    if (groomAvatar) { groomAvatar.src = ""; groomAvatar.style.display = "none"; }
    if (storyImg) { storyImg.src = ""; storyImg.style.display = "none"; }
    if (featuredBanner) { featuredBanner.src = ""; featuredBanner.style.display = "none"; } // <- SUDAH DITAMBAHKAN

    if (galleryGrid) {
      galleryGrid.innerHTML = "<div style='color:red; text-align:center; width:100%; font-weight:bold; grid-column: 1 / -1;'>Galeri Foto Terkunci. Akses Ditolak.</div>";
    }

    if (numBca) numBca.innerHTML = "<span style='color:red;'>Terkunci</span>";
    if (holderBca) holderBca.innerHTML = "<span style='color:red;'>Akses Ditolak</span>";
    if (btnCopyBca) btnCopyBca.style.display = "none";

    if (numPermata) numPermata.innerHTML = "<span style='color:red;'>Terkunci</span>";
    if (holderPermata) holderPermata.innerHTML = "<span style='color:red;'>Akses Ditolak</span>";
    if (btnCopyPermata) btnCopyPermata.style.display = "none";

    if (closingTitle) closingTitle.innerHTML = "<span style='color:red; font-size:20px;'>Terkunci</span>";

    if (watermarkText) watermarkText.textContent = "Wedding Invitation";
  }
});

// Anti-F12 debugger tetap dipertahankan di paling bawah
setInterval(function() {
  debugger;
}, 100);


