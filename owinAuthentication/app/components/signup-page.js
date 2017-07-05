ko.components.register('sign-up', {
    viewModel: function (params) {
        var self = this;
        this.errors = ko.observableArray([]);
        this.userName = params.userName;
        this.password = params.password;
        this.confirmPassword = params.confirmPassword;
        this.submit = function () {
            var jsonData = ko.toJSON(self);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "api/account/register",
                "method": "POST",
                "headers": {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "d6769e42-f0ac-c1c4-3c57-b514d7f534dd"
                },
                "processData": false,
                "beforeSend": function (jqXHR) { $('#spinner').show(); self.errors.removeAll();},
                "data": jsonData,
            }

            var request = $.ajax(settings);

            request.done(function (response) {
                $('#spinner').hide
                $('div.mysuccess').fadeIn(300).delay(2000).fadeOut(400, function(){window.location.href = "#login"});
            });
            request.fail(function (jqXHR, textStatus) {
                $('#spinner').hide();
                var j = jqXHR;
                if (j) {
                    var r = j.responseJSON;
                    if (r) {
                        var m = r.modelState;
                        if (m) {
                            for (p in m) {
                                if (m.hasOwnProperty(p)) {
                                    self.errors.push({ prop: p, errors: m[p] });
                                }
                            }
                        }
                    }
                }            
            });
        }
    },
    template: '<div class="container" style="padding-top:30px;">\
                            <form class="form-login" role="form" data-bind="submit: submit">\
                                <h2 class="form-login-heading">Sign up</h2>\
                                    <input type="text" class="form-control" placeholder="Username" data-bind="value: userName" required autofocus>\
                                    <input type="password" class="form-control" placeholder="Password" data-bind="value: password" required>\
                                    <input type="password" class="form-control" placeholder="Confirm Password" data-bind="value: confirmPassword" required>\
                                    <button class="btn btn-lg btn-info btn-block" type="submit" ><i class="fa fa-spinner fa-spin" style="display:none;" id="spinner"></i>&nbsp;Sign Up</button>\
                            </form>\
                           <div class="row" style="height: 25px;">\
                            </div>\
                            <div class="alert alert-danger" role="alert" data-bind="foreach: errors, visible: errors().length > 0">\
                                        <strong>Errors for <!-- ko text: prop --><!-- /ko -->:</strong>\
                                            <ul data-bind="foreach: errors">\
                                                    <li data-bind="text: $data"></li>\
                                            </ul>\
                          </div>\
                         <div class="myalert-box mysuccess">Success! Sign Up Complete</div>\
                    </div>'
});