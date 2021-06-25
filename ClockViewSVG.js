"use strict";
 // view

    function ClockViewSVG() {
        var self=this;
        var myModel = null; // с какой моделью работаем
        var myField = null; // внутри какого элемента наша вёрстка
        var mySpan='';
        var strBig=null;
        var strMdl=null; 
        var strSm=null;
        var r=undefined;

        self.startClock=function(model,field) {
            myModel=model;
            myField=field;
            // ищем и запоминаем интересные нам элементы DOM
            var massivSpan=myField.getElementsByTagName('span');
            mySpan=massivSpan[0];
        };

        self.buildClock=function(radius){
            r=radius;

        //тег svg, большой круг часов
        var svgNew=document.createElementNS("http://www.w3.org/2000/svg",'svg');
        myField.appendChild(svgNew);
        svgNew.setAttribute('display','block');
        svgNew.setAttribute('width',2*r);
        svgNew.setAttribute('height',2*r);
        
         var circle=document.createElementNS("http://www.w3.org/2000/svg",'ellipse');
         circle.setAttribute("fill","#e68b8bd9");
         circle.setAttribute("rx",r);
         circle.setAttribute("ry",r);
         circle.setAttribute("cx",r);
         circle.setAttribute("cy",r);
         svgNew.appendChild(circle);

    //маленькие кружки и цифры
        var mas=[];
        var a=30;
               
        for (var i=1;i<=12;i++){
            var t=document.createElementNS("http://www.w3.org/2000/svg",'ellipse');
            t.setAttribute("fill","#a94a4ac7");
            t.setAttribute("rx",r/8);
            t.setAttribute("ry",r/8);
            t.setAttribute("cx",r);
            t.setAttribute("cy",r*0.2);
            t.setAttribute("transform",'rotate('+a+' '+r+' '+r+')');
            t.textContent=i;
            svgNew.appendChild(t);
         
            var text=document.createElementNS("http://www.w3.org/2000/svg",'text');
            svgNew.appendChild(text);
                  
            text.style.fill="white";
            text.style.fontWeight="bold";
            text.style.fontSize=r/6;
            text.textContent=i;     
            var angle=a/180*Math.PI;
        
            var y=r-0.8*r*Math.cos(angle)+r/18;
            if(i<10){
               var x=r+0.8*r*Math.sin(angle)-r/24;  
            }else{
               var x=r+0.8*r*Math.sin(angle)-r/10;
            }
            text.setAttribute("x",x);
            text.setAttribute("y",y);    
            a+=30;
        } 

    //стрелки
    //большая -часы
        strBig=document.createElementNS("http://www.w3.org/2000/svg",'line');
        strBig.setAttribute("x1",r); 
        strBig.setAttribute("y1",r+0.1*r);
        strBig.setAttribute("x2",r); 
        strBig.setAttribute("y2",r*0.6);
        strBig.setAttribute("stroke",'#400813');
        strBig.setAttribute("stroke-width",0.07*r);
        strBig.setAttribute("stroke-linecap",'round');
        svgNew.appendChild(strBig); 
    //средняя -минуты
        strMdl=document.createElementNS("http://www.w3.org/2000/svg",'line');
        strMdl.setAttribute("x1",r); 
        strMdl.setAttribute("y1",r+0.1*r);
        strMdl.setAttribute("x2",r); 
        strMdl.setAttribute("y2",r*0.4);
        strMdl.setAttribute("stroke",'#400813');
        strMdl.setAttribute("stroke-width",0.035*r);
        strMdl.setAttribute("stroke-linecap",'round');
        svgNew.appendChild(strMdl);

    //маленькая -секунды 
        strSm=document.createElementNS("http://www.w3.org/2000/svg",'line');
        strSm.setAttribute("x1",r); 
        strSm.setAttribute("y1",r+0.1*r);
        strSm.setAttribute("x2",r); 
        strSm.setAttribute("y2",r*0.25);
        strSm.setAttribute("stroke",'#400813');
        strSm.setAttribute("stroke-width",0.015*r);
        strSm.setAttribute("stroke-linecap",'round');
        svgNew.appendChild(strSm); 

       };

        self.updateCity=function() {
            if(myModel.nameCity&&myModel.nameGMT!==undefined){
               mySpan.innerHTML=myModel.nameCity+' (GMT'+(myModel.nameGMT>0?'+':'')+myModel.nameGMT+')';
            }
        };
        
        self.update=function() {
            if(myModel.currentTimeGMT){
            var dt=myModel.currentTimeGMT;
            var hours=dt.getHours();            
            var minutes=dt.getMinutes();
            var seconds=dt.getSeconds();
            strBig.setAttribute("transform", 'rotate('+(hours*30+minutes/2)+' '+r+' '+r+')');
            strMdl.setAttribute("transform", 'rotate('+(minutes*6+seconds/10)+' '+r+' '+r+')');
            strSm.setAttribute("transform", 'rotate('+seconds*6+' '+r+' '+r+')');
            }
        };

    }