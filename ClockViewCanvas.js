"use strict";
 // view

    function ClockViewCANVAS() {
        var self=this;
        var myModel = null; // с какой моделью работаем
        var myField = null; // внутри какого элемента наша вёрстка
        var mySpan='';
        var strBig=null;
        var strMdl=null; 
        var strSm=null;
        var r=undefined;
        var cvs=undefined;

        self.startClock=function(model,field) {
            myModel=model;
            myField=field;
            // ищем и запоминаем интересные нам элементы DOM
            var massivSpan=myField.getElementsByTagName('span');
            mySpan=massivSpan[0];
        };

        self.buildClock=function(radius){
            r=radius;
            cvs=document.createElement('canvas');
            myField.appendChild(cvs);
        };

           //функция визуализации часов в зависимости от текущего времени
        self.changeClock=function(h,m,s){
           
            var context=cvs.getContext('2d');
            cvs.setAttribute("style",'display:block');
            cvs.setAttribute("width",2*r);
            cvs.setAttribute("height",2*r);

            context.lineWidth=1;
            context.strokeStyle='#e6e6da';
            context.fillStyle='#e6e6da';
            context.beginPath();
            context.arc(r,r, r, 0,Math.PI*2, false);            
            context.stroke();
            context.fill();

        //маленькие кружки и цифры
            var a=30/180*Math.PI;//в радианах
        
        //кружки       
        for (var i=1;i<=12;i++){        
            context.strokeStyle='#5e735b';
            context.fillStyle='#5e735b';
            context.beginPath();
            context.arc(r,0.2*r, 0.12*r, 0,Math.PI*2, false);            
            context.stroke();
            context.fill();
            context.translate(r,r);
            context.rotate(a);
            context.translate(-r,-r);
        }
         
        //цифры
            var angle=30/180*Math.PI;
            context.fillStyle='white';
            context.font=r/6+'px Arial, Helvetica, sans-serif ';
            context.textAlign='center';
            context.textBaseline='middle';
        for(var j=1;j<=12;j++){           
            var xNumber=r+0.8*r*Math.sin(angle);   
            var yNumber=r-0.8*r*Math.cos(angle);           
            context.fillText(j,xNumber,yNumber);           
            angle+=30/180*Math.PI;
        }

        //cтрелки
            context.strokeStyle='black';
            context.lineCap='round';

        //большая-часы            
            context.lineWidth=0.07*r;
            var angleStrBig=(30*(h+m/60))/180*Math.PI;
            var xStrBigStart=r-0.1*r*Math.sin(angleStrBig); 
            var yStrBigStart=r+0.1*r*Math.cos(angleStrBig);    
            var xStrBigEnd=r+0.4*r*Math.sin(angleStrBig);   
            var yStrBigEnd=r-0.4*r*Math.cos(angleStrBig);              
            context.beginPath();
            context.moveTo(xStrBigStart,yStrBigStart);             
            context.lineTo(xStrBigEnd,yStrBigEnd);//меняются
            context.stroke();

        //средняя-минуты
            context.lineWidth=0.04*r;

            var angleStrMdl=(m*6+s/10)/180*Math.PI;
            var xStrMdlStart=r-0.15*r*Math.sin(angleStrMdl);    
            var yStrMdlStart=r+0.15*r*Math.cos(angleStrMdl);  
            var xStrMdlEnd=r+0.7*r*Math.sin(angleStrMdl);   
            var yStrMdlEnd=r-0.7*r*Math.cos(angleStrMdl);  
            context.beginPath();
            context.moveTo(xStrMdlStart,yStrMdlStart);             
            context.lineTo(xStrMdlEnd,yStrMdlEnd);//меняются
            context.stroke();

        //маленькая-секунды
            context.lineWidth=0.015*r;

            var angleStrSm=(s*6)/180*Math.PI;
            var xStrSmStart=r-0.15*r*Math.sin(angleStrSm);  
            var yStrSmStart=r+0.15*r*Math.cos(angleStrSm);   
            var xStrSmEnd=r+0.8*r*Math.sin(angleStrSm);    
            var yStrSmEnd=r-0.8*r*Math.cos(angleStrSm);   
            context.beginPath();
            context.moveTo(xStrSmStart,yStrSmStart);            
            context.lineTo(xStrSmEnd,yStrSmEnd);//меняются
            context.stroke();
       };

        self.updateCity=function() {
            if(myModel.nameCity&&myModel.nameGMT){
               mySpan.innerHTML=myModel.nameCity+' (GMT'+(myModel.nameGMT>0?'+':'')+myModel.nameGMT+')';
            }
        };
        
        self.update=function() {
            if(myModel.currentTimeGMT){
            var dt=myModel.currentTimeGMT;
            var h=dt.getHours();            
            var m=dt.getMinutes();
            var s=dt.getSeconds();
            self.changeClock(h,m,s);
            }
        };

    }