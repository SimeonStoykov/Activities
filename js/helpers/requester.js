var app = app || {};

app.requester = (function () {
    function Requester(baseUrl) {
        this.baseUrl = baseUrl;
    }

    Requester.prototype.get = function(url) {
        return this.makeRequest('GET', url);
    };

    Requester.prototype.post = function(url, data) {
        return this.makeRequest('POST', url, data);
    };

    Requester.prototype.put = function(url, data) {
        return this.makeRequest('PUT', url, data);
    };

    Requester.prototype.delete = function(url) {
        return this.makeRequest('DELETE', url, null);
    };

    Requester.prototype.makeRequest = function(method, url, data) {
            var defer = Q.defer(),
            options = {
                method: method,
                url: url,
                success: function (data) {
                    defer.resolve(data);
                },
                error: function (error) {
                    defer.reject(error);
                }
            };

        //$.ajaxSetup({
        //    beforeSend: function(xhr, settings) {
        //        if (!useSession) {
        //            token = _this.appId + ':' + _this.appSecret;
        //            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(token));
        //        } else {
        //            token = sessionStorage['sessionToken'];
        //            xhr.setRequestHeader('Authorization', 'Kinvey ' + token);
        //        }
        //        if(data) {
        //            xhr.setRequestHeader('Content-Type', 'application/json');
        //            settings.data = JSON.stringify(data);
        //            return true;
        //        }
        //    }
        //});

        $.ajax(options);

        return defer.promise;
    };

    return {
        config: function(baseUrl) {
            return new Requester(baseUrl);
        }
    };
}());