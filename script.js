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
// SYSTEM KEAMANAN UNDANGAN WEB - DOUBLE HASH & AES DINAMIS (FINAL COMBAT)
// =================================================================

// 1. OBFUSCATED KEY MATRIKS (PIN mentah Anda @010625uy! aman tidak berwujud plain-text)
const HASH_ADMIN_MASTER = "cb5303dfc8227b9ef895690b2b80455a299d6dbf43de9c16efb5c3ee42ab01e5";
const HASH_TAMU_FALLBACK = "9d737397c768910be3b9eb248e35378fa4fa66c303beec5da866380ad749e798";
const GARAM_VERIFIKASI_TAMU = "weddingumi&yusup";

// 2. BRANKAS CIPHERTEXT UTAMA (Tempel hasil generator.html dengan PIN Anda di sini)
const DATA_TERENKRIPSI_MURNI = "53616c7465645f5f05c8a29b253d8108298d782088bfd029e17d6644f41c3228d5d8fa50fa44f0651ee0933c157e89dccc968a00eea7b4a511ecdd68564d83e4aa9e49341a5520d5e2fcc99c62b9436286d1958e0d9ab3077fcbbb6c30ff21b91f213726b83095ca2be75e294cc909fe066c5f7ed2f1a9b3f66597239bd11b24aa57db7c0e119c3294428f675bbe2b8de3d8f925d4710af38e02540b6bf5f7753d855ee0325b4ce8076f07854a9430e9b98996a762f727f7d866ab52a688369a3f53719719c0d3991d6dfcd606d7016b05a7f8acc9a0cb1502687a1261a59f2930cfecc4db7e5daea5578fc5993b30f9924d1cb8696b8dda3aebb30f6ed1bd663850e165d45cb0d78bbb56d3c15e7562f6aed679d39a967181b85cfdc2af6e88b157e19d129b7277e635b4ac6c78ecf1c59f0eeea7b51218577d4f6e6288d061eed778f8b52f1dcf1d51184235572a32498a09d11edb59ef2be0ca207642b1633638907477b318383a1e32a6063a5462489121b9f44ee272019c3be9ab93294db47df316fdd4318cf052ec61a481905baed33f1e41dbe3769c718e20adfb3399f63abc99cedafc7c267d174b3c26be57a94cb99d8df83e22ee0ed29a2b70e27d89731e2461cca5b8bc3f5ef6b6a3c0d4f6c214665905b4a625ca27ff91b002cbfd13122215d906ed27bf859231b6ee3a4972bee8eaa5ca58c0f9f984eaca377b2f5cb5998979f33314810393a42a020573977bee0030544d5d15ff97a925415d742df4c1130865bd1c92fe60108d65b2bd631783d32a612d51b700154d6811623e1fec41fe6b641c9c1e4824b1a76c97c40a5967d60dcff2ff01aae7e908f427b047e82c3beb9ace662e97384072a8f9b95f8a4fb9dc71e7772e0ef89e8405fa9bac83ddb9a2f3380ad62835a5ead4060a295ca68159831485e859fa8a814e2ac189d51c02861be00d246e25f5f9d8fb65157d1a32eea2944f62a50eb73dfa0bc95ab2a4d9a68c6d7cb4f8093136748aa02047f616f9bc9ef6af1b064a62ddcec3fb1899f68ceb26b36930bfd29268eca133d356a9f103fff39280438333ff119407368dc8f14e220046057739191745fe3f58f0def82984eab169ff07ba5dc3c88c8ab49713db6547698e7542496c366550f11b828dd913e59e11b041a395f45ea3a028c17ee7de30077e02ed24603cef1cd92619910ce069b14b9006f43c2c";

// =========================================================================
// 🔐 PENGAMAN AUTOMATIS KHUSUS HALAMAN ADMIN (SISTEM RE-DECRYPT SESI)
// =========================================================================
if (window.location.pathname.includes('admin.html')) {
  setTimeout(() => {
    const tokenSesiLokal = localStorage.getItem('akses_sah_lokal');
    const adminCard = document.querySelector('.admin-card');

    let sesiValid = false;
    try {
      const bytes = CryptoJS.AES.decrypt(DATA_TERENKRIPSI_MURNI, tokenSesiLokal);
      const teksAsli = bytes.toString(CryptoJS.enc.Utf8);
      if (teksAsli && teksAsli.includes("Umi") && teksAsli.includes("Yusup")) {
        sesiValid = true;
      }
    } catch (e) { 
      sesiValid = false; 
    }

    if (!sesiValid || tokenSesiLokal !== HASH_ADMIN_MASTER) {
      if (adminCard) adminCard.style.display = 'none';
      if (typeof window.tampilkanNotifikasiAdmin === 'function') {
        window.tampilkanNotifikasiAdmin(
          "Akses Terbatas", 
          "Silakan buka halaman utama dan lakukan verifikasi PIN Admin Anda terlebih dahulu.", 
          "🔒", 
          () => { window.location.replace("index.html"); }
        );
      } else {
        window.location.replace("index.html");
      }
    } else {
      if (adminCard) adminCard.style.display = 'block'; 
    }
  }, 100);
}

// =========================================================================
// 📄 LOGIKA CORE INDEKS UTAMA (DOM CONTENT LOADED)
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: false });
  
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
  // A. MESIN ENKRIPSI, DEKRIPSI & SANITASI DATA KEAMANAN
  async function hitungHashSHA256(teks) {
    const msgBuffer = new TextEncoder().encode(teks);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('').toLowerCase(); 
  }

  function bongkarDataDenganKunciHash(kunciHash) {
    try {
      const bytes = CryptoJS.AES.decrypt(DATA_TERENKRIPSI_MURNI, kunciHash);
      const teksAsli = bytes.toString(CryptoJS.enc.Utf8);
      if (!teksAsli) return null;
      return JSON.parse(teksAsli);
    } catch (e) {
      return null;
    }
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

  // B. PROSES VERIFIKASI PIN ADMINISTRATOR (VERSI FIXED ANTI-LOCKDOWN)
  async function prosesVerifikasiPIN() {
    if (!modalPinInput || sedangDikunci) return;
    
    const pinKunciUser = modalPinInput.value.trim();
    const hashInputUser = await hitungHashSHA256(pinKunciUser);
    
    // Uji coba membongkar data menggunakan hash inputan
    const dataHasilDekripsi = bongkarDataDenganKunciHash(hashInputUser);
    
    if (dataHasilDekripsi !== null && hashInputUser === HASH_ADMIN_MASTER) {
      salahHitung = 0; 
      
      // Mengunci sesi validasi agar tidak buyar saat validasi ulang
      localStorage.setItem('akses_sah_lokal', HASH_ADMIN_MASTER); 
      localStorage.setItem('guest_original_name', 'Admin Owner'); 
      localStorage.removeItem('security_breach_detected'); 
      
      periksaRiwayatBlokir();
      
      if (securityModal) securityModal.classList.remove('active');
      
      // 🔥 FIX UTAMA: Pulihkan layar secara instan tanpa reload agar state memory tidak hilang
      document.body.style.overflow = "auto"; 
      document.body.style.height = "auto";
      
      // Langsung buka gembok visual komponen web secara paksa
      bukaUndanganNormal();
      suntikDataPrivasiSah(dataHasilDekripsi, 'Admin Owner');
      
    } else {
      salahHitung++;
      if (salahHitung >= 3) {
        sedangDikunci = true; 
        localStorage.setItem('security_breach_detected', 'true'); 
        periksaRiwayatBlokir();
        if (modalNormalState) modalNormalState.style.display = "none"; 
        if (modalLockedState) modalLockedState.style.display = "block";
        setTimeout(() => { 
          sedangDikunci = false; 
          salahHitung = 0; 
          if (modalNormalState) modalNormalState.style.display = "block"; 
          if (modalLockedState) modalLockedState.style.display = "none"; 
          modalPinInput.value = ""; 
          modalPinInput.focus(); 
        }, waktuBlokirDasar * 1000);
      } else { 
        if (modalErrorMessage) modalErrorMessage.innerText = `PIN Salah! (${salahHitung}/3)`; 
        modalPinInput.value = ""; 
        modalPinInput.focus(); 
      }
    }
  }

  // E. FUNGSI PENAMPIL DATA PRIVASI (DATA DIINJEKSI DARI OBJEK DEKRIPSI BUKAN TEKS POLOS)
  function suntikDataPrivasiSah(dataBongkar, namaTamuSah) {
    if (!dataBongkar) return kunciTotalDataPrivasi();

    try {
      if (heroTitle) heroTitle.textContent = dataBongkar.judulHero || "Umi & Yusup";
      if (heroDate) heroDate.textContent = dataBongkar.tanggalHero || "SABTU, 12 DESEMBER 2026";
      if (guestElement) guestElement.innerHTML = bersihkanTeks(namaTamuSah);
      sinkronkanNamaRSVP(namaTamuSah);
      
      if (openingTitle) openingTitle.textContent = dataBongkar.judulOpening || "UMI & YUSUP";
      if (openingDate) openingDate.textContent = dataBongkar.tanggalOpening || "SABTU, 12 DESEMBER 2026";
      
      if (closingTitle) closingTitle.textContent = dataBongkar.judulClosing || "Umi & Yusup"; 
      if (watermarkText) watermarkText.textContent = dataBongkar.watermark || "Made by love: Yusup Supriadi";

      if (brideName) brideName.textContent = dataBongkar.namaWanita || "Umiyati Hidayah";
      if (brideParents) brideParents.innerHTML = dataBongkar.ortuWanita || "Putri pertama dari<br>Bapak Tutu<br>dan Ibu Rita Anggraini";
      if (brideAvatar) { brideAvatar.src = "assets/mempelai-wanita.jpeg"; brideAvatar.style.display = "block"; }
      
      if (groomName) groomName.textContent = dataBongkar.namaPria || "Yusup Supriadi, S.Kom.";
      if (groomParents) groomParents.innerHTML = dataBongkar.ortuPria || "Putra ketiga dari<br>Bapak Ood<br>dan Ibu Enok Rohana";
      if (groomAvatar) { groomAvatar.src = "assets/mempelai-pria.jpeg"; groomAvatar.style.display = "block"; }
      
      if (akadDate) akadDate.textContent = dataBongkar.tglAkad || "SABTU, 12 DESEMBER 2026";
      if (akadTime) akadTime.textContent = dataBongkar.jamAkad || "PUKUL : 09.00 - 10.00 WIB";
      if (resepsiDate) resepsiDate.textContent = dataBongkar.tglResepsi || "SABTU, 12 DESEMBER 2026";
      if (resepsiTime) resepsiTime.textContent = dataBongkar.jamResepsi || "PUKUL : 11.00 - SELESAI";
      
      if (elementLocName) elementLocName.textContent = dataBongkar.namaLokasi || "Kediaman Mempelai Wanita";
      if (elementAlamat) elementAlamat.innerHTML = dataBongkar.alamatLengkap || "Kp. Pekopen Timur<br>Desa LambangJaya<br>Kecamatan Tambun Selatan<br>Kabupaten Bekasi, Jawa Barat";
      
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

      if (numBca) numBca.textContent = dataBongkar.rekBca || "087782588635"; 
      if (holderBca) holderBca.textContent = dataBongkar.pemilikBca || "UMIYATI HIDAYAH"; 
      if (btnCopyBca) btnCopyBca.style.display = "inline-block";
      
      if (numPermata) numPermata.textContent = dataBongkar.rekPermata || "04144021652"; 
      if (holderPermata) holderPermata.textContent = dataBongkar.pemilikPermata || "YUSUP SUPRIADI"; 
      if (btnCopyPermata) btnCopyPermata.style.display = "inline-block";
      
      const avatarClosing = document.getElementById("avatar-closing");
      if (avatarClosing) { avatarClosing.src = "assets/bg-closing.jpeg"; avatarClosing.style.display = "block"; }

    } catch (error) {
      kunciTotalDataPrivasi();
    }
  }

  function kunciTotalDataPrivasi() {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    
    if (heroTitle) heroTitle.innerHTML = "<span style='color:red;'>Akses Terkunci</span>";
    if (heroDate) heroDate.innerHTML = "<span style='color:red;'>Gunakan Tautan Resmi</span>";
    if (guestElement) guestElement.textContent = "Tamu Tidak Dikenal";
    if (btnOpen) { btnOpen.disabled = true; btnOpen.style.opacity = "0.5"; }
    if (openingTitle) openingTitle.innerHTML = "<span>Terkunci</span>";
    if (elementAlamat) elementAlamat.innerHTML = "<span style='color:red;'>Akses Terbatas. Gunakan tautan resmi undangan Anda.</span>";
    if (elementMaps) elementMaps.style.display = "none"; 
    if (brideAvatar) brideAvatar.style.display = "none"; 
    if (groomAvatar) groomAvatar.style.display = "none";
    if (galleryGrid) galleryGrid.innerHTML = "<div style='color:red; text-align:center; width:100%; font-weight:bold;'>Galeri Foto Terkunci.</div>";
    if (btnCopyBca) btnCopyBca.style.display = "none"; 
    if (btnCopyPermata) btnCopyPermata.style.display = "none";
    
    const wishesForm = document.getElementById('wishesForm');
    if (wishesForm) {
      const elements = wishesForm.elements;
      for (let i = 0; i < elements.length; i++) { elements[i].disabled = true; }
    }
  }

  function bukaUndanganNormal() { window.history.replaceState({}, document.title, window.location.pathname); document.body.style.overflow = "auto"; document.body.style.height = "auto"; }

  // D. PEMILAH LOGIKA OTOMATIS SAAT HALAMAN DI-LOAD
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to') || urlParams.get('To') || urlParams.get('TO');
  const vParam = urlParams.get('v'), typeParam = urlParams.get('type') || 'pribadi';
  const tokenLokal = localStorage.getItem('akses_sah_lokal');
  const savedOriginalName = localStorage.getItem('guest_original_name');
  
  let dataSesiBypass = (tokenLokal === HASH_ADMIN_MASTER) ? bongkarDataDenganKunciHash(HASH_ADMIN_MASTER) : null;
  const isAdminBypass = (dataSesiBypass !== null);

  if (guestParam) {
    const decodedName = decodeURIComponent(guestParam.replace(/\+/g, ' '));
    if (decodedName.toLowerCase().trim() === "admin owner") {
      if (!isAdminBypass) { alert("Akses Terbatas! Silakan masukkan PIN Admin Owner Anda."); aktifkanLockdownTotal(); return; }
      if (guestElement) guestElement.innerText = "Admin Owner";
      suntikDataPrivasiSah(dataSesiBypass, "Admin Owner");
      return; 
    }

    if (isAdminBypass) { suntikDataPrivasiSah(dataSesiBypass, decodedName); return; }

    if (typeParam === 'cetak') {
      if (!vParam) {
        kunciTotalDataPrivasi();
        aktifkanLockdownTotal();
      } else {
        const namaFormatKecil = decodedName.toLowerCase().trim();
        hitungHashSHA256(namaFormatKecil + GARAM_VERIFIKASI_TAMU).then((hashNamaCetak) => {
          if (hashNamaCetak === vParam.toLowerCase().trim()) {
            const dataSajiCetak = bongkarDataDenganKunciHash(HASH_TAMU_FALLBACK);
            localStorage.setItem('guest_original_name', decodedName); 
            suntikDataPrivasiSah(dataSajiCetak, decodedName); 
            bukaUndanganNormal();
          } else {
            kunciTotalDataPrivasi();
            aktifkanLockdownTotal();
          }
        });
      }
    }
    else if (typeParam === 'wa' && vParam) {
      const waVerifyModal = document.getElementById('waVerifyModal'), waVerifyInput = document.getElementById('waVerifyInput');
      const waVerifyError = document.getElementById('waVerifyError'), btnWaConfirm = document.getElementById('btnWaConfirm');
      let salahHitungWA = 0;
      
      if (waVerifyModal) {
        waVerifyModal.classList.add('active'); document.body.style.overflow = "hidden"; if (waVerifyInput) waVerifyInput.focus();
        
        btnWaConfirm.onclick = async () => {
          const digits = waVerifyInput.value.trim().replace(/\D/g, '');
          const namaFormatKecil = decodedName.toLowerCase().trim();
          const hashUserText = await hitungHashSHA256(namaFormatKecil + digits);
          
          if (hashUserText === vParam.toLowerCase().trim()) {
            const dataSajiWA = bongkarDataDenganKunciHash(HASH_TAMU_FALLBACK);
            localStorage.setItem('guest_original_name', decodedName);
            waVerifyModal.classList.remove('active'); 
            suntikDataPrivasiSah(dataSajiWA, decodedName); 
            bukaUndanganNormal();
          } else {
            salahHitungWA++; 
            if (salahHitungWA >= 3) { 
              waVerifyModal.classList.remove('active'); 
              localStorage.setItem('security_breach_detected', 'true'); 
              periksaRiwayatBlokir(); 
              kunciTotalDataPrivasi(); 
              aktifkanLockdownTotal(); 
            }
            else if (waVerifyError) waVerifyError.innerText = `Identitas salah atau tautan telah dimodifikasi! Sisa: ${3 - salahHitungWA}`;
          }
        };
      }
    } else { kunciTotalDataPrivasi(); aktifkanLockdownTotal(); }
  } else {
    if (isAdminBypass && savedOriginalName) { 
      suntikDataPrivasiSah(dataSesiBypass, savedOriginalName); 
      bukaUndanganNormal();
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
      e.preventDefault(); 
      const namaAsliTerkunci = localStorage.getItem('guest_original_name') || "Tamu Undangan";
      const inputNamaForm = document.getElementById('guestName');
      if (inputNamaForm) inputNamaForm.value = namaAsliTerkunci; 
      
      document.getElementById('rsvpSuccessModal')?.classList.add('active'); 
      wishesForm.reset();
      
      const dataSesiSubmit = (tokenLokal === HASH_ADMIN_MASTER) ? bongkarDataDenganKunciHash(HASH_ADMIN_MASTER) : bongkarDataDenganKunciHash(HASH_TAMU_FALLBACK);
      suntikDataPrivasiSah(dataSesiSubmit, namaAsliTerkunci);
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
