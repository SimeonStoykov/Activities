var app = app || {};

(function(){
    var router = Sammy(function(){
        var requester = app.requester.config('https://nuvi-challenge.herokuapp.com/activities');

        var mainSelector = '#container';
        var activitiesModel = app.activitiesModel.load(requester);

        var activitiesView = app.activitiesViewBag.load();

        var activitiesController = app.activitiesController.load(activitiesView, activitiesModel, 6);

        this.get('#/', function(){
            activitiesController.loadAllActivities(mainSelector);
        });

        this.bind('registerUser', function(event, data){
            userController.register(data);
        });

        this.bind('loginUser', function(event, data){
            userController.login(data);
        });

        this.bind('addLecture', function(event, data){
            lecturesController.addLecture(data);
        });

        this.bind('editLecture', function(event, data){
            lecturesController.editLecture(data);
        });

        this.bind('deleteLecture', function(event, data){
            lecturesController.deleteLecture(data);
        });

    });

    router.run('#/');
}());