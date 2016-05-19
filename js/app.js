var app = app || {};

(function(){
    var router = Sammy(function(){
        var requester = app.requester.config('https://nuvi-challenge.herokuapp.com/activities');

        var mainSelector = '#container';
        var activitiesModel = app.activitiesModel.load(requester);

        var activitiesView = app.activitiesViewBag.load();

        var activitiesController = app.activitiesController.load(activitiesView, activitiesModel, 3);

        this.get('#/', function(){
            activitiesController.loadAllActivities(mainSelector);
        });

    });

    router.run('#/');
}());