var app = app || {};

app.activitiesController = (function () {
    function ActivitiesController(viewBag, model, activitiesPerPage) {
        this._viewBag = viewBag;
        this._model = model;
        this._activitiesPerPage = activitiesPerPage;
    }

    ActivitiesController.prototype.loadAllActivities = function (selector) {
        var self = this;
        this._model.getAllActivities()
            .then(function (result) {
                var data = {
                    activities: [],
                    pagination: {
                        numberOfItems: result.length,
                        itemsPerPage: self._activitiesPerPage,
                        selectedPage: 1
                    }
                };

                result.forEach(function (activity) {
                    data.activities.push({
                        id: activity.id,
                        provider: activity.provider,
                        actorUsername: activity.actor_username,
                        activityUrl: activity.activity_url,
                        activityMessage: activity.activity_message,
                        activityAttachment: activity.activity_attachment,
                        activityDate: activity.activity_date
                    });
                });

                self._viewBag.showAllActivities(selector, data, data.pagination.selectedPage);
            }, function (error) {
                if(error.responseText) {
                    var errorResponseTextObj = JSON.parse(error.responseText);
                    var errorDescription = errorResponseTextObj.description;
                    noty({
                        type: 'error',
                        text: errorDescription,
                        timeout: '2000'
                    });
                } else {
                    noty({
                        type: 'error',
                        text: 'Check your connection!',
                        timeout: '2000'
                    });
                }
            }).done();
    };

    //ActivitiesController.prototype.editLecture = function (data) {
    //    this._model.editLecture(data)
    //        .then(function (result) {
    //            noty({
    //                type: 'success',
    //                text: 'You have successfully edited the lecture!',
    //                timeout: '2000'
    //            });
    //            Sammy(function(){
    //                this.trigger('redirectUrl', {url: '#/calendar/my/'});
    //            });
    //        }, function (error) {
    //            if(error.responseText) {
    //                var errorResponseTextObj = JSON.parse(error.responseText);
    //                var errorDescription = errorResponseTextObj.description;
    //                noty({
    //                    type: 'error',
    //                    text: errorDescription,
    //                    timeout: '2000'
    //                });
    //            } else {
    //                noty({
    //                    type: 'error',
    //                    text: 'Check your connection!',
    //                    timeout: '2000'
    //                });
    //            }
    //        }).done();
    //};

    return {
        load: function (viewBag, model, activitiesPerPage) {
            return new ActivitiesController(viewBag, model, activitiesPerPage);
        }
    }
}());