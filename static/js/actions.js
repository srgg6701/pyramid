/**
 * Get the table/tBody with servers data
 */
function getTable(table){
   console.log('make servers...');
   return (table)? $('#tblServers'):$('#tblServers tbody');
};
/**
 * Add new server data to the table
 */
function addServer(button){
    var tBody = getTable();
    var newTr = $('<tr/>',{
        onclick:'handleServer(event.target, true)'
    });

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
/**
 * cancel editing
 */
function cancelServer(){
    var lastTr=$('tr:last-child',getTable());
    $(lastTr).fadeOut(600,$(lastTr).remove());
    switchButtons();
}
/**
 * Switch editing state OR cancel editing
 */
function handleServer(element, remove){
    if(element.tagName.toUpperCase()=='TD'){
        if($(element).index()==4)
            handleServerState(element);
        if($(element).index()==5){
            removeServer(element);
            // if has been removing the new server
            if(remove) cancelServer();
        }
    }
}
/**
 * Switch between inputs/tds
 */
function handleServerState(td){
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
/**
 * Remove server from table and DB
 */
function removeServer(td){
    //console.dir(td);
    var Tr = $(td).parent('tr');
    $(Tr).fadeOut(300, function(){
        $(Tr).remove();
        saveServers();
    });
}
/**
 * if click the button bellow:
 * Push data from table into Data object and save it into DB
 */
function saveServers(){
    var BTable = getTable();
    $('td.black').each(function(index,element){
        handleServerState(element);
    });
    var Data = {};
    //{id:1,address:'http://127.0.0.1', port:8888, ssl:true},
    var servId, lastId=0;
    // go through table:
    $('tr:not(:nth-child(1))',BTable).each(function(index,element){
        var TDs = $('td',element);
        if(servId = $(TDs).eq(0).attr('data-id')){
            if(servId>lastId) lastId = servId;
            Data[servId]={};
            Data[servId]['address']=$(TDs).eq(1).text();
            Data[servId]['port']=$(TDs).eq(2).text();
            Data[servId]['ssl']=$(TDs).eq(3).text();
        }
    }); console.dir(Data);
    var new_address=$('input[name="new_server_address"]'),
        new_port=$('input[name="new_server_port"]'),
        new_ssl=$('input[name="new_server_ssl"]');
    if(new_address.length&&new_port.length){
        var address=$(new_address).val(),
            port=$(new_port).val(),
            ssl=$(new_ssl)[0].checked;
        if(address&&port){
            lastId++; // imitates new id. Not for a real app!
            Data[lastId]={};
            Data[lastId]['address']=address;
            Data[lastId]['port']=port;
            Data[lastId]['ssl']=ssl;
            $(new_address).parent('td').html(address);
            $(new_port).parent('td').html(port);
            var tdSsl=$(new_ssl).parent('td');
            $(tdSsl).html((ssl)? 'true':'false');
            $(tdSsl).next().removeClass('nopic')
                    .next().removeClass('nopic');
            switchButtons();
        }
    }
    window.localStorage.setItem('servers',JSON.stringify(Data));
    //var db
    console.dir(Data);
}
//
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