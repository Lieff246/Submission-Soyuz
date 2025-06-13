document.addEventListener('DOMContentLoaded', function () {
  // ==== Toggle Menu untuk versi mobile ====
  const tombolMenu = document.querySelector('.hamburger');
  const menuNavigasi = document.querySelector('.nav-links');

  if (tombolMenu && menuNavigasi) {
    tombolMenu.addEventListener('click', function () {
      tombolMenu.classList.toggle('active');
      menuNavigasi.classList.toggle('active');
    });

    // Supaya menu nutup kalau link diklik
    const semuaLink = menuNavigasi.querySelectorAll('a');
    semuaLink.forEach(function (link) {
      link.addEventListener('click', function () {
        tombolMenu.classList.remove('active');
        menuNavigasi.classList.remove('active');
      });
    });
  }


  // ==== Filter Menu berdasarkan Daerah (menu.html) ====
  const daftarMenu = document.getElementById('listmenu');
  const filterWilayah = document.getElementById('filterWilayah');
  const detailMakanan = document.getElementById('detailmakanan');

  const semuaMakanan = [
    { id: 1, nama: 'Rendang', asal: 'Sumatera Barat', deskripsi: 'Rendang adalah makanan khas Sumatra Barat yang terbuat dari daging sapi yang dimasak lama dengan santan dan campuran rempah-rempah khas Minang, seperti serai, lengkuas, cabai, bawang, dan kunyit. Proses memasaknya yang perlahan membuat daging menjadi empuk dan bumbu meresap sempurna, menghasilkan cita rasa yang kaya, gurih, dan pedas. Rendang tidak hanya populer di Indonesia, tapi juga dikenal secara internasional sebagai salah satu makanan terenak di dunia.', gambar: 'rendang.jpg' },
    { id: 2, nama: 'Gudeg', asal: 'Yogyakarta', deskripsi: 'Gudeg adalah makanan khas Yogyakarta yang terbuat dari nangka muda yang dimasak lama dengan santan dan gula merah, menghasilkan rasa manis dan warna cokelat khas. Gudeg biasanya disajikan dengan nasi, ayam opor, telur pindang, tahu atau tempe, dan sambal krecek. Cita rasanya yang manis dan lembut mencerminkan karakter kuliner Jawa yang khas. Gudeg dikenal sebagai ikon kuliner Yogyakarta dan sering dijuluki sebagai “kota gudeg.”', gambar: 'gudeg.jpg' },
    { id: 3, nama: 'Soto Betawi', asal: 'Jakarta', deskripsi: 'Soto Betawi adalah makanan khas Jakarta yang terdiri dari potongan daging sapi atau jeroan yang dimasak dalam kuah santan atau susu yang gurih dan kaya rempah. Ciri khasnya terletak pada kuahnya yang kental dan creamy, dengan aroma rempah seperti serai, lengkuas, dan kayu manis. Soto Betawi biasanya disajikan dengan pelengkap seperti emping, kentang goreng, tomat, dan bawang goreng, serta disantap bersama nasi putih. Rasanya gurih dan lezat, mencerminkan kekayaan kuliner khas Betawi.', gambar: 'soto betawi.jpg' },
    { id: 4, nama: 'Coto Makassar', asal: 'Sulawesi Selatan', deskripsi: 'Coto Makassar adalah makanan khas Makassar, Sulawesi Selatan, berupa sup daging sapi yang dimasak dengan bumbu rempah khas dan kuah berbasis kacang tanah yang dihaluskan. Biasanya menggunakan jeroan sapi seperti hati, usus, atau babat, yang direbus lama hingga empuk. Coto Makassar disajikan hangat bersama ketupat atau buras, serta sambal dan jeruk nipis sebagai pelengkap. Rasanya gurih, kaya rempah, dan sedikit creamy, menjadikannya salah satu kuliner ikonik Sulawesi Selatan.', gambar: 'coto.jpeg' },
    { id: 5, nama: 'Kaledo', asal: 'Sulawesi Tengah', deskripsi: 'Kaledo adalah makanan khas Palu, Sulawesi Tengah, yang terdiri dari sup tulang kaki sapi dengan kuah bening yang kaya rasa. Nama "kaledo" berasal dari singkatan kaki lembu donggala. Hidangan ini disajikan dengan tulang besar berisi sumsum yang dinikmati dengan cara diseruput, ditemani nasi atau ubi rebus. Rasanya gurih, sedikit asam, dan pedas, karena menggunakan bumbu seperti cabai dan asam jawa. Kaledo menjadi simbol kuliner khas Palu yang unik dan menggugah selera.', gambar: 'kaledo.jpg'},
    { id: 6, nama: 'Nasi Padang', asal: 'Sumatera Barat', deskripsi: 'Nasi Padang adalah makanan khas Minangkabau yang terdiri dari nasi putih yang disajikan dengan berbagai macam lauk pauk bercita rasa kuat dan kaya rempah, seperti rendang, gulai ayam, sambal ijo, dan sayur nangka. Ciri khasnya terletak pada penyajian lauk yang melimpah dan penggunaan santan serta cabai dalam masakan. Nasi Padang terkenal di seluruh Indonesia karena rasanya yang gurih, pedas, dan aromatik, serta cara penyajiannya yang unik, yaitu semua hidangan disusun di atas meja dan dipilih sesuai selera.', gambar: 'nasi padang.jpg' },
    { id: 7, nama: 'Pappeda', asal: 'Papua', deskripsi: 'Papeda adalah bubur sagu khas Papua yang menjadi ikon makanan tradisional timur Indonesia. Teksturnya kenyal dan lengket, sering disantap bersama ikan kuah kuning berbumbu rempah yang kaya, menciptakan perpaduan rasa unik dan lezat.', gambar: 'onyop.jpg' },
    { id: 8, nama: 'Ayam Betutu', asal: 'Bali', deskripsi: 'Ayam Betutu adalah makanan khas Bali yang terbuat dari ayam utuh yang dibumbui dengan base genep, yaitu campuran rempah khas Bali seperti bawang, kunyit, jahe, lengkuas, dan cabai. Ayam dibungkus daun pisang lalu dimasak dengan cara dikukus atau dipanggang hingga empuk dan bumbunya meresap sempurna. Rasanya pedas, gurih, dan aromatik. Ayam Betutu biasanya disajikan dalam upacara adat maupun sebagai hidangan istimewa dalam jamuan keluarga di Bali.', gambar: 'ayam betutu.jpg' },
    { id: 9, nama: 'Kerak Telur', asal: 'Jakarta', deskripsi: 'Kerak Telur adalah makanan khas Jakarta yang terbuat dari beras ketan, telur ayam atau bebek, dan ebi (udang kering), yang dimasak di atas wajan tanpa minyak. Hidangan ini dibumbui dengan kelapa parut sangrai dan rempah-rempah, lalu dimasak hingga bagian bawahnya garing seperti kerak. Rasanya gurih dan sedikit manis, dengan tekstur renyah di luar dan lembut di dalam. Kerak Telur sering dijumpai di acara-acara budaya Betawi dan menjadi ikon kuliner tradisional Jakarta.', gambar: 'kerak telor.jpg' }
  ];

  function tampilkanMenu(daerahDipilih = 'all') {
    daftarMenu.innerHTML = '';
    const hasil = daerahDipilih === 'all'
      ? semuaMakanan
      : semuaMakanan.filter(m => m.asal === daerahDipilih);

    hasil.forEach(function (m) {
      const elemen = document.createElement('div');
      elemen.className = 'food-card';
      elemen.innerHTML = `
        <img src="${m.gambar}" class="food-img" alt="${m.nama}">
        <div class="food-info">
          <h3>${m.nama}</h3>
          <p>${m.asal}</p>
          <button class="btn btn-primary" data-id="${m.id}">Lihat Detail</button>
        </div>
      `;
      daftarMenu.appendChild(elemen);
    });
  }

  function tampilkanDetail(id) {
    const cari = semuaMakanan.find(m => m.id == id);
    if (cari) {
      detailMakanan.innerHTML = `
        <div class="food-card">
          <img src="${cari.gambar}" class="food-img" alt="${cari.nama}">
          <div class="food-info">
            <h3>${cari.nama}</h3>
            <p><strong>Asal:</strong> ${cari.asal}</p>
            <p>${cari.deskripsi}</p>
          </div>
        </div>
      `;
      window.scrollTo({ top: detailMakanan.offsetTop - 80, behavior: 'smooth' });
    }
  }

  if (daftarMenu && filterWilayah) {
    tampilkanMenu();
    filterWilayah.addEventListener('change', function () {
      tampilkanMenu(filterWilayah.value);
    });

    daftarMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'BUTTON') {
        tampilkanDetail(e.target.dataset.id);
      }
    });
  }
});
