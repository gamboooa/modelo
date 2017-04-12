const Nightmare = require('nightmare');		
const nightmare = Nightmare({ show: false, width: 1080 });
const config = require('./config.json');

nightmare
  .goto('https://www.afpmodelo.cl/AFP/Home.aspx')
  .wait('#Login_Rut')
  .type('#Login_Rut', config.rut)
  .type('#Login_Clave', config.pass)
  .type('#Btn_Ingresar', '\u000d')
  .wait('td[class="txt_total_ahorrado"]')
  .evaluate(function () {
      let monto_str = document.querySelectorAll('td[class="txt_total_ahorrado"]')[1].innerText;
      let monto_int = parseInt(monto_str.replace('$ ', '').replace(/\./g, ''))
      return { monto_str: monto_str, monto_int: monto_int };
  })
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('failed:', error);
  });