ko.components.register('orders', {
    viewModel: function (params) {
        var self = this;
        this.orders = params.orders;
    },
    template: '\
     <div class="row" style="height: 75px"></div>\
    <div class="row">\
    <div class="col-md-2">\
        &nbsp;\
</div>\
<div class="col-md-8">\
    <table class="table table-striped table-bordered table-hover">\
        <thead>\
            <tr>\
                <th>Order ID</th>\
                <th>Customer</th>\
                <th>City</th>\
                <th>Shipped</th>\
            </tr>\
        </thead>\
        <tbody data-bind="foreach: orders">\
            <tr>\
                <td data-bind="text: orderID">\
                </td>\
                <td data-bind="text: customerName">\
                </td>\
                <td data-bind="text: shipperCity">\
                </td>\
                <td>\
                   <input type="checkbox" data-bind="checked: isShipped" disabled="disabled">\
                </td>\
            </tr>\
        </tbody>\
    </table>\
</div>\
<div class="col-md-2">\
    &nbsp;\
</div>\
</div>\
    '
})