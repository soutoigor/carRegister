(function ($) {
    'use strict';
   
    var app = (function appController() {
       return {
         init: function init() {
           this.companyInfo();
           this.initEvents();
                    
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
          var $tdRemove = document.createElement('td');
          
          $image.setAttribute('src', $('[data-js="image"]').get().value);
          $tdImage.appendChild($image);

     
          $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
          $tdYear.textContent = $('[data-js="year"]').get().value;
          $tdPlate.textContent = $('[data-js="plate"]').get().value;
          $tdColor.textContent = $('[data-js="color"]').get().value;
          $tdRemove.setAttribute('data-js','remove-car');
          $tdRemove.insertAdjacentHTML("afterbegin", '<i class="fas fa-trash-alt" style=\' cursor: pointer; \' ></i>');

           $tr.appendChild($tdImage); 
           $tr.appendChild($tdBrand); 
           $tr.appendChild($tdYear); 
           $tr.appendChild($tdPlate); 
           $tr.appendChild($tdColor); 
           $tr.appendChild($tdRemove); 

          $fragment.appendChild($tr);
          
          //cógido de outro projeto
          function removeCar(line){
            return function (){
              if($tr.parentNode){
                $tr.parentNode.removeChild( $tr );
              }
       }
       }
          if($tr){ $tdRemove.addEventListener('click', removeCar) };

          },
          initEvents: function initEvents(){
        //  this.formValidation();

        $('[data-js="form-register"]').on( 'submit', this.handleSubmit );
            
            
          },
          handleSubmit: function handleSubmit(e){
            e.preventDefault();
            
            
            var $tableCar = $('[data-js="table-car"]').get();
            $tableCar.appendChild(app.createNewCar());
            app.removeCar();

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
            
            
          var data = JSON.parse(this.responseText);
          var $companyName = $('[data-js="company-name"]');
          var $companyPhone = $('[data-js="company-phone"]');
          $companyName.get().textContent = data.name;
          $companyPhone.get().textContent = data.phone;
        },

        isReady: function isReady(){
          return this.readyState === 4 && this.status === 200;
        }
        /*,
        formValidation: function formValidation(){

          //  if (form.checkValidity() === false) {
                  
          //       }
                

          $('[data-js="year"]').get().addEventListener('input', function(e){
            $('[data-js="year"]').get().value = $('[data-js="year"]').get().value.replace(/\D/g, '');
            
          });
         
          $('[data-js="plate"]').get().addEventListener('blur', function(){
            var regexPlate = /[a-zA-Z]{3}-[\d]{4}$/g;
               if(!regexPlate.test($('[data-js="plate"]').get().value)){
                $('[data-js="form-register"]').get().classList.add('was-validated');
                return false;
               }
               return true;
          });

        }*/

 

      

    };
  })();
  app.init();
  

})(window.DOM);
