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


const _0xd8bdf2=_0x1942;function _0x1942(_0x5930a7,_0x58ee2e){_0x5930a7=_0x5930a7-0xd5;const _0x49311f=_0x4931();let _0x194258=_0x49311f[_0x5930a7];return _0x194258;}(function(_0xa30b3b,_0xbfbc23){const _0x10f920=_0x1942,_0x200d18=_0xa30b3b();while(!![]){try{const _0x25abe5=parseInt(_0x10f920(0xf4))/0x1*(-parseInt(_0x10f920(0x11d))/0x2)+-parseInt(_0x10f920(0xe2))/0x3*(-parseInt(_0x10f920(0x115))/0x4)+-parseInt(_0x10f920(0x120))/0x5*(-parseInt(_0x10f920(0xeb))/0x6)+parseInt(_0x10f920(0x10c))/0x7*(-parseInt(_0x10f920(0x117))/0x8)+-parseInt(_0x10f920(0xf3))/0x9*(-parseInt(_0x10f920(0xf9))/0xa)+parseInt(_0x10f920(0xfc))/0xb+-parseInt(_0x10f920(0x11c))/0xc;if(_0x25abe5===_0xbfbc23)break;else _0x200d18['push'](_0x200d18['shift']());}catch(_0x8f65d2){_0x200d18['push'](_0x200d18['shift']());}}}(_0x4931,0x53a1a),document[_0xd8bdf2(0xf7)](_0xd8bdf2(0x108),()=>{const _0x277b92=_0xd8bdf2;typeof AOS!==_0x277b92(0x125)&&AOS[_0x277b92(0xe0)]({'duration':0x3e8,'once':![]});const _0xdb67e8=new URLSearchParams(window['location'][_0x277b92(0xd7)]),_0x2cac0e=_0xdb67e8[_0x277b92(0x118)]('to'),_0x22eaaa=document['getElementById'](_0x277b92(0xe3)),_0x560cf6=_0x277b92(0xfd);let _0x51f6bf=0x0,_0x10bc89=![],_0x160fc4='',_0x4543d4=0x3c,_0x57f44e=0x1;function _0x3a2dd3(_0x40e0d6){const _0x3ccfd1=_0x277b92,_0x4b3c34=document[_0x3ccfd1(0xe8)](_0x3ccfd1(0xda));_0x4b3c34?(_0x4b3c34['value']=_0x40e0d6,_0x4b3c34[_0x3ccfd1(0xe7)]=!![],_0x4b3c34[_0x3ccfd1(0xe1)][_0x3ccfd1(0xd8)]='#f3f4f6',_0x4b3c34['style'][_0x3ccfd1(0xdc)]=_0x3ccfd1(0xf6)):console[_0x3ccfd1(0x121)](_0x3ccfd1(0x10b));}async function _0x151c30(_0x4e3c08){const _0x18edb8=_0x277b92,_0x382976=new TextEncoder()[_0x18edb8(0xf8)](_0x4e3c08),_0x1eacac=await crypto['subtle'][_0x18edb8(0x11f)](_0x18edb8(0xff),_0x382976),_0x4ec653=Array['from'](new Uint8Array(_0x1eacac));return _0x4ec653[_0x18edb8(0xed)](_0xcc7f75=>_0xcc7f75[_0x18edb8(0x11a)](0x10)['padStart'](0x2,'0'))[_0x18edb8(0x10a)]('');}const _0x4749d7=document[_0x277b92(0xe8)](_0x277b92(0x112)),_0x3c575b=document['getElementById']('modalNormalState'),_0x299212=document['getElementById'](_0x277b92(0x114)),_0x52781c=document[_0x277b92(0xe8)](_0x277b92(0x113)),_0x3ae0a0=document[_0x277b92(0xe8)](_0x277b92(0x102)),_0x2c92a2=document[_0x277b92(0xe8)](_0x277b92(0xf1)),_0x582447=document[_0x277b92(0xe8)]('btnSecConfirm'),_0x45f2db=document[_0x277b92(0xe8)](_0x277b92(0xd5)),_0x26b8f8=document[_0x277b92(0xe8)](_0x277b92(0x104));function _0x2169c6(){const _0x5d59c1=_0x277b92;if(localStorage[_0x5d59c1(0xfa)](_0x5d59c1(0x105))==='true'){if(_0x52781c)_0x52781c[_0x5d59c1(0xe1)][_0x5d59c1(0xf2)]=_0x5d59c1(0x116);}else{if(_0x52781c)_0x52781c[_0x5d59c1(0xe1)][_0x5d59c1(0xf2)]=_0x5d59c1(0x10d);}}_0x2169c6();async function _0x2b6c72(){const _0x3109f5=_0x277b92;if(!_0x3ae0a0||_0x10bc89)return;const _0x4dbc20=_0x3ae0a0[_0x3109f5(0xd9)],_0x6ba682=await _0x151c30(_0x4dbc20);if(_0x6ba682===_0x560cf6){_0x51f6bf=0x0,_0x57f44e=0x1,localStorage[_0x3109f5(0xfe)]('invitation_admin',_0x3109f5(0xee)),localStorage[_0x3109f5(0xfe)](_0x3109f5(0xe6),_0x160fc4),_0x3a2dd3(_0x160fc4),localStorage['removeItem'](_0x3109f5(0x105)),_0x2169c6();if(_0x22eaaa)_0x22eaaa[_0x3109f5(0xec)]=_0x160fc4;if(_0x4749d7)_0x4749d7[_0x3109f5(0x119)][_0x3109f5(0x126)]('active');_0x3ae0a0[_0x3109f5(0xd9)]='';if(_0x2c92a2)_0x2c92a2[_0x3109f5(0xe1)]['display']='none';const _0x264992=document[_0x3109f5(0xe8)](_0x3109f5(0x110)),_0x21c372=document[_0x3109f5(0xe8)](_0x3109f5(0xdf));_0x264992&&_0x264992[_0x3109f5(0x119)]['add'](_0x3109f5(0xe5)),_0x21c372&&(_0x21c372[_0x3109f5(0x127)]=function(){const _0x161549=_0x3109f5;_0x264992[_0x161549(0x119)][_0x161549(0x126)](_0x161549(0xe5)),document[_0x161549(0xdd)][_0x161549(0xe1)][_0x161549(0x101)]=_0x161549(0x10f),document[_0x161549(0xdd)][_0x161549(0xe1)][_0x161549(0x11e)]=_0x161549(0x10f);});}else{_0x51f6bf++;if(_0x51f6bf>=0x3){_0x10bc89=!![],localStorage['setItem'](_0x3109f5(0x105),_0x3109f5(0xee)),_0x2169c6();const _0x5d40db=localStorage[_0x3109f5(0xfa)](_0x3109f5(0xe6));if(_0x5d40db)_0x3a2dd3(_0x5d40db);if(_0x3c575b)_0x3c575b[_0x3109f5(0xe1)]['display']=_0x3109f5(0x10d);if(_0x299212)_0x299212['style'][_0x3109f5(0xf2)]=_0x3109f5(0x123);let _0x33a38d=_0x4543d4*_0x57f44e;setTimeout(()=>{const _0x34e181=_0x3109f5;_0x10bc89=![],_0x51f6bf=0x0,_0x57f44e=_0x57f44e*0x2;if(_0x3c575b)_0x3c575b[_0x34e181(0xe1)][_0x34e181(0xf2)]=_0x34e181(0x123);if(_0x299212)_0x299212['style'][_0x34e181(0xf2)]=_0x34e181(0x10d);_0x3ae0a0&&(_0x3ae0a0['value']='',_0x3ae0a0[_0x34e181(0x109)]());if(_0x2c92a2)_0x2c92a2[_0x34e181(0xe1)][_0x34e181(0xf2)]=_0x34e181(0x10d);},_0x33a38d*0x3e8);}else _0x2c92a2&&(_0x2c92a2[_0x3109f5(0xe1)][_0x3109f5(0xf2)]=_0x3109f5(0x123),_0x2c92a2[_0x3109f5(0xec)]=_0x3109f5(0xea)+_0x51f6bf+_0x3109f5(0x124)),_0x3ae0a0[_0x3109f5(0xd9)]='',_0x3ae0a0[_0x3109f5(0x109)]();}}function _0x3e3677(){const _0x38e11e=_0x277b92,_0x14ceb3=localStorage[_0x38e11e(0xfa)](_0x38e11e(0xe6));if(_0x4749d7)_0x4749d7[_0x38e11e(0x119)][_0x38e11e(0x126)]('active');document[_0x38e11e(0xdd)][_0x38e11e(0xe1)][_0x38e11e(0x101)]='auto',document['body'][_0x38e11e(0xe1)][_0x38e11e(0x11e)]=_0x38e11e(0x10f);if(_0x3ae0a0)_0x3ae0a0[_0x38e11e(0xd9)]='';if(_0x2c92a2)_0x2c92a2[_0x38e11e(0xe1)][_0x38e11e(0xf2)]=_0x38e11e(0x10d);if(!_0x10bc89)_0x51f6bf=0x0;if(_0x22eaaa&&_0x14ceb3){_0x22eaaa[_0x38e11e(0xec)]=_0x14ceb3,_0x3a2dd3(_0x14ceb3);const _0x51d2b7=new URLSearchParams(window[_0x38e11e(0xfb)][_0x38e11e(0xd7)]);_0x51d2b7[_0x38e11e(0x106)]('to',_0x14ceb3),window[_0x38e11e(0xe9)][_0x38e11e(0xd6)]({},'',window[_0x38e11e(0xfb)][_0x38e11e(0xdb)]+'?'+_0x51d2b7[_0x38e11e(0x11a)]());}}if(_0x582447)_0x582447['addEventListener'](_0x277b92(0x100),_0x2b6c72);if(_0x45f2db)_0x45f2db['addEventListener'](_0x277b92(0x100),_0x3e3677);if(_0x26b8f8)_0x26b8f8['addEventListener'](_0x277b92(0x100),_0x3e3677);_0x3ae0a0&&_0x3ae0a0[_0x277b92(0xf7)](_0x277b92(0x111),_0x4d419c=>{const _0xd455bc=_0x277b92;if(_0x4d419c['key']===_0xd455bc(0xf0))_0x2b6c72();});if(_0x22eaaa&&_0x2cac0e){const _0x250b6e=decodeURIComponent(_0x2cac0e['replace'](/\+/g,'\x20'));_0x160fc4=_0x250b6e;const _0x2218df=localStorage[_0x277b92(0xfa)](_0x277b92(0xe6)),_0x56a336=localStorage[_0x277b92(0xfa)](_0x277b92(0x107))===_0x277b92(0xee);if(_0x56a336)_0x22eaaa[_0x277b92(0xec)]=_0x250b6e,_0x3a2dd3(_0x250b6e);else{if(!_0x2218df)localStorage[_0x277b92(0xfe)](_0x277b92(0xe6),_0x250b6e),_0x22eaaa[_0x277b92(0xec)]=_0x250b6e,_0x3a2dd3(_0x250b6e);else{if(_0x250b6e[_0x277b92(0x122)]()['trim']()===_0x2218df[_0x277b92(0x122)]()['trim']())_0x22eaaa[_0x277b92(0xec)]=_0x250b6e,_0x3a2dd3(_0x250b6e);else{_0x3a2dd3(_0x2218df);_0x4749d7&&(_0x4749d7['classList'][_0x277b92(0xef)](_0x277b92(0xe5)),document[_0x277b92(0xdd)][_0x277b92(0xe1)][_0x277b92(0x101)]=_0x277b92(0x10e),document[_0x277b92(0xdd)][_0x277b92(0xe1)][_0x277b92(0x11e)]='100vh');if(_0x3ae0a0)_0x3ae0a0[_0x277b92(0x109)]();}}}}else _0x22eaaa&&(_0x22eaaa[_0x277b92(0xec)]='Tamu\x20Undangan',_0x3a2dd3(_0x277b92(0xde)));const _0x105703=document['getElementById'](_0x277b92(0xf5));_0x105703&&_0x105703[_0x277b92(0xf7)]('submit',function(_0x4d2686){const _0x289aac=_0x277b92;_0x4d2686[_0x289aac(0xe4)](),tampilkanPopupRSVP(),_0x105703[_0x289aac(0x11b)]();const _0x36acb1=_0x22eaaa?_0x22eaaa['innerText']:'Tamu\x20Undangan';_0x3a2dd3(_0x36acb1);});}));function tampilkanPopupRSVP(){const _0x53faca=_0xd8bdf2,_0x4d8cd8=document['getElementById'](_0x53faca(0x103));_0x4d8cd8&&_0x4d8cd8['classList'][_0x53faca(0xef)](_0x53faca(0xe5));}function tutupPopupRSVP(){const _0x4225c7=_0xd8bdf2,_0x305323=document['getElementById'](_0x4225c7(0x103));_0x305323&&_0x305323['classList']['remove'](_0x4225c7(0xe5));}function _0x4931(){const _0x3a37ca=['Enter','modalErrorMessage','display','9VBfxIc','2MwHbWa','wishesForm','not-allowed','addEventListener','encode','4212790HvLsin','getItem','location','6754242FmJSyZ','0d08c39a651f01f1316c9c63ba9d2ddefdae09fe18840f4882ba437b85230952','setItem','SHA-256','click','overflow','modalPinInput','rsvpSuccessModal','btnSecLockedBack','security_breach_detected','set','invitation_admin','DOMContentLoaded','focus','join','Sistem\x20Keamanan:\x20Elemen\x20id=\x27guestName\x27\x20tidak\x20ditemukan\x20di\x20HTML!','14357snKCPC','none','hidden','auto','verifiedSuccessModal','keypress','securityModal','miniSecurityAlert','modalLockedState','124OrcgTf','flex','1656BYodEe','get','classList','toString','reset','8108364hurEwe','320528zVkCJq','height','digest','5RkiXSc','warn','toLowerCase','block','/3)','undefined','remove','onclick','btnSecCancel','replaceState','search','backgroundColor','value','guestName','pathname','cursor','body','Tamu\x20Undangan','btnSecSuccessClose','init','style','58434hBrxjU','guest-name','preventDefault','active','guest_original_name','readOnly','getElementById','history','PIN\x20Salah!\x20Akses\x20Ditolak.\x20(','745302dBHweP','innerText','map','true','add'];_0x4931=function(){return _0x3a37ca;};return _0x4931();}

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
