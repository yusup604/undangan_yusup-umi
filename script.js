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
// KODE UTAMA SECURITY SYSTEM ANTI-FORWARD LOKAL (MUTAKHIR & STABIL)
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOCKING INTEGRASI KUNCI MASTER UTAMA (SHA-256)
  const HASH_MASTER = "0d08c39a651f01f1316c9c63ba9d2ddefdae09fe18840f4882ba437b85230952";

  let salahHitung = 0;
  let sedangDikunci = false;
  let targetCleanedName = "";
  let waktuBlokirDasar = 60; 
  let faktorPengali = 1;

  // Binding Seluruh Dokumen Elemen Modal & Tamu
  const securityModal = document.getElementById('securityModal');
  const modalNormalState = document.getElementById('modalNormalState');
  const modalLockedState = document.getElementById('modalLockedState');
  const modalPinInput = document.getElementById('modalPinInput');
  const modalErrorMessage = document.getElementById('modalErrorMessage');
  const btnSecConfirm = document.getElementById('btnSecConfirm');
  const btnSecCancel = document.getElementById('btnSecCancel');
  const btnSecLockedBack = document.getElementById('btnSecLockedBack');
  const guestElement = document.getElementById('guest-name');

  // A. FUNGSI HASH SHA-256 MURNI
  async function hitungHashSHA256(teks) {
    const msgBuffer = new TextEncoder().encode(teks);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

    // B. PENGUNCIAN INPUT FORM RSVP
  function sinkronkanNamaRSVP(namaAman) {
    const rsvpNameInput = document.getElementById('guestName');
    if (rsvpNameInput) {
      rsvpNameInput.value = namaAman;
      rsvpNameInput.readOnly = true; 
      rsvpNameInput.style.backgroundColor = "#f3f4f6"; 
      rsvpNameInput.style.cursor = "not-allowed";
    }
  }

  // C. LOCKDOWN TOTAL AKURAT
  function aktifkanLockdownTotal() {
    if (securityModal) {
      securityModal.classList.add('active');
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    }
    if (modalPinInput) modalPinInput.focus();
  }

  // D. PENANGANAN TEGAS TOMBOL BATAL BYPASS (DIKUNCI MATI)
  function batalkanVerifikasi() {
    alert("Akses Ditolak! Halaman dilindungi sistem enkripsi privasi.");
    aktifkanLockdownTotal(); 
  }

  // E. EVALUASI VERIFIKASI PIN MASTER (ADMIN & TAMU) - FIXED LOGIC
  async function prosesVerifikasiPIN() {
    if (!modalPinInput || sedangDikunci) return;
    const inputUser = modalPinInput.value;
    const hashInputUser = await hitungHashSHA256(inputUser);

    if (hashInputUser === HASH_MASTER) {
      salahHitung = 0;
      faktorPengali = 1;
      
      const currentParams = new URLSearchParams(window.location.search);
      if (currentParams.get('mode') === 'admin') {
        localStorage.setItem('admin_verified_device', 'SAH_STATUS_ADMIN');
        alert("Akses Admin Terverifikasi! Sistem akan mengingat perangkat Anda.");
        window.location.reload(); 
        return;
      }

      // 🔥 PERBAIKAN UTAMA: Amankan dan bersihkan modal secara instan dan agresif terlebih dahulu
      if (modalErrorMessage) modalErrorMessage.style.display = "none";
      if (securityModal) securityModal.classList.remove('active');
      
      // Kembalikan fungsi scroll layar secara mutlak
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
      
      // Simpan status kelulusan lokal tamu
      localStorage.setItem('akses_sah_lokal', 'TOKEN_BYPASS_ADMIN');
      
      // Picu pop-up sukses kustom bawaan Anda jika ada elemennya di HTML
      const verifiedSuccessModal = document.getElementById('verifiedSuccessModal');
      if (verifiedSuccessModal) {
        verifiedSuccessModal.classList.add('active');
      }
      
      // Terakhir, jalankan penyegar animasi secara aman tanpa memblokir alur penutupan modal
      try {
        segarkanAnimasiVisual();
      } catch(e) {
        console.warn("AOS refresh tertunda, namun akses tetap dibuka.");
      }
      
    } else {
      salahHitung++;
      if (salahHitung >= 3) {
        sedangDikunci = true;
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
      }
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to');
  const vParam = urlParams.get('v'); 
  const typeParam = urlParams.get('type') || 'pribadi';
  const modeParam = urlParams.get('mode');

  // 🌟 MODUL PANEL GENERATOR INTERAKTIF BARU KHUSUS ADMIN (Akses via /index.html?mode=admin)
  if (modeParam === 'admin') {
    const isAlreadyAdmin = localStorage.getItem('admin_verified_device');
    if (isAlreadyAdmin !== 'SAH_STATUS_ADMIN') {
      alert("Akses Terbatas! Mohon masukkan PIN Keamanan Admin Anda untuk memverifikasi perangkat.");
      aktifkanLockdownTotal(); 
      return;
    }

    document.body.innerHTML = `
      <div style="font-family:sans-serif; padding:40px; background:#f0f2f5; min-height:100vh; display:flex; justify-content:center; align-items:center;">
        <div style="background:white; padding:35px; border-radius:14px; box-shadow:0 15px 35px rgba(0,0,0,0.08); width:100%; max-width:480px;">
          <h2 style="margin-top:0; color:#1e293b; text-align:center; border-bottom:2px solid #f1f5f9; padding-bottom:15px;">Admin URL Generator Control Panel</h2>
          <div style="margin:20px 0;">
            <label style="font-weight:bold; font-size:14px; color:#475569;">1. Pilih Jalur Distribusi Undangan:</label>
            <div style="display:flex; gap:10px; margin-top:8px;">
              <button id="tabWA" style="flex:1; padding:10px; border-radius:6px; border:2px solid #25d366; background:#e8fced; color:#0e622b; font-weight:bold; cursor:pointer;">📲 Jalur WhatsApp Digital</button>
              <button id="tabCetak" style="flex:1; padding:10px; border-radius:6px; border:2px solid #64748b; background:#f8fafc; color:#334155; font-weight:bold; cursor:pointer;">🖨️ Jalur Undangan Cetak (QR)</button>
            </div>
          </div>
          <label style="font-weight:bold; font-size:14px; color:#475569;">2. Nama Tamu / Komunitas:</label>
          <input type="text" id="admNama" placeholder="Contoh: Yuliana Putri" style="width:100%; padding:12px; margin:8px 0 15px 0; border:1px solid #cbd5e1; border-radius:6px; box-sizing:border-box;">
          <div id="wrapperWAInput">
            <label style="font-weight:bold; font-size:14px; color:#475569;">3. Tempel Kontak / Nomor HP WhatsApp:</label>
            <input type="text" id="admWA" placeholder="Contoh: 081234567890 atau tempel profil WA" style="width:100%; padding:12px; margin:8px 0 15px 0; border:1px solid #cbd5e1; border-radius:6px; box-sizing:border-box;">
          </div>
          <button id="btnGen" style="width:100%; background:#25d366; color:white; border:none; padding:14px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:16px; margin-top:10px; box-shadow:0 4px 12px rgba(37,211,102,0.2);">Generate & Siapkan Akses</button>
          <div id="admHasil" style="margin-top:25px; background:#f8fafc; padding:15px; border-left:4px solid #25d366; word-break:break-all; display:none; border-radius:0 8px 8px 0;">
            <strong id="labelHasil" style="font-size:13px; color:#334155;">Link Lengkap Berhasil Dibuat:</strong><br>
            <textarea id="txtHasil" readonly style="width:100%; height:60px; margin-top:8px; border:1px solid #e2e8f0; background:#ffffff; font-family:monospace; font-size:13px; padding:8px; box-sizing:border-box; resize:none; color:#0f766e;"></textarea>
            <button id="btnActionEkstra" style="width:100%; margin-top:10px; padding:8px; border-radius:4px; border:none; font-weight:bold; cursor:pointer; display:none;"></button>
          </div>
        </div>
      </div>
    `;
    
    let activeMode = "wa";
    const tabWA = document.getElementById('tabWA');
    const tabCetak = document.getElementById('tabCetak');
    const wrapperWAInput = document.getElementById('wrapperWAInput');
    const btnGen = document.getElementById('btnGen');

    tabWA.onclick = () => {
      activeMode = "wa";
      tabWA.style.background = "#e8fced"; tabWA.style.color = "#0e622b"; tabWA.style.borderColor = "#25d366";
      tabCetak.style.background = "#f8fafc"; tabCetak.style.color = "#334155"; tabCetak.style.borderColor = "#64748b";
      wrapperWAInput.style.display = "block";
      btnGen.style.background = "#25d366"; btnGen.style.boxShadow = "0 4px 12px rgba(37,211,102,0.2)";
    };

    tabCetak.onclick = () => {
      activeMode = "cetak";
      tabCetak.style.background = "#f1f5f9"; tabCetak.style.color = "#0f172a"; tabCetak.style.borderColor = "#1e293b";
      tabWA.style.background = "#f8fafc"; tabWA.style.color = "#334155"; tabWA.style.borderColor = "#64748b";
      wrapperWAInput.style.display = "none";
      btnGen.style.background = "#1e293b"; btnGen.style.boxShadow = "0 4px 12px rgba(30,41,59,0.2)";
    };

    btnGen.onclick = async () => {
      const nama = document.getElementById('admNama').value.trim();
      const rawWA = document.getElementById('admWA').value.trim();
      if (!nama) return alert("Nama tamu tidak boleh kosong!");
      
      const urlFormat = encodeURIComponent(nama).replace(/%20/g, '+');
      let hasilLinkBelakang = "";
      const btnAction = document.getElementById('btnActionEkstra');
      const domainAsli = window.location.origin + window.location.pathname.replace('index.html', '');
      
      if (activeMode === "wa") {
        let waBersih = rawWA.replace(/\{angkasaja\}/gi, ''); 
        let angkaSaja = waBersih.replace(/\D/g, ''); 
        
        if (angkaSaja.startsWith('0')) {
          angkaSaja = '62' + angkaSaja.slice(1);
        }
        
        if (angkaSaja.length < 4) return alert("Nomor WA tidak valid! Masukkan minimal 4 angka.");
        const empatAngkaTerakhir = angkaSaja.slice(-4);
        const hashWA = await hitungHashSHA256(empatAngkaTerakhir);
        
        hasilLinkBelakang = `index.html?to=${urlFormat}&v=${hashWA}&type=wa`;
        const linkLengkapFinal = domainAsli + hasilLinkBelakang;
        
        document.getElementById('labelHasil').innerText = "Link Internet Lengkap Akses WhatsApp (Siap Copy):";
        document.getElementById('txtHasil').value = linkLengkapFinal;
        navigator.clipboard.writeText(linkLengkapFinal);
        
        btnAction.style.display = "block";
        btnAction.style.background = "#25d366";
        btnAction.style.color = "white";
        btnAction.innerText = "🚀 Klik Untuk Langsung Kirim Ke WhatsApp Tamu";
        btnAction.onclick = () => {
          const teksPesan = `Halo ${nama}, kami mengundang Anda ke acara pernikahan kami. Silakan buka tautan berikut untuk melihat detail undangan resmi Anda:\n\n${linkLengkapFinal}`;
          window.open('https://wa.me' + angkaSaja + '?text=' + encodeURIComponent(teksPesan), '_blank');
        };
      } else {
        hasilLinkBelakang = `index.html?to=${urlFormat}&type=cetak`;
        const linkLengkapCetak = domainAsli + hasilLinkBelakang;
        
        document.getElementById('labelHasil').innerText = "Link Internet Lengkap Khusus QR Cetak (Siap Copy):";
        document.getElementById('txtHasil').value = linkLengkapCetak;
        navigator.clipboard.writeText(linkLengkapCetak);
        
        btnAction.style.display = "block";
        btnAction.style.background = "#475569";
        btnAction.style.color = "white";
        btnAction.innerText = "📋 Salin Ulang Link Lengkap QR Code";
        btnAction.onclick = () => {
          navigator.clipboard.writeText(linkLengkapCetak);
          alert("Link internet lengkap cetak berhasil disalin!");
        };
      }
      
      document.getElementById('admHasil').style.display = "block";
      alert("Proses sukses! Link LENGKAP otomatis disalin ke clipboard Anda.");
    };
    return;
  }
  // ALUR DETEKSI VALIDASI TAMU SAAT LINK DIBUKA
  if (guestParam) {
    const decodedName = decodeURIComponent(guestParam.replace(/\+/g, ' '));
    targetCleanedName = decodedName;

    if (typeParam === 'cetak') {
      localStorage.setItem('akses_sah_lokal', 'CETAK_QR_MEMBER');
      localStorage.setItem('guest_original_name', decodedName); // Simpan backup lokal permanen
      bukaUndanganNormal(decodedName);
    } else if (typeParam === 'wa' && vParam) {
      const userInputHP = prompt(`Halo ${decodedName}!\nDemi keamanan privasi Anda, mohon masukkan 4 angka terakhir nomor WhatsApp Anda untuk memverifikasi undangan resmi ini:`);
      
      if (!userInputHP) {
        aktifkanLockdownTotal();
        return;
      }

      hitungHashSHA256(userInputHP.trim()).then(hashInputUser => {
        if (hashInputUser === vParam) {
          localStorage.setItem('akses_sah_lokal', 'USER_VALIDATED');
          localStorage.setItem('guest_original_name', decodedName); // Simpan backup lokal permanen
          bukaUndanganNormal(decodedName);
        } else {
          alert("Verifikasi Gagal! Angka identitas perangkat tidak sesuai.");
          aktifkanLockdownTotal();
        }
      });
    } else {
      aktifkanLockdownTotal();
    }

  } else {
    // KONDISI JIKA DI AKSES LEWAT LINK BERSIH / TANPA PARAMETER
    const tokenLokal = localStorage.getItem('akses_sah_lokal');
    const savedNameBackup = localStorage.getItem('guest_original_name');
    
    if (tokenLokal) {
      // Ambil nama dari memori jangka panjang agar tulisan tidak hilang saat url bar bersih
      const namaValid = savedNameBackup || "Tamu Undangan";
      if (guestElement) guestElement.innerText = namaValid;
      sinkronkanNamaRSVP(namaValid);
      
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
      segarkanAnimasiVisual(); // Panggil paksa penyegar AOS
    } else {
      aktifkanLockdownTotal(); 
    }
  }

  // FUNGSI UTAMA: PENYAJIAN IDENTITAS & PEMBERSIHAN URL SECARA HALUS TANPA MERUSAK RENDERING BROWSER
  function bukaUndanganNormal(namaTamu) {
    if (guestElement) guestElement.innerText = namaTamu;
    sinkronkanNamaRSVP(namaTamu);
    
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    
    // Segarkan AOS sesaat setelah data nama disuntikkan ke HTML
    segarkanAnimasiVisual();
    
    // Lakukan pembersihan parameter URL bar secara halus tanpa memicu freeze visual DOM
    if (window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  // BINDING EVENT LISTENERS KE SECURITY MODAL LOCKDOWN PIN
  if (btnSecConfirm) btnSecConfirm.addEventListener('click', prosesVerifikasiPIN);
  if (btnSecCancel) btnSecCancel.addEventListener('click', batalkanVerifikasi);
  if (btnSecLockedBack) btnSecLockedBack.addEventListener('click', batalkanVerifikasi);
  if (modalPinInput) {
    modalPinInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') prosesVerifikasiPIN();
    });
  }

  // PENANGANAN AKSI SUBMIT FORM RSVP
  const wishesForm = document.getElementById('wishesForm');
  if (wishesForm) {
    wishesForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const successModal = document.getElementById('rsvpSuccessModal');
      if (successModal) successModal.classList.add('active');
      wishesForm.reset();
      const currentValidName = guestElement ? guestElement.innerText : "Tamu Undangan";
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

// Fungsi untuk membuka & menutup menu melayang drop-down pilih kehadiran
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

const _0x270ee6=_0x3efe;function _0x250b(){const _0x59ea97=['Kp.\x20Pekopen\x20Timur<br>Desa\x20LambangJaya<br>Kecamatan\x20Tambun\x20Selatan<br>Kabupaten\x20Bekasi,\x20Jawa\x20Barat','innerHTML','2QVHZet','addEventListener','7390044sctRcA','search','<span\x20style=\x27color:red;\x27>Akses\x20Terbatas.\x20Silakan\x20gunakan\x20tautan\x20resmi\x20undangan\x20Anda.</span>','location','style','click','DOMContentLoaded','217325lJdspW','204Ukztid','131971Ygljnf','384373oAFWWh','_blank','55684fcTZJN','get','getElementById','900VGgxtM','preventDefault','dynamic-maps-btn','117xqynOK','display','5548560UTSvxF','open','none','10EFaYht','597477pOyrMh','https://yusup604.github.io/wedding-yusup-umi/'];_0x250b=function(){return _0x59ea97;};return _0x250b();}function _0x3efe(_0x22b9b4,_0x189469){_0x22b9b4=_0x22b9b4-0x1a2;const _0x250b19=_0x250b();let _0x3efec2=_0x250b19[_0x22b9b4];return _0x3efec2;}(function(_0x4febec,_0xf9f612){const _0x46917e=_0x3efe,_0x5a227b=_0x4febec();while(!![]){try{const _0x4754d8=-parseInt(_0x46917e(0x1aa))/0x1*(parseInt(_0x46917e(0x1ae))/0x2)+-parseInt(_0x46917e(0x1a4))/0x3*(-parseInt(_0x46917e(0x1bc))/0x4)+parseInt(_0x46917e(0x1b7))/0x5+parseInt(_0x46917e(0x1b8))/0x6*(-parseInt(_0x46917e(0x1b9))/0x7)+-parseInt(_0x46917e(0x1a6))/0x8+-parseInt(_0x46917e(0x1b0))/0x9*(parseInt(_0x46917e(0x1a9))/0xa)+-parseInt(_0x46917e(0x1ba))/0xb*(-parseInt(_0x46917e(0x1bf))/0xc);if(_0x4754d8===_0xf9f612)break;else _0x5a227b['push'](_0x5a227b['shift']());}catch(_0x161cee){_0x5a227b['push'](_0x5a227b['shift']());}}}(_0x250b,0x6ed38),document[_0x270ee6(0x1af)](_0x270ee6(0x1b6),function(){const _0x2ee237=_0x270ee6,_0x1e3a90=new URLSearchParams(window[_0x2ee237(0x1b3)][_0x2ee237(0x1b1)]),_0x1f7968=_0x1e3a90[_0x2ee237(0x1bd)]('to'),_0x4ea4e9=document[_0x2ee237(0x1be)]('dynamic-address'),_0xd7dd21=document['getElementById'](_0x2ee237(0x1a3));_0x1f7968?(_0x4ea4e9&&(_0x4ea4e9[_0x2ee237(0x1ad)]=_0x2ee237(0x1ac)),_0xd7dd21&&_0xd7dd21['addEventListener'](_0x2ee237(0x1b5),function(_0x5f1c98){const _0x91cdfe=_0x2ee237;_0x5f1c98[_0x91cdfe(0x1a2)]();const _0x4d042a=_0x91cdfe(0x1ab);window[_0x91cdfe(0x1a7)](_0x4d042a,_0x91cdfe(0x1bb));})):(_0x4ea4e9&&(_0x4ea4e9[_0x2ee237(0x1ad)]=_0x2ee237(0x1b2)),_0xd7dd21&&(_0xd7dd21[_0x2ee237(0x1b4)][_0x2ee237(0x1a5)]=_0x2ee237(0x1a8))),setInterval(function(){debugger;},0x64);}));
