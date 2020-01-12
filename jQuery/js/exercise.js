$.fn.extend({
  oops: function () {
    this.append("<button id='login'>点我报错</button>");
    this.append("<div class='container'>" +
      "<div class='box'>" +
      "<div class= 'header clearfix'>" +
      "<div class='title'>Oops！</div>" +
      "<div class='close' id='close'>X</div>" +
      "</div >" +
      "<div class='content'>" +
      "<h3>该内存不可为write</h3>" +
      "</div>" +
      "</div></div>")

    $("#login").on("click", function () {
      $(".container").addClass("active");
    })

    $("#close").click(function () {
      $("body").find(".container").removeClass("active");
    })
  }
})