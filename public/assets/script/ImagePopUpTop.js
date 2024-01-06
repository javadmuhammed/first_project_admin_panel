


function showSelectImage(fromid, currentSelected) {

    if (currentSelected != null) {
        let currentSelectedItems = currentSelected.split(",");
        console.log(currentSelectedItems)
        $(".image_uploaded_list_item").each(function () {
            let imageName = $(this).attr("data-imagename");
            console.log(imageName)
            if (currentSelectedItems.includes(imageName)) {
                $(this).addClass("selectedimage");
            }
        })
    }

    let selectedImages = $(".image_uploaded_list_item.selectedimage");
    if (selectedImages.length < 1) $("#deleteImagePopup, #doneageSelect").prop('disabled', true);

    if ($(window).width() < 522) {
        $("#cmsImagepop").css("display", "block");
    } else {
        $("#cmsImagepop").css("display", "flex");
    }

    $(".upload_imga_center").css("display", "flex");
    $("#fromIdInput").val(fromid);
}




function changetabimage() {
    $("#upload_image_tab").addClass("removeitemtab"); //remove class from tab for hide evcery tab
    $("#showimagedata").removeClass("removeitemtab"); // show clicked tab only here


    if ($("#showimagedata").hasClass("hideimagetab"))  //if clicked tab has hideimagetab
    {
        $("#showimagedata").removeClass("hideimagetab");  // remove hideimagetab class
    }

    $(".upload_media_tab_btn").removeClass("active_media_tab"); //remove tab button border for everywhere
    $(".mediatabbtn").addClass("active_media_tab"); // add button border for selected only
}











