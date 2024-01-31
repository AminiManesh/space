var tags = [];
var selectedTags = [];
$.ajax({
    type: "get",
    url: "assets/js/tagdata.json",
    dataType: "json",
    success: function (response) {
        tags = response;
        console.log(tags)
    }
});

function isTagAdded(tag) {
    var result = false;
    for (i = 0; i < selectedTags.length; i++) {
        txtValue = selectedTags[i];
        if (txtValue.toUpperCase().indexOf(tag.toUpperCase()) > -1) {
            result = true;
        }
    }
    return result;
}

function selectATag(tag) {
    if (!isTagAdded(tag)) {
        var selectedTag = document.createElement('span');
        $(selectedTag).addClass('selected-tag');

        var selectedTagText = document.createElement('span');
        $(selectedTagText).addClass('selected-tag-text');

        var selectedTagIcon = document.createElement('span');
        $(selectedTagIcon).addClass('bi');
        $(selectedTagIcon).addClass('bi-x');
        $(selectedTagIcon).addClass('vertical-center');

        $(selectedTag).append(selectedTagText);
        $(selectedTag).append(selectedTagIcon);

        $(selectedTagText).text(tag + " ");
        selectedTag.addEventListener('click', function () {
            removeATag(tag);
        });

        $('.selected-tags').prepend(selectedTag);
        selectedTags.push(tag);
        console.log(selectedTags);
    }
}

function removeATag(tag) {
    selectedTags.pop(tag);
    $('.selected-tags').find('.selected-tag:contains("'+ tag +'")').remove();
    console.log(selectedTags);
}

function searchInTags(inputValue) {

    if (inputValue) {
        $('.search-in-tags-dropdown').fadeIn(300);
    } else {
        $('.search-in-tags-dropdown').fadeOut(300);
    }

    tag = inputValue.toUpperCase();

    var isThereAnyItem = false;

    $('.search-in-tags-dropdown-list').html('');

    for (i = 0; i < tags.length; i++) {
        txtValue = tags[i];
        if (txtValue.toUpperCase().indexOf(tag) > -1) {
            isThereAnyItem = true;
            var tagItem = document.createElement('li');
            $(tagItem).addClass('search-in-tags-dropdown-list-item');
            $(tagItem).text(txtValue);
            tagItem.addEventListener('click', function () {
                selectATag(this.innerHTML);
                var input = $('input.search-in-tags')[0];
                $(input).val('');
                var event = new Event('keyup');
                input.dispatchEvent(event);
            });
            $('.search-in-tags-dropdown-list').append(tagItem);
        } else {
            // tags[i].style.display = "none";
        }
    }

    // if find item its will show it on list. if dont find any item its will show another dropwdown.
    if (!isThereAnyItem) {
        $('.search-in-tags-dropdown-unavailable').show();
        $('.search-in-tags-dropdown').hide();
    } else {
        $('.search-in-tags-dropdown-unavailable').hide();
        $('.search-in-tags-dropdown').show();
    }
}

// get all filter checkboxes added in filter form
var allFilters = $('input[type="checkbox"]');

$(document).ready(function () {

    // posts carousel config
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        autoplayTimeout: 1000,
        dot: true,
        smartSpeed: 1000
    });

    // set random show effect to posts
    var timesList = ["0.25s", "0.5s", "0.75s", "1s"];
    $('.post-card').each(function (index, element) {
        var delay = timesList[Math.floor(Math.random() * 4)];
        $(this).attr("data-wow-delay", delay);
    });

    // trigger carousel autoplay when hovering in post image
    $('.owl-carousel').hover(function () {
        $(this).trigger('play.owl.autoplay');
    }, function () {
        $(this).trigger('stop.owl.autoplay');
    });

    // add or remove a filter tag to selected filters section when it changes.
    $('input[type="checkbox"]').on('change', function () {
        addSelectedFilter($(this).attr("id"));
    });

    // add a li item to search dropdown of selected filters section at loading time. That add items from checkboxes of filter section.
    $.each(allFilters, function (indexInArray, valueOfElement) {
        var searchItem = document.createElement('li');
        $(searchItem).addClass('search-in-filters-dropdown-list-item');
        $(searchItem).text($(this).parent().find('label').text());
        $(searchItem).attr('for', this.id);
        $('.search-in-filters-dropdown-list').append(searchItem);
    });

    // add filter and check or uncheck a checkbox filter click on its own filter tag.
    $('.search-in-filters-dropdown-list-item').click(function (e) {
        e.preventDefault();
        var id = $(this).attr('for');
        var checkbox = document.getElementById(id);
        checkbox.checked = true
        var event = new Event('change');
        checkbox.dispatchEvent(event);

        var search = $('input.search-in-filters')[0];
        $(search).val('');
        var event2 = new Event('keyup');
        search.dispatchEvent(event2);
    });

    // Toggle visible icon of posts according to isVisible attribute of visibility icon wrapper at load time.
    $('.visible').each(function (index, element) {
        var isVisible = $(this).attr('isVisible');
        var visibleIcon = $(this).find('#isVisibleIcon');
        var notVisibleIcon = $(this).find('#isNotVisibleIcon');
        if (isVisible) {
            $(visibleIcon).show();
            $(notVisibleIcon).hide();
        } else {
            $(visibleIcon).hide();
            $(notVisibleIcon).show();
        }
    });

    // // Toggle lock icon of posts according to isOpen attribute of permission icon wrapper at load time.
    // $('.permission').each(function (index, element) {
    //     var isOpen = $(this).attr('isOpen');
    //     var isPermissionIcon = $(this).find('#isPermissionIcon');
    //     var isNotPermissionIcon = $(this).find('#isNotPermissionIcon');
    //     if (isOpen) {
    //         $(isPermissionIcon).show();
    //         $(isNotPermissionIcon).hide();
    //     } else {
    //         $(isPermissionIcon).hide();
    //         $(isNotPermissionIcon).show();
    //     }
    // });

    // Change visibility of post
    $('.visible').click(function (e) {
        e.preventDefault();
        var visibleIcon = $(this).find('#isVisibleIcon');
        var notVisibleIcon = $(this).find('#isNotVisibleIcon');

        var isVisible = $(this).attr('isVisible');

        if (isVisible === "true") {
            // Ajax Here
            $.ajax({
                type: "method",
                url: "url",
                data: "data",
                dataType: "dataType",
                success: function (response) {
                    // set to false
                }
            });
            $(visibleIcon).hide();
            $(notVisibleIcon).show();
            $(this).attr('isVisible', false);
        } else if (isVisible === "false") {
            // Ajax Here
            $.ajax({
                type: "method",
                url: "url",
                data: "data",
                dataType: "dataType",
                success: function (response) {
                    // set to true
                }
            });
            $(visibleIcon).show();
            $(notVisibleIcon).hide();
            $(this).attr('isVisible', true);
        }
    });

    // Change visibility of post
    // $('.permission').click(function (e) {
    //     e.preventDefault();
    //     var permissionIcon = $(this).find('#isPermissionIcon');
    //     var notPermissionIcon = $(this).find('#isNotPermissionIcon');

    //     var isOpen = $(this).attr('isOpen');

    //     if (isOpen === "true") {
    //         // Ajax Here
    //         $.ajax({
    //             type: "method",
    //             url: "url",
    //             data: "data",
    //             dataType: "dataType",
    //             success: function (response) {
    //                 // set to false
    //             }
    //         });
    //         $(permissionIcon).hide();
    //         $(notPermissionIcon).show();
    //         $(this).attr('isOpen', false);
    //     } else if (isOpen === "false") {
    //         // Ajax Here
    //         $.ajax({
    //             type: "method",
    //             url: "url",
    //             data: "data",
    //             dataType: "dataType",
    //             success: function (response) {
    //                 // set to true
    //             }
    //         });
    //         $(permissionIcon).show();
    //         $(notPermissionIcon).hide();
    //         $(this).attr('isOpen', true);
    //     }
    // });

    // post priority change
    $('.priority-number').click(function (e) {
        var number = parseInt($(this).text());
        var maximum = 5;
        if (number < maximum) {
            // ajax here
            $.ajax({
                type: "method",
                url: "url",
                data: "data",
                dataType: "dataType",
                success: function (response) {
                    // Increase priority

                }
            });
            $(this).text(number + 1);
        } else if (number === maximum) {
            // reset priority ajax
            $.ajax({
                type: "method",
                url: "url",
                data: "data",
                dataType: "dataType",
                success: function (response) {
                    // Reset priority

                }
            });
            $(this).text(1);
        }
    });
});

// function for add or remove filters by mode. for example all roles or no roles radio buttons.
function showFilter(e, mode) {

    var target = $(e).parent().parent().parent().find('.filter-section-which');

    switch (mode) {
        case "no":
            $(target).slideUp(300);
            $(target.find('input')).each(function (index, element) {
                this.checked = false;
                var event = new Event('change');
                this.dispatchEvent(event);
            });
            break;

        case "has":
            $(target).slideDown(300);
            break;

        case "all":
            $(target).slideDown(300);
            $(target.find('input')).each(function (index, element) {
                var dataConnect = this.id;
                removeSelectedFilter(dataConnect)
                this.checked = true;
                var event = new Event('change');
                this.dispatchEvent(event);
            });
            break;

        default:
            break;
    }
}

// remove filter function
function removeSelectedFilter(dataConnect) {
    document.getElementById(dataConnect).checked = false;
    var event = new Event('change');
    document.getElementById(dataConnect).dispatchEvent(event);
}

// add filter function
function addSelectedFilter(id) {
    var checked = document.getElementById(id).checked;
    var text = $('#' + id).parent().find('label').text();
    var name = document.getElementById(id).name;

    if (checked) {
        var notLikeThis = $('.selected-filter[data-connect="' + id + '"]')
        console.log(notLikeThis.length)
        if (notLikeThis.length === 0) {
            var selectedFilter = document.createElement('span');
            $(selectedFilter).addClass('selected-filter');
            $(selectedFilter).addClass(name);

            var selectedFilterText = document.createElement('span');
            $(selectedFilterText).addClass('selected-filter-text');

            var selectedFilterIcon = document.createElement('span');
            $(selectedFilterIcon).addClass('bi');
            $(selectedFilterIcon).addClass('bi-x');
            $(selectedFilterIcon).addClass('vertical-center');

            $(selectedFilter).append(selectedFilterText);
            $(selectedFilter).append(selectedFilterIcon);

            $(selectedFilterText).text(text + " ");
            $(selectedFilter).attr("data-connect", id);
            selectedFilter.addEventListener('click', function () {
                var dataConnect = $(this).attr('data-connect');
                removeSelectedFilter(dataConnect);
            });

            $('.selected-filters').prepend(selectedFilter);
        }
    } else {
        $('.selected-filter[data-connect="' + id + '"]').remove();
    }
}

// search in filters
function searchInFilters(inputValue) {

    if (inputValue) {
        $('.search-in-filters-dropdown').fadeIn(300);
    } else {
        $('.search-in-filters-dropdown').fadeOut(300);
    }

    filter = inputValue.toUpperCase();
    var searchItems = document.getElementsByClassName('search-in-filters-dropdown-list-item');

    var isThereAnyItem = false;

    for (i = 0; i < searchItems.length; i++) {
        txtValue = $(searchItems[i]).text();
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            isThereAnyItem = true;
            searchItems[i].style.display = "";
        } else {
            searchItems[i].style.display = "none";
        }
    }

    // if find item its will show it on list. if dont find any item its will show another dropwdown.
    if (!isThereAnyItem) {
        $('.search-in-filters-dropdown-unavailable').show();
        $('.search-in-filters-dropdown').hide();
    } else {
        $('.search-in-filters-dropdown-unavailable').hide();
        $('.search-in-filters-dropdown').show();
    }
}

function _(el) {
    return document.getElementById(el);
}

function uploadFile() {
    var file = _("file1").files[0];
    // alert(file.name+" | "+file.size+" | "+file.type);
    var formdata = new FormData();
    formdata.append(file.name, file);
    var ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", (event) => { completeHandler(event, file, formdata) }, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", "file_upload_parser.php"); // http://www.developphp.com/video/JavaScript/File-Upload-Progress-Bar-Meter-Tutorial-Ajax-PHP
    //send file ajax here
    ajax.send(formdata);
}

function progressHandler(event) {
    _("loaded_n_total").innerHTML = "Uploaded " + getFileSize(event.loaded) + " of " + getFileSize(event.total);
    var percent = (event.loaded / event.total) * 100;
    _("progressBar").value = Math.round(percent);
    _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
}

function completeHandler(event, file, formData) {
    _("status").innerHTML = event.target.responseText;
    _("progressBar").value = 0; //wil clear progress bar after successful upload

    createUploadedFile(file, formData);
}

function errorHandler(event) {
    _("status").innerHTML = "Upload Failed";
}

function abortHandler(event) {
    _("status").innerHTML = "Upload Aborted";
}

function createUploadedFile(file, formData) {

    var blob = new Blob([file], { type: file.type });
    var url = URL.createObjectURL(blob);

    var uploadedFile = document.createElement('div');
    $(uploadedFile).addClass('uploaded-file');

    var uploadedFileInfo = document.createElement('div');
    $(uploadedFileInfo).addClass('uploaded-file-info');

    var uploadedFileActions = document.createElement('div');
    $(uploadedFileActions).addClass('uploaded-file-actions');


    if (file.name.split('.').pop() === "png" ||
        file.name.split('.').pop() === "jpg" ||
        file.name.split('.').pop() === "webp") {
        var uploadedFileImage = document.createElement('img');
        $(uploadedFileImage).attr('src', url);
        $(uploadedFileInfo).append(uploadedFileImage);
    } else {
        var uploadedFileIcon = document.createElement('i');
        $(uploadedFileIcon).addClass('bi');
        $(uploadedFileIcon).addClass(getFileIcon(file.name.split('.').pop()));
        $(uploadedFileInfo).append(uploadedFileIcon);
    }

    var uploadedFileInfoText = document.createElement('div');
    $(uploadedFileInfoText).addClass('uploaded-file-info-text');

    var uploadedFileName = document.createElement('h5');
    $(uploadedFileName).addClass('uploaded-file-name');
    $(uploadedFileName).text(file.name);

    var uploadedFileSize = document.createElement('p');
    $(uploadedFileSize).addClass('uploaded-file-size');
    $(uploadedFileSize).text(getFileSize(file.size));

    $(uploadedFileInfoText).append(uploadedFileName);
    $(uploadedFileInfoText).append(uploadedFileSize);

    
    $(uploadedFileInfo).append(uploadedFileInfoText);

    var uploadedFileRemove = document.createElement('a');
    $(uploadedFileRemove).addClass('uploaded-file-remove');
    $(uploadedFileRemove).attr('href', "#0");

    uploadedFileRemoveIcon = document.createElement('i');
    $(uploadedFileRemoveIcon).addClass('bi');
    $(uploadedFileRemoveIcon).addClass('bi-trash');

    $(uploadedFileRemove).append(uploadedFileRemoveIcon);
    uploadedFileRemove.addEventListener('click', function () {
        formData.delete(file.name);
        $(this).parent().parent().remove();
    });

    $(uploadedFileActions).append(uploadedFileRemove);

    var uploadedFileDownload = document.createElement('a');
    $(uploadedFileDownload).addClass('uploaded-file-download');
    $(uploadedFileDownload).attr('href', url);
    $(uploadedFileDownload).attr('download', file.name);
    $(uploadedFileDownload).text('Download ');

    uploadedFileDownloadIcon = document.createElement('i');
    $(uploadedFileDownloadIcon).addClass('bi');
    $(uploadedFileDownloadIcon).addClass('bi-download');

    $(uploadedFileDownload).append(uploadedFileDownloadIcon);

    $(uploadedFileActions).append(uploadedFileDownload);

    $(uploadedFile).append(uploadedFileInfo);
    $(uploadedFile).append(uploadedFileActions);

    $('.uploaded-files').append(uploadedFile);
}

function getFileIcon(fileType) {
    fileType = fileType.toLowerCase();
    var result = "bi-file-earmark"
    switch (fileType) {
        case "mp4":
            result = "bi-file-earmark-play"
            break;
        case "mkv":
            result = "bi-file-earmark-play"
            break;
        case "mov":
            result = "bi-file-earmark-play"
            break;
        case "avi":
            result = "bi-file-earmark-play"
            break;
        case "wmv":
            result = "bi-file-earmark-play"
            break;
        case "webm":
            result = "bi-file-earmark-play"
            break;
        case "rar":
            result = "bi-file-earmark-zip"
            break;
        case "zip":
            result = "bi-file-earmark-zip"
            break;
        default:
            result = "bi-filetype-" + fileType;
            break;
    }
    return result;
}

function getFileSize(size) {
    var division = 1;
    var unit = 'bytes'
    if (size < 1024) {
        division = 1;
        unit = 'bytes'
    }
    if (size >= 1024) {
        division = 1024;
        unit = 'Kb'
    }
    if (size >= 1048576) {
        division = 1048576;
        unit = 'Mb'
    }
    if (size >= 1073741824) {
        division = 1073741824;
        unit = 'Gb'
    }

    return (size / division).toFixed(2) + " " + unit
}