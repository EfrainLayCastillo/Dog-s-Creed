$(function(){
  var pantalla = $(window).height();
  console.log(pantalla);
  var cantidad = $("#img-animated1").length;
  var mitad = pantalla/1.6;
  console.log(mitad);
  var myVar;

  $(document).scroll(function(){
    var scrolltop = $(this).scrollTop();
    var pixels = scrolltop / 100;
    console.log(scrolltop);
    if (pixels < scrolltop) {
      $("#navbar-menu").addClass("navbar-inverse navbar-fixed-top");
      $("img[id=img-animated1]").addClass(function(index){
        return "animated  pulse";
      });
    }
    else{
      $("#navbar-menu").removeClass("navbar-inverse navbar-fixed-top");
      $("img[id=img-animated1]").removeClass(function(index){
        return "animated  pulse";
      });
    }
    if (scrolltop>mitad) {
      $("#imgtop").css("filter","blur(2px)");
    }else {
      $("#imgtop").css("filter","blur(0px)");
    }
  });


});
