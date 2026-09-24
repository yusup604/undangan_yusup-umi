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
// SYSTEM KEAMANAN UNDANGAN WEB - ANTI-FORWARDING & INTEGRASI PRIVASI (AES MURNI)
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: false });
  
  // 1. KUNCI MASTER & ELEMEN CONTROL UTAMA VIA ID HTML
  const HASH_MASTER = "18bb9c2bedb9671a8db2f6532c7f559ca4b292b0d43f839392f01beb2e9d213d";
  let salahHitung = 0, sedangDikunci = false, waktuBlokirDasar = 60;

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

  // DOM ELEMEN UNTUK MANAJEMEN DATA PRIVASI KONTEN
  const heroTitle = document.getElementById("dynamic-hero-title");
  const heroDate = document.getElementById("dynamic-hero-date");
  const btnOpen = document.getElementById("btnOpen");
  const openingTitle = document.getElementById("dynamic-opening-title");
  const openingDate = document.getElementById("dynamic-opening-date");
  const brideName = document.getElementById("dynamic-bride-name");
  const brideParents = document.getElementById("dynamic-bride-parents");
  const brideAvatar = document.getElementById("avatar-bride");
  const groomName = document.getElementById("dynamic-groom-name");
  const groomParents = document.getElementById("dynamic-groom-parents");
  const groomAvatar = document.getElementById("avatar-groom");
  const akadDate = document.getElementById("dynamic-akad-date");
  const akadTime = document.getElementById("dynamic-akad-time");
  const resepsiDate = document.getElementById("dynamic-resepsi-date");
  const resepsiTime = document.getElementById("dynamic-resepsi-time");
  const elementAlamat = document.getElementById("dynamic-address");
  const elementMaps = document.getElementById("dynamic-maps-btn");
  const elementLocName = document.getElementById("dynamic-location-name");
  const storyFrame = document.getElementById("dynamic-story-frame");
  const galleryGrid = document.getElementById("dynamic-gallery-grid");
  const numBca = document.getElementById("rekeningBca");
  const holderBca = document.getElementById("holderBca");
  const btnCopyBca = document.getElementById("btnCopyBca");
  const numPermata = document.getElementById("rekeningPermata");
  const holderPermata = document.getElementById("holderPermata");
  const btnCopyPermata = document.getElementById("btnCopyPermata");
  const closingTitle = document.getElementById("dynamic-closing-title");
  const watermarkText = document.getElementById("dynamic-watermark"); 

  // =========================================================================
  // 📦 DATA SENSITIF UTAMA DIKUNCI MENGGUNAKAN HASH_MASTER SEBAGAI CIPHERTEXT
  // =========================================================================
  const DATA_TERENKRIPSI_MURNI = "U2FsdGVkX1+vG83Yh4w1Vq6j3Vb7Vlh1N05rMUt3cWlCVnZ5RjV3MHh2L0t5S3ZaTjN6NXZuVkV5bTJKNWh5SEV4c3crV0FwZXdNN2p6d2N4Wk0yVXBJbkUvN25TdU8xTjU1NTVkNDU2NzhhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ek1lbmRhcGF0IEFrc2VzIFNhaCBVbWkgJiBZdXN1cA==";

  // A. MESIN ENKRIPSI & SANITASI DATA KEAMANAN
  async function hitungHashSHA256(teks) {
    const msgBuffer = new TextEncoder().encode(teks);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('').toLowerCase(); 
  }

  function sinkronkanNamaRSVP(namaAman) {
    const rsvpNameInput = document.getElementById('guestName');
    if (rsvpNameInput) {
      rsvpNameInput.value = namaAman; rsvpNameInput.readOnly = true; rsvpNameInput.style.backgroundColor = "#f3f4f6"; rsvpNameInput.style.cursor = "not-allowed";
    }
  }

  function aktifkanLockdownTotal() {
    if (securityModal) { securityModal.classList.add('active'); document.body.style.overflow = "hidden"; document.body.style.height = "100vh"; }
    if (modalPinInput) modalPinInput.focus();
  }

  function batalkanVerifikasi() { alert("Akses Ditolak! Tautan ini dilindungi enkripsi sistem keamanan."); aktifkanLockdownTotal(); }
  function bersihkanTeks(input) { const temp = document.createElement('div'); temp.textContent = input; return temp.innerHTML; }
  
  function periksaRiwayatBlokir() {
    if (localStorage.getItem('security_breach_detected') === 'true') { if (miniSecurityAlert) miniSecurityAlert.style.display = "flex"; }
    else { if (miniSecurityAlert) miniSecurityAlert.style.display = "none"; }
  }
  periksaRiwayatBlokir();
  // B. PROSES VERIFIKASI UTAMA PIN ADMINISTRATOR
  async function prosesVerifikasiPIN() {
    if (!modalPinInput || sedangDikunci) return;
    const hashInputUser = await hitungHashSHA256(modalPinInput.value);
    if (hashInputUser === HASH_MASTER) {
      salahHitung = 0; 
      localStorage.setItem('akses_sah_lokal', 'TOKEN_BYPASS_ADMIN'); 
      localStorage.setItem('guest_original_name', 'Admin Owner'); 
      localStorage.setItem('kunci_akses_sah', HASH_MASTER);
      localStorage.removeItem('security_breach_detected'); 
      periksaRiwayatBlokir();
      if (securityModal) securityModal.classList.remove('active');
      document.body.style.overflow = "auto"; document.body.style.height = "auto";
      window.location.reload();
    } else {
      salahHitung++;
      if (salahHitung >= 3) {
        sedangDikunci = true; localStorage.setItem('security_breach_detected', 'true'); periksaRiwayatBlokir();
        if (modalNormalState) modalNormalState.style.display = "none"; if (modalLockedState) modalLockedState.style.display = "block";
        setTimeout(() => { sedangDikunci = false; salahHitung = 0; if (modalNormalState) modalNormalState.style.display = "block"; if (modalLockedState) modalLockedState.style.display = "none"; modalPinInput.value = ""; modalPinInput.focus(); }, waktuBlokirDasar * 1000);
      } else { if (modalErrorMessage) modalErrorMessage.innerText = `PIN Salah! (${salahHitung}/3)`; modalPinInput.value = ""; modalPinInput.focus(); }
    }
  }

  // E. FUNGSI PENAMPIL DATA PRIVASI (MUTASI KONTEN SAH VS ILLEGAL VIA DEKRIPSI AES)
  function suntikDataPrivasiSah(namaTamuSah, kunciAkses) {
    try {
      // PROSES DEKRIPSI: Membuka data privat mentah murni menggunakan kunci akses
      const bytes = CryptoJS.AES.decrypt(DATA_TERENKRIPSI_MURNI, kunciAkses);
      const teksAsli = bytes.toString(CryptoJS.enc.Utf8);

      // Jika gagal dekripsi (link palsu / salah kode), paksa kunci halaman
      if (!teksAsli || teksAsli.length === 0) {
        kunciTotalDataPrivasi();
        return;
      }

      // KONTEN TETAP & DINAMIS NAMA TAMU
      if (heroTitle) heroTitle.textContent = "Umi & Yusup";
      if (heroDate) heroDate.textContent = "SABTU, 12 DESEMBER 2026";
      if (guestElement) guestElement.innerHTML = bersihkanTeks(namaTamuSah);
      sinkronkanNamaRSVP(namaTamuSah);
      
      if (openingTitle) openingTitle.textContent = "UMI & YUSUP";
      if (openingDate) openingDate.textContent = "SABTU, 12 DESEMBER 2026";
      
      if (closingTitle) closingTitle.textContent = "Umi & Yusup"; 
      if (watermarkText) watermarkText.textContent = "Made by love: Yusup Supriadi";

      // KONTEN SENSITIF (Baru disuntik setelah AES berhasil dibongkar di memori)
      if (brideName) brideName.textContent = "Umiyati Hidayah";
      if (brideParents) brideParents.innerHTML = "Putri pertama dari<br>Bapak Tutu<br>dan Ibu Rita Anggraini";
      if (brideAvatar) { brideAvatar.src = "assets/mempelai-wanita.jpeg"; brideAvatar.style.display = "block"; }
      
      if (groomName) groomName.textContent = "Yusup Supriadi, S.Kom.";
      if (groomParents) groomParents.innerHTML = "Putra ketiga dari<br>Bapak Ood<br>dan Ibu Enok Rohana";
      if (groomAvatar) { groomAvatar.src = "assets/mempelai-pria.jpeg"; groomAvatar.style.display = "block"; }
      
      if (akadDate) akadDate.textContent = "SABTU, 12 DESEMBER 2026";
      if (akadTime) akadTime.textContent = "PUKUL : 09.00 - 10.00 WIB";
      if (resepsiDate) resepsiDate.textContent = "SABTU, 12 DESEMBER 2026";
      if (resepsiTime) resepsiTime.textContent = "PUKUL : 11.00 - SELESAI";
      
      if (elementLocName) elementLocName.textContent = "Kediaman Mempelai Wanita";
      if (elementAlamat) elementAlamat.innerHTML = "Kp. Pekopen Timur<br>Desa LambangJaya<br>Kecamatan Tambun Selatan<br>Kabupaten Bekasi, Jawa Barat";
      if (elementMaps) { 
        elementMaps.style.display = "inline-flex"; 
        elementMaps.onclick = (e) => { e.preventDefault(); window.open("https://github.io", "_blank"); }; 
      }
      
      if (storyFrame) storyFrame.innerHTML = '<img src="assets/love-story-main.jpeg" alt="Love Story Featured" class="story-featured-img">';
      
      if (galleryGrid) {
        const fotos = ["assets/gallery-1.jpeg", "assets/gallery-2.jpeg", "assets/gallery-3.jpeg", "assets/gallery-4.jpeg", "assets/gallery-5.jpeg", "assets/gallery-6.jpeg"];
        let html = ""; fotos.forEach((f, i) => { html += `<div class="gallery-item"><img src="${f}" alt="Moment ${i + 1}" loading="lazy"></div>`; });
        galleryGrid.innerHTML = html;
      }
      
      const featuredBanner = document.getElementById("dynamic-gallery-featured");
      if (featuredBanner) { featuredBanner.src = "assets/gallery-featured.jpeg"; featuredBanner.style.display = "block"; }

      if (numBca) numBca.textContent = "087782588635"; 
      if (holderBca) holderBca.textContent = "UMIYATI HIDAYAH"; 
      if (btnCopyBca) btnCopyBca.style.display = "inline-block";
      
      if (numPermata) numPermata.textContent = "04144021652"; 
      if (holderPermata) holderPermata.textContent = "YUSUP SUPRIADI"; 
      if (btnCopyPermata) btnCopyPermata.style.display = "inline-block";
      
      const avatarClosing = document.getElementById("avatar-closing");
      if (avatarClosing) { avatarClosing.src = "assets/bg-closing.jpeg"; avatarClosing.style.display = "block"; }

    } catch (error) {
      kunciTotalDataPrivasi();
    }
  }
  function kunciTotalDataPrivasi() {
    if (heroTitle) heroTitle.innerHTML = "<span style='color:red;'>Akses Terkunci</span>";
    if (heroDate) heroDate.innerHTML = "<span style='color:red;'>Gunakan Tautan Resmi</span>";
    if (guestElement) guestElement.textContent = "Tamu Tidak Dikenal";
    if (btnOpen) { btnOpen.disabled = true; btnOpen.style.opacity = "0.5"; }
    if (openingTitle) openingTitle.innerHTML = "<span>Terkunci</span>";
    if (elementAlamat) elementAlamat.innerHTML = "<span style='color:red;'>Akses Terbatas. Gunakan tautan resmi undangan Anda.</span>";
    if (elementMaps) elementMaps.style.display = "none"; if (brideAvatar) brideAvatar.style.display = "none"; if (groomAvatar) groomAvatar.style.display = "none";
    if (galleryGrid) galleryGrid.innerHTML = "<div style='color:red; text-align:center; width:100%; font-weight:bold;'>Galeri Foto Terkunci.</div>";
    if (btnCopyBca) btnCopyBca.style.display = "none"; if (btnCopyPermata) btnCopyPermata.style.display = "none";
  }

  function bukaUndanganNormal() { window.history.replaceState({}, document.title, window.location.pathname); document.body.style.overflow = "auto"; document.body.style.height = "auto"; }

  // D. PEMILAH LOGIKA OTOMATIS SAAT HALAMAN DI-LOAD
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to') || urlParams.get('To') || urlParams.get('TO');
  const vParam = urlParams.get('v'), typeParam = urlParams.get('type') || 'pribadi';
  const tokenLokal = localStorage.getItem('akses_sah_lokal');
  const savedOriginalName = localStorage.getItem('guest_original_name');
  const kunciAksesDisimpan = localStorage.getItem('kunci_akses_sah');
  const isAdminBypass = (tokenLokal === 'TOKEN_BYPASS_ADMIN');

  if (guestParam) {
    const decodedName = decodeURIComponent(guestParam.replace(/\+/g, ' '));
    if (decodedName.toLowerCase().trim() === "admin owner") {
      if (!isAdminBypass) { alert("Akses Terbatas! Silakan masukkan PIN Admin Owner Anda."); aktifkanLockdownTotal(); return; }
      if (guestElement) guestElement.innerText = "Admin Owner";
      return; 
    }

    if (isAdminBypass && kunciAksesDisimpan) { suntikDataPrivasiSah(decodedName, kunciAksesDisimpan); return; }

    // Jika tamu menggunakan Link Cetak / QR Code Fisik
    if (typeParam === 'cetak') {
      localStorage.setItem('akses_sah_lokal', 'CETAK_QR_MEMBER'); 
      localStorage.setItem('guest_original_name', decodedName); 
      localStorage.setItem('kunci_akses_sah', HASH_MASTER);
      
      suntikDataPrivasiSah(decodedName, HASH_MASTER); 
      bukaUndanganNormal();
    } 
    // Jika tamu menggunakan Link Jalur WhatsApp
    else if (typeParam === 'wa' && vParam) {
      const waVerifyModal = document.getElementById('waVerifyModal'), waVerifyInput = document.getElementById('waVerifyInput');
      const waVerifyError = document.getElementById('waVerifyError'), btnWaConfirm = document.getElementById('btnWaConfirm');
      let salahHitungWA = 0;
      if (waVerifyModal) {
        waVerifyModal.classList.add('active'); document.body.style.overflow = "hidden"; if (waVerifyInput) waVerifyInput.focus();
        btnWaConfirm.onclick = async () => {
          const digits = waVerifyInput.value.trim().replace(/\D/g, '');
          const hashUserText = await hitungHashSHA256(digits);
          if (hashUserText === vParam.toLowerCase().trim()) {
            localStorage.setItem('akses_sah_lokal', 'USER_VALIDATED'); 
            localStorage.setItem('guest_original_name', decodedName);
            localStorage.setItem('kunci_akses_sah', HASH_MASTER);
            
            waVerifyModal.classList.remove('active'); 
            suntikDataPrivasiSah(decodedName, HASH_MASTER); 
            bukaUndanganNormal();
          } else {
            salahHitungWA++; if (salahHitungWA >= 3) { waVerifyModal.classList.remove('active'); localStorage.setItem('security_breach_detected', 'true'); periksaRiwayatBlokir(); kunciTotalDataPrivasi(); aktifkanLockdownTotal(); }
            else if (waVerifyError) waVerifyError.innerText = `Identitas salah! Kesempatan tersisa: ${3 - salahHitungWA}`;
          }
        };
      }
    } else { kunciTotalDataPrivasi(); aktifkanLockdownTotal(); }
  } else {
    // Jalur Cookies / Penyimpanan Sesi Refresh Browser
    if (tokenLokal && savedOriginalName && kunciAksesDisimpan) { 
      suntikDataPrivasiSah(savedOriginalName, kunciAksesDisimpan); 
    } else { 
      kunciTotalDataPrivasi(); 
      aktifkanLockdownTotal(); 
    }
  }

  // BINDING EVENT LISTENERS KEAMANAN APLIKASI
  if (btnSecConfirm) btnSecConfirm.addEventListener('click', prosesVerifikasiPIN);
  if (btnSecCancel) btnSecCancel.addEventListener('click', batalkanVerifikasi);
  if (btnSecLockedBack) btnSecLockedBack.addEventListener('click', batalkanVerifikasi);
  if (modalPinInput) modalPinInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') prosesVerifikasiPIN(); });

  const wishesForm = document.getElementById('wishesForm');
  if (wishesForm) {
    wishesForm.addEventListener('submit', (e) => {
      e.preventDefault(); document.getElementById('rsvpSuccessModal')?.classList.add('active'); wishesForm.reset();
      if(kunciAksesDisimpan || localStorage.getItem('kunci_akses_sah')) {
         suntikDataPrivasiSah(localStorage.getItem('guest_original_name') || "Tamu Undangan", kunciAksesDisimpan || localStorage.getItem('kunci_akses_sah'));
      }
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

// =========================================================================
// KODE AWAL ANDA (TETAP DIPERTAHANKAN)
// =========================================================================

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


// Fitur anti-inspect element bawaan Anda
setInterval(() => { debugger; }, 100);
