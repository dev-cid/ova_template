//  Requires :
//  PopUp and Button PopUp  with id = 100
//  big custom attr on img 
//  _big   suffix on file image
function imgPopUp() {
    images = $('img[big]');
    var btPopUp = $('[data-sg-id="btn-popup"][data-sg-key="100"]');
    var popUp = $('[data-sg-id="item-popup"][data-sg-key="100"]');
    var MAX_WIDTH_IMG = 900;
    var MAX_HEIGHT_IMG = 550;
    var MAX_HEIGHT_POPUP = 765;
    var contAspectRatio = MAX_WIDTH_IMG / MAX_HEIGHT_IMG;


     images.each(function(){

         $(this).on('click', function(){
             var content = popUp.find('.desc');
             content.html(''); //Clear any prev content
             var src = $(this).attr('src');
             var reference = $(this).data('reference');
             var baseName =  src.substr(0, src.lastIndexOf('.')) || input;
             var fileExt = src.split('.').pop();
             var big = baseName+"_big."+fileExt;

             if ($(this).attr('big') == 'false')
                big = src;

             var imgContainer = $('<img>'); 

             imgContainer.attr("src", big).load(function(){

                var width = this.width;
                var height = this.height;

                if(width > MAX_WIDTH_IMG) {
                    ratio = MAX_WIDTH_IMG / width;        // get ratio for scaling image
                    $(this).css("width", MAX_WIDTH_IMG);  // Set new width
                    $(this).css("height", height * ratio);   // Scale height based on ratio
                    height = height * ratio;                 // Reset height to match scaled image
                    width = width * ratio;                   // Reset width to match scaled image
                }

                // Check if current height is larger than max
                if(height > MAX_HEIGHT_IMG) {
                    ratio = MAX_HEIGHT_IMG / height; // get ratio for scaling image
                    $(this).css("height", MAX_HEIGHT_IMG);   // Set new height
                    $(this).css("width", width * ratio);    // Scale width based on ratio
                    width = width * ratio;    // Reset width to match scaled image
                }

                $(this).css({'display': 'block' , 'margin': 'auto'});

                 imgContainer.appendTo(content);  // ADDS the magic!!
                 if (reference) content.append('<p>' + reference + '</p>');
                 btPopUp.trigger('click'); // Activate pop up 

             }); // End Load

         });
     });
}; // Fin Img Pop Up

// ---- CALL-------
// <figure class="clickeable">
//     <img src="img/IPT_C01_U01_IMG_01.png" style="max-width: 80%"
//         data-reference="This is the reference" big>
// </figure>
// 
// 
// 
// ---- TEMPLATE ----
// <sg-btn-popup sg-key="100" sg-sound="success-low"></sg-btn-popup>
// <sg-item-popup sg-key="100">
//     <sg-btn-popup-close>&#8855;</sg-btn-popup-close>
//     <h1></h1>
//     <div class="pop-cont" style="min-width: 500px;">
//         <div class="col-1-1 nopadd">
//             <div class="desc"></div>
//         </div>
//     </div>
// </sg-item-popup>