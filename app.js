(function ($) {
  'use strict';

  var app = (function appController() {
    return {
      init: function init() {
        this.companyInfo();
        this.listCars();
        this.initEvents();

      },
      createNewCar: function createNewCar() {
        
        var $urlImage = $('[data-js="image"]').get().value;
        var $tdBrand = $('[data-js="brand-model"]').get().value;
        var $tdYear = $('[data-js="year"]').get().value;
        var $tdPlate = $('[data-js="plate"]').get().value;
        var $tdColor = $('[data-js="color"]').get().value;

        this.saveNewCar($urlImage, $tdBrand, $tdYear, $tdPlate, $tdColor);


      },
      initEvents: function initEvents() {
        //  this.formValidation();
        $('[data-js="form-register"]').on('submit', this.handleSubmit);

      },
      handleSubmit: function handleSubmit(e) {
        e.preventDefault();

        app.createNewCar();
        app.listCars();
        
      },
      companyInfo: function companyInfo() {

        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'company.json', true);
        ajax.send();

        ajax.addEventListener('readystatechange', this.getCompanyInfo);

      },

      getCompanyInfo: function getCompanyInfo() {
        if (app.isReady.call(this)) {
          var data = JSON.parse(this.responseText);
          var $companyName = $('[data-js="company-name"]');
          var $companyPhone = $('[data-js="company-phone"]');
          $companyName.get().textContent = data.name;
          $companyPhone.get().textContent = data.phone;
        }
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      },
      removeCarRow: function removeCarRow() {
        var $removeTd = $('[data-js="remove-car"]');

        $removeTd.on('click', function () {
          console.log(this.parentNode.parentNode.childNodes[3]);
          console.log('Erase button was clicked!');
          this.parentNode.remove(this.parentNode);
          app.deleteCar(this.parentNode.childNodes[3].textContent);        
        });
      },
      deleteCar: function deleteCar(plate) {
        var ajax = new XMLHttpRequest();
        ajax.open('DELETE', 'http://localhost:3000/car');
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.send(`plate=${plate}`);

        ajax.addEventListener('readystatechange', function () {
          if (app.isReady.call(this)) {
            app.listCars();
          }
        });
      },
      listCars: function listCars() {
        app.clearTable();
        var $tableCar = $('[data-js="table-car"]').get();
        var get = new XMLHttpRequest();
        
        get.open('GET', 'http://localhost:3000/car');
        get.send();

        get.addEventListener('readystatechange', function () {

          if (app.isReady.call(this)) {
            var cars = JSON.parse(get.responseText);
            cars.forEach(function (car) {
              console.log('-----------------')
              console.log(car.image);
              console.log(car.brandModel);
              console.log(car.plate);
              console.log(car.year);
              console.log(car.color);

              var $tr = document.createElement('tr');
              var $tdImage = document.createElement('td');
              var $image = document.createElement('img');
              var $tdBrand = document.createElement('td');
              var $tdYear = document.createElement('td');
              var $tdPlate = document.createElement('td');
              var $tdColor = document.createElement('td');
              var $tdRemove = document.createElement('td');

          $image.setAttribute('src', car.image);
          $tdImage.appendChild($image);
          
          $tdBrand.textContent = car.brandModel;
          $tdYear.textContent = car.year;
          $tdPlate.textContent = car.plate;
          $tdColor.textContent = car.color;
          $tdRemove.setAttribute('data-js','remove-car');
          $tdRemove.insertAdjacentHTML("afterbegin", '<i class="fas fa-trash-alt" style=\' cursor: pointer; \' ></i>');

           $tr.appendChild($tdImage);
           $tr.appendChild($tdBrand);
           $tr.appendChild($tdYear);
           $tr.appendChild($tdPlate);
           $tr.appendChild($tdColor);
           $tr.appendChild($tdRemove);

              $tableCar.appendChild($tr);
            });
            app.removeCarRow();

          }



        });

      },
      saveNewCar: function saveNewCar(image, brand, year, plate, color) {
        var save = new XMLHttpRequest();
        save.open('POST', 'http://localhost:3000/car');
        save.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        save.send(`image=${image}&brandModel=${brand}&year=${year}&plate=${plate}&color=${color}`);

        save.addEventListener('readystatechange', function () {
          if (app.isReady.call(this)) {
            var feedbackMessage = JSON.parse(save.responseText);
            app.showFeedbackMessage(feedbackMessage.message, feedbackMessage.success);
          }
        });
      },
      showFeedbackMessage: function feedbackMessage(message, hasSuccess) {
        var $alertMessage = $('[data-js="feedback-message"]');
        $alertMessage.get().style = 'display: block;'
        if (hasSuccess) {
          $alertMessage.get().classList.add('alert-success');
          $alertMessage.get().classList.remove('alert-danger');
        }
        if (!hasSuccess) {
          $alertMessage.get().classList.add('alert-danger');
          $alertMessage.get().classList.remove('alert-success');
        }
        $alertMessage.get().textContent = message;

        setTimeout(function () {
          $alertMessage.get().style = 'display: none;';
        }, 2500);

      },
      clearTable: function clearTable(){
        $('[data-js="table-car"]').get().innerHTML = '';
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
