var map;
$(document).ready(function(){


    toastr.options.closeButton = true;
    toastr.options.positionClass = "toast-bottom-right";

    //InitialiseLoadingOverlay();

//     $('#full-width-slider').royalSlider({
//         arrowsNav: true,
//         loop: true,
//         keyboardNavEnabled: true,
//         controlsInside: true,
//         imageScaleMode: 'fill',
//         arrowsNavAutoHide: false,
//         autoScaleSlider: false,
//         autoScaleSliderWidth: 460,
//         autoScaleSliderHeight: 400,
//         controlNavigation: 'bullets',
//         thumbsFitInViewport: false,
//         navigateByClick: true,
//         startSlideId: 0,
//         autoPlay: {
//             enabled: true,
//             delay: 5000
//         },
//         transitionType:'fade',
//         globalCaption: true,
//         /* size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images */
//         imgWidth: 1400,
//         imgHeight: 680
//     });


    if($('.date-picker').length)
    {
        $('.date-picker').datepicker({
            dateFormat: 'd M yy'
        });
    }

    if($('#lat').length)
    {
        initializeMap();
    }

    $('.match-height').matchHeight();
    $('.match-title-height').matchHeight();
    $('.match-location-height').matchHeight();
    $('.match-p-height').matchHeight();


    $(".adults").on('click', '.add_adults', function(e){
        e.preventDefault();
        var newQty = +($(".qty_adults").val()) + 1;
        $(".qty_adults").val(newQty);
    });

    $(".adults").on('click', '.minus_adults', function(e){
        e.preventDefault();
        var newQty = +($(".qty_adults").val()) - 1;
        if(newQty < 1)newQty = 1;
        $(".qty_adults").val(newQty);
    });

    $('.checkin-calendar').on('click',function(e){
        e.preventDefault();
        $(this).closest('.input-group').find('.checkin-date').datepicker('show');
    });



    $(".children").on('click', '.add_children', function(e){
        e.preventDefault();
        var newQty = +($(".qty_children").val()) + 1;
        $(".qty_children").val(newQty);
    });

    $(".children").on('click', '.minus_children', function(e){
        e.preventDefault();
        var newQty = +($(".qty_children").val()) - 1;
        if(newQty < 0)newQty = 0;
        $(".qty_children").val(newQty);
    });


    $('.search-box').on('click', '.clickable', function(e){
        e.preventDefault();
        if($(this).data('filter') === 'general')
        {
            window.location.href ='http://hotels.my241cruise.com.au';
        }
        if($(this).data('filter') === 'cruise')
        {
            window.open("http://exchangetravel.cruisesalefinder.com.au/");
        }
        //$('.search-box').find('.active').removeClass('active');
        //$(this).addClass('active');
    });

    $('.popup-gallery').each(function(){
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    //return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                }
            }
        });

    });

    $('body').on('click', '.inclusion-list-toggle', function(){
        var package_id = $(this).data('package-id');
        $('#inclusions-'+package_id).toggleClass('hide');
    });

    $('body').on('click', '#terms-and-conditions-link', function(){
        $('#terms-and-conditions-modal').modal('show');
    });

    $('body').on('click', '#privacy-policy-link', function(){
        $('#privacy-policy-modal').modal('show');
    });

    $('body').on('click', '#show-map-pane', function(e){
        e.preventDefault();
        $('#new-map-canvas').toggleClass('hide');
        initializeMap();
        $('.match-height').matchHeight();
    });

    //Jeremy animations
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        var head_height = $('.site-header').outerHeight();
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - head_height
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    $(document).ready(function() {
        $('.btn-deals').on('click', changeClass);
    });


    if($('#hide-deals-box').length)
    {
        console.log('deals');

        $('#navdeals').append($('#deals-for-box li'));
        $('.deals-box .col-md-4').append($('#buttons-for-box .deals'));
        $('.deals-box').slideDown();

        $('#navtopdeals').append($('#deals-for-nav').html());
    }

});


$(window).scroll(function(){
    var sticky = $(".site-header"),
        scroll = $(window).scrollTop();
    if (scroll > 60) {
        sticky.addClass("site-header-opacity");
    } else {
        sticky.removeClass("site-header-opacity");
    };
});


function changeClass() {
    $('#collapseExample').removeClass('in');
    $('#collapseExample').addClass('collapse');
}

function AjaxSubmitForm(form, data, hasError)
{
    if(hasError)
    {
        return;
    }

    ShowLoadingOverlay();

    var url = form.find('.ajax-save-button').data('url');

    var formData = form.serializeArray();

    var onSave = $(form).data('on-save');

    $.post(url, formData, function(data){
        HideLoadingOverlay();

        if(data.success === 'true')
        {
            if(data.clearForm && data.clearForm === 'true'){
                $("input[type='text'],input[type='password'],textarea").val('');
            }

            var successMessage = 'Update successful';

            if(data.successMessage)
            {
                successMessage = data.successMessage;
            }

            if(onSave)
            {
                window[onSave](data);
            }

            toastr.success(successMessage);
        }
        else
        {
            var errorMessage = 'An error occurred please try again';

            if(data.errorMessage)
            {
                errorMessage = data.errorMessage;
            }

            toastr.error(errorMessage);
        }

    }, 'json');
}

function AjaxSubmitMultiPartForm(form, data, hasError)
{
    if(hasError)
    {
        return;
    }

    ShowLoadingOverlay();

    var url = form.find('.ajax-save-button').data('url');

    var formData = new FormData(form[0]); //form.serializeArray();

    var onSave = $(form).data('on-save');

    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        async:true,
        cache: false,
        complete: function(){
            HideLoadingOverlay();
        },
        error: function(e){
            console.log(e);
            toastr.error('An unknown error occurred please try again');
        },
        success: function(data){
            if(data.success === 'true')
            {
                if(data.clearForm && data.clearForm === 'true'){
                    $("input[type='text'],input[type='password'],textarea").val('');
                }

                var successMessage = 'Update successful';

                if(data.successMessage)
                {
                    successMessage = data.successMessage;
                }

                if(onSave)
                {
                    window[onSave](data);
                }

                toastr.success(successMessage);
            }
            else
            {
                var errorMessage = 'An error occurred please try again';

                if(data.errorMessage)
                {
                    errorMessage = data.errorMessage;
                }

                toastr.error(errorMessage);
            }
        }
    });

}

/*
function InitialiseLoadingOverlay()
{
    var loadingOverlay = $('<div id="loading-overlay" style="display: none;"><div id="loading-overlay-inner"></div></div>');

    $('body').append(loadingOverlay);
}

function HideLoadingOverlay()
{
    $('#loading-overlay').fadeOut();
}

function ShowLoadingOverlay()
{
    $('#loading-overlay').fadeIn();
}
*/

function initializeMap() {

    var lat = $('#lat').val();
    var lng = $('#lng').val();

    if(!lat || !lng)
    {
        return;
    }

    var latLng = new google.maps.LatLng(lat, lng);

    var mapOptions = {
        zoom: 16,
        center: latLng
    };

    map = new google.maps.Map(document.getElementById('new-map-canvas'), mapOptions);

    // To add the marker to the map, use the 'map' property
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
}