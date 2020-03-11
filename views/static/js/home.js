$( document ).ready(function() {

    //on page load list PlayLists ------------START
    $.ajax({
        url: "playLists/list",
        dataType: "json",
    })
    .done((data) => {
        if(data) {

            var odata = $.parseJSON(JSON.stringify(data.docs));
            odata.forEach(item => {
                $('#myTablePlayList > tbody:last-child').append(getRowHtmlPlayList(item));
            });
        }
    })
    .fail((err) => {
        console.log("Error");
    });  
    
    //on add Play List submit the form----------------------------START
    $("#btnSubmitPlayList").click (() => {
        $("#addPlayListForm").submit();
    });

	$(document).on("submit", '#addPlayListForm', function(event) {
		event.preventDefault(); 
		var $form = $(this);
		
        $.ajax({
            url: 'playLists/add',
            data: $form.serializeArray(),
            type: 'POST'
        })
        .done((data) => {
            if(data) {
                var odata = $.parseJSON(JSON.stringify(data.docs));
                odata.forEach(item => {
                    $('#myTablePlayList > tbody:last-child').append(getRowHtmlPlayList(item));
                });
                $('#addPlayListForm').trigger("reset");
            }
        })
        .fail((err) => {
            console.log("Error");
        });
    });	  
    //-------------------------------------------------------END
	  
    //on click of delete PLayList----------------------------START
    $(document).on("click", ".btn-del-playList", function(event) { 

        //identify the row which we will remove from our table.
        var row = $(this).parent().parent();

        $.ajax({
            url: 'playLists/delete',
            data: { id:this.id },
            type: 'POST'
        })
        .done((data) => {
            if(data) {
               console.log(data);
               row.remove();
            }
        })
        .fail((err) => {
            console.log("Error");
        });
    });	
    //-------------------------------------------------------END
    
});

function getRowHtmlPlayList(item) {
    
    var thtml = getTD(item.name) 
                + getTD(item.songs) 
                + getDelBtnPlayList(item._id);
    thtml = getTR(thtml);
    return thtml;
}
function getTD(val) {
    return '<td>'+ val + '</td>';
}

function getTR(val) {
    return '<tr>'+ val + '</tr>';
}

function getDelBtnPlayList(val) {
    return '<td><button type="button" id='+ val +' class="btn btn-default btn-sm btn-del-playList"><span class="fa fa-trash-alt" style="color:red; font-size:17px"></span> </button></td>';
}
