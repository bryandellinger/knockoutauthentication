ko.components.register('home-page', {
    template: ' <div class="jumbotron">\
            <div class="container">\
                <div class="page-header text-center">\
                    <h1>Knockout JS Authentication</h1>\
                </div>\
                <p>This single page application is built using Knockout JS, it is using OAuth bearer token authentication, ASP.NET Web API 2, OWIN middleware, and ASP.NET Identity to generate tokens and register users.</p>\
            </div>\
        </div>\
        <div class="container">\
            <div data-ng-view="">\
            </div>\
        </div>\
        <hr />\
          <div id="footer">\
            <div class="container">\
                <div class="row">\
                    <div class="col-md-6">\
                        <p class="text-muted">Created by Bryan Dellinger. </p>\
                    </div>\
                    <div class="col-md-6">\
                        <p class="text-muted">dellingerfam5@gmail.com</p>\
                    </div>\
                </div>\
            </div>\
        </div> '
})  