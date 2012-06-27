$.fn.makeWindowed = function ()
{
    var html =
    "<iframe style=\"position: absolute; display: block; " +
    "z-index: -1; width: 100%; height: 100%; top: 0; left: 0;" +
    "filter: mask(); background-color: #ffffff; \"></iframe>";
    if (this) $(this)[0].innerHTML += html;
    // force refresh of div
    var olddisplay = $(this)[0].style.display;
    $(this)[0].style.display = 'none';
    $(this)[0].style.display = olddisplay;
}

$(document).ready(function() {
    /* IE6 */
    if ($.browser.msie && $.browser.version.substr(0,1) < 7) {
        $('img[src$=".png"]').each(function() {
            $(this).width($(this).width());
            $(this).height($(this).height());
            $(this).css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + $(this).attr('src') + '",sizingMethod="crop");');
            $(this).attr('src', 'img/pix.gif');
        });

        setInterval(function() {
            if($('#ui-datepicker-div > div:first').is('div') && !$('#ui-datepicker-div > iframe:first').is('iframe')) {
                $('#ui-datepicker-div').makeWindowed();
            }
        }, 300);
        
        $('#content ul.videolist li, #content ul.publist li').mouseover(function(e) {
            $(this).addClass('hover');
        }).mouseout(function(e) {
            $(this).removeClass('hover');
        });
    }
    
    /* POPUP */
    $('#mask').height($(document).height());
    $('#popup a.close, #popup a.cancel').click(function(e) {
        e.preventDefault();
        $('#popup').fadeOut(function() {
            $('#mask').hide();
        });
    });
    
    /* FORM */
    $('#warning').hide();
    
    $('dl.form > dt:not(.free) + dd > input[class^="text"], dl.form > dt:not(.free) + dd > textarea').blur(function(e) {
        if($(this).val() == '' || ($(this).attr('id').match(/^.?email$/) && !$(this).val().match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i))) {
            $(this).parent().addClass('invalid' + ($(this).is('textarea') ? '-textarea' : ($(this).parent().hasClass('below') ? '-below' : '' )));
            $('#warning').fadeIn();
        } else {
            $(this).parent().removeClass('invalid').removeClass('invalid-textarea').removeClass('invalid-below');
        }
    });
    
    $('form').submit(function(e) {
        var valid = true;
        $(this).find('dl.form > dt:not(.free) + dd > input[class^="text"], dl.form > dt:not(.free) + dd > textarea').each(function(i) {
            if($(this).val() == '' || ($(this).attr('id').match(/^.?email$/) && !$(this).val().match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i))) {
                valid = false;
                $(this).parent().addClass('invalid' + ($(this).is('textarea') ? '-textarea' : ($(this).parent().hasClass('below') ? '-below' : '' )));
                $('#warning').fadeIn();
            } else {
                $(this).parent().removeClass('invalid').removeClass('invalid-textarea').removeClass('invalid-below');
            }
        });
        if(!valid) {
            e.preventDefault();
        }
    });
    
    $('dl.form > dd > input.short, #birthday, #birthday').attr('readonly', 'readonly');
    
    if($.datepicker) {
        $.datepicker.setDefaults($.datepicker.regional['pl']);
    
        $('#pbirthday, #birthday, #from-from, #from-to, #period-from, #period-to').datepicker({
            dateFormat: 'yy-mm-dd',
            maxDate: (new Date().getYear() + 1900).toString() + '-12-31',
            changeMonth: true,
            changeYear: true,
            onSelect: function(e) {
                if($(this).parent().children('input[value=""]').length == 0) $(this).parent().removeClass('invalid');
            }
        });
        $('#pbirthday + a.calendar, #birthday + a.calendar, #from-from + span + #from-to + a.calendar, #period-from + span + #period-to + a.calendar').click(function(e) {
            if($(this).parent().children('input[value=]').is('input')) {
                $(this).parent().children('input[value=]:first').focus();
            } else {
                $(this).parent().children('input:first').focus();
            }
        });
    }
    
    /* SELECT */
    $('div.select > select').change(function() {
        $(this).parent().children('span').text($(this).children('option[value="' + $(this).val() + '"]').text());
    });
    $('div.select > select').change();

}); 