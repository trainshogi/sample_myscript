$(function() {
	$('#editor').css('height', '100%').css('height', $('#editor').parent().height() - $('#editornav').height());
	$('#result').css('height', '100%').css('height', $('#result').parent().height() - $('#resultnav').height());
});