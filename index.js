const axios = require('axios');
const cheerio = require('cheerio');

// URL dari halaman web yang ingin di-scrape
const url = 'https://ub-baitulmakmur.com/shop/page/2';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const products = [];

    // Menyaring elemen produk
    $('.product').each((index, element) => {
      const name = $(element).find('.woocommerce-loop-product__title').text().trim();
      const price = $(element).find('.woocommerce-Price-amount').text().trim();
      const link = $(element).find('.woocommerce-LoopProduct-link').attr('href');

      // Menggunakan ekspresi reguler untuk menemukan barcode 12 atau 13 digit dalam name
      const match = name.match(/(\d{12,13})$/);
      const barcode = match ? match[0] : 'No barcode';

      products.push({
        name,
        barcode,
        price,
        link
      });
    });

    // Mencetak data produk ke konsol
    console.log('Data produk berhasil diambil:');
    products.forEach(product => {
      console.log(`Name: ${product.name}`);
      console.log(`Barcode: ${product.barcode}`);
      console.log(`Price: ${product.price}`);
      console.log(`Link: ${product.link}`);
      console.log('-----------------------------');
    });
  })
  .catch(error => {
    console.error('Terjadi kesalahan:', error);
  });