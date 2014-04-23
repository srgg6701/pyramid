function mainController($scope){
    $scope.test="Angular test comes here!";
    //$scope.some_data="Do you see any data?";
    $scope.goAngular = function(){
        $scope.content_data = "Here are lots of workers!";
        $scope.section.state = "task";
    };
    $scope.goJS = function(){
        $scope.content_data = "Here is some shedule...";
        $scope.section.state = "task";
    };
    $scope.servdata=[
        {address:'http://127.0.0.1', port:8888, ssl:true},
        {address:'http://super.serv.com', port:3030, ssl:false},
        {address:'http://192.168.1.9', port:443, ssl:true},
        {address:'http://awesomeserver.org', port:80, ssl:true},
        {address:'http://megarobust.net', port:3137, ssl:true}
    ];

    $scope.writeDB = function(){
        var data = {
            first_name:'Srgg',
            last_name:'SrggNext'
        };
        window.localStorage.setItem('test_data', JSON.stringify(data));
        console.dir(data);
    }
}