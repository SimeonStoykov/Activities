var app = app || {};

app.activitiesModel = (function(){
    function ActivitiesModel(requester){
        this._requester = requester;
        this.serviceUrl = requester.baseUrl;
    }

    ActivitiesModel.prototype.getAllActivities = function() {
        var requestUrl = this.serviceUrl;
        return this._requester.get(requestUrl);
    };

    return {
        load: function(requester) {
            return new ActivitiesModel(requester);
        }
    }
}());