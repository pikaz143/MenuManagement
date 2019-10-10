//ADD ITEM
console.log("connected");

$("document").ready(function () {
    $(".btn-warning").on("click", function () {
        $(".addm").after('<div class="col-sm-6">' +
            '<div class="input-group mb-3">' +
            '<div class="input-group-prepend">' +
            '<select class="form-control menu" name="menu_type" id="menu_type" autocomplete="off">' +
            '<option value="" disabled selected>Select</option>' +
            '<option value="Vegetables">Vegetables</option>' +
            '<option value="Rice & Daal">Rice & Daal</option>' +
            '<option value="Non-Veg">Non-Veg</option>' +
            '</select>' +
            '</div>' +
            '<input type="text" class="form-control" name="item" placeholder="Enter Item">' +
            '<input type="text" class="form-control" name="price" placeholder="Enter Price">' +
             '<button type="button" class="btn btn-warning">ADD MORE</button>' +
            '<button class="btn close"><i class="fa fa-close"></i></button>' +
            '</div>' +
            '</div>' +
            '</div>');
    });

    $(".close").on("click", function () {
        $(".addm").remove();
    });
});