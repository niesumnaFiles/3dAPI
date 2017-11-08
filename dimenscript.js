//initialize the frame
var c  = document.createElement("canvas");
c.style = "position:absolute; top: 0; left: 0;"
c.width = 1000;
c.height = 1000;
c.style  = "display:none;";
document.body.appendChild(c);
var ctx = c.getContext("2d");

var b6 = "";

function renderImage(src,degree, w, h){
	var modDegree = 0;
  if(degree != Math.abs(degree)){
  	degree = 360+degree;
  }
  
  degree = degree - (360*Math.floor(degree/360));
  
  if(degree > 180){
   modDegree = (degree-180);
  }else{
  	modDegree = degree;
  }
  
  if(modDegree > 90){
  	modDegree = 90-(modDegree-90);
  }

	//turn modDegree to number out of one.
  
  modDegree = modDegree/90;

	//render image
  
  if(img == null){
		var img = new Image();
  }
	img.onload = function() {
  
  	//Here is y Rotation.
    	var height = h;
      //for the 121 one, this works:img.height*(5/4);
    	var width = w;
    
    //below, part one is complete. the image shrinks as called.
    //now I just have to make it so that the image siding gets cut as called
    if(degree > 180){
    	var mod2 =  degree-180;
    }else{
    	var mod2 = degree;
    }
    var deg = mod2 * Math.PI / 180
    var x = Math.cos(deg);
		var y = Math.sin(deg);
    //now we have a slope, but we have to set y to one
    x = (x/y);
    y = 1;
    //x and y are set. now to make an equation that gets the distance between 2 of those lines, and renders the image at that.
    var distIn = ((height*modDegree)/2)*x;
    //final render
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
    for(var i = 0; i < height*modDegree; i++){
    	if(degree > 180){
    		var vars = height*modDegree-i;
      	var distIns = -distIn;
      }else{
      	var vars = i;
      	var distIns = distIn;
      }
    	//I no understand...
      var sized = width-distIns;
      if(sized < 0){
      	sized = 0;
      }
  		ctx.drawImage(img,0,i * (height/(height*modDegree))*(img.height/height), img.width, i * (height/(height*modDegree))/(height*modDegree), window.innerWidth/2-width/2+distIns/2, window.innerHeight/2-height*modDegree/2+(vars), sized, 1);
      distIn -= x;
    }
		b6  = c.toDataURL();
		c.remove();
		
	};
  if(img.src == null || img.src === ""){
		img.src = src;
  }

}

function getBase(){
	return b6;	
}
