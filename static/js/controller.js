function mainController($scope){
    $scope.goServers = function(){
        $scope.section.state = "task";
    };
    $scope.goJS = function(){
        $scope.section.state = "task";
    };
    var db = JSON.parse(window.localStorage.getItem('servers'));
    // extract data from DB and push it into local scope
    if(db){
        $scope.servdata={};
        var index=1;
        for(var i in db){
            $scope.servdata[index]={
                id:i,
                address:db[i]['address'],
                port:db[i]['port'],
                ssl:db[i]['ssl']
            };
            index++;
        }
    }
    // pass object to handle data
    $scope.handleServer = function(event){
        handleServer(event.target);
    };
}