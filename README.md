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
npm install chromedriver // [jika menggunakan chrome driver] pastikan versi chromedriver sama dengan versi browser 
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
### Run test tanpa generate allure report
1.  Command untuk menjalankan test tanpa generate file `.json`  
```
`npm test`
`npm test <path>`
```


### Run test sekaligus generate allure report
1. Untuk mengenerate folder `allure-results` secara otomatis ketika run test, jalankan command berikut:
```
npm run generate
npm run generate <path> // untuk path spesifik
```
2. Jalankan `npm run report` untuk generate folder `allure-report` 
3. Kemudian jalankan `npm run start` pada terminal untuk meluncurkan allure-report pada browser dengan port `8080` (jangan stop/close/ctrl+c terminal)


---
## Eksport Issue Allure-Report
- Setelah menjalankan `npm run start` dan `npm run report` maka halaman Allure-Report akan muncul. 
