
function viewModel() {
    var self = this;
    this.orders = ko.observableArray([]);
    this.isAuth = ko.observable(false);
    this.token = ko.observable('');
    this.userName = ko.observable('');
    this.password = ko.observable('');
    this.confirmPassword = ko.observable('');
    this.logout = function () {
        self.isAuth(false);
        self.token('');
        self.userName('');
        self.password('');
        self.confirmPassword('');
        self.orders.removeAll();
        localStorage.removeItem('token');
        return true;
    }
    this.getOrders = function () {
        var authorization = "Bearer " + self.token();
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "api/orders",
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "authorization": authorization,
                "cache-control": "no-cache",
                "postman-token": "cb0c6cd9-bca8-bf5c-05c9-c645746d9aed"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            ko.mapping.fromJS(response, {}, self.orders);
            console.log(ko.toJS(self.orders));
        });
        return true;
    }
}
var vm = new viewModel()

// extend your view-model with pager.js specific data
pager.extendWithPage(vm);
// apply the view-model using KnockoutJS as normal
ko.applyBindings(vm);
// start pager.js
pager.start();
//check if there is a token in local storage
var token = localStorage.getItem("token");
if (token) {
    vm.token(token);
    var authorization = "Bearer " + token;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "api/account/getUserName",
        "method": "GET",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "authorization": authorization,
            "cache-control": "no-cache",
            "postman-token": "cb0c6cd9-bca8-bf5c-05c9-c645746d9aed"
        }
    }
    var request = $.ajax(settings);

    request.done(function (response) {
        console.log(response);
        vm.isAuth(true);
        vm.userName(response);
        $('#spinner3').hide();
        $('#loginLabel').show();
        $('#signUpLabel').show();
    });

    request.fail(function (jqXHR, textStatus) {
        $('#spinner3').hide();
        $('#loginLabel').show();
        $('#signUpLabel').show();
        vm.logout();
    });
} else {
    $('#spinner3').hide();
    $('#loginLabel').show();
    $('#signUpLabel').show();
}