# Automation - nexmedis - Login Page

This is an automation script using

- Selenium
- JavaScript
- Mocha
- Chai
- Allure report
- firefox webdriver

## Initiate Automation Project

```
npm install selenium-webdriver
npm install chromedriver // pastikan versi chromedriver sama dengan versi browser
npm install dotenv
```
---
### Setup Allure Report
- Kemudian install dependencies yaitu allure-report run command berikut:
```
npm install allure-commandline
npm install allure-mocha
```

---

### Run Selenium dan Allure Report
- Setelah setup selenium dan allure-report pastikan `scripts` pada `package.json` seperti dibawah
```
  "scripts": {
    "generate": "mocha -r dotenv/config --no-timeouts --reporter allure-mocha",
    "start": "allure open allure-report --port 8080",
    "report": "allure generate allure-results --clean",
    "test": "mocha -r dotenv/config --no-timeouts"
  },
```
- Pertama command untuk menjalankan test tanpa generate file `.json` gunakan `npm test` atau `npm test <path>`.
- Jalankan `npm run report` untuk generate folder `allure-report` 
- Kemudian jalankan `npm run start` pada terminal untuk meluncurkan allure-report pada browser dengan port `8080` (jangan stop/close/ctrl+c terminal)
- Kemudian run selenium test yang diinginkan pada terminal lain dan akan generate folder `allure-results` secara otomatis.
```
npm run generate
npm run generate <path> // untuk path spesifik
```
- Dan jalankan `npm run report` dan klik tombol refresh halaman port 8080.

---
## Eksport Issue Allure-Report
- Setelah menjalankan `npm run start` dan `npm run report` maka halaman Allure-Report akan muncul. 
