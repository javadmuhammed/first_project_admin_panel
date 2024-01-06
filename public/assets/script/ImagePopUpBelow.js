
$(document).ready(function () {
    $(".tab_file_upload").click(function () {
        var showitem = $(this).attr("data-widget"); // getting button widget

        $(".tab_image_uipload_common").addClass("removeitemtab"); //remove class from tab for hide evcery tab
        $("#" + showitem).removeClass("removeitemtab"); // show clicked tab only here


        if ($("#" + showitem).hasClass("hideimagetab"))  //if clicked tab has hideimagetab
        {
            $("#" + showitem).removeClass("hideimagetab");  // remove hideimagetab class
        }


        $(".tab_file_upload").removeClass("active_media_tab"); //remove tab button border for everywhere
        $(this).addClass("active_media_tab"); // add button border for selected only

    })

    // $(document).on('click', '#deleteImagePopup', function () {
    //     var value_image = $("#setValue").val();

    //     $.ajax({
    //         url: "api/deleteImage.php",                      //Server api to receive the file
    //         type: "POST",
    //         data: { image_name: value_image },
    //         success: function (datas) {
    //             if (datas == 0) {
    //                 alert("Error")
    //             } else if (datas == 1) {
    //                 $(".image_uploaded_list_item.selectedimage").remove();
    //             }

    //         }
    //     });
    // })

    // function getLastUploaded() {
    //     $.ajax(
    //         {
    //             url: "api/getLastUploaded.php",
    //             type: "POST",
    //             success: function (data) {
    //                 $("#uploadImagesList").append(data);
    //             }

    //         }
    //     )
    // }

    // function callPopupimages() {
    //     $.ajax(
    //         {
    //             url: "api/getUploadedImages.php",
    //             type: "POST",
    //             success: function (data) {

    //                 $("#uploadImagesList").append(data);
    //             }

    //         }
    //     )
    // }
    // callPopupimages()


    let row = 0;
    $(document).on('click', '.image_uploaded_list_item', function () {

        if ($(this).hasClass("selectedimage")) {
            $(this).removeClass("selectedimage");
            $(this).find(".selected_image_bg").remove();
        } else {
            const row = $(this).data("row");
            $(this).append('<span class="selected_image_bg" id="removeSelectedImgA' + row + '"></span>');
            $(this).addClass('selectedimage');
        }

        const anySelected = $(".image_uploaded_list_item.selectedimage").length > 0;
        $("#deleteImagePopup, #doneageSelect").prop('disabled', !anySelected);

        let selectedImages = [];
        let selectedId = [];
        $(".image_uploaded_list_item.selectedimage").each(function () {
            selectedImages.push($(this).attr("data-imagename"));
            selectedId.push($(this).attr("data-image-id"));
        });


        $("#idValue").val(selectedId.join(","));
        $("#setValue").val(selectedImages.join(","));

    })
    // $("#infoImagePopup").click(function () {
    //     var selected_images = $(".image_uploaded_list_item.selectedimage").attr("data-imagename");
    //     $.ajax({
    //         url: "api/getImageData.php",                      //Server api to receive the file
    //         type: "POST",
    //         data: { image_name: selected_images },
    //         success: function (datas) {
    //             if (datas == 0) {
    //                 alert("Error")
    //             } else {
    //                 alert(datas);
    //             }

    //         }
    //     });
    // });


    $("#viewImage").click(function () {
        var selected_images = $(".image_uploaded_list_item.selectedimage").attr("data-imagename");

        var fullpath = "web/images/" + selected_images;

        $("#setPopUpImage").attr('src', fullpath);
        $(".imagepopup_view").css("display", "flex");
    })

    $("#close_popup").click(function () {
        $(".imagepopup_view").hide()
    })



    $("#doneageSelect").click(function () {
        var from_id = $("#fromIdInput").val();
        var value_image = $("#setValue").val();

        $("#" + from_id).val(value_image);
        $("#cmsImagepop").hide();
    })

    $("#select_file").click(function () {
        $("#imagFile").click();
    })



    // $("#getBigSize").click(function () {
    //     var type = $("#getBigSize").attr("data-type");
    //     $.ajax({
    //         url: "api/getBigImage.php",
    //         type: "POST",
    //         data: { type: type },
    //         success: function (data) {
    //             $(".imageuploadlist>ul>div").remove();
    //             $("#uploadImagesList").append(data);
    //             if ($("#getBigSize").attr("data-type") == "big") {
    //                 $("#getBigSize").text("GET SMALLER SIZE FILES");
    //                 $("#getBigSize").attr("data-type", "smaller");
    //             } else {
    //                 $("#getBigSize").text("GET BIG SIZE FILE ONLY");
    //                 $("#getBigSize").attr("data-type", "big");
    //             }


    //         }
    //     });
    // })

    // function uploadfile() {

    //     var file_data = $('.fileToUpload').prop('files')[0];    //Fetch the file
    //     var form_data = new FormData();
    //     form_data.append("file", file_data);


    //     $.ajax({
    //         url: "api/imageUploadTab.php",                      //Server api to receive the file
    //         type: "POST",
    //         dataType: 'script',
    //         cache: false,
    //         contentType: false,
    //         processData: false,
    //         data: form_data,
    //         success: function (dat2) {
    //             if (dat2 == 0) {
    //                 alert("Unable to Upload")
    //             } else if (dat2 == 1) {
    //                 getLastUploaded();
    //                 changetabimage();
    //             }

    //         }
    //     });
    // }



    $("#close_modal_popup_image").click(function () {
        $("#cmsImagepop").hide();
    })




})
