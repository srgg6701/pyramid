function getTable(table){
   console.log('make servers...');
   return (table)? $('#tblServers'):$('#tblServers tbody');
};

function addServer(button){
    var tBody = getTable();
    var newTr = $('<tr/>');

    $(newTr).append('<td>'+$('tr',tBody).size()+'</td>');
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
    var BTable = getTable();
    $('td.black').each(function(index,element){
        editServer(element);
    });
    var Data = {};
    //{id:1,address:'http://127.0.0.1', port:8888, ssl:true},
    var servId;
    $('tr:not(:nth-child(1))',BTable).each(function(index,element){
        var TDs = $('td',element);
        if(servId = $(TDs).eq(0).attr('data-id')){
            Data[servId]={};
            Data[servId]['address']=$(TDs).eq(1).text();
            Data[servId]['port']=$(TDs).eq(2).text();
            Data[servId]['ssl']=$(TDs).eq(3).text();
        }
    });
    console.dir(Data);
    var new_address=$('input[name="new_server_address"]'),
        new_port=$('input[name="new_server_port"]');
    if(new_address.length&&new_port.length){
        if($(new_address).val()&&$(new_port).val()){
            Data['new_server']={};
            Data['new_server']['address']=$(new_address).val();
            Data['new_server']['port']=$(new_port).val();
            Data['new_server']['ssl']=$('input[name="new_server_ssl"]')[0].checked;
        }
    }
    console.dir(Data);
}
function cancelServer(){
    var lastTr=$('tr:last-child',getTable());
    $(lastTr).fadeOut(600,$(lastTr).remove());
    switchButtons();
}
function handleServer(element){
    if(element.tagName.toUpperCase()=='TD'){
        if($(element).index()==4)
            editServer(element);
        if($(element).index()==5)
            removeServer(element);
    }
}
function editServer(td){
    //console.dir();
    var TDs = $(td).parent('tr').find('td'),
        sId = $(TDs).eq(0).attr('data-id'),
        tAddress = $(TDs).eq(1),
        tPort = $(TDs).eq(2);
    if($(td).hasClass('black')){
        $(td).removeClass('black');
        $(tAddress).html($('input',tAddress).val());
        $(tPort).html($('input',tPort).val());
    }else{
        $(td).addClass('black').attr('title', 'Apply data changing');
        $(tAddress).html('<input type="text" name="address'+sId+'" value="'+$(tAddress).text()+'">');
        $(tPort).html('<input type="text" name="port'+sId+'" value="'+$(tPort).text()+'">');
    }
}
function removeServer(td){
    //console.dir(td);
    var Tr = $(td).parent('tr');
    $(Tr).fadeOut(300,$(Tr).remove());
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