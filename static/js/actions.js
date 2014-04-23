function getTable(table){
   console.log('make servers...');
   return (table)? $('#tblServers'):$('#tblServers tbody');
};

function addServer(button){
    var tBody = getTable();
    var newTr = $('<tr/>');

    $(newTr).append('<td>'+($('tr',tBody).size()-1)+'</td>');
    $(newTr).append('<td><input type="text" name="new_server_address"></td>');
    $(newTr).append('<td><input type="text" name="new_server_port"></td>');
    $(newTr).append('<td><input type="checkbox" name="new_server_ssl"></td>');
    $(newTr).append('<td class="nopic"></td>');
    $(newTr).append('<td class="nopic"></td>');

    $(tBody).append(newTr);
    switchButtons(true);
    $(newTr).fadeIn(600);
}
function saveServer(){

}
function cancelServer(){
    $('tr:last-child',getTable()).fadeOut(600,this.remove);
    switchButtons();
}
function editServer(td){
    console.dir(td);
}
function removeServer(td){
    console.dir(td);
    $(td).parent('tr').fadeOut(300,this.remove);
}
function switchButtons(first){
    var second;
    if(first) {
        first = "first";
        second = "second";
    }else{
        first = "second";
        second = "first";
    }

    $('[data-group="'+first+'"]').fadeOut(600, function(){
        $('[data-group="'+second+'"]').fadeIn(600);
    });
}