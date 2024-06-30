const { By, Key, until } = require('selenium-webdriver');
require('chromedriver');
const reusable_step = require('../../page/reusable_test');
const assertion = require('../../helpers/assertion');
const element = require('../../helpers/element');
const { expect } = require('chai');

describe('Nexmedis', function() {
    describe('Login Page', function() {
        before(async function() {
            await reusable_step.accessWeb();
        })
        after(async function () {
            await driver.quit();
        });
        afterEach(async function () {
            // await driver.sleep(40000);
        });
        it('[TC0001] Pengguna dapat mengakses halaman login', async function() 
        {
            await assertion.assertionEqualSelectorValue(`//p[@class="subtitle"]`, `Healthcare Management Software`);
            await assertion.assertionEqualSelectorValue(`//div[@class="title"]`, `Sistem informasi kesehatan terpadu untuk pelayanan medis`);
            await assertion.assertionEqualSelectorValue(`//h1[@class="desc"]`, `Aplikasi rekam medis elektronik (RME) bertenaga AI untuk menyederhanakan operasional fasilitas kesehatan, memajukan layanan klinis Anda`);
        })
        it('[TC0002] Pengguna dapat login dengan email dan password yang benar', async function() 
        {
            await element.fillFilledXpath(`//input[@id='email_or_phone']`, process.env.email);
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password);
            await element.clickButtonXpath(`//button[normalize-space()='Login']`);
            await assertion.assertionEqualSelectorValue(`//div[@class='notif success']/p`, `Login berhasil`);
        })
        it('[TC0003] Pengguna dapat login dengan nomor handphone dan password yang benar', async function() 
        {
            await element.fillFilledXpath(`//input[@id='email_or_phone']`, process.env.no_hp);
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password);
            await element.clickButtonXpath(`//button[normalize-space()='Login']`);
            await assertion.assertionEqualSelectorValue(`//div[@class='notif success']/p`, `Login berhasil`);
        })
        it('[TC0004] Pengguna tidak dapat login dengan format email tidak valid ', async function() 
        {
            await element.fillFilledXpath(`//input[@id='email_or_phone']`, process.env.email_invalid);
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password);
            await element.clickButtonXpath(`//button[normalize-space()='Login']`);
            await assertion.assertionEqualSelectorValue(`//div[@class='notif danger']/p`, `Email tidak valid!`);
            await element.getElement(`//p[contains(text(), 'Email tidak valid!')]`);
        })
        it('[TC0005] Pengguna tidak dapat login dengan field kosong', async function() 
        {
            await element.fillFilledXpath(`//input[@id='email_or_phone']`, '');
            await element.fillFilledXpath(`//input[@id='password']`, '');
            await element.clickButtonXpath(`//button[normalize-space()='Login']`);
            await assertion.assertionEqualSelectorValue(`//div[@class='notif danger']/p`, `Email/No HP dan Password wajib diisi`);
            await element.getElement(`//p[contains(text(), 'Email harus diisi')]`);
            await element.getElement(`//p[contains(text(), 'Password harus diisi')]`);
        })
        it('[TC0006] Pengguna tidak dapat login dengan kombinasi email dan password salah', async function() 
        {
            await element.fillFilledXpath(`//input[@id='email_or_phone']`, process.env.email);
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password_invalid);
            await element.clickButtonXpath(`//button[normalize-space()='Login']`);
            await assertion.assertionEqualSelectorValue(`//div[@class='notif danger']/p`, `Email atau password salah`);
        })
        it('[TC0007] Pengguna tidak dapat login dengan kombinasi nomor handphone dan password salah', async function() 
        {
            await element.fillFilledXpath(`//input[@id='email_or_phone']`, process.env.no_hp);
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password_invalid);
            await element.clickButtonXpath(`//button[normalize-space()='Login']`);
            await assertion.assertionEqualSelectorValue(`//div[@class='notif danger']/p`, `Nomor Handphone atau password salah`);
        })
        it('[TC0008] Pengguna tidak dapat login dengan Nomor Handphone tidak diawali dengan 08', async function() 
        {
            await element.fillFilledXpath(`//input[@id='email_or_phone']`, process.env.no_hp_invalid);
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password);
            await element.clickButtonXpath(`//button[normalize-space()='Login']`);
            await assertion.assertionEqualSelectorValue(`//div[@class='notif danger']/p`, `Nomor Handphone tidak valid`);
            await element.getElement(`//p[contains(text(), 'Nomor Handphone harus diawali dengan 08')]`);
        })
        it('[TC0009] Pengguna tidak dapat login dengan Nomor Handphone dengan angka kurang dari 9 digit', async function() 
        {
            await element.fillFilledXpath(`//input[@id='email_or_phone']`, process.env.no_hp_lt_9);
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password);
            await element.clickButtonXpath(`//button[normalize-space()='Login']`);
            await assertion.assertionEqualSelectorValue(`//div[@class='notif danger']/p`, `Nomor Handphone tidak valid`);
            await element.getElement(`//p[contains(text(), 'Nomor Handphone minimal 9 digit')]`);
        })
        it('[TC0010] Pengguna tidak dapat login dengan Nomor Handphone dengan angka lebih dari 12 digit', async function() 
        {
            await element.fillFilledXpath(`//input[@id='email_or_phone']`, process.env.no_hp_gt_12);
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password);
            await element.clickButtonXpath(`//button[normalize-space()='Login']`);
            await assertion.assertionEqualSelectorValue(`//div[@class='notif danger']/p`, `Nomor Handphone tidak valid`);
            await element.getElement(`//p[contains(text(), 'Nomor Handphone maksimal 12 digit')]`);
        })
        it('[TC0011] Pengguna tidak dapat login dengan email yang belum terdaftar', async function() 
        {
            await element.fillFilledXpath(`//input[@id='email_or_phone']`, process.env.email_not_registered);
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password);
            await element.clickButtonXpath(`//button[normalize-space()='Login']`);
            await assertion.assertionEqualSelectorValue(`//div[@class='notif danger']/p`, `Alamat email belum terdaftar`);
        })
        it('[TC0012] Pengguna tidak dapat login dengan nomor handphone yang belum terdaftar', async function() 
        {
            await element.fillFilledXpath(`//input[@id='email_or_phone']`, process.env.email_not_registered);
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password);
            await element.clickButtonXpath(`//button[normalize-space()='Login']`);
            await assertion.assertionEqualSelectorValue(`//div[@class='notif danger']/p`, `Nomor Handphone belum terdaftar`);
        })
    })
})