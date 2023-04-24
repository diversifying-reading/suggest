function resize_sequence(){
  scroll_function();
  resize_topnav();

  if(document.documentElement.scrollTop == 0 && screenWidth >= 1390 || mobileDevice()){
    resize_topnav();
    document.getElementById("body_text").style.paddingTop = document.getElementById("topnav").offsetHeight - 15 + "px";
}
  else{
  document.getElementById("body_text").style.paddingTop = 50 + "px";
  }
}
addEventListener('resize', (event) => {
  screenWidth = window.innerWidth;

  if(mobileDevice()){
    screenWidth = screen.width;
    if(screenWidth <= 687){
      for(i=0; i<document.getElementsByTagName("p").length; i++){
        document.getElementsByTagName("p")[i].style.fontSize = "38px"
      }
      for(i=0; i<document.getElementsByTagName("h2").length; i++){
        document.getElementsByTagName("h2")[i].style.fontSize = "54px"
      }
      for(i=0; i<document.getElementsByTagName("h1").length; i++){
        document.getElementsByTagName("h1")[i].style.fontSize = "30px"
      }
      for(i=0; i<document.getElementsByTagName("h3").length; i++){
        document.getElementsByTagName("h3")[i].style.fontSize = "20px"
      }
    }
  }

  for(let i=0; i<4; i++){
    resize_sequence();
    setTimeout(function(){
      resize_sequence();
    },100);
  }
});

addEventListener('scroll', (event) => {
  if(!mobileDevice()){
    scroll_function();
    resize_topnav();

    if(document.documentElement.scrollTop == 0 && screenWidth >= 1390 || mobileDevice()){
      resize_topnav();
      document.getElementById("body_text").style.paddingTop = document.getElementById("topnav").offsetHeight - 15 + "px";
    }
    else{
      document.getElementById("body_text").style.paddingTop = 50 + "px";
    }
  }
});

if(!mobileDevice()){
  scroll_function();
  resize_topnav();

  if(document.documentElement.scrollTop == 0 && screenWidth >= 1390 || mobileDevice()){
    resize_topnav();
    document.getElementById("body_text").style.paddingTop = document.getElementById("topnav").offsetHeight - 15 + "px";
  }
  else{
    document.getElementById("body_text").style.paddingTop = 50 + "px";
  }
}

resize_sequence();
setTimeout(function(){
  resize_sequence();
},100);

setTimeout(function(){
if(mobileDevice()){
  resize_sequence();
  resize_sequence();
  resize_sequence();
  resize_sequence();
  resize_sequence();
  document.getElementById("body_text").style.paddingTop = document.getElementById("topnav").offsetHeight - 15 + "px";
}
else{
  resize_sequence();
  resize_sequence();
  resize_sequence();
  resize_sequence();
  resize_sequence();
}
},100);

setTimeout(function(){
  if(!mobileDevice()){
    scroll_function();
    resize_topnav();

    if(document.documentElement.scrollTop == 0 && screenWidth >= 1390 || mobileDevice()){
      resize_topnav();
      document.getElementById("body_text").style.paddingTop = document.getElementById("topnav").offsetHeight - 15 + "px";
    }
    else{
      document.getElementById("body_text").style.paddingTop = 50 + "px";
    }
  }
  if(mobileDevice()){
    resize_topnav();
    resize_sequence();
    setTimeout(function(){
      resize_sequence();
    },100);
    resize_topnav();
  }
},100);
