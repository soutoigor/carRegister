(function ($) {
    'use strict';
    /*
      Vamos estruturar um pequeno app utilizando módulos.
      Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
      A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
      seguinte forma:
      - No início do arquivo, deverá ter as informações da sua empresa - nome e
      telefone (já vamos ver como isso vai ser feito)
      - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
      um formulário para cadastro do carro, com os seguintes campos:
        - Imagem do carro (deverá aceitar uma URL)
        - Marca / Modelo
        - Ano
        - Placa
        - Cor
        - e um botão "Cadastrar"

      Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
      carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
      aparecer no final da tabela.

      Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
      empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
      Dê um nome para a empresa e um telefone fictício, preechendo essas informações
      no arquivo company.json que já está criado.
      
      Essas informações devem ser adicionadas no HTML via Ajax.
      
      Parte técnica:
      Separe o nosso módulo de DOM criado nas últimas aulas em
      um arquivo DOM.js.
      
      E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
      que será nomeado de "app".
      */
    var app = (function appController() {
       return {
         init: function init() {
           this.companyInfo();
           this.initEvents();
          
          //  var $modelo = $('[data-js="modelo"]').get();
          //  var $ano = $('[data-js="ano"]').get();
          //  var $placa = $('[data-js="placa"]').get();
          //  var $cor = $('[data-js="cor"]').get();
           
           
         }, 
          createNewCar: function createNewCar() {    
          var $fragment = document.createDocumentFragment();
          var $tr = document.createElement('tr');
          var $tdImage = document.createElement('td');
          var $image = document.createElement('img');
          var $tdBrand = document.createElement('td');
          var $tdYear = document.createElement('td');
          var $tdPlate = document.createElement('td');
          var $tdColor = document.createElement('td');
          
          $image.setAttribute('src', $('[data-js="image"]').get().value);
          $tdImage.appendChild($image);

     
          $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
          $tdYear.textContent = $('[data-js="year"]').get().value;
          $tdPlate.textContent = $('[data-js="plate"]').get().value;
          $tdColor.textContent = $('[data-js="color"]').get().value;

           $tr.appendChild($tdImage); 
           $tr.appendChild($tdBrand); 
           $tr.appendChild($tdYear); 
           $tr.appendChild($tdPlate); 
           $tr.appendChild($tdColor); 

          return $fragment.appendChild($tr);
          },
          initEvents: function initEvents(){

            $('[data-js="form-register"]').on('submit', this.handleSubmit );
            //automatizar abaixo com um forEach utilizando o id do campo para chamar a validação dele
            //e passar o Listener para cada
           // $('[data-js="form-register"]').on('submit', this.formValidation );
            

          },
          handleSubmit: function handleSubmit(e){
            e.preventDefault();
            if(!app.formValidation())
              return;

            var $tableCar = $('[data-js="table-car"]').get();
            $tableCar.appendChild(app.createNewCar());
          },
          companyInfo: function companyInfo() {
            
            var ajax = new XMLHttpRequest();
            ajax.open('GET', 'company.json', true);
            ajax.send();
            
            ajax.addEventListener('readystatechange', this.getCompanyInfo);
            
          },
          
          getCompanyInfo: function getCompanyInfo() {
            if (app.isReady.call(this))
            return;
            
            console.log('teste')
            
          var data = JSON.parse(this.responseText);
          var $companyName = $('[data-js="company-name"]');
          var $companyPhone = $('[data-js="company-phone"]');
          $companyName.get().textContent = data.name;
          $companyPhone.get().textContent = data.phone;
        },

        isReady: function isReady(){
          return this.readyState === 4 && this.status === 200;
        },
        formValidation: function formValidation(){
          var regexPlate = /[a-zA-Z]{3}-[\d]{4}$/g
               if(!regexPlate.test($('[data-js="plate"]').get().value)){
                 alert('insira uma placa válida');
                 return false;
               }
               return true;
         /*return {
            year:  $('[data-js="year"]').get().value = $('[data-js="year"]').get().value.replace(/\D/g, ''),
            plate: function(){
              var regexPlate = /[a-zA-Z]{3}-[\d]{4}/g
               if(!regexPlate.test($('[data-js="plate"]').get().value))
                 return alert('insira uma placa válida');
            },
            brand: $('[data-js="brand-model"]').get().value,
            color: $('[data-js="color"]').get().value
          };*/
        }

 

      

    };
  })();
  app.init();
  

})(window.DOM);
