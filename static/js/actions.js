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
    makeServerFields(tBody, newTr);
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
            handleServerRowState(element);
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
function handleServerRowState(td){
    //console.dir();
    var TDs         = $(td).parent('tr').find('td'),
        sId         = $(TDs).eq(0).attr('data-id'),
        tAddress    = $(TDs).eq(1),
        tPort       = $(TDs).eq(2),
        tSsl        = $(TDs).eq(3);
    if($(td).hasClass('black')){
        $(td).removeClass('black');
        $(tAddress).html($('input',tAddress).val());
        $(tPort).html($('input',tPort).val());
        $(tSsl).html($('input',tSsl)[0].checked.toString());
        saveServers(td);
    }else{
        $(td).addClass('black').attr('title', 'Apply data changing');
        $(tAddress).html('<input type="text" name="address'+sId+'" value="'+$(tAddress).text()+'">');
        $(tPort).html('<input type="text" name="port'+sId+'" value="'+$(tPort).text()+'">');
        var sslHTML = '<input type="checkbox" name="ssl'+sId+'"';
        if($(tSsl).text()=='true') sslHTML+=' checked';
        sslHTML+='>';
        $(tSsl).html(sslHTML);
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
        saveServers(td,true);
    });
}
/**
 * if click the button bellow:
 * Push data from table into Data object and save it into DB
 */
function saveServers(td,remove){
    var BTable = getTable();
    // get db state up to this moment
    var db = JSON.parse(window.localStorage.getItem('servers'));
    if(td=='new'){ // click by button, that means - saving a new record
        //{id:1,address:'http://127.0.0.1', port:8888, ssl:true},
        var servId, lastId=0;
        // go through table to get Last id:
        //console.dir($('tr:not(:nth-child(1))',BTable));
        $('tr:not(:nth-child(1))',BTable).each(function(index,element){
            var TDs = $('td',element);
            if(servId = $(TDs).eq(0).attr('data-id')){
                if(parseInt(servId)>lastId) lastId = servId;
            }
        }); //console.log('saveServers()->Data'); console.dir(Data);
        var new_address=$('input[name="new_server_address"]'),
            new_port=$('input[name="new_server_port"]'),
            new_ssl=$('input[name="new_server_ssl"]');
            //console.log('new_address.length: '+new_address.length+', new_port.length: '+new_port.length+', new_ssl.length: '+new_ssl.length);
        var address=$(new_address).val(),
            port=$(new_port).val(),
            ssl=$(new_ssl)[0].checked.toString();
            //console.log('address: '+address+', port: '+port+', ssl: '+ssl);
        if(address&&port){
            console.log('lastId before = '+lastId);
            lastId++; // imitates new id. Not for a real app!
            console.log('lastId after = '+lastId);
            db[lastId]={};
            db[lastId]['address']=address;
            db[lastId]['port']=port;
            db[lastId]['ssl']=ssl;
            // set new id
            $(new_address).parent('td').prev().attr('data-id', lastId);
            // set new address
            $(new_address).parent('td').html(address);
            // set new port
            $(new_port).parent('td').html(port);
            // ...ssl
            var tdSsl=$(new_ssl).parent('td');
            $(tdSsl).html(ssl);
            $(tdSsl).next().removeClass('nopic')
                    .next().removeClass('nopic');
            switchButtons();
        }else{
            alert('The address and port are necessary both.');
        }
        console.log('%cData before saving:','color:green');console.dir(db);
    }else{ // click by "pencil" (i.e. - TD)
        var recordId = $(td).parent('tr').find('td').eq(0).attr('data-id');
        for(var i in db){
            if(i==recordId){ // up to the moment fields are converted to html
                if(remove){
                    delete db[i];
                }else{
                    db[i]['ssl']=$(td).prev().text();
                    db[i]['port']=$(td).prev().prev().text();
                    db[i]['address']=$(td).prev().prev().prev().text();
                }
                break;
            }
        }
    }
    window.localStorage.setItem('servers',JSON.stringify(db));
}
/**
 * Switch between buttons depending current state
 */
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
/**
 * Show server filds
 */
function makeServerFields(tBody, newTr){
    $(newTr).append('<td>'+$('tr',tBody).size()+'</td>');
    $(newTr).append('<td><input type="text" name="new_server_address"></td>');
    $(newTr).append('<td><input type="text" name="new_server_port"></td>');
    $(newTr).append('<td><input type="checkbox" name="new_server_ssl"></td>');
    $(newTr).append('<td class="nopic"></td>');
    $(newTr).append('<td class="nopic"></td>');
    $(tBody).append(newTr);
}