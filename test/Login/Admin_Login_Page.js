const { By, Key, until } = require('selenium-webdriver');
require('chromedriver');
const reusable_step = require('../../page/reusable_test');
const assertion = require('../../helpers/assertion');
const element = require('../../helpers/element');
const { expect } = require('chai');
const { randomAlphabet } = require('../../helpers/randomUtil');

describe('Nexmedis', function() {
    describe('Login Page', function() {
        before(async function() {
            // await reusable_step.accessWeb();
        })
        beforeEach(async function() {
            // await driver.get(process.env.BASE_URL);
            await reusable_step.accessWeb();
        })
        after(async function () {
            // await driver.quit();
        });
        afterEach(async function () {
            // await driver.sleep(40000);
            await driver.quit();
        });
        it('[TC0001] Pengguna dapat mengakses halaman login', async function() 
        {
            await assertion.assertionEqualSelectorValue(`//p[@class="subtitle"]`, `Healthcare Management Software`);
            await assertion.assertionEqualSelectorValue(`//div[@class="title"]`, `Sistem informasi kesehatan terpadu untuk pelayanan medis`);
            await assertion.assertionEqualSelectorValue(`//h1[@class="desc"]`, `Aplikasi rekam medis elektronik (RME) bertenaga AI untuk menyederhanakan operasional fasilitas kesehatan, memajukan layanan klinis Anda`);
        })
        it('[TC0002] Pengguna dapat melanjutkan login dengan ID organisasi dengan benar', async function() 
        {
            await element.fillFilledXpath(`//input[@id='id']`, process.env.organization_id );
            await element.clickButtonXpath(`//button[@class="btn solid"]`);
            await assertion.assertionValueExists(`//input[@id='id']`);
            await assertion.assertionValueExists(`//input[@id='password']`);
        })
        it('[TC0003] Pengguna tidak dapat melanjutkan proses login dengan ID organisasi kosong', async function() 
        {
            await element.clickButtonXpath(`//button[@class="btn solid"]`);
            await assertion.assertionEqualSelectorValue(`//span[@class="nex-notification__header__title"]`, 'Gagal' );
            await assertion.assertionEqualSelectorValue(`//div[@class="nex-notification__body"]/span`, 'Please fill your channel id' );
        })
        it('[TC0004] Pengguna tidak dapat melanjutkan proses login dengan ID organisasi yang tidak terdaftar', async function() 
        {
            await element.fillFilledXpath(`//input[@id='id']`, randomAlphabet(10) );
            await element.clickButtonXpath(`//button[@class="btn solid"]`);
            await assertion.assertionValueExists(`//div[@class="modal"]`);
            await assertion.assertionEqualSelectorValue(`//div[@class="modal"]//h4`, 'ID Organisasi/Perusahaan tidak valid. Silahkan ulangi kembali.');
        })
        it('[TC0005] Pengguna dapat login dengan email dan password yang benar', async function() 
        {
            await reusable_step.inputOrganizationID();
            await element.fillFilledXpath(`//input[@id='id']`, process.env.email);
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password);
            await element.clickButtonXpath(`//button[@class="btn solid"]`);
            await assertion.assertionEqualSelectorValue(`//div[@class="header-container"]/div[@class="header"]/h1`, 'Fasyankes Anda' );
            await assertion.assertionEqualSelectorValue(`//div[@class="header-container"]/p`, 'Klik pada kartu untuk mengelola fasyankes Anda. Anda juga dapat mengelola pasien, apotek, klinik, dan mendapatkan laporan data waktu nyata' );
        })
        it('[TC0006] Pengguna dapat login dengan nomor handphone dan password yang benar', async function() 
        {
            await reusable_step.inputOrganizationID();
            await element.fillFilledXpath(`//input[@id='id']`, process.env.phone_number);
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password);
            await element.clickButtonXpath(`//button[@class="btn solid"]`);
            await assertion.assertionEqualSelectorValue(`//div[@class="header-container"]/div[@class="header"]/h1`, 'Fasyankes Anda' );
            await assertion.assertionEqualSelectorValue(`//div[@class="header-container"]/p`, 'Klik pada kartu untuk mengelola fasyankes Anda. Anda juga dapat mengelola pasien, apotek, klinik, dan mendapatkan laporan data waktu nyata' );
        })
        it('[TC0007] Pengguna tidak dapat login dengan format email tidak valid ', async function() 
        {
            await reusable_step.inputOrganizationID();
            await element.fillFilledXpath(`//input[@id='id']`,  randomAlphabet(10) );
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password);
            await element.clickButtonXpath(`//button[@class="btn solid"]`);
            await driver.sleep(650);
            await assertion.assertionEqualSelectorValue(`//span[@class="nex-notification__header__title"]`, 'Gagal' );
            await assertion.assertionEqualSelectorValue(`//div[@class="nex-notification__body"]/span`, 'Login Failed - The username or password you entered is incorrect.' );
        })
        it('[TC0008] Pengguna tidak dapat login dengan field kosong', async function() 
        {
            
            await reusable_step.inputOrganizationID();
            await element.clickButtonXpath(`//button[@class="btn solid"]`);
            await driver.sleep(650);
            await assertion.assertionEqualSelectorValue(`//span[@class="nex-notification__header__title"]`, 'Gagal' );
            await assertion.assertionEqualSelectorValue(`//div[@class="nex-notification__body"]/span`, 'Semua input field wajib diisi' );
        })
        it('[TC0009] Pengguna tidak dapat login dengan kombinasi email dan password salah', async function() 
        {
            await reusable_step.inputOrganizationID();
            await element.fillFilledXpath(`//input[@id='id']`,  process.env.email );
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password_invalid);
            await element.clickButtonXpath(`//button[@class="btn solid"]`);
            await driver.sleep(650);
            await assertion.assertionEqualSelectorValue(`//span[@class="nex-notification__header__title"]`, 'Gagal' );
            await assertion.assertionEqualSelectorValue(`//div[@class="nex-notification__body"]/span`, 'Invalid password.' );
        })
        it('[TC0010] Pengguna tidak dapat login dengan kombinasi nomor handphone dan password salah', async function() 
        {
            await reusable_step.inputOrganizationID();
            await element.fillFilledXpath(`//input[@id='id']`,  process.env.phone_number );
            await element.fillFilledXpath(`//input[@id='password']`, process.env.password_invalid);
            await element.clickButtonXpath(`//button[@class="btn solid"]`);
            await driver.sleep(650);
            await assertion.assertionEqualSelectorValue(`//span[@class="nex-notification__header__title"]`, 'Gagal' );
            await assertion.assertionEqualSelectorValue(`//div[@class="nex-notification__body"]/span`, 'Invalid password.' );
        })
    })
})