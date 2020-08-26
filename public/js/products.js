$(document).ready(function(){
  
    $(".filter-btn").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "All")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else
        {
        //    $('.filter[filter-item="'+value+'"]').removeClass('hidden');
        //    $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
              $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
            
        }
    });

});

$(".filter-btn").click().toggleClass("active");