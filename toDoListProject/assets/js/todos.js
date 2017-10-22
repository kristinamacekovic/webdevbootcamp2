// check off items by clicking
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

// click on X to delete a to do
$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(200, function(){
		$(this).remove();
	});
	event.stopPropagation();
});

// add new item
$('input[type="text"]').keypress(function(event) {
	if (event.which === 13){
		var newItem = $(this).val();
	$(this).val("");
	$("ul").append('<li><span><i class="fa fa-trash"></i></span> ' + newItem + '</li>');
}
});

// toggle form
$(".fa-plus").click(function() {
	$('input[type="text"]').fadeToggle();
});