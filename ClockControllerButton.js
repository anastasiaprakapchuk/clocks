 "use strict";
 // controller

    function ClockController() {
        var self=this;
        var myModel = null; // с какой моделью работаем
        var myField = null; // внутри какого элемента наша вёрстка
        
        self.startClock=function(model,field) {
            myModel=model;
            myField=field;

            // ищем и запоминаем интересные нам элементы 
            // назначаем обработчики событий
            var buttonStart=myField.querySelector('.start');
            buttonStart.addEventListener('click',self.start);
           
            var buttonStop=myField.querySelector('.stop');
            buttonStop.addEventListener('click',self.stop);           
        };

        self.start=function(EO) {
            myModel.start();
            var buttonStop=myField.querySelector('.stop');
            EO.currentTarget.style.borderColor='grey';
            buttonStop.style.borderColor='transparent'; 
        };

        self.stop=function(EO) {
            myModel.stop();
            var buttonStart=myField.querySelector('.start');
            buttonStart.style.borderColor='transparent'; 
            EO.currentTarget.style.borderColor='grey';           
        }

    }