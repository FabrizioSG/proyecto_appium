const { remote } = require('webdriverio');
const assert = require('assert');

const capabilities = {

    'acceptInsecureCerts': true,
    'platformName': 'Android',
    'appium:platformVersion': '14.0',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Pixel_3a_API_34_extension_level_7_x86_64',
    "appium:appPackage": "com.google.android.calculator",
    'appium:appActivity': 'com.android.calculator2.Calculator',
};

const wdOpts = {
    hostname: process.env.APPIUM_HOST || '0.0.0.0',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    path: '/wd/hub', // Agrega el path '/wd/hub' para completar la URL del servidor de Appium
    logLevel: 'info',
    capabilities,
};

async function runTest1() {
    const driver = await remote(wdOpts);
    try {
        // Localizar y hacer clic en los botones para la suma
        const buttonOne = await driver.$('//android.widget.ImageButton[@content-desc="1"]');
        await buttonOne.click();

        const buttonPlus = await driver.$('//android.widget.ImageButton[@content-desc="plus"]');
        await buttonPlus.click();

        const buttonThree = await driver.$('//android.widget.ImageButton[@content-desc="3"]');
        await buttonThree.click();

        const buttonEquals = await driver.$('//android.widget.ImageButton[@content-desc="equals"]');
        await buttonEquals.click();

        await driver.pause(1000); 

        // Localizar el elemento que contiene el texto de la pantalla de la calculadora
        const screenElement = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.FrameLayout[1]/android.widget.TextView');

        // Obtener el texto de la pantalla
        const text = await screenElement.getText();
        // Hacer la aserción para verificar si el resultado es "4"
        assert.strictEqual(text, "4", `El resultado esperado es "4", pero se obtuvo "${text}"`);
        
        console.log('Resultado de la suma:', text);
    } finally {
        await driver.deleteSession();
    }
}
/*
Este runtest2 es solo para probar correr varios casos de prueba seguidos
Hay que escoger cuales otros 2 casos de prueba queremos
El 2 tiene que pasar y un tercero que falle
*/
async function runTest2() {
    const driver = await remote(wdOpts);
    try {
        // Localizar y hacer clic en los botones para la suma
        const buttonOne = await driver.$('//android.widget.ImageButton[@content-desc="2"]');
        await buttonOne.click();

        const buttonPlus = await driver.$('//android.widget.ImageButton[@content-desc="plus"]');
        await buttonPlus.click();

        const buttonThree = await driver.$('//android.widget.ImageButton[@content-desc="3"]');
        await buttonThree.click();

        const buttonEquals = await driver.$('//android.widget.ImageButton[@content-desc="equals"]');
        await buttonEquals.click();

        await driver.pause(1000); 

        // Localizar el elemento que contiene el texto de la pantalla de la calculadora
        const screenElement = await driver.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.FrameLayout[1]/android.widget.TextView');

        // Obtener el texto de la pantalla
        const text = await screenElement.getText();
        // Hacer la aserción para verificar si el resultado es "4"
        assert.strictEqual(text, "5", `El resultado esperado es "5", pero se obtuvo "${text}"`);
        
        console.log('Resultado de la suma:', text);
    } finally {
        await driver.deleteSession();
    }
}
// Ejecutar los casos de prueba
async function runAllTests() {
    try {
      await runTest1();
      await runTest2();
    } catch (error) {
      console.error('Error en las pruebas:', error);
    }
  }
  
  // Llamar a la función para ejecutar todos los casos de prueba
runAllTests();

