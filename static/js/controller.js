function mainController($scope){
    $scope.goServers = function(){
        $scope.section.state = "task";
    };
    $scope.goJS = function(){
        $scope.section.state = "task";
    };
    var db = JSON.parse(window.localStorage.getItem('servers'));
    console.log('%cData Base:', 'color:blue'); console.dir(db);
    // extract data from DB and push it into local scope
    if(db){
        $scope.servdata=[];
        for(var i in db){
            $scope.servdata[i]={
                id:db[i]['id'],
                address:db[i]['address'],
                port:db[i]['port'],
                ssl:db[i]['ssl']
            };
        }
    }/*
    $scope.servdata=[
        {id:1,address:'http://127.0.0.1', port:8888, ssl:true},
        {id:3,address:'http://super.serv.com', port:3030, ssl:false},
        {id:4,address:'http://192.168.1.9', port:443, ssl:true},
        {id:6,address:'http://awesomeserver.org', port:80, ssl:true},
        {id:7,address:'http://megarobust.net', port:3137, ssl:true}
    ];*/
    // pass object to handle data
    $scope.handleServer = function(event){
        handleServer(event.target);
    };
}