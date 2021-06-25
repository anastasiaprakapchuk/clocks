 "use strict";
 // view

    function ClockViewDOM() {
        var self=this;
        var myModel = null; // с какой моделью работаем
        var myField = null; // внутри какого элемента DOM наша вёрстка
        var mySpan='';
        var strSmClock=null;
        var strMdlClock=null; 
        var strBigClock=null;

        self.startClock=function(model,field) {
            myModel=model;
            myField=field;
            // ищем и запоминаем интересные нам элементы DOM
            var massivSpan=myField.getElementsByTagName('span');
            mySpan=massivSpan[0];
        };

        self.buildClock=function(radius){
             var radiusBigClock=radius; 
             var diametrBigClock=2*radiusBigClock;              
        //Контейнер, большой круг часов
           
            var bigClock=document.createElement('div');
            document.body.appendChild(container);
            myField.appendChild(bigClock);
            myField.style.position='relative';
            bigClock.style.width=diametrBigClock+'px';
            bigClock.style.height=diametrBigClock+'px';
            bigClock.style.borderRadius='50%';
            bigClock.style.backgroundColor='#a6e68b';
            bigClock.style.position='relative';
            var bigCenterX=bigClock.offsetLeft+bigClock.offsetWidth/2;
            var bigCenterY=bigClock.offsetTop+bigClock.offsetHeight/2;
         

        //Маленькие круги и цифры
            var smallCircles=[];
            var numbers=['0','1','2','3','4','5','6','7','8','9','10','11','12'];
            var currentAngle=30;
            for(var i=1;i<=12;i++){
                smallCircles[i]=document.createElement('div');
                myField.appendChild(smallCircles[i]);
                smallCircles[i].style.width=diametrBigClock*0.12+'px';
                smallCircles[i].style.height=diametrBigClock*0.12+'px';
                smallCircles[i].style.borderRadius='50%';
                smallCircles[i].style.backgroundColor='#6fb766';
                var radius=radiusBigClock*0.8;             
                var angle=currentAngle/180*Math.PI;
                currentAngle+=30;
                var smallCenterX=bigCenterX+radius*Math.sin(angle);
                var smallCenterY=bigCenterY-radius*Math.cos(angle);
                smallCircles[i].style.position='absolute';
                smallCircles[i].style.left=Math.round(smallCenterX-smallCircles[i].offsetWidth/2)+'px';
                smallCircles[i].style.top=Math.round(smallCenterY-smallCircles[i].offsetHeight/2)+'px';
                smallCircles[i].innerHTML=numbers[i];
                smallCircles[i].style.fontSize=smallCircles[i].offsetWidth/1.5+'px';
                smallCircles[i].style.textAlign='center';
                smallCircles[i].style.color='white';
                smallCircles[i].style.fontWeight='bold';
                smallCircles[i].style.lineHeight=smallCircles[i].offsetWidth+'px';
            }

        //Стрелки
            strBigClock=document.createElement('div');
            myField.appendChild(strBigClock); 
            strBigClock.style.height=radiusBigClock*0.6+'px'; 
            strBigClock.style.width=strBigClock.offsetHeight*0.1+'px';
            strBigClock.style.borderRadius=strBigClock.offsetWidth/2+'px';
            strBigClock.style.backgroundColor='#243e2c';
            strBigClock.style.position='absolute';  
            strBigClock.style.left=bigCenterX-strBigClock.offsetWidth/2+'px';
            strBigClock.style.top=bigCenterY-strBigClock.offsetHeight*0.8+'px';          

            strMdlClock=document.createElement('div');
            myField.appendChild(strMdlClock); 
            strMdlClock.style.height=radiusBigClock*0.8+'px'; 
            strMdlClock.style.width=strBigClock.offsetHeight*0.05+'px';
            strMdlClock.style.borderRadius=strMdlClock.offsetWidth/2+'px';
            strMdlClock.style.backgroundColor='#243e2c'; 
            strMdlClock.style.position='absolute';
            strMdlClock.style.left=bigCenterX-strMdlClock.offsetWidth/2+'px';
            strMdlClock.style.top=bigCenterY-strMdlClock.offsetHeight*0.8+'px'; 

            strSmClock=document.createElement('div');
            myField.appendChild(strSmClock); 
            strSmClock.style.height=radiusBigClock*0.9+'px'; 
            strSmClock.style.width=strBigClock.offsetHeight*0.03+'px';
            strSmClock.style.borderRadius=strSmClock.offsetWidth/2+'px';
            strSmClock.style.backgroundColor='#243e2c';
            strSmClock.style.position='absolute';
            strSmClock.style.left=bigCenterX-strSmClock.offsetWidth/2+'px';
            strSmClock.style.top=bigCenterY-strSmClock.offsetHeight*0.8+'px'; 

    //относительно какой точки поворачиваем стрелки
         strSmClock.style.transformOrigin='50% 80%';
         strMdlClock.style.transformOrigin='50% 80%';
         strBigClock.style.transformOrigin='50% 80%';

       };

        self.updateCity=function() {
            if(myModel.nameCity&&myModel.nameGMT){
               mySpan.innerHTML=myModel.nameCity+' (GMT'+(myModel.nameGMT>0?'+':'')+myModel.nameGMT+')';
            }
        };

        self.update=function() {
            
            if(myModel.currentTimeGMT){
            var dt=myModel.currentTimeGMT;
            var hours=dt.getHours();            
            var minutes=dt.getMinutes();
            var seconds=dt.getSeconds();
            strBigClock.style.transform= 'rotate('+(hours*30+minutes/2)+'deg)';
            strMdlClock.style.transform= 'rotate('+(minutes*6+seconds/10)+'deg)';
            strSmClock.style.transform= 'rotate('+seconds*6+'deg)';
            }
        };

    }