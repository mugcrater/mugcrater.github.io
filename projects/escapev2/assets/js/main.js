 /*
 * GLOBAL TOOLS AND UTILITIES SCRIPTS
 * Place all custom js/jquery scripts here.
 */

/* Main Nav */
$(document).ready(function(){
  $(window).scroll(function(){
    var scroll = $(window).scrollTop();
    if (scroll < 100) {
      $(".header").css("background" , "none");
      document.getElementById("header").style.top = "0px";
    }
    else{
      $(".header").css("background" , "#333");  	
      document.getElementById("header").style.top = "-25px";
    }
  });
});

/* Side Bar Menu */
function openMainNav() {
  document.getElementById("hamburger-main-nav").style.width = "100%";
}
function closeMainNav() {
  document.getElementById("hamburger-main-nav").style.width = "0";
}