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

  // ==== Menampilkan Makanan Unggulan (di index.html) ====
  const containerMakanan = document.getElementById('featuredFoods');
  if (containerMakanan) {
    const makananUnggulan = [
      {
        nama: 'Rendang',
        asal: 'Sumatera Barat',
        deskripsi: 'Dimasak lama dengan santan dan rempah sampai kering.',
        gambar: 'rendang.jpg'
      },
      {
        nama: 'Gudeg',
        asal: 'Yogyakarta',
        deskripsi: 'Nangka muda manis dimasak dengan santan.',
        gambar: 'https://images.unsplash.com/photo-1563245372-f21724e3856d'
      },
      {
        nama: 'Soto Betawi',
        asal: 'Jakarta',
        deskripsi: 'Soto kuah santan dengan daging sapi dan empuk.',
        gambar: 'soto betawi.jpg'
      }
    ];

    makananUnggulan.forEach(function (item) {
      const card = document.createElement('div');
      card.className = 'food-card';

      card.innerHTML = `
        <img src="${item.gambar}" class="food-img" alt="${item.nama}">
        <div class="food-info">
          <h3>${item.nama}</h3>
          <p>${item.asal}</p>
          <p>${item.deskripsi}</p>
          <a href="menu.html" class="btn btn-primary">Lihat Detail</a>
        </div>
      `;

      containerMakanan.appendChild(card);
    });
  }

  // ==== Filter Menu berdasarkan Daerah (menu.html) ====
  const daftarMenu = document.getElementById('menuList');
  const filterWilayah = document.getElementById('regionFilter');
  const detailMakanan = document.getElementById('foodDetail');

  const semuaMakanan = [
    { id: 1, nama: 'Rendang', asal: 'Sumatera Barat', deskripsi: 'Dimasak lama dengan santan dan rempah sampai kering.', gambar: 'rendang.jpg' },
    { id: 2, nama: 'Gudeg', asal: 'Yogyakarta', deskripsi: 'Nangka muda manis dimasak dengan santan.', gambar: 'gudeg.jpg' },
    { id: 3, nama: 'Soto Betawi', asal: 'Jakarta', deskripsi: 'Soto kuah santan dengan daging sapi dan empuk.', gambar: 'soto betawi.jpg' },
    { id: 4, nama: 'Kaledo', asal: 'Sulawesi Tengah', deskripsi: 'Sup kaki sapi dengan kuah asam pedas khas Palu.', gambar: 'kaledo.jpg' },
    { id: 5, nama: 'Pappeda', asal: 'Papua', deskripsi: 'Bubur sagu dengan ikan kuah kuning.', gambar: 'onyop.jpg' },
    { id: 6, nama: 'Ayam Betutu', asal: 'Bali', deskripsi: 'Ayam berbumbu rempah khas Bali, dibungkus daun pisang.', gambar: 'ayam betutu.jpg' }
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
