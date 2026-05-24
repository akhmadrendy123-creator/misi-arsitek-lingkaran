// --- PENGATURAN GURU (Ubah Nomor Anda di Sini) ---
const nomorWhatsAppGuru = "62895326772959"; 

let pantunTerakhir = "- Belum menulis pantun -";
let nilaiPerasaan = "Belum diisi";
let totalScene = 7; 
let isMusicStarted = false; // Status apakah musik sedang menyala

// --- Fungsi Menghidupkan/Mematikan Musik ---
function toggleMusic() {
    let bgm = document.getElementById('bgm');
    let btn = document.getElementById('musicToggleBtn');

    if (bgm.paused) {
        bgm.play();
        btn.innerText = "🔊 Musik: ON";
        isMusicStarted = true;
    } else {
        bgm.pause();
        btn.innerText = "🔇 Musik: OFF";
        isMusicStarted = false;
    }
}

// --- Fungsi Navigasi Antar Layar ---
function nextScene(sceneNumber) {
    // Membunyikan suara klik setiap ganti layar (jika file audionya ada)
    let clickAudio = document.getElementById('clickSound');
    if (clickAudio) clickAudio.play().catch(e => console.log("Audio klik tidak ditemukan"));

    // Memutar musik otomatis pertama kali saat masuk Scene 2
    let bgm = document.getElementById('bgm');
    let musicBtn = document.getElementById('musicToggleBtn');
    
    if (sceneNumber === 2 && !isMusicStarted) {
        bgm.volume = 0.3; // Volume sedang agar tidak mengagetkan
        let playPromise = bgm.play();
        
        // Memastikan browser mengizinkan pemutaran musik
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                musicBtn.innerText = "🔊 Musik: ON";
                isMusicStarted = true;
            }).catch(error => {
                console.log("Autoplay diblokir browser, pengguna harus klik tombol manual.");
            });
        }
    }

    let scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => scene.classList.remove('active'));
    document.getElementById('scene-' + sceneNumber).classList.add('active');

    let progressBar = document.getElementById('progress-bar');
    let progressValue = (sceneNumber === totalScene) ? 100 : ((sceneNumber - 1) * (100/(totalScene-1)));
    progressBar.style.width = progressValue + "%";

    if (sceneNumber === 2) updateLingkaran(); 
    if (sceneNumber === 3) updateRvsD('r'); 
    if (sceneNumber === 4) updateRoda(); 
    if (sceneNumber === 5 && currentLevel === 0) renderKuis();
}

// --- Logika Scene 2: Variasi Eksperimen Pi ---
let aljabarState = "rasio"; 
function toggleAljabar() {
    aljabarState = (aljabarState === "rasio") ? "perkalian" : "rasio";
    updateLingkaran(); 
}

function updateLingkaran() {
    let d = parseFloat(document.getElementById('sliderDiameter').value);
    let visualLingkaran = document.getElementById('visualLingkaran');
    let nilaiDText = document.getElementById('nilaiDText');
    let calcD = document.getElementById('calcD');
    let calcK = document.getElementById('calcK');
    let aljabarArea = document.getElementById('aljabarArea');

    let variasiEksperimen = Math.sin(d * 1.5) * 0.00845312; 
    let piEfektif = 3.14159265 + variasiEksperimen;
    let keliling = piEfektif * d;
    let rasioTerhitung = keliling / d;

    nilaiDText.innerText = d;
    calcD.innerText = d;
    calcK.innerText = keliling.toFixed(8);

    if (aljabarState === "rasio") {
        aljabarArea.innerHTML = `
            <p style="margin: 5px 0; font-size: 15px; color:#555; font-weight:bold;">Bentuk Perbandingan Awal (Pecahan):</p>
            <div class="aljabar-flex">
                <div class="pecahan"><span class="pembilang">Keliling (K)</span><span class="penyebut">Diameter (d)</span></div>
                <span>=</span><span style="color:#007bff;">π (Pi)</span>
            </div>
            <div class="aljabar-flex" style="font-size: 16px; color: #444;">
                <div class="pecahan"><span>${keliling.toFixed(8)}</span><span style="border-top: 2px solid #333; color:#dc3545; padding: 0 5px;">${d}</span></div>
                <span>=</span><span style="color:#007bff; font-weight: bold;">${rasioTerhitung.toFixed(8)}</span>
            </div>
            <div class="petunjuk-klik">💡 Klik di sini untuk memindahkan ruas Diameter (Aljabar)!</div>
        `;
    } else {
        aljabarArea.innerHTML = `
            <p style="margin: 5px 0; font-size: 15px; color:#555; font-weight:bold;">Bentuk Perkalian (Rumus Keliling):</p>
            <div class="aljabar-flex"><span style="color:#28a745;">Keliling (K)</span><span>=</span><span style="color:#007bff;">π (Pi)</span><span>×</span><span style="color:#dc3545;">Diameter (d)</span></div>
            <div class="aljabar-flex" style="font-size: 16px; color: #444;"><span style="color:#28a745;">${keliling.toFixed(8)}</span><span>=</span><span>${rasioTerhitung.toFixed(8)}</span><span>×</span><span style="color:#dc3545;">${d}</span></div>
            <p class="pindah-ruas-note">🔄 Diameter (d) pindah ruas mengubah pembagian menjadi perkalian!</p>
            <div class="petunjuk-klik">💡 Klik di sini untuk kembali melihat bentuk pecahan</div>
        `;
    }

    visualLingkaran.style.width = (d * 10) + "px";
    visualLingkaran.style.height = (d * 10) + "px";
}

// --- Logika Scene 3: Jari-jari vs Diameter ---
function updateRvsD(pemicu) {
    let sliderR = document.getElementById('sliderR');
    let sliderD = document.getElementById('sliderD2');
    let r = parseFloat(sliderR.value);
    let d = parseFloat(sliderD.value);

    if (pemicu === 'r') {
        d = r * 2;
        sliderD.value = d; 
    } else {
        r = d / 2;
        sliderR.value = r; 
    }

    document.getElementById('textR').innerText = r;
    document.getElementById('textD2').innerText = d;
    document.getElementById('formulaR').innerText = r;
    document.getElementById('formulaD').innerText = d;

    let visualLingkaran2 = document.getElementById('visualLingkaran2');
    visualLingkaran2.style.width = (d * 10) + "px";
    visualLingkaran2.style.height = (d * 10) + "px";
}

// --- Logika Scene 4: Roda Menggelinding ---
function updateRoda() {
    let putaran = parseFloat(document.getElementById('sliderRoda').value);
    let roda = document.getElementById('visualRoda');
    let jejak = document.getElementById('jejakCat');
    let textPutaran = document.getElementById('textPutaran');

    let diameterRoda = 60; 
    let kelilingRoda = Math.PI * diameterRoda;

    textPutaran.innerText = putaran.toFixed(2);

    let jarakX = putaran * kelilingRoda;
    let rotasiDeg = putaran * 360;

    roda.style.transform = `translateX(${jarakX}px) rotate(${rotasiDeg}deg)`;
    jejak.style.width = `${jarakX}px`;
}

// --- Logika Scene 5: Kuis Kartu Interaktif ---
let currentLevel = 0; 
let totalSkor = 0;
let poinSaatIni = 0;

const dataKuis = [
    { levelName: "Proyek 1: Taman Kecil", soal: "Jari-jari (r) taman = 7 m. Kelilingnya?", petunjuk: "(Gunakan π = 22/7)", pilihan: [22, 35, 44, 88], jawaban: 44, poinMaksimal: 30, dialog: "Jalan taman pertama selesai!", warnaBadge: "#f59e0b", gambarUtama: "assets/obj-taman.png" },
    { levelName: "Proyek 2: Kolam Air Mancur", soal: "Diameter (d) kolam = 10 m. Kelilingnya?", petunjuk: "(Gunakan π = 3.14)", pilihan: [31.4, 314, 62.8, 15.7], jawaban: 31.4, poinMaksimal: 30, dialog: "Hitungan desimalmu akurat!", warnaBadge: "#00bcd4", gambarUtama: "assets/obj-kolam.png" },
    { levelName: "Proyek 3: Misi Utama", soal: "Jari-jari (r) taman kota = 14 m. Kelilingnya?", petunjuk: "(Gunakan π = 22/7)", pilihan: [44, 88, 154, 616], jawaban: 88, poinMaksimal: 40, dialog: "Luar Biasa! Kamu resmi jadi Arsitek!", warnaBadge: "#4caf50", gambarUtama: "assets/obj-taman-besar.png" }
];

function renderKuis() {
    let soalData = dataKuis[currentLevel];
    poinSaatIni = soalData.poinMaksimal; 
    
    document.getElementById('levelBadge').innerText = soalData.levelName;
    document.getElementById('levelBadge').style.backgroundColor = soalData.warnaBadge;
    document.getElementById('teksSoal').innerText = soalData.soal;
    document.getElementById('teksPetunjuk').innerText = soalData.petunjuk;
    document.getElementById('gambarSoal').src = soalData.gambarUtama;
    document.getElementById('feedbackKuis').innerHTML = "";
    document.getElementById('dialogueKuis').innerText = `"Hitung dengan teliti! Nilai soal ini: ${poinSaatIni} poin"`;

    let tempatPilihan = document.getElementById('tempatPilihan');
    tempatPilihan.innerHTML = ""; 
    soalData.pilihan.forEach(angka => {
        let btn = document.createElement('button');
        btn.className = 'option-card';
        btn.innerText = angka + " m";
        btn.onclick = function() { 
            // Membunyikan suara klik saat kartu jawaban dipilih
            let clickAudio = document.getElementById('clickSound');
            if (clickAudio) clickAudio.play().catch(e => console.log("Audio klik tidak ditemukan"));
            cekJawabanKartu(this, angka); 
        };
        tempatPilihan.appendChild(btn);
    });
}

function cekJawabanKartu(kartuElement, tebakan) {
    let jawabanBenar = dataKuis[currentLevel].jawaban;
    let feedback = document.getElementById('feedbackKuis');
    let dialogue = document.getElementById('dialogueKuis');
    let semuaKartu = document.querySelectorAll('.option-card');

    if (tebakan === jawabanBenar) {
        kartuElement.classList.add('benar');
        totalSkor += poinSaatIni;
        feedback.innerHTML = `✨ Tepat! +${poinSaatIni} Poin! ✨`;
        dialogue.innerText = `"${dataKuis[currentLevel].dialog}"`;
        semuaKartu.forEach(k => k.disabled = true);
        currentLevel++;

        if (currentLevel < dataKuis.length) {
            setTimeout(renderKuis, 2500); 
        } else {
            setTimeout(() => {
                document.getElementById('teksSoal').style.display = "none";
                document.getElementById('teksPetunjuk').style.display = "none";
                document.getElementById('tempatPilihan').style.display = "none";
                document.getElementById('charBoxKuis').style.display = "none";
                document.getElementById('gambarSoal').style.display = "none";
                
                document.getElementById('levelBadge').innerText = "Kuis Selesai!";
                feedback.innerHTML = "🎉 Semua proyek berhasil dibangun!";
                
                let skorBox = document.getElementById('skorBox');
                skorBox.style.display = "block";
                document.getElementById('nilaiSkor').innerText = totalSkor + " / 100";
                document.getElementById('btnLanjutRefleksi').style.display = "inline-block";
            }, 2000);
        }
    } else {
        kartuElement.classList.add('salah');
        poinSaatIni -= 10;
        if (poinSaatIni < 10) poinSaatIni = 10; 
        feedback.innerHTML = `Ups, salah! Poin level ini turun menjadi ${poinSaatIni}.`;
        setTimeout(() => { kartuElement.classList.remove('salah'); }, 500);
    }
}

// --- Logika Scene 6 & 7: Refleksi & WhatsApp ---
function setRating(element, teksPerasaan) {
    let emojis = element.parentElement.children;
    for (let emoji of emojis) { emoji.classList.remove('active'); }
    element.classList.add('active');
    nilaiPerasaan = teksPerasaan;
}

function toggleTag(element) { element.classList.toggle('active'); }

function kirimPantun() {
    let input = document.getElementById('inputPantun');
    let history = document.getElementById('chat-history');
    if (input.value.trim() !== "") {
        let bubbleSiswa = document.createElement('div');
        bubbleSiswa.className = 'chat-bubble';
        bubbleSiswa.innerText = "Kamu: " + input.value;
        history.appendChild(bubbleSiswa);
        pantunTerakhir = input.value;
        input.value = "";
        setTimeout(() => {
            let bubbleElSabar = document.createElement('div');
            bubbleElSabar.className = 'chat-bubble reply';
            bubbleElSabar.innerText = "El Sabar: Cakep! Arsitek yang pandai berpantun!";
            history.appendChild(bubbleElSabar);
        }, 1000);
    }
}

function prosesLaporan() {
    let nama = document.getElementById('inputNama').value;
    let kelas = document.getElementById('inputKelas').value;
    if(nama.trim() === "" || kelas.trim() === "") {
        alert("Hai Arsitek! Jangan lupa isi Nama dan Kelasmu dulu ya.");
        return;
    }
    nextScene(7); 
}

function kirimKeWhatsApp() {
    let nama = document.getElementById('inputNama').value;
    let kelas = document.getElementById('inputKelas').value;
    let elemenTags = document.querySelectorAll('.tags .tag.active');
    let listBingung = [];
    elemenTags.forEach(el => listBingung.push(el.innerText));
    let teksBingung = listBingung.length > 0 ? listBingung.join(", ") : "Tidak menjawab";

    let teksWA = `*LAPORAN MISI ARSITEK* 🏗️%0A%0A`;
    teksWA += `👤 *Nama:* ${nama}%0A`;
    teksWA += `🏫 *Kelas:* ${kelas}%0A`;
    teksWA += `🏆 *Skor Akhir:* ${totalSkor} / 100%0A%0A`;
    teksWA += `*--- Refleksi ---*%0A`;
    teksWA += `Mood Kerja Kelompok: ${nilaiPerasaan}%0A`;
    teksWA += `Materi yang membingungkan: *${teksBingung}*%0A%0A`;
    teksWA += `*Pantun Lingkaran:*%0A_" ${pantunTerakhir} "_%0A%0A`;
    teksWA += `Terima kasih!`;

    let urlWA = `https://api.whatsapp.com/send?phone=${nomorWhatsAppGuru}&text=${teksWA}`;
    window.open(urlWA, '_blank');
}
