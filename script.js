document.addEventListener("DOMContentLoaded", () => {
  // --- Elemen Umum (Login & Test Page) ---
  const usernameInput = document.getElementById("usernameInput");
  const startButton = document.getElementById("startButton");
  // Elemen user info di test.html
  const loggedInUserDisplay = document.getElementById("loggedInUser");
  const userDisplayOnTestPage = document.querySelector(".user-info"); // Elemen div user-info
  const currentQuestionNumberDisplay = document.getElementById(
    "currentQuestionNumber"
  );
  const totalQuestionsDisplay = document.getElementById("totalQuestions");
  const logoutButtonOnTestPage = document.getElementById("logoutButton");

  // --- Elemen Layar Tes ---
  const questionScreen = document.getElementById("questionScreen");
  const questionTextDisplay = document.getElementById("questionText");
  const optionsContainer = document.getElementById("optionsContainer");
  const nextQuestionButton = document.getElementById("nextQuestionButton");

  // --- Elemen Layar Hasil ---
  const resultScreen = document.getElementById("resultScreen");
  const finalScoreDisplay = document.getElementById("finalScore");
  const iqInterpretationDisplay = document.getElementById("iqInterpretation");
  const retakeTestButton = document.getElementById("retakeTestButton");

  // --- Variabel Tes ---
  let currentQuestions = []; // Array pertanyaan yang sedang digunakan
  let currentQuestionIndex = 0;
  let userScore = 0;
  const TOTAL_QUESTIONS_IN_TEST = 10; // <<-- UBAH INI UNTUK JUMLAH SOAL YANG DIINGINKAN (misal 10, 50, atau 100) -->>

  // --- Data Pertanyaan IQ (Diperbanyak) ---
  const allIQQuestions = [
    {
      id: 1,
      question: "Lengkapi deret angka: 2, 4, 8, 16, ?",
      options: ["20", "24", "30", "32"],
      correctAnswer: "32",
    },
    {
      id: 2,
      question:
        "Mana yang tidak termasuk kategori: Apel, Pisang, Wortel, Anggur?",
      options: ["Apel", "Pisang", "Wortel", "Anggur"],
      correctAnswer: "Wortel",
    },
    {
      id: 3,
      question:
        "Jika semua kucing adalah hewan, dan semua hewan membutuhkan air. Apakah semua kucing membutuhkan air?",
      options: ["Ya", "Tidak", "Tidak selalu", "Tidak dapat ditentukan"],
      correctAnswer: "Ya",
    },
    {
      id: 4,
      question:
        "Manakah yang merupakan analogi terbaik: Malam : Gelap :: Siang : ?",
      options: ["Terang", "Matahari", "Bulan", "Panas"],
      correctAnswer: "Terang",
    },
    {
      id: 5,
      question:
        "Jam berapa sekarang jika jarum pendek menunjuk angka 3 dan jarum panjang menunjuk angka 12?",
      options: ["12:15", "03:00", "00:03", "03:12"],
      correctAnswer: "03:00",
    },
    {
      id: 6,
      question: "Manakah pola yang benar: A, C, E, G, ?",
      options: ["H", "I", "J", "K"],
      correctAnswer: "I",
    },
    {
      id: 7,
      question:
        "Sebuah bus berisi 10 orang. Di halte pertama turun 3 orang, naik 5 orang. Di halte kedua turun 2 orang, naik 1 orang. Berapa jumlah orang di dalam bus sekarang?",
      options: ["11", "10", "9", "12"],
      correctAnswer: "11",
    },
    {
      id: 8,
      question: "Jika 'rumah' adalah 'pondok', maka 'mobil' adalah '?'",
      options: ["Sepeda", "Motor", "Kendaraan", "Pesawat"],
      correctAnswer: "Kendaraan",
    },
    {
      id: 9,
      question:
        "Manakah bentuk yang berbeda dari yang lain: Lingkaran, Segitiga, Persegi, Oval?",
      options: ["Lingkaran", "Segitiga", "Persegi", "Oval"],
      correctAnswer: "Oval",
    },
    {
      id: 10,
      question:
        "Ayah Budi punya 5 anak. Nama mereka Nana, Nini, Nunu, Nene. Siapa nama anak kelima?",
      options: ["Nono", "Nono", "Budi", "Ninu"],
      correctAnswer: "Budi",
    },
    {
      id: 11,
      question:
        "Jika 5 + 3 = 28, 9 + 1 = 810, 8 + 6 = 214, 5 + 4 = 19, maka 7 + 3 = ?",
      options: ["410", "104", "10", "41"],
      correctAnswer: "410",
    }, // (A-B)(A+B)
    {
      id: 12,
      question:
        "Yang mana yang aneh: Kemeja, Celana, Topi, Sepatu, Sarung Tangan?",
      options: ["Kemeja", "Celana", "Topi", "Sarung Tangan"],
      correctAnswer: "Topi",
    }, // Bukan di badan utama
    {
      id: 13,
      question: "Jika 'air' adalah 'haus', maka 'makanan' adalah '?'",
      options: ["Lapar", "Kenyang", "Masak", "Makan"],
      correctAnswer: "Lapar",
    },
    {
      id: 14,
      question:
        "Jika semua burung bisa terbang, dan penguin adalah burung. Apakah penguin bisa terbang?",
      options: ["Ya", "Tidak", "Tergantung spesies", "Tidak dapat ditentukan"],
      correctAnswer: "Tidak",
    },
    {
      id: 15,
      question: "Lengkapi deret huruf: Z, X, V, T, ?",
      options: ["R", "S", "U", "W"],
      correctAnswer: "R",
    },
    {
      id: 16,
      question: "Jika kemarin adalah hari Rabu, hari ini adalah hari apa?",
      options: ["Kamis", "Selasa", "Jumat", "Sabtu"],
      correctAnswer: "Kamis",
    },
    {
      id: 17,
      question:
        "3 dari 5 orang menyukai cokelat. Jika ada 100 orang, berapa yang menyukai cokelat?",
      options: ["30", "50", "60", "70"],
      correctAnswer: "60",
    },
    {
      id: 18,
      question:
        "Jika Anda membalikkan jam pasir dua kali, berapa kali pasirnya mengalir?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
    },
    {
      id: 19,
      question: "Manakah yang bukan alat musik: Gitar, Piano, Buku, Drum?",
      options: ["Gitar", "Piano", "Buku", "Drum"],
      correctAnswer: "Buku",
    },
    {
      id: 20,
      question: "Apa yang selalu datang tapi tidak pernah tiba?",
      options: ["Besok", "Waktu", "Malam", "Tidur"],
      correctAnswer: "Besok",
    },
    {
      id: 21,
      question:
        "Saya memiliki kota, tetapi tidak ada rumah. Saya memiliki gunung, tetapi tidak ada pohon. Saya memiliki air, tetapi tidak ada ikan. Saya ini apa?",
      options: ["Peta", "Buku", "Lukisan", "Bumi"],
      correctAnswer: "Peta",
    },
    {
      id: 22,
      question: "Jika Anda melempar batu ke dalam air, apa yang akan terjadi?",
      options: ["Tenggelam", "Mengambang", "Terbang", "Meledak"],
      correctAnswer: "Tenggelam",
    },
    {
      id: 23,
      question: "Apa yang memiliki banyak mata tetapi tidak bisa melihat?",
      options: ["Kentang", "Nanas", "Jaring", "Sikat"],
      correctAnswer: "Kentang",
    },
    {
      id: 24,
      question:
        "Saya tinggi ketika saya muda, dan pendek ketika saya tua. Saya ini apa?",
      options: ["Pohon", "Pensil", "Lilin", "Api"],
      correctAnswer: "Lilin",
    },
    {
      id: 25,
      question: "Apa yang Anda tangkap tetapi tidak bisa Anda lempar?",
      options: ["Bola", "Demam", "Ikan", "Ide"],
      correctAnswer: "Demam",
    },
    // Tambahkan lebih banyak soal hingga 50 atau 100 di sini jika diinginkan!
    // Pastikan setiap soal memiliki ID unik dan satu jawaban yang benar.
  ];

  // --- Fungsi Navigasi Halaman ---

  function redirectToTestPage(username) {
    if (username) {
      // Simpan nama di localStorage
      localStorage.setItem("loggedInUsernameIQ", username);
      window.location.href = `test.html`; // Arahkan ke halaman tes
    }
  }

  function redirectToLoginPage() {
    localStorage.removeItem("loggedInUsernameIQ"); // Hapus nama
    window.location.href = `index.html`; // Arahkan ke halaman login
  }

  // --- Logika Halaman Login (index.html) ---
  // Hanya jalankan jika elemen login ada di halaman ini
  if (startButton && usernameInput) {
    startButton.addEventListener("click", () => {
      const username = usernameInput.value.trim();
      if (username) {
        redirectToTestPage(username);
      } else {
        alert("Nama tidak boleh kosong!");
        usernameInput.focus();
      }
    });

    usernameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        startButton.click();
      }
    });
  }

  // --- Logika Halaman Tes (test.html) ---
  // Hanya jalankan jika elemen tes ada di halaman ini
  if (questionScreen && resultScreen) {
    // Cek login user
    const loggedInUsername = localStorage.getItem("loggedInUsernameIQ");
    if (loggedInUsername) {
      if (loggedInUserDisplay) {
        loggedInUserDisplay.textContent = loggedInUsername;
      }
      if (totalQuestionsDisplay) {
        totalQuestionsDisplay.textContent = String(TOTAL_QUESTIONS_IN_TEST);
      }

      // Atur event listener untuk logout
      if (logoutButtonOnTestPage) {
        logoutButtonOnTestPage.addEventListener("click", redirectToLoginPage);
      }

      // Inisialisasi tes saat halaman dimuat
      startNewTest();
    } else {
      // Jika tidak ada user login, arahkan kembali ke login page
      redirectToLoginPage();
    }

    // --- Fungsi Logika Tes ---

    function startNewTest() {
      userScore = 0;
      currentQuestionIndex = 0;
      // <<-- PENTING: Ambil N pertanyaan acak dari SEMUA pertanyaan -->>
      currentQuestions = shuffleArray(allIQQuestions).slice(
        0,
        TOTAL_QUESTIONS_IN_TEST
      );

      showScreen("questionScreen"); // Tampilkan layar pertanyaan
      displayQuestion();
    }

    function displayQuestion() {
      if (currentQuestionIndex < TOTAL_QUESTIONS_IN_TEST) {
        const question = currentQuestions[currentQuestionIndex];

        questionTextDisplay.textContent = question.question;
        currentQuestionNumberDisplay.textContent = String(
          currentQuestionIndex + 1
        );
        optionsContainer.innerHTML = ""; // Bersihkan opsi sebelumnya
        nextQuestionButton.classList.add("hidden"); // Sembunyikan tombol next

        question.options.forEach((option) => {
          const button = document.createElement("button");
          button.classList.add("option-button");
          button.textContent = option;
          button.addEventListener("click", () =>
            handleAnswer(button, option, question.correctAnswer)
          ); // Pass button element
          optionsContainer.appendChild(button);
        });

        // Aktifkan semua tombol opsi
        optionsContainer.querySelectorAll(".option-button").forEach((btn) => {
          btn.disabled = false;
          btn.classList.remove("selected-correct", "selected-wrong");
        });
      } else {
        // Tes selesai, tampilkan hasil
        showResult();
      }
    }

    function handleAnswer(clickedButton, selectedOption, correctAnswer) {
      // Terima elemen tombol yang diklik
      // Nonaktifkan semua tombol opsi setelah jawaban dipilih
      optionsContainer.querySelectorAll(".option-button").forEach((btn) => {
        btn.disabled = true;
        // Tambahkan kelas untuk jawaban yang benar dan salah
        if (btn.textContent === correctAnswer) {
          // Identifikasi jawaban yang benar
          btn.classList.add("selected-correct");
        } else if (btn.textContent === selectedOption) {
          // Identifikasi jawaban yang dipilih dan salah
          btn.classList.add("selected-wrong");
        }
      });

      if (selectedOption === correctAnswer) {
        userScore++;
      }

      // Tampilkan tombol "Soal Berikutnya" setelah jawaban
      nextQuestionButton.classList.remove("hidden");
    }

    function showResult() {
      showScreen("resultScreen");
      finalScoreDisplay.textContent = String(userScore);
      iqInterpretationDisplay.textContent = getIQInterpretation(
        userScore,
        TOTAL_QUESTIONS_IN_TEST
      );

      // Event listener untuk tombol "Ulangi Tes"
      retakeTestButton.addEventListener("click", startNewTest);
    }

    function getIQInterpretation(score, total) {
      const percentage = (score / total) * 100;
      if (percentage >= 90)
        return "Sangat Cerdas! Anda memiliki kecerdasan luar biasa. 🎉";
      if (percentage >= 70)
        return "Cerdas! Kemampuan berpikir logis Anda sangat baik. ✨";
      if (percentage >= 50)
        return "Di Atas Rata-rata! Anda memiliki potensi besar untuk terus berkembang. 💪";
      if (percentage >= 30)
        return "Rata-rata! Kemampuan Anda solid dan bisa ditingkatkan lagi. 👍";
      return "Perlu Latihan! Jangan khawatir, kecerdasan bisa diasah. Semangat! 🌱";
    }

    // Fungsi utilitas untuk mengacak array
    function shuffleArray(array) {
      const shuffled = [...array]; // Buat salinan agar array asli tidak berubah
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    // Fungsi untuk mengelola tampilan layar (question vs result)
    function showScreen(screenId) {
      const screens = document.querySelectorAll(".screen");
      screens.forEach((screen) => {
        if (screen.id === screenId) {
          screen.classList.add("active");
          screen.classList.remove("hidden");
        } else {
          screen.classList.add("hidden");
          screen.classList.remove("active");
        }
      });
    }

    // Event Listener untuk tombol Soal Berikutnya
    nextQuestionButton.addEventListener("click", () => {
      currentQuestionIndex++;
      displayQuestion();
    });
  }
});
