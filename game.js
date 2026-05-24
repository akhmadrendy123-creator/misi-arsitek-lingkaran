// --- PENGATURAN GURU (Ubah Nomor Anda di Sini) ---
const nomorWhatsAppGuru = "6281234567890"; 

let pantunTerakhir = "- Belum menulis pantun -";
let nilaiPerasaan = "Belum diisi";
let totalScene = 6; // Total ada 6 layar sekarang

// --- Fungsi Navigasi Antar Layar ---
function nextScene(sceneNumber) {
    let scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => scene.classList.remove('active'));
    document.getElementById('scene-' + sceneNumber).classList.add('active');

    let progressBar = document.getElementById('progress-bar');
    let progressValue = (sceneNumber === totalScene) ? 100 : ((sceneNumber - 1) * 20);
    progressBar.style.width = progressValue + "%";

    if (sceneNumber === 2) updateLingkaran(); 
    if (sceneNumber === 3) updateRvsD('r'); // Inisialisasi awal Lab R vs D
    if (sceneNumber === 4 && currentLevel === 0) renderKuis();
}

// --- Logika Scene 2: Variasi Eksperimen & Transformasi Aljabar ---
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
            <p class="pindah-ruas-note">🔄 Diameter (d) di bawah pindah ruas melewati '=' ke sisi kanan, mengubah pembagian menjadi perkalian!</p>
            <div class="petunjuk-klik">💡 Klik di sini untuk kembali melihat bentuk pecahan</div>
        `;
    }

    let ukuranPx = d * 10; 
    visualLingkaran.style.width = ukuranPx + "px";
    visualLingkaran.style.height = ukuranPx + "px";
}

// --- Logika Scene 3: SIMULASI BARU (Jari-jari vs Diameter) ---
function updateRvsD(pemicu) {
    let sliderR = document.getElementById('sliderR');
    let sliderD = document.getElementById('sliderD2');
    let r = parseFloat(sliderR.value);
    let d = parseFloat(sliderD.value);

    if (pemicu === 'r') {
        d = r * 2;
        sliderD.value = d; // Jika r diubah, d otomatis menyesuaikan
    } else {
        r = d / 2;
        sliderR.value = r; // Jika d diubah, r otomatis menyesuaikan
    }

    // Update Teks Layar
    document.getElementById('textR').innerText = r;
    document.getElementById('textD2').innerText = d;
    document.getElementById('formulaR').innerText = r;
    document.getElementById('formulaD').innerText = d;

    // Sinkronisasi ukuran visual lingkaran kedua (dikalikan 10)
    let visualLingkaran2 = document.getElementById('visualLingkaran2');
    visualLingkaran2.style.width = (d * 10) + "px";
    visualLingkaran2.style.height = (d * 10) + "px";
}

// --- Logika Scene 4: Kuis Kartu Interaktif & Skoring ---
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
        btn.onclick = function() { cekJawabanKartu(this, angka); };
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

// --- Logika Scene 5: Refleksi & Rekap Data ---
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
    nextScene(6); // Masuk ke layar unduh medali
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
