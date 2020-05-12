
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <base href="http://anmolfoundation.group/isquaretaxi/">
        <title>CabSaaS Inventory and Fleet Management </title>

        {{head_link_files}}
    </head>


    <body style="min-height:800px;">

        {{left_sidebar_content}}

        {{top_content_bar}}

        {{body_content_are}}


        {{footer_link_files}}

        <script>
            $(document).ready(function () {
                notificationSummary();
                //MESSAGE EXECUTOR
                setInterval(function () {
                    notificationSummary();
                }, 600 * 60 * 1);  //CALL FUNCTION AFTER EVERY ONE MINUTE               
                // 600 * 60 * 1 = 36000
                // 36000 / 60 = 600ms
                // 600ms = 1 Minute
                // So the event will execute after every one minute  
                //END

                //HIDE SHOW MESSAGE BOARD
                jQuery(".notificationDiv").click(function (e) {
                    e.stopPropagation();
                    jQuery('.NotificationContener').slideToggle(400);
                });
                jQuery(".NotificationContener").click(function (e) {
                    e.stopPropagation();
                });
                jQuery("body").click(function () {
                    jQuery('.NotificationContener').slideUp(400);
                });

                function notificationSummary()
                {
                    var base_url = window.location.origin;

                    try {
                        var ovalTag = ["", "OvelOne", "OvelTwo", "OvelThree", "OvelFour", "OvelFive", "OvelSix"];
                        var activities = [1, 2, 3];
                        var fLinkRed;
                        //GET COUNT OF EXISTANING EMAIL COUNT                    
                        jQuery.ajax({
                            url: "/owner/dashboard/timon",
                            type: "POST",
                            data: {activities: activities},
                            success: function (msg) {
                                var jResp = JSON.parse(msg);
                                var countCC = 1, BoardTitle, BoardCount,BoardCount1, BoardLink, ovalC, billboard = 0,billboard1 = 0;
                                $("#notificationSpan").html("");
                                $("#notificationSpan1").html("");
                                //console.clear();
                                jQuery('.NotificationCounter').html("").hide();

                                for (var i = jResp.noti.length; i--; )
                                {
                                    ovalC = ovalTag[countCC];
                                    //var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                                    BoardTitle = jResp.noti[i].NTFT_TITLE;
                                    BoardCount = jResp.noti[i].UNB_BRD_CNT;
                                    BoardLink = jResp.noti[i].NTFT_LINK;
                                    fLinkRed = base_url + "/owner" + BoardLink;
                                    var pBoard = '<div class="NotificationRow"><a href="' + fLinkRed + '">' + BoardTitle + '</a><div class="RowOvel ' + ovalC + '">' + BoardCount + '</div></div>';
//                                    var pBoard = '<div class="NotificationRow"><a href="' + fLinkRed + '">' + I + '</a><div class="RowOvel ' + ovalC + '">' + BoardCount + '</div></div>';

                                    $("#notificationSpan").append(pBoard);
                                    countCC++;
                                    billboard = billboard + parseInt(BoardCount1);

                                }
                                for (var i = jResp.inbox.length; i--; )
                                {
                                    ovalC = ovalTag[countCC];
                                    BoardCount1 = jResp.inbox[i].UNB_Note_CNT;
                                    fLinkRed = base_url + "/owner" + '/messages/messagelist';
                                    var pBoard1 = '<div class="NotificationRow"><a href="' + fLinkRed + '">' + 'Inbox' + '</a><div class="RowOvel ' + ovalC + '">' + BoardCount1 + '</div></div>';
//                                    var pBoard = '<div class="NotificationRow"><a href="' + fLinkRed + '">' + I + '</a><div class="RowOvel ' + ovalC + '">' + BoardCount + '</div></div>';

                                    $("#notificationSpan1").append(pBoard1);
                                    countCC++;
                                    billboard1 = billboard1 + parseInt(BoardCount1);

                                }

                                if (billboard1 > 0)
                                {
                                    jQuery('.NotificationCounter').html(billboard1).fadeIn(800);
                                }
                                if (billboard > 0)
                                {
                                    jQuery('.NotificationCounter').html(billboard).fadeIn(800);
                                }
                                //END               
                            },
                            error: function () {
                                //  alert('Unable to receive data from server.');
                            }
                        });
                    } catch (err) {//alert("Error: " + err);
                        console.error("inner", err);
                    }
                }
            });
            function  advanceSearch(value) {
                var minlength = 3;
                var searchBy = $("#globalSearchBy").find('.selected').attr('data-index');
                if (value.length >= minlength) {
                    $.ajax({
                        type: "POST",
                        url: '/owner/address/searchby',
                        data: {
                            'searchValue': value,
                            'searchByValue': searchBy
                        },
                        dataType: "json",
                        success: function (msg) {
                            $('#SearchBoxList').empty();
                            $.each(msg, function (k, v) {

                                $('#SearchBoxList').fadeIn(200).append('<a href="' + v['url'] + v['id'] + '"><div class="SearchBoxResultDiv">' + v['info'] + '</div></a>');
                            });
                        }
                    });
                }
            }
            $('.dropdown-menu li a').on('click', function () {
                var id = $(this).closest('ul').prev().attr('id');
                $("#" + id).html($(this).text() + '<span class="caret"></span>');
                var ulId = $(this).closest('ul').attr('id');
                $(this).closest('ul').find('.selected').removeClass('selected');
                $(this).addClass('selected');
                var selectIndexId = $("#" + ulId).find('.selected').attr('data-index');
            })
        </script>
    </body>
</html>
