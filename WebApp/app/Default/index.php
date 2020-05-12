
        <!-- Content Start -->
        <div class="content">
            <div class="main-container">
                <div class="container">

                    
<!-- The Modal -->
<div id="myImgModal" class="modal fade imgModel">
    <span class="close">&times;</span>
    <div id="viewimg">
        <canvas id="imgview"></canvas>
    </div>
    <div id="caption"></div>
</div>
<div>
    <div>
        <a href="javascript:runCode()" style="position:fixed;"  class="supportIcon img-circle pointer"><span style="color:#FFF;font-size: 21px"  class="glyphicon glyphicon-envelope pointer" ></span></a>
    </div>
    <div class="modal fade" id="exampleModal_help" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="exampleModalLabel">Help & Support</h4>
                </div>
                <div class="modal-body">
                    <form role="form" action="photoupload">
                        <div class="row">
                            <div class="col-sm-12"><strong class="blackColor">Subject</strong>
                            </div>
                            <div class="col-sm-8">
                                <input class="form-control" type="text" id="feedBackSubject">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12"><strong class="blackColor">Type</strong>
                            </div>
                            <div class="col-sm-8">
                                <select class="form-control" id="mailType">
                                    <option value="0">select Mail Type</option>
                                    <option value="1">Suggestion</option>
                                    <option value="2">Query</option>
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12"><strong class="blackColor">Message</strong>
                            </div>
                            <div class="col-sm-12">
                                <textarea id="message" class="form-control" rows="7"></textarea>
                            </div>
                        </div>
                        <div class="row marginTop">
                            <div id="box1" style="width: 450px; height: 250px; border-style: solid; border-width: 2px;"></div>
                        </div>                    
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="submitgreebbtn" onclick="submitFeedBack()" >Submit</button>
                            <button type="button" class="btn btn-default" onclick="closemodel()">Cancel</button>
                        </div>
                    </form>
                </div> <!-- I am closing modal body here -->

            </div>
        </div>
    </div>
</div>
<a id="test"></a><style>
    .supportIcon {
        background: rgb(234, 66, 53) none repeat scroll 0% 0%;
        border: 2px solid rgb(191, 24, 11) !important;
        bottom: 45px;
        padding: 15px;
        position: absolute;
        right: 15px;
        z-index: 100000;
    }
    #myImg:hover {opacity: 0.7;}
</style>
<script>
    var photo;
    function runCode() {
        genScreenshot();
        $('#exampleModal_help').modal('show');
    }

    function submitFeedBack() {
        var feedBackSubject = $("#feedBackSubject").val();
        var feedBackMessage = $(".Editor-editor").html();
        var mailType = $("#mailType").val();
        $("#loaderdiv1").show();
        if (mailType==0 || mailType == " ") {
            swal('Please select Mail Type');
             return false;                
        }else{
        $.ajax({
            method: 'POST',
            url: '/owner/settings/sendmailwithimage',

            data: {
                photo: photo,
                feedBackSubject: feedBackSubject,
                feedBackMessage: feedBackMessage,
                mailType: mailType
            },
            success: function (data) {
                $("#loaderdiv1").hide();
                if(mailType==2)
                swal("success!", "Your Query Successfully Forwarded", "success");
                if(mailType==1)
                swal("success!", "Your Suggestion Successfully Forwarded", "success");
                $('#exampleModal_help').modal('hide');
            }
        });
       }
    }
    function closemodel() {
        $('#exampleModal_help').modal('hide');
    }

    $(document).ready(function () {
        $("#mailType").val(0);
// Get the modal
        var modal = document.getElementById('myImgModal');
        $("#box1").click(function () {
            $('#myImgModal').modal('show');
        });
// Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
        $("body").on('change', '#mailType', function () {
            var mailTypeId = $("#mailType").val();
            if (mailTypeId == 1) {
                $("#box1").hide();
            } else {
                $("#box1").show();
            }

        });
                $("#message").Editor({
            'aligneffects':true, //This just gave little space before inserting toolbar. Dont know what this actually does.
            'textformats':false,
            'fonteffects':false,
            'actions' : true, // I dont know what this line does.
            'insertoptions' : false,
            'extraeffects' : false,
            'advancedoptions' : false,
            'screeneffects':false,
            'bold': true,
            'italics': true,
            'underline':true,
            'ol':true,
            'ul':true,
            'undo':false,
            'redo':false,
            'l_align':false,
            'r_align':false,
            'c_align':false,
            'justify':false,
            'insert_link':false,
            'unlink':false,
            'insert_img':false,
            'hr_line':false,
            'block_quote':false,
            'source':false,
            'strikeout':false,
            'indent':true,
            'outdent':true,
            'fonts':false,
            'styles':false,
            'print':false,
            'rm_format':false,
            'status_bar':false,
            'font_size':false,
            'color':false,
            'splchars':false,
            'insert_table':false,
            'select_all':true,
            'togglescreen':false
        });  // We are displaying Editor on Pop up here. 

        // Code to clear modal content on modal hide
        $(".modal").on("hidden.bs.modal", function () {
            $("#feedBackSubject").val("");
            $(".Editor-editor").text("");
        });
        // With Following code I'm capitalizing first letter of Subject and message
        $("#feedBackSubject").keyup(function (event) {
            $(this).val(($(this).val().substr(0, 1).toUpperCase()) + ($(this).val().substr(1)));
        });
        $(".Editor-editor").keyup(function (event) {
            $(this).val(($(this).val().substr(0, 1).toUpperCase()) + ($(this).val().substr(1)));
        });
    });

    function genScreenshot() {
        html2canvas(document.body, {//html2canvas(document.body, {
            onrendered: function (canvas) {
                $('#box1').html("");
                $('#box1').append(canvas);
                $("canvas").css("max-width", "100%"); // When i didn't set max width and height to canvas it was taking very large area on screen and was going out of boundary of modal.
                $("canvas").css("max-height", "100%");
                $("canvas").attr('id', 'myImg');

                if (navigator.userAgent.indexOf("MSIE ") > 0 ||
                        navigator.userAgent.match(/Trident.*rv\:11\./)) {
                    var blob = canvas.msToBlob();
                    window.navigator.msSaveBlob(blob, 'Test file.png');
                } else {
                    $('#test').attr('href', canvas.toDataURL("image/png"));
                    window.photo = canvas.toDataURL('image/png'); // to make a global variable we use window.variableName.
                    $('#test').attr('download', 'Test file.png');
                }
            }
        });
    }
</script>

<div class="row">
    <div class="col-lg-6"> 
        <div class="innerPageTitleDiv">
            <h1>View Bookings</h1>
        </div>
    </div>
        <div class="col-lg-6" style="text-align:right; ">
        <!----<div class="btn-group" >  -->
            <div>  
        <a  class="btn UserBtnAddUser dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img class="AddBokingBtnIcon" src="/images/bg.png">
        Add Booking 
        </a>
        <ul class="dropdown-menu">
                                <li>   <a href="http://www.isquaretaxi.in/owner/booking/outstation">Outstation</a> </li>
                                <li>   <a href="http://www.isquaretaxi.in/owner/booking/local">Local</a> </li>
                                <li>   <a href="http://www.isquaretaxi.in/owner/booking/transfer">Transfer</a> </li>
                                <li>   <a href="http://www.isquaretaxi.in/owner/booking/sharecab">Sharecab</a> </li>
                                <li>   <a href="http://www.isquaretaxi.in/owner/booking/onewaydeals">Oneway Deals</a> </li>
                                <li>   <a href="http://www.isquaretaxi.in/owner/booking/packages">Packages</a> </li>
                    <!--            <li>   <a href="#"Hourly></a> </li> 
        <li>   <a href="#">Point To Point</a> </li>
        <li>   <a href="">Package</a> </li>-->
        </ul>
         </div> 
        
    </div> 
           
<!--    <div class="CalendarColumns">Reporting Period 
        <div class="btn-group">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Yesterday 25 Nov 2015 <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li><a href="#">Column 1</a></li>
                <li><a href="#">Column 1</a></li>
                <li><a href="#">Column 1</a></li>
            </ul>
        </div>
    </div>-->

</div> 
<div class="listingTableDiv">
    <div class="listingTableHeader">
        <div class="row"> 
            <div class="col-lg-9 clearfix">
        <div class="UsersTab">
            <div class="btn-group" role="group" aria-label="...">
                 <button onclick="tdcustomsearch('All')" type="button" class="btn btn-default btnAll">All</button>
                <button onclick="tdcustomsearch('Current')"  type="button" class="btn btn-default CurrentViewBookingsBtnLine">Current</button>
                <button onclick="tdcustomsearch('Future')" type="button" class="btn btn-default FutureViewBookingsBtnLine">Future</button>
                <button onclick="tdcustomsearch('Settlement')" type="button" class="btn btn-default DoSettlementViewBookingsBtnLine">Close Duty</button>
                <button onclick="tdcustomsearch('0')" type="button" class="btn btn-default PendingViewBookingsBtnLine">Pending</button>
                <button onclick="tdcustomsearch('4')" type="button" class="btn btn-default CompleteViewBookingsBtnLine">Complete</button>
                <button onclick="tdcustomsearch('2')" type="button" class="btn btn-default CancelledViewBookingsBtnLine">Cancelled</button>
            </div>
        </div>
            </div>

            <div class="col-lg-3 clearfix">
                <div class="MarginTopBox" style="margin-bottom:5px;"><input id="tdsearch" type="text" class="form-control searchIcon" aria-label="..." placeholder="Search Here.."></div>
            </div>
<!-- <div class="listingFilterColumns">
                <div class="btn-group">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Show / Hide Columns <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li> <a> <input type="checkbox"  value="2" class="hidecol" checked="">&nbsp; &nbsp;Reference No </a></li>
                    <li> <a> <input type="checkbox"  value="3" class="hidecol" checked="">&nbsp;&nbsp;Pickup City</a></li>
                    <li><a><input type="checkbox"  value="4" class="hidecol" checked="">&nbsp;&nbsp;Travel Date</a></li>
                    <li><a><input type="checkbox"  value="5" class="hidecol" checked="">&nbsp;&nbsp;Pickup Time</a></li>
                    <li><a><input type="checkbox"  value="6" class="hidecol" checked="">&nbsp;&nbsp;Travel Type</a></li>
                    <li><a><input type="checkbox"  value="7" class="hidecol" checked="">&nbsp;&nbsp;User Type</a></li>
                </ul>
            </div>
        </div>-->
        </div>
    </div>
    <div class="listingTableContainer">

        <div class="table-responsive">          
            <table id="bookingTable" class="table table-hover">
                <thead>
                    <tr class="dataTable-title" style="padding:3px;">
                        <th>Sr. No</th>
                        <th>bookingId</th>
                        <th>Reference No</th>
                        <th>Pickup City</th>
                        <th>Travel Date</th>
                        <th>Pickup Time</th>
                        <th>Travel Type</th>
                        <th>User Type</th>
                        <th>status</th>
                        <th>tEndDate</th>
                        <th>uname</th>
                        <th>Type</th>
<!--                        <th>Notes</th>-->
                    </tr>
                </thead>

<!--table data will come from server side dynamicaly-->

            </table>
        </div>
    </div>

</div>
  <script type="text/javascript">
        
    $('.btn-default').click(function(){
        $('.btn-default').removeClass('btn-primary');
        $(this).addClass('btn-primary');
    });

    var td
    var category="";
    $(document).ready(function () {
        $('.btnAll').addClass('btn-primary');
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var tomarrow = new Date();
        tomarrow.setHours(0, 0, 0, 0);
        //add a day to the date
        tomarrow.setDate(tomarrow.getDate() + 1);

         td = $('#bookingTable').DataTable({
            // stateSave: true,
            responsive: true,
            "language": {
					"processing": "<div></div><div></div><div></div><div></div><div></div>"
			},
            "processing": true,
            "serverSide": true,
            "ajax": {
               "url": "/owner/booking/bookingsServerside",
               "data":function(post){
                   post.category=category;
               }
            },
            
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                var $nRow = $(nRow); // cache the row wrapped up in jQuery

                var tDay = new Date(aData[4].split("-").join(" "));
                tDay.setHours(0, 0, 0, 0);
                var tEndDay = new Date(aData[9].split("-").join(" "));
                tEndDay.setHours(0, 0, 0, 0);
                if ('0' == aData[8]) {
                    $nRow.addClass('PendingViewBookingsColor');
                }
                else if ('2' == aData[8]) {
                    $nRow.addClass('CancelledViewBookingsColor');
                }
                else if ('4' == aData[8]) {
                    $nRow.addClass('CompleteViewBookingsColor');
                }
                else if ('1' == aData[8] && tDay <= today && today < tEndDay) {
                    $nRow.addClass('CurrentViewBookingsColor');
                }
                else if ('1' == aData[8] && today < tDay) {
                    $nRow.addClass('FutureViewBookingsColor');
                }
                else if ('1' == aData[8] && tEndDay <= today || '3' == aData[8]) {
                    $nRow.addClass('DoSettlementViewBookingsColor');
                }


                $("#bookingTable_length").css('float', 'left');
                $("#bookingTable_info").css('float', 'left');
                $("#bookingTable_info").css('margin', '-3px 0 0 10px');

            },
            "sDom": '<"top">rt<"bottom listingTableFooter"<"listingPageCountDiv"li><"clear"><"listingPaginationDiv"p>><"clear">',
            
            "columnDefs": [

                {
                    "targets": [1],
                    "visible": false,
                    "searchable": false,
                },
                {
                    "targets": [2],
                    "mRender": function (data, type, alldata) {
                        //if (alldata[8] != 0)
                            return "<a style='text-decoration: underline;' href=/owner/booking/overview/" + alldata[1] + ">" + data + "</a>";
                       // else
                          //  return data;

                    }
                },
                { "targets": [7],
                    "mRender": function (data, type, alldata) {
                        //if (alldata[8] != 0)
                            return '<a class="tt" data-toggle="tooltip" data-placement="top" title="'+ alldata[10] +'">'+ alldata[7] +'</a>';
                       // else
                          //  return data;

                    } },
                {
                    "targets": [8,9,10],
                    "visible": false,
                    "searchable": false,
                },
                {
                    "searchable": false,
                    "orderable": false,
                    "targets": 0,
                    "defaultContent": ""
                }],
            "order": [[1, 'desc']]
        });

        td.on('draw.dt', function () {
           $('body').find('.tt').tooltip();  
        });

    	var search_delay='';
        $('#tdsearch').on('keyup', function () {
        clearTimeout(search_delay);
        var sval=this.value;
        search_delay = setTimeout(function () {
            td.search(sval).draw();
        },500);
        });
        
        //  for hide show column
        $('.hidecol').click(function () {
            var indx = $(this).val();
            td.column(indx).visible(!td.column(indx).visible());
//            td.columns.adjust().draw(false); // adjust column sizing and redraw
        });

    });
    
    // for buttons get data by category
    function tdcustomsearch(sval){
        category='All'==sval?'':sval;
        td.draw();
    }
  </script>



                    <div class="innerFooter">© 2009 - 2020  Powered by <a target="_blank" href="http://www.cabsaas.com/">CabSaaS</a>. · All Right Reserved. <a target="_blank" href="http://www.cabsaas.com/terms-n-conditions">Terms of Services</a>  </div>

                </div>
            </div>
        </div>


        <!-- Content End -->