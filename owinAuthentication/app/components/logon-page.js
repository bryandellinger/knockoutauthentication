ko.components.register('log-on', {
    viewModel: function (params) {
        var self = this;
        this.logonerrors = ko.observableArray([]);
        this.userName = params.userName;
        this.password = params.password;
        this.isAuth = params.isAuth;
        this.token= params.token;
        this.submit = function () {

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "/token",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "accept": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "aab93db7-04f5-a6e3-608d-6a3700edc4f1"
                },
                "data": {
                    "grant_type": "password",
                    "username": self.userName(),
                    "password": self.password()
                },
                "beforeSend": function (jqXHR) { $('#spinner2').show(); self.logonerrors.removeAll(); }
            }

            var request = $.ajax(settings);

            request.done(function (response) {
                $('#spinner2').hide();
                console.log(response);
                if (response && response.access_token) {
                    localStorage.setItem("token", response.access_token);
                    self.isAuth(true);
                    self.token(response.access_token);
                    window.location.href = "#start"
                } else {
                    self.logonerrors.push({ prop: 'error retrieving token', errors: ['Unable to generate bearer token'] });
                }

            });
            request.fail(function (jqXHR, textStatus) {
                console.log(jqXHR);
                $('#spinner2').hide();  
                var j = jqXHR;
                if (j) {
                    var r = j.responseJSON;
                    if (r && r.error && r.error_description) {
                        self.logonerrors.push({ prop: r.error, errors: [r.error_description] });
                    }
                    console.log(ko.toJS(self.logonerrors));
                }   
            });
        }
    },
    template: '<div class="container" style="padding-top:30px;">\
                            <form class="form-login" role="form" data-bind="submit: submit">\
                                <h2 class="form-login-heading">Log On</h2>\
                                    <input type="text" class="form-control" placeholder="Username" data-bind="value: userName" required autofocus>\
                                    <input type="password" class="form-control" placeholder="Password" data-bind="value: password" required>\
                                    <button class="btn btn-lg btn-warning btn-block" type="submit" >\
                                        <i class="fa fa-spinner fa-spin" style="display:none;" id="spinner2"></i>\
                                            &nbsp;Log On\
                                    </button>\
                            </form>\
                            <div class="row" style="height: 25px;">\
                            </div>\
                            <div class="alert alert-danger" role="alert" data-bind="foreach: logonerrors , visible: logonerrors ().length > 0">\
                                        <strong>Errors for <!-- ko text: prop --><!-- /ko -->:</strong>\
                                            <ul data-bind="foreach: errors">\
                                                    <li data-bind="text: $data"></li>\
                                            </ul>\
                          </div>\
                    </div>'
});