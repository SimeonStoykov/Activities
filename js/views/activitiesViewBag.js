var app = app || {};

app.activitiesViewBag = (function () {
    function showAllActivities(selector, activitiesData, pageNumber) {
        $.get('templates/activities.html', function (template) {
            //  We subtract page number with 1 because we use 0 based indexes and 1 based page numbers
            //  So for the first page we have starting index = 0 * page size (0)
            pageNumber--;
            var currentPageActivities = {
                activities: []
            };
            for (var i = pageNumber * activitiesData.pagination.itemsPerPage; i < (pageNumber * activitiesData.pagination.itemsPerPage) + activitiesData.pagination.itemsPerPage; i++) {
                currentPageActivities.activities.push(activitiesData.activities[i]);
            }
            var outputHtml = Mustache.render(template, currentPageActivities);
            $(selector).html(outputHtml);
        }).then(function () {
            $('#pagination').pagination({
                items: activitiesData.pagination.numberOfItems,
                itemsOnPage: activitiesData.pagination.itemsPerPage,
                cssStyle: 'light-theme',
                onPageClick: function(pageNumber) {
                    //  The function must call itself (recursion) only if the page is changed
                    //  or we will get into infinite recursion because onPageClick is invoked initially
                    //  before we click on it
                    if(pageNumber !== activitiesData.pagination.selectedPage) {
                        activitiesData.pagination.selectedPage = pageNumber;
                        showAllActivities(selector, activitiesData, pageNumber);
                    }
                }
            }).pagination('selectPage', activitiesData.pagination.selectedPage);

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
    }

    return {
        load: function () {
            return {
                showAllActivities: showAllActivities
            }
        }
    }
}());