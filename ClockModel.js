"use strict";

    // model

    function ClockModel() {
        var self=this;
        self.nameCity=undefined;//название города
        self.nameGMT=undefined;//часовой пояс
        self.currentTimeGMT=undefined;//текущее время
        self.isRun = false;//идут часы или нет
        var stop=false;//была нажата кнопка стоп или нет

        var myView = null;

        self.startClock=function(view) {
            myView=view;
        };

        self.updateView=function() {
            if ( myView )
                myView.update();
        };

        self.updateCity=function() {
            if ( myView )
                myView.updateCity();
        };

        self.setName=function(city,GMT) {
            self.nameCity=city;
            self.nameGMT=GMT;
            self.updateCity();//модель вызывает обновление представления  
        };

        self.time=function() {
            var currTime=new Date();
            var y=currTime.getUTCFullYear();
            var n=currTime.getUTCMonth();
            var d=currTime.getUTCDate();
            var h=currTime.getUTCHours()+self.nameGMT;            
            var m=currTime.getUTCMinutes();
            var s=currTime.getUTCSeconds();
            var ms=currTime.getUTCMilliseconds();
            self.currentTimeGMT=new Date(y,n,d,h,m,s,ms);//текущее время cогласно часовому поясу
            return ms;
        };

        self.start=function() {
            stop=false;
            self.isRun=true;
            self.update();       
        };

        self.stop=function() {
            stop=true;
            self.isRun=false;                    
        };

        self.update=function(){
            if (self.isRun){            
               var ms=self.time();
               self.updateView();//модель вызывает обновление представления
               setTimeout(self.update,1000-ms); 
            } else if(!self.isRun&&!stop){           
               self.time();
               self.updateView();             
            } 
        };
    }
