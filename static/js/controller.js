function mainController($scope){
    $scope.test="Angular test comes here!";
    //$scope.some_data="Do you see any data?";
    $scope.goAngular = function(){
        $scope.content_data = "Here are lots of workers!";
        $scope.section.state = "angular";
    };
    $scope.goJS = function(){
        $scope.content_data = "Here is some shedule...";
        $scope.section.state = "js";
    };
}