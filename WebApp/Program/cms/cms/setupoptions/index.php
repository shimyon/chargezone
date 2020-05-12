
  <!DOCTYPE html><html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <title>CabSaaS Inventory and Fleet Management </title><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!-- Le styles -->
        <link href="/css/sweetalert.css" media="screen" rel="stylesheet" type="text/css">
<link href="/css/font-awesome.min1.css" media="screen" rel="stylesheet" type="text/css">
<link href="/css/editor.css" media="screen" rel="stylesheet" type="text/css">
<link href="/datatables/css/dataTables.colVis.css" media="screen" rel="stylesheet" type="text/css">
<link href="/css/loadingAjax.css" media="screen" rel="stylesheet" type="text/css">
<link href="/css/date/jquery-ui.css" media="screen" rel="stylesheet" type="text/css">
<link href="/css/bootstrap.css" media="screen" rel="stylesheet" type="text/css">
<link href="/images/company/favicon/I_SQUARE_TAXI_20180928193600870117_favicon.png" rel="shortcut icon" type="image/vnd.microsoft.icon">        <!-- Scripts -->
        <script type="text/javascript" src="/js/sweetalert.min.js"></script>
<script type="text/javascript" src="/js/loadingAjax.js"></script>
<script type="text/javascript" src="/js/jquery.min.js"></script>
<script type="text/javascript" src="/js/date/jquery-ui.js"></script>
        <link rel="stylesheet" type="text/css" href="/css/innerPageStyle.css">
        <link rel="stylesheet" type="text/css" href="/css/cabsaas-innerPage.css">
        <link rel="stylesheet" type="text/css" href="/css/inner-responsive.css">
        <style>
            .tarifferror {
                background-color: #fff;
                color: #ff6601;
                float: left;
                font-size: small;
                height: 20px;
            }
            .error {
                border: 1px solid transparent;
                border-radius: 4px;
                padding: 5px;
                background-color: #f2dede;
                border-color: #ebccd1;
                color: #a94442;
            } 
        </style>
    </head>


    <body style="min-height:800px;">

        <!-- Left Sidebar Start -->
        <div class="sidebar sidebar-left" style="min-height: 100%;">
                        <!-- Logo Start -->
            <div class="logo-container img-responsive"><a  class="img-responsive" href="/owner/dashboard/dashboard"><img  src="/images/company/clogo/300x60/I_SQUARE_TAXI_20180928190218888619_logo.png" alt="I SQUARE TAXI"></a></div>


            <!-- Menu Start -->
            <ul class="main-menu">
                                        <li style="background-color: #0e9fce;"><a href="/owner/dashboard/dashboard"><i class="OverviewIcon"></i><span style="color:#FFF;">&nbsp;Dashboard</span></a></li>
                        
                                        <li class="has-submenu"><a href="#"><i class="BookingIcon"></i><span>&nbsp;Bookings</span></a>
                            <ul class="submenu"> 
        <!--                        <li><a href=""><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Overview</a></li>-->
                                                                    <li><a href="/owner/booking/bookings"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;View Bookings</a></li>
                                 
                              <!--<li><a href=""><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Website booking Enquiries</a></li>-->

                                                                    <li><a href="/owner/booking/cancelbookings"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Cancel Bookings</a></li>
                                                                                                    <li><a href="/owner/booking/closeduty"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Close Duty</a></li>
                                                    <!--<li><a href=""><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Confirm Booking</a></li>-->

                                                                    <li><a href="/owner/booking/enquirylist"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Enquiries</a></li>
                                

                                                        <!--<li><a href=""><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Crm</a></li>-->
                                    <li><a href="/owner/analytics/bookedby"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Booked By</a></li>
                                    <!--<li><a href=""><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Package By</a></li>-->
                                                                <li><a href="/owner/booking/bookingsfollowup"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Follow Up</a></li>           
                            </ul>
                        </li>
                        
                                        <li class="has-submenu"><a href="#"><i class="DispatchMenuIcon"></i><span>&nbsp;Dispatch</span></a>
                            <ul class="submenu">
                                                                    <li><a href="/owner/dispatch/dispatch"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Dispatch Bookings</a></li>
                                                                                                    <li><a href="/owner/analytics/calandercar"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Booking Calendar</a></li>
                                                                                                    <li><a href="/owner/analytics/carcalender"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Vehicle Calendar</a></li>
                                                                                                    <li><a href="/owner/booking/issuelist"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Booking Issues</a></li>  
                                                                                                    <li><a href="/owner/dispatch/bookingstatus"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Booking Reconfirm</a></li>  
                                                                                                    <li><a href="/owner/dispatch/dispatchdetails"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Dispatch Report</a></li>  
                                                            </ul>
                        </li>
                        

                                        <li class="has-submenu"><a href="#" class="close-child"><i class="TariffIcon"></i><span>&nbsp;Tariff</span></a>
                            <ul class="submenu">
                                                                                                            <li><a href="/owner/tariff/roundtrip"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Customer</a></li>
                                                                                                                <li><a href="/owner/ftariff/roundtrip"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Fleet Partner</a></li>
                                                                                                    <li><a href="/owner/tariff/roundtriptariffoffer"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Tariff offer</a></li>      

                                                                    <li><a href="/owner/ftariff/tariffmargin"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Tariff Margin</a></li>
                                                                                                    <li><a href="/owner/tariff/tariffnightcharges"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Night Charges Slot</a></li>  
                                                                                                    <li><a href="/owner/tariff/specialday"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;SpecialDay Tariff</a></li>  
                                                                                                    <li><a href="/owner/discount/list"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Discount</a></li>
                                                                    <li><a href="/owner/cancellation/policy"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Cancellation Policy</a></li>
                                                            </ul>
                        </li>
                        
                                        <li class="has-submenu"><a href="#"><i class="VehicleIcon"></i><span>&nbsp;Vehicle</span></a>
                            <ul class="submenu">
                                <!--<li><a href=""><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Overview</a></li>-->
                                                                    <li><a href="/owner/vehicle/vehicle"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;View Vehicle</a></li>
                                                                                                    <li><a href="/owner/vehicle/mastervehicletype"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Vehicle Type</a></li>
                                                                                                    <li><a href="/owner/vehicle/adminvehicle"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Master Vehicle</a></li>
                                

                                 
                                    <li><a href="/owner/gps/hitmap"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Hit Map</a></li> 
                                
                            </ul>
                        </li>

                                                                <li class="has-submenu"><a href="#"><i class="FleetpartnerIcon"></i><span>&nbsp;Fleetpartner</span></a>
                            <ul class="submenu">

                                                                    <li><a href="/owner/vehicle/vehiclelist"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Available Inventory</a></li>
                                                                                                    <li><a href="/owner/address/address"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Garage Location</a></li>
                                
                                                                    <li><a href="/owner/verification/verification"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Doc Verification</a></li>
                                                                                                    <li><a href="/owner/booking/listfleetdetails"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;FP Status </a></li>
                                                                                                    <li><a href="/owner/verification/bankaccount"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;FP Bank A/c</a></li>
                                                   

                                                                    <li><a href="/owner/settings/agreement"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Agreements</a></li>
                                                      

                            </ul>
                        </li>

                                        


                          
                        <li class="has-submenu"><a href="#"><i class="UserIcon"></i><span>&nbsp;Users</span></a>
                            <ul class="submenu" style="display: none;">
                                <!--<li><a href=""><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Overview</a></li>-->
                                                                    <li><a href="/owner/user/customer"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;View Users</a></li>


                                

                                                                    <li><a href="/owner/user/dlogdetails"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Driver Log Details</a></li>
                                

                            </ul>
                        </li> 

                        

                            
                        <li class="has-submenu"><a href="#"><i class="FinanceIcon"></i><span>&nbsp;Finance</span></a> 
                            <ul class="submenu"> 
                                <!--<li><a href=""><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Overview</a></li>-->

                                                                    <li><a href="/owner/finance/creditlist"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp; Billing Payment</a></li>  
                                                                                                    <li><a href="/owner/finance/onlinepgpending"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Online Payment</a></li> 
                                                                
                                    
                                        <li><a href="/owner/finance/paymentverify"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp; Pay Payment</a></li>          

                                                                                                                                        <li><a href="/owner/finance/payment"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Payment/Receipt</a></li>
                                 
                                                                    <li><a href="/owner/finance/purchase"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Purchase/Sales</a></li>
                                                                 
                                    <li><a href="/owner/finance/crdraccount"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Account Balance</a></li>  
                                                                                                    <li><a href="/owner/finance/cashaccount"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Ledger Account</a></li> 
                                                                                                    <li><a href="/owner/booking/bookingscommission"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Commission</a></li>
                                                                                                         <li><a href="/owner/finance/indirectexpenses"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Indirect Expenses</a></li>
                                 
                                    
                                                                           <li><a href="/owner/finance/bookingsincentive"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Incentive</a></li>
                                  
                                    
                                                                    <li><a href="/owner/bankaccount/bankaccount"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Bank Account</a></li> 
                                                                      
                                    <li><a href="/owner/finance/bankstatement"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Bank Statement</a></li> 
                                                                      
                                    <li><a href="/owner/finance/paymentgatewayac"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Mapping Bank/PG</a></li> 
                                                                                                    <li><a href="/owner/dispatch/bulkinvoice"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Bulk Invoice</a></li> 
                                                                                                    <li><a href="/owner/dispatch/custombulkinvoice"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Custom Bulk Invoice</a></li> 
                                                                                                    <li><a href="/owner/dispatch/monthlyfleet"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Fleet Monthly Invoice</a></li> 
                                                                                                    <li><a href="/owner/dispatch/dailyfleet"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Fleet Daily Invoice</a></li> 
                                                                                                    <li><a href="/owner/finance/report"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Export To Tally</a></li> 
                                                                                                        <li><a href="/owner/finance/bookingsbalance"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Bookings Balance</a></li> 
                                                                    

                            </ul> 
                        </li>   

                                    

                             
                         <li class="has-submenu"><a href="#"><i class="SalaryIcon"></i><span>&nbsp;Salary</span></a>
                            
                                                         <ul class="submenu">
                                    <li><a href="/owner/empsalary/salarydetails" class="close-child"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Salary Struct Details</a></li>
                            </ul>
                                                                                        <ul class="submenu">
                                    <li><a href="/owner/empsalary/advancedetails" class="close-child"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Advance Details</a></li>
                            </ul>
                                                                                    <ul class="submenu">
                                    <li><a href="/owner/empsalary/tripextrasdetails" class="close-child"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Trip Extras Details</a></li>
                            </ul>
                                                                                      <ul class="submenu">
                                    <li><a href="/owner/empsalary/index" class="close-child"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Salary Details</a></li>
                            </ul>
                                                                                      
                        </li>
                                     
                         
                        <li class="has-submenu"><a href="#"><i class="SetiingIcon"></i><span>&nbsp;Settings</span></a>
                            <ul class="submenu">
                            <!--<li><a href="#"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Overview</a></li>-->
                                <!--<li><a href="/owner/settings/changepassword"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Change Password</a></li>-->
                                                                    <li><a href="/cms/cms/setupoptions"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;SaaS Setup</a></li>
                                                                                                    <li><a href="/owner/settings/ipset"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Set Ips</a></li>
                                                                                                    <li><a href="/owner/mailerlist/index"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Mail Distribution List</a></li>
                                                                                                    <li><a href="/owner/geography/state"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;State List</a></li>
                                                                                                    <li><a href="/owner/geography/city"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;City List</a></li>
                                                                                                         <li><a href="/owner/settings/otherrequirements"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Other Req</a></li>
                                                                                                    <li><a href="/owner/geography/location"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Location List</a></li>
                                                                                                             <li><a href="/owner/tariff/outstationtype"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Outstation Distance</a></li>
                                                                                                                     <li><a href="/owner/tariff/transfertype"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Transfer Distance</a></li>
                                                                                                                    <li><a href="/owner/settings/otherstatekmrate"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Other State Rate</a></li>
                                                                                                                     <li><a href="/owner/geography/appoffer"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;App Offer</a></li>
                                        

                            </ul>
                        </li>
                                    
                <!--Profile-->
<!--                <li class="has-submenu"><a href="#"><i class="ProfileIcon"></i><span>&nbsp;Profile</span></a>
                    <ul class="submenu">
                       
                
                <li><a href=""><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Organisation</a></li>
                    </ul>
                </li>-->
                <!--End Profile-->

                <!--Website-->
                       
                        <li class="has-submenu"><a href="#"><i class="WebsiteIcon"></i><span>&nbsp;Website</span></a>
                            <ul class="submenu">

                                                                    <li><a href="/cms/cms/home" class="close-child"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Home</a></li>
                                
                                                                    <li><a href="/cms/cms/aboutus"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;About Us</a></li>
                                
                                                                    <li><a href="/cms/cms/contactus"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Contact Us</a></li>
                                 

                                                                    <li><a href="/cms/cms/tnc"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Term &amp; Conditions</a></li>
                                
                                                                    <li><a href="/cms/cms/services"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Services</a></li>
                                
                                                                    <li><a href="/cms/cms/privacypolicy"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Privacy Policy</a></li>
                                
                                                                    <li><a href="/cms/cms/social"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Social</a></li>
                                                                                                         <li><a href="/cms/cms/faqs"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;FAQ's</a></li>
                                
                                                                    <li><a href="/owner/widget/clientlist"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Widget</a></li>
                                
                                                                    <li><a href="/cms/cms/templates"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Themes</a></li>
                                
                                                                    <li><a href="/cms/cms/custompages"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Custom Pages</a></li>
                                                                                                        <li><a href="/cms/cms/customizetooltip"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Customize Tooltip</a></li> 
                                

                            </ul>
                        </li>

                         
                <!--End Website-->
                         
                        <li class="has-submenu"><a href="#"><i class="AnalyticsIcon"></i><span>&nbsp;Analytics</span></a>
                            <ul class="submenu">
                                                                    <li><a href="/owner/analytics/analysebookings"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Analyse Bookings</a></li>
                                                                                                    <li><a href="/owner/analytics/marginreport"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Booking Margin</a></li> 
                                                                                                    <li><a href="/owner/analytics/bookinglist"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Bookings</a></li>
                                                                                                    <li><a href="/owner/analytics/discountlist"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Discount</a></li>
                                                                                                    <li><a href="/owner/analytics/reports"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Booking BI</a></li>
                                
                                                                    <li><a href="/owner/reviews/reviews"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Reviews</a></li>

                                    <li><a href="/owner/tracking/overview"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Backlink</a></li>
                                  
                                    <li><a href="/owner/settings/activitylog"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Activity Log</a></li>
                                    <li><a href="/owner/analytics/customizebookings"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Customize Bookings</a></li>

                            </ul>
                        </li>
                         
                 
                        <li class="has-submenu"><a href="#"><i class="MessageIcon"></i><span>&nbsp;Message</span></a>
                            <ul class="submenu">
                                                                    <li><a href="/owner/messages/messagelist" class="close-child"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Inbox</a></li>
                                                                                                    <li><a href="/owner/messages/sentmessage" class="close-child"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Sent</a></li>
                                                            </ul>
                        </li>
                           
<li class="has-submenu"><a href="#"><i class="GpsNewIcon"></i><span>&nbsp;Gps</span></a>
                            <ul class="submenu">
                                    <li><a href="/owner/gps/overview" class="close-child"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;overview</a></li>
                            </ul>
                        </li>
                        <li class="has-submenu"><a href="#"><i class="UtilityIcon"></i><span>&nbsp;Utility</span></a>
                                                        <ul class="submenu">
                                    <li><a href="/owner/messages/promotionalsms" class="close-child"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Bulk SMS</a></li>
                            </ul>
                            <ul class="submenu">
                                    <li><a href="/owner/otherservice/flightlist" class="close-child"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Flight</a></li>
                            </ul>
                            <ul class="submenu">
                                    <li><a href="/owner/otherservice/hotellist" class="close-child"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Hotel</a></li>
                            </ul>
                                                        <ul class="submenu">
                                    <li><a href="/owner/utility/courierlist" class="close-child"><img src="/images/right-arrow.png" align="absmiddle"> &nbsp;Courier</a></li>
                            </ul>
                        </li>
                     

                        <!--<li><a href=""><i class="ReviewIcon"></i><span>&nbsp;Review</span></a></li>-->

                   

            </ul>
            <!-- Menu End --> 
            <div class="inner">

                <!-- Separator -->



            </div>

        </div>
        <!-- Left Sidebar End -->

        <!-- Top Content Bar Start -->
        <div class="top-bar">
            <div class="main-container">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-1 col-sm-3 hidden-xs paddingLeft">
                            <ul class="left-icons icon-list">
                                <li><a href="#" class="sidebar-collapse">
                                        <div class="triggerIconDiv">                     
                                            <div class="triggerIcon"></div>
                                        </div>   
                                    </a>   
                                    <!--                                    <div class="colorThemeDiv"></div>-->
                                </li>                    

                            </ul>
                        </div>

                        <div class="col-lg-11 col-sm-9 col-xs-12">
                            <div class="universalSearchDiv RelDiv" >
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="searchByBtn">Booking Id<span class="caret"></span></button>
                                        <ul class="dropdown-menu" id="globalSearchBy">

                                            <li><a data-index="uid">User ID</a></li>
                                            <li><a data-index="bid" class="selected">Booking ID</a></li>
                                            <li><a data-index="mno">Mobile Number</a></li>
                                            <li><a data-index="email">Email</a></li>

                                        </ul>
                                    </div><!-- /btn-group -->
                                    <input type="text" class="form-control searchIcon" aria-label="..." placeholder="Search Here.." onkeyup="advanceSearch(this.value)">

                                    <div class="SearchBoxList" id="SearchBoxList">

                                    </div>

                                </div><!-- /input-group -->
                            </div><!-- /.col-lg-6 -->


                            <div class="userProfileDiv"><div class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">Shimyon Parmar<span class="caret"></span></a>
                                    <ul class="dropdown-menu">
                                                                                        <li><a href="/owner/basicdetails/basicdetails/1577">My Profile</a></li>
                                                                                        <li role="separator" class="divider"></li>
                                        <li><a href="/owner/settings/changepassword">Change Password</a></li> 
                                        <li role="separator" class="divider"></li>
                                        <li><a href="/signin/logout">Log Out</a></li>
                                    </ul>
                                </div></div>
                            <div id="ProfilePhotoDiv">
                                <!--                                <div class="avatar">
                                                                    <img src="/images/profile-pic.png" alt=" Samantha Wilson "> 
                                                                </div>-->
                            </div>
                            <div class="notificationDiv RelDiv">
                                <div class="NotificationCounter" style="display:none"></div>
                                <div class="NotificationContener" style="height:auto; display:none">
                                    <div class="NotificationHeader">Notification</div>
                                    <span id="notificationSpan"></span>
                                    <span id="notificationSpan1"></span>

                                    <!--    <div class="NotificationRow">
                                            <a href="/owner/booking/bookings">Booking</a>
    
                                            <div class="RowOvel OvelOne">0</div>
                                        </div>
    
                                        <div class="NotificationRow">
                                            <a href="/owner/messages/messagelist">Messages</a>
                                            <div class="RowOvel OvelTwo">0</div>
                                        </div>
    
                                        <div class="NotificationRow">
                                            <a href="/owner/reviews/reviews">Review</a>
                                            <div class="RowOvel OvelThree">0</div>
                                        </div>-->

                                    <!--<div class="NotificationRow">Row
                                    <div class="RowOvel OvelFour">10</div>
                                    </div>
                                    
                                    <div class="NotificationRow">Row
                                    <div class="RowOvel OvelFive">10</div>
                                    </div>
                                    
                                    <div class="NotificationRow">Row
                                    <div class="RowOvel OvelSix">10</div>
                                    </div>-->

                                </div>
                            </div>
                            <div class="productSupportBox"><div class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true"><h4 style="font-size:15px;">For Product Support  <span class="caret"></span></h4></a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#"><span class="glyphicon glyphicon-time"></span>&nbsp;&nbsp;(Mon to Sat - 9:30 a.m to 6:30 p.m)</a></li>

                                        <li role="separator" class="divider"></li>
                                        <li><a href="#"><span class="glyphicon glyphicon-phone-alt"></span>&nbsp;&nbsp;Mobile 9049222247 </a></li>
                                        <!--                                        <li role="separator" class="divider"></li>
                                                                                <li><a href="#"><span class="glyphicon glyphicon-phone"></span>&nbsp;&nbsp;Mobile 9049 2222 47</a></li>-->
                                        <li role="separator" class="divider"></li>
                                        <li><a href="#"><span class="glyphicon glyphicon-envelope"></span>&nbsp;&nbsp;cabsaas@infogird.com</a></li>
                                    </ul>
                                </div></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Top Content Bar End -->

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

<link href="/css/style.css" type="text/css" rel="stylesheet">      
<style type="text/css">
    .errmsg {
        color: red;
        font-size: 13px;
        font-weight: bold;
    }
</style>  
<div class="row">
    <div class="col-lg-6"> 
        <div class="innerPageTitleDiv">
            <h1>Setup Option </h1>
            <span class="innerPageSubTitle"></span>

        </div>
    </div>

    <div class="col-lg-6">  
        <div class="CalenderOuter"></div>
    </div>

</div>
<div class="listingTableDiv">
    <div class="col-lg-12 MarginTopBox">
        <div class="bs-example">
            <div class="panel-group" id="accordion">
                <!-- 1 City-->
                <!--                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">City Name</a>
                                        </h4>
                                    </div>
                                    <div id="collapseOne" class="panel-collapse collapse in">
                                        <div class="panel-body">
                                            <div class="row">
                                                <form id="frmAddCity" method="POST" >
                                                    <div class="col-lg-4">
                                                        <select id="pCity" class="form-control" name="pCity" multiple >
                                                            <option value="0">select pcity</option>
                                                        </select>
                                                    </div>
                
                                                    <div class="col-lg-12 MarginTopBox" >
                                                        <button type="button" id="btnAddCity" class="btn btn-primary">Add City</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>-->
                <!--City End-->
                <!-- 2 Search Menu Setting-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a id="aMenuSetting"  data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">Search Menu Setting</a>
                        </h4>
                    </div>
                    <div id="collapseTwo" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row optionBox" id="sortable">
                                                                    <div class="HundredPercentClass">
                                        <div class="CloseDiv block" id="1" >Outstation <img src="/images/bg.png" width="1" height="1" align="absmiddle" class="CloseIcon pull-right remove">
                                        </div>
                                    </div>
                                                                    <div class="HundredPercentClass">
                                        <div class="CloseDiv block" id="2" >Local <img src="/images/bg.png" width="1" height="1" align="absmiddle" class="CloseIcon pull-right remove">
                                        </div>
                                    </div>
                                                                    <div class="HundredPercentClass">
                                        <div class="CloseDiv block" id="3" >Transfer <img src="/images/bg.png" width="1" height="1" align="absmiddle" class="CloseIcon pull-right remove">
                                        </div>
                                    </div>
                                                                    <div class="HundredPercentClass">
                                        <div class="CloseDiv block" id="6" >Sharecab <img src="/images/bg.png" width="1" height="1" align="absmiddle" class="CloseIcon pull-right remove">
                                        </div>
                                    </div>
                                                                    <div class="HundredPercentClass">
                                        <div class="CloseDiv block" id="7" >Oneway Deals <img src="/images/bg.png" width="1" height="1" align="absmiddle" class="CloseIcon pull-right remove">
                                        </div>
                                    </div>
                                                                    <div class="HundredPercentClass">
                                        <div class="CloseDiv block" id="8" >Packages <img src="/images/bg.png" width="1" height="1" align="absmiddle" class="CloseIcon pull-right remove">
                                        </div>
                                    </div>
                                  

                            </div>

                            <div class="row">
                                <div class="HundredPercentClass">
                                    <div class="col-lg-3">
                                        <button id="save_reorder" type="button" class="btn btn-primary">Save Order</button>
                                    </div>
                                </div>
                            </div>  

                            <div class="row">
                                <form method="POST" name="UserTarriffForm" id="UserTarriffForm">
                                    <div class="HundredPercentClass" id="strip1" ><!--MarginTopBox-->
                                        <div class="col-lg-12">
                                            <!--start CmsCabServicesBox wraper-->
                                            <div class="CmsCabServicesBox" id="option1" >
                                                <!--a tag to triger add teriff-->
                                                <a class="add addgh glyphicon glyphicon-plus" style="display: none;" id="1-Outstation"></a>
                                                <!--start Title-->
                                                <div class="CmsCabServicesTitleBox">
                                                    <div class="CmsCabServicesNumberBox img-circle">1</div> 
                                                    <span>Outstation</span>
                                                </div>
                                                <!--end Title-->
                                                <!--start subteriff-->
                                                                                                            <div class="CmsCabServicesClass">
                                                                <!--create checkbox--> 
                                                                <input type="checkbox" name="tariffSListId" data="1"  id="chk1"  value='1' checked class="tariffSListId" >
                                                                <!--end check box, give lable-->
                                                                Roundtrip                                                            </div>
                                                                                                                        <div class="CmsCabServicesClass">
                                                                <!--create checkbox--> 
                                                                <input type="checkbox" name="tariffSListId" data="1"  id="chk2"  value='2' checked class="tariffSListId" >
                                                                <!--end check box, give lable-->
                                                                Oneway                                                            </div>
                                                                                                                        <div class="CmsCabServicesClass">
                                                                <!--create checkbox--> 
                                                                <input type="checkbox" name="tariffSListId" data="1"  id="chk3"  value='3' checked class="tariffSListId" >
                                                                <!--end check box, give lable-->
                                                                Multicity                                                            </div>
                                                            
                                            </div>    <!--end CmsCabServicesBox wraper-->
                                        </div>
                                    </div>

                                    
                                    <div class="HundredPercentClass" id="strip2" ><!--MarginTopBox-->
                                        <div class="col-lg-12">
                                            <!--start CmsCabServicesBox wraper-->
                                            <div class="CmsCabServicesBox" id="option2" >
                                                <!--a tag to triger add teriff-->
                                                <a class="add addgh glyphicon glyphicon-plus" style="display: none;" id="2-Local"></a>
                                                <!--start Title-->
                                                <div class="CmsCabServicesTitleBox">
                                                    <div class="CmsCabServicesNumberBox img-circle">2</div> 
                                                    <span>Local</span>
                                                </div>
                                                <!--end Title-->
                                                <!--start subteriff-->
                                                                                                            <div class="CmsCabServicesClass">
                                                                <!--create checkbox--> 
                                                                <input type="checkbox" name="tariffSListId" data="2"  id="chk4"  value='4' checked class="tariffSListId" >
                                                                <!--end check box, give lable-->
                                                                Fullday                                                            </div>
                                                                                                                        <div class="CmsCabServicesClass">
                                                                <!--create checkbox--> 
                                                                <input type="checkbox" name="tariffSListId" data="2"  id="chk5"  value='5' checked class="tariffSListId" >
                                                                <!--end check box, give lable-->
                                                                Halfday                                                            </div>
                                                            
                                            </div>    <!--end CmsCabServicesBox wraper-->
                                        </div>
                                    </div>

                                    
                                    <div class="HundredPercentClass" id="strip3" ><!--MarginTopBox-->
                                        <div class="col-lg-12">
                                            <!--start CmsCabServicesBox wraper-->
                                            <div class="CmsCabServicesBox" id="option3" >
                                                <!--a tag to triger add teriff-->
                                                <a class="add addgh glyphicon glyphicon-plus" style="display: none;" id="3-Transfer"></a>
                                                <!--start Title-->
                                                <div class="CmsCabServicesTitleBox">
                                                    <div class="CmsCabServicesNumberBox img-circle">3</div> 
                                                    <span>Transfer</span>
                                                </div>
                                                <!--end Title-->
                                                <!--start subteriff-->
                                                                                                            <div class="CmsCabServicesClass">
                                                                <!--create checkbox--> 
                                                                <input type="checkbox" name="tariffSListId" data="3"  id="chk6"  value='6' checked class="tariffSListId" >
                                                                <!--end check box, give lable-->
                                                                Airport                                                            </div>
                                                                                                                        <div class="CmsCabServicesClass">
                                                                <!--create checkbox--> 
                                                                <input type="checkbox" name="tariffSListId" data="3"  id="chk7"  value='7' checked class="tariffSListId" >
                                                                <!--end check box, give lable-->
                                                                Railway Station                                                            </div>
                                                                                                                        <div class="CmsCabServicesClass">
                                                                <!--create checkbox--> 
                                                                <input type="checkbox" name="tariffSListId" data="3"  id="chk8"  value='8' checked class="tariffSListId" >
                                                                <!--end check box, give lable-->
                                                                Area / Hotel                                                            </div>
                                                            
                                            </div>    <!--end CmsCabServicesBox wraper-->
                                        </div>
                                    </div>

                                    
                                    <div class="HundredPercentClass" id="strip6" ><!--MarginTopBox-->
                                        <div class="col-lg-12">
                                            <!--start CmsCabServicesBox wraper-->
                                            <div class="CmsCabServicesBox" id="option6" >
                                                <!--a tag to triger add teriff-->
                                                <a class="add addgh glyphicon glyphicon-plus" style="display: none;" id="6-Sharecab"></a>
                                                <!--start Title-->
                                                <div class="CmsCabServicesTitleBox">
                                                    <div class="CmsCabServicesNumberBox img-circle">4</div> 
                                                    <span>Sharecab</span>
                                                </div>
                                                <!--end Title-->
                                                <!--start subteriff-->
                                                                                                            <div class="CmsCabServicesClass">
                                                                <!--create checkbox--> 
                                                                <input type="checkbox" name="tariffSListId" data="6"  id="chk11"  value='11' checked class="tariffSListId" >
                                                                <!--end check box, give lable-->
                                                                Sharecab                                                            </div>
                                                            
                                            </div>    <!--end CmsCabServicesBox wraper-->
                                        </div>
                                    </div>

                                    
                                    <div class="HundredPercentClass" id="strip7" ><!--MarginTopBox-->
                                        <div class="col-lg-12">
                                            <!--start CmsCabServicesBox wraper-->
                                            <div class="CmsCabServicesBox" id="option7" >
                                                <!--a tag to triger add teriff-->
                                                <a class="add addgh glyphicon glyphicon-plus" style="display: none;" id="7-Oneway Deals"></a>
                                                <!--start Title-->
                                                <div class="CmsCabServicesTitleBox">
                                                    <div class="CmsCabServicesNumberBox img-circle">5</div> 
                                                    <span>Oneway Deals</span>
                                                </div>
                                                <!--end Title-->
                                                <!--start subteriff-->
                                                                                                            <div class="CmsCabServicesClass">
                                                                <!--create checkbox--> 
                                                                <input type="checkbox" name="tariffSListId" data="7"  id="chk12"  value='12' checked class="tariffSListId" >
                                                                <!--end check box, give lable-->
                                                                Deal                                                            </div>
                                                            
                                            </div>    <!--end CmsCabServicesBox wraper-->
                                        </div>
                                    </div>

                                    
                                    <div class="HundredPercentClass" id="strip8" ><!--MarginTopBox-->
                                        <div class="col-lg-12">
                                            <!--start CmsCabServicesBox wraper-->
                                            <div class="CmsCabServicesBox" id="option8" >
                                                <!--a tag to triger add teriff-->
                                                <a class="add addgh glyphicon glyphicon-plus" style="display: none;" id="8-Packages"></a>
                                                <!--start Title-->
                                                <div class="CmsCabServicesTitleBox">
                                                    <div class="CmsCabServicesNumberBox img-circle">6</div> 
                                                    <span>Packages</span>
                                                </div>
                                                <!--end Title-->
                                                <!--start subteriff-->
                                                                                                            <div class="CmsCabServicesClass">
                                                                <!--create checkbox--> 
                                                                <input type="checkbox" name="tariffSListId" data="8"  id="chk13"  value='13' checked class="tariffSListId" >
                                                                <!--end check box, give lable-->
                                                                Package                                                            </div>
                                                            
                                            </div>    <!--end CmsCabServicesBox wraper-->
                                        </div>
                                    </div>

                                    </form>                            </div>
                        </div>
                    </div>
                </div>
                <!--End Search Menu Setting-->

                <!-- 2 Deal Preferences Setting-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a id="aMenuSetting"  data-toggle="collapse" data-parent="#accordion" href="#collapsedeals">Deal Search Booking Preference </a>
                        </h4>
                    </div>
                    <div id="collapsedeals" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row">
                                                                <div class="col-lg-12">  <h5 class="GreyColor">All Deals Search. </h5></div>
                            </div>
                            <div class="row">

                                <div class="col-lg-1 col-xs-4">
                                    <h5>
                                        <input name="adlsearch" type="radio" class="adlsearchclass" value="ad-1" checked  /> 
                                        Yes  </h5>
                                </div>
                                <div class="col-lg-1 col-sm-2">
                                    <h5>
                                        <input name="adlsearch" type="radio"  class="adlsearchclass" value="ad-0"    /> 
                                        No  </h5>
                                </div>
                            </div>
                            <!----------------------->


                            <div class="row">
                                <div class="col-lg-12">
                                    <h5 class="GreyColor">One Deal One Booking</h5>  
                                </div>
                            </div>
                            <div class="row">
                                                                <div class="col-lg-1 col-xs-4">
                                    <h5>

                                        <input name="deltsout" type="radio"  class="deltsoutclass" value="dsout-1"   />     
                                        Yes  </h5>
                                </div>
                                <div class="col-lg-1 col-sm-2">
                                    <h5>
                                        <input name="deltsout" type="radio"  class="deltsoutclass" value="dsout-0"   checked /> 
                                        No  </h5>
                                </div>
                            </div>
                            <!----------------------->

                        </div>
                    </div>
                </div>
                <!--End Search Menu Setting-->
                <!-- 3 Booking Acceptance Date-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseForbookb">Booking Before Month</a>
                        </h4>
                    </div>
                    <div id="collapseForbookb" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">  <h5 class="GreyColor">Set Booking Before  Month on your website. </h5></div>
                            </div>
                            <div class="row">

                                <div class="col-lg-4 col-sm-6">
                                                                            <input type="text" id="limitmonth" class="form-control" value="333" placeholder="Value In No Month">  
                                                  
                                </div>

                                <span class="errmsg" style="display: none;">Digits Only</span>  

                            </div>
                            <div id="bookbeforediv" class="row MarginTopBox">
                                <div class="col-lg-12">
                                    <button id="btnbookbeforemonth" type="button" class="btn btn-primary">Submit</button>
                                </div>
                            </div>  


                        </div>
                    </div>
                </div>
                <!--End Booking Acceptance Date-->
                <!-- 3 Payment Method-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a id="aPaymenttab" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">Payment Method</a></h4>
                    </div>
                    <div id="collapseThree" class="panel-collapse collapse">
                        <div id="paymentmethod" class="panel-body">
                                                        <div class="row dvclone">
                                <div class="col-lg-3 col-sm-3">
                                    <input type="hidden" class="hdntariffSListId" >
                                    <input type="text" class="form-control txtsubteriffname" readonly>
                                </div>
                                <div class="col-lg-2 col-sm-2">
                                    <select class="form-control selBookbefore">
                                        <option value="0">book before Hours</option>
                                        <option value='0:30' >0:30</option><option value='1' >1</option><option value='1:30' >1:30</option><option value='2' >2</option><option value='2:30' >2:30</option><option value='3' >3</option><option value='3:30' >3:30</option><option value='4' >4</option><option value='4:30' >4:30</option><option value='5' >5</option><option value='5:30' >5:30</option><option value='6' >6</option><option value='6:30' >6:30</option><option value='7' >7</option><option value='7:30' >7:30</option><option value='8' >8</option><option value='8:30' >8:30</option><option value='9' >9</option><option value='9:30' >9:30</option><option value='10' >10</option><option value='10:30' >10:30</option><option value='11' >11</option><option value='11:30' >11:30</option><option value='12' >12</option><option value='12:30' >12:30</option><option value='13' >13</option><option value='13:30' >13:30</option><option value='14' >14</option><option value='14:30' >14:30</option><option value='15' >15</option><option value='15:30' >15:30</option><option value='16' >16</option><option value='16:30' >16:30</option><option value='17' >17</option><option value='17:30' >17:30</option><option value='18' >18</option><option value='18:30' >18:30</option><option value='19' >19</option><option value='19:30' >19:30</option><option value='20' >20</option><option value='20:30' >20:30</option><option value='21' >21</option><option value='21:30' >21:30</option><option value='22' >22</option><option value='22:30' >22:30</option><option value='23' >23</option><option value='23:30' >23:30</option><option value='24' >24</option><option value='24:30' >24:30</option><option value='25' >25</option><option value='25:30' >25:30</option><option value='26' >26</option><option value='26:30' >26:30</option><option value='27' >27</option><option value='27:30' >27:30</option><option value='28' >28</option><option value='28:30' >28:30</option><option value='29' >29</option><option value='29:30' >29:30</option><option value='30' >30</option><option value='30:30' >30:30</option><option value='31' >31</option><option value='31:30' >31:30</option><option value='32' >32</option><option value='32:30' >32:30</option><option value='33' >33</option><option value='33:30' >33:30</option><option value='34' >34</option><option value='34:30' >34:30</option><option value='35' >35</option><option value='35:30' >35:30</option><option value='36' >36</option><option value='36:30' >36:30</option><option value='37' >37</option><option value='37:30' >37:30</option><option value='38' >38</option><option value='38:30' >38:30</option><option value='39' >39</option><option value='39:30' >39:30</option><option value='40' >40</option><option value='40:30' >40:30</option><option value='41' >41</option><option value='41:30' >41:30</option><option value='42' >42</option><option value='42:30' >42:30</option><option value='43' >43</option><option value='43:30' >43:30</option><option value='44' >44</option><option value='44:30' >44:30</option><option value='45' >45</option><option value='45:30' >45:30</option><option value='46' >46</option><option value='46:30' >46:30</option><option value='47' >47</option><option value='47:30' >47:30</option><option value='48' >48</option>                                    </select>
                                </div>
                                <div class="col-lg-2 col-sm-2">
                                    <select class="form-control typeadvance" >
                                        <option value="blank" class="opnblank">Select Advance Type</option>
                                        <option value="0" class="opnflat">Advance Flat</option>
                                        <option value="1" class="opnpercent">Advance Percent</option>
                                    </select>
                                </div>

                                <div class="col-lg-2 col-sm-2 percentbox hidden">
                                    <select class="form-control">
                                        <option value='5' >5%</option><option value='10' >10%</option><option value='15' >15%</option><option value='20' >20%</option><option value='25' >25%</option><option value='30' >30%</option><option value='35' >35%</option><option value='40' >40%</option><option value='45' >45%</option><option value='50' >50%</option><option value='55' >55%</option><option value='60' >60%</option><option value='65' >65%</option><option value='70' >70%</option><option value='75' >75%</option><option value='80' >80%</option><option value='85' >85%</option><option value='90' >90%</option><option value='95' >95%</option>                                    </select>
                                </div>
                                <div class="col-lg-2 col-sm-2 flatbox hidden">
                                    <input type="text" class="form-control" />
                                </div>
                                <div class="col-lg-2 col-sm-2">
                                    <label>
                                        Pay To Driver
                                    </label>
                                    <input class="paytodriver" type="checkbox" >
                                </div>
                            </div>

                            <div id="dvtbnpayment" class="row MarginTopBox">
                                <div class="col-lg-12">
                                    <button id="btnpaymentsubmit" type="button" class="btn btn-primary">Submit</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!--End Payment Method-->
                <!-- 4 Tax Applicable-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseFor">Tax Applicable</a>
                        </h4>
                    </div>
                    <div id="collapseFor" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">  <h5 class="GreyColor">Do you want to including GST on your website. </h5></div>
                            </div>
                            <div class="row">
                                                                <div class="col-lg-1 col-xs-4">
                                    <h5>
                                        <input name="stax" type="radio" class="radiost" value="st-1"   /> 
                                        Yes  </h5>
                                </div>
                                <div class="col-lg-1 col-sm-2">
                                    <h5>
                                        <input name="stax" type="radio"  class="radiost" value="st-0" checked  /> 
                                        No  </h5>
                                </div>
                            </div>
                                                        <div class="row" id="gstnumber" style="display:none">
                                <div class="col-lg-6 col-sm-3">  
                                    <div class="col-xs-8">
                                        <input name="staxnumtxt" id="staxnumtxt" class="form-control" value="33ABVPI8647P1ZN" placeholder="GST Number " type="text"> </div> 
                                    <div class="col-xs-4">

                                        <input name="gstinsbtn" id="gstinsbtn" class="btn btn-primary" value="Update" type="button"></div> 
                                </div>
                            </div>    

                            <!----------------------->
                            <hr>
                            <div class="row">
                                <div class="col-lg-12">
                                    <h5 class="GreyColor">Apply Tax Deducted at Source ( TDS )</h5>
                                </div>
                            </div>
                            <div class="row">
                                                                <div class="col-lg-1 col-xs-4">
                                    <h5>

                                        <input name="tds" type="radio"  class="radiotds" value="tds-1"  /> 
                                        Yes  </h5>
                                </div>
                                <div class="col-lg-1 col-sm-2">
                                    <h5>
                                        <input name="tds" type="radio"  class="radiotds" value="tds-0" checked  /> 
                                        No  </h5>
                                </div>
                            </div>

                            <!----------------------->
                            <!----------------------->
                            <hr>
                            <!-- TAX FROM OTHER DB  -->
                            <div class="row">
                                <div class="col-lg-12">
                                    <h5 class="GreyColor">Apply "Default Tax" or "Other Tax"</h5>
                                </div>
                            </div>
                            <div class="row">
                                                                <div class="col-lg-3 col-sm-12">

                                    <input name="owntax" id="owntax0" type="radio"  class="radioowntax" value="0" checked style="float:left; margin: 0 5px;"/> 
                                    <label for="owntax0" ><h5> Default Tax ( 5.00% )</h5></label>
                                </div>
                                <div class="col-lg-3 col-xs-12">
                                    <input name="owntax" id="owntax1" type="radio" class="radioowntax" value="1"   style="float:left; margin: 0 5px;"/> 
                                    <label for="owntax1" ><h5> Other Tax ( <span class="otx">12.00</span>% ) </h5></label>
                                </div>
                                <div class="col-lg-3 col-xs-12">
                                    <label for="hsnnumber">HSN/SAC number</label>
                                    <select name="hsnnumber" id="hsnnumber" class="form-control">
                                        <option value="0">Enter HSN/SAC</option>
                                    </select>
                                </div>
                            </div>

                            <!----------------------->

                        </div>
                    </div>
                </div>
                <!--End Tax Applicable-->
                <!-- 5 Payment Gateway Option-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseFive">Payment Gateway Option</a>
                        </h4>
                    </div>
                    <div id="collapseFive" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <h5>Apply Payment Gateway</h5>
                                </div>
                            </div>
                            <form id="frmGateway">
                                <div class="row MarginTopBox">
                                    <div class="col-lg-2 col-sm-4">
                                        <p><strong class="BlackColor">Select Gateway</strong></p>
                                    </div>
                                    <div class="col-lg-3 col-sm-4">
                                        <select id="gatewayoption" name="pgid" class="form-control">
                                            <option>Select Gateway</option>
                                                                                            <option value="6" 
                                                         >PayU </option>
                                                                                                    <option value="10" 
                                                         >PayTm </option>
                                                                                                    <option value="11" 
                                                         >Pay Pal </option>
                                                                                                    <option value="13" 
                                                         >Shmart Wallet</option>
                                                                                                    <option value="14" 
                                                         >Oxigen Wallet</option>
                                                                                                    <option value="15" 
                                                        selected >PayUmoney</option>
                                                                                                    <option value="16" 
                                                         >SBI Buddy</option>
                                                                                                    <option value="17" 
                                                         >Razor Pay</option>
                                                                                                    <option value="18" 
                                                         >MobiKwik</option>
                                                                                                    <option value="19" 
                                                         >Insta Mojo</option>
                                                                                            </select>
                                    </div>
                                </div>

                                <div class="row MarginTopBox">
                                    <div class="col-lg-2 col-sm-4">
                                        <strong class="BlackColor">Mode</strong> 
                                    </div>
                                    <div class="col-lg-2 col-sm-3">
                                        <h5 class="GreyColor"><input type="radio" class="mode" name="mode" value="2"  >&nbsp;&nbsp; Test</h5>
                                    </div>
                                    <div class="col-lg-2 col-sm-3">
                                        <h5 class="GreyColor"><input type="radio" class="mode" name="mode" value="1" checked >&nbsp;&nbsp; Live</h5>
                                    </div>
                                </div>

                                <div class="row MarginTopBox">
                                    <div class="col-lg-2 col-sm-4">
                                        <p><strong class="BlackColor" id="mkey" >Mkey</strong></p>
                                    </div>
                                    <div class="col-lg-3 col-sm-4">
                                        <input type="text" class="form-control" id="mkey1" name="mkey" value="hGiGdWzS" />
                                    </div>
                                </div>
                                <div class="row MarginTopBox">
                                    <div class="col-lg-2 col-sm-4">
                                        <p><strong class="BlackColor" id="salt" >Salt</strong></p>
                                    </div>
                                    <div class="col-lg-3 col-sm-4">
                                        <input type="text" class="form-control" id="salt1" name="salt" value="MfJk2cO24z" />
                                    </div>
                                </div>

                                <div class="row MarginTopBox  " id="dvskey">
                                    <div class="col-lg-2 col-sm-4">
                                        <p><strong class="BlackColor">Skey</strong></p>
                                    </div>
                                    <div class="col-lg-3 col-sm-4">
                                        <input id="txtskey" type="text" class="form-control" name="skey" value="" />
                                    </div>
                                </div>
                                <div class="row MarginTopBox" id="dvskey">
                                    <div class="col-lg-2 col-sm-4">
                                        <button id="sbmitgateway" type="button" class="btn btn-primary">Add Gateway</button>
                                    </div></div>
                            </form>
                        </div>
                    </div>
                </div>
                <!--End Payment Gateway Option-->
                <!-- 6 Invoice Prefix-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseSix">Invoice Prefix</a>
                        </h4>
                    </div>
                    <div id="collapseSix" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row">

                            </div>
                            <div class="row MarginTopBox">
                                <div class="col-lg-2 col-sm-4">
                                    <p><strong class="BlackColor">Prefix Character</strong></p>
                                </div>
                                <div class="col-lg-3 col-sm-4"><input type="text" class="form-control" id="txtprefix" value="ITAXI"></div>
                                <div class="col-lg-3 col-sm-4">
                                    <p class="GreyColor">Example - XYZ</p>
                                </div>
                            </div>
                            <div class="row MarginTopBox">
                                <div class="col-lg-12">
                                    <button id="btnprefix" type="button" class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--End Invoice Prefix-->
                <!-- 7 Get Notification On-->    
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseseven">Get Notification On</a>
                        </h4>
                    </div>
                    <div id="collapseseven" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row">
                                <table id="tb_notification" class="table">
                                    <thead>
                                        <tr><th>Sr no.</th><th>Email Id</th><th>Mobile No.</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>1</td><td><input name="email[]" class="form-control txtemail" type="text" value="isquaretaxi@gmail.com" ></td><td><input name="mobile[]" class="form-control txtmobile" type="text" value="9043996699" ></td></tr>

                                        <tr><td>2</td><td><input name="email[]" class="form-control txtemail" type="text" value="support@isquaretaxi.in"></td><td><input name="mobile[]" class="form-control txtmobile" type="text" value="9500551151" ></td></tr>

                                        <tr><td>3</td><td><input name="email[]" class="form-control txtemail" type="text" value=""></td><td><input name="mobile[]" class="form-control txtmobile" type="text" value="" ></td></tr>

                                    </tbody>
                                </table>
                            </div>

                            <div class="row MarginTopBox">
                                <div class="col-lg-12">
                                    <button id="btnnotification" type="button" class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Get Notification On-->
                <!-- 8 vehicles -->
                <!--                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseeight">Select Vehicle </a>
                                        </h4>
                                    </div>
                                    <div id="collapseeight" class="panel-collapse collapse">
                                        <div class="panel-body">
                                            <div class="row">
                                                <form id="frmAddVehicle" method="POST" >
                                                    <div class="col-lg-4">
                                                        <select id="selvehicle" class="form-control" name="selvehicle" multiple >
                                                            <option value="0">select vehicle</option>
                                                                            <option value="" selected ></option>"        
                                                                        </select>
                                                    </div>
                
                                                    <div class="col-lg-12 MarginTopBox" >
                                                        <button type="button" id="btnAddVehicle" class="btn btn-primary">Add Vehicle</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>-->
                <!--vehicles end-->
                <!-- 9 Sms Sender Detail-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseNine">Sms Sender Detail</a>
                        </h4>
                    </div>
                    <div id="collapseNine" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row">

                            </div>
                            <div class="row MarginTopBox">
                                <div class="col-lg-2 col-sm-4">
                                    <p><strong class="BlackColor">SMS Sender Detail</strong></p>
                                </div>
                                <div class="col-lg-3 col-sm-4"><input type="text" class="form-control" id="txtsms" value="ISQTXI" ></div>
                                <div class="col-lg-4 col-sm-4">
                                    <p class="GreyColor">Rule - 6 Upper case characters Only</p>
                                </div>
                            </div>
                            <div class="row MarginTopBox">
                                <div class="col-lg-12">
                                    <button id="btnsms" type="button" class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <!--End Sms Sender Detail-->    

                <!-- 9 api city-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseapiCity">Api City</a>
                        </h4>
                    </div>
                    <div id="collapseapiCity" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row">
                                <form id="frmapiCity" method="POST" >
                                    <div class="col-lg-4">
                                        <select id="apiCity" class="form-control" name="apiCity" multiple >
                                            <option value="0">select pcity</option>
                                                                                    </select>
                                    </div>

                                    <div class="col-lg-12 MarginTopBox" >
                                        <button type="button" id="btnAddapiCity" class="btn btn-primary">Add Api City</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> 
                <!--End api city--> 

                <!-- 10 Close Duty on Actual Km Base or Google Kms-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseForClkm">Close Duty Kms Type</a>
                        </h4>
                    </div>
                    <div id="collapseForClkm" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">  <h5 class="GreyColor">Select appropriate option for close duty kms </h5></div>
                            </div>
                            <div class="row">
                                                                <div class="col-lg-2 col-xs-4">
                                    <h5>
                                        <input name="clkms" type="radio" class="radioclkm" value="0" checked  /> 
                                        System Kms  </h5>
                                </div>
                                <div class="col-lg-2 col-sm-2">
                                    <h5>
                                        <input name="clkms" type="radio"  class="radioclkm" value="1"   /> 
                                        Actual Kms     </h5>
                                </div>
                            </div>
                            <!----------------------->


                            <!----------------------->

                        </div>
                    </div>
                </div>
                <!--End Close Duty on Actual Km Base or Google Kms-->
                <!-- 12 Website Booking Type-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#websitebooking">Website Booking Type</a>
                        </h4>
                    </div>
                    <div id="websitebooking" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">  <h5 class="GreyColor">Select appropriate option for website booking </h5></div>
                            </div>
                            <div class="row">
                                                                <div class="col-lg-2 col-xs-4">
                                    <h5>
                                        <input name="webbkg" type="radio" class="radiowebbkg" value="0" checked  /> 
                                        Reguler Booking  </h5>
                                </div>
                                <div class="col-lg-2 col-sm-2">
                                    <h5>
                                        <input name="webbkg" type="radio"  class="radiowebbkg" value="1"  /> 
                                        Over Booking    </h5>
                                </div>
                            </div>
                            <!----------------------->


                            <!----------------------->

                        </div>
                    </div>
                </div>
                <!--End Website Booking Type -->
                <!--   BY NITIN JAMDHADE           -->
                <!-- 13 DISPATCH Type-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#dispatchtype">Dispatch Type</a>
                        </h4>
                    </div>
                    <div id="dispatchtype" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">  <h5 class="GreyColor">Select appropriate option for Dispatch booking </h5></div>
                            </div>
                            <div class="row">
                                                                <div class="col-lg-2 col-xs-4">
                                    <input name="dispatchtype" id="dispatchtype0" type="radio" class="radiodispatchtype" value="0" checked  style="float:left; margin: 0 5px;"/> 
                                    <label for="dispatchtype0" ><h5> By Vehicle  </h5></label>
                                </div>
                                <div class="col-lg-2 col-sm-2">

                                    <input name="dispatchtype" id="dispatchtype1" type="radio"  class="radiodispatchtype" value="1"  style="float:left; margin: 0 5px;"/> 
                                    <label for="dispatchtype1" ><h5> By Vehicle Type</h5></label>
                                </div>
                            </div>
                            <!----------------------->


                            <!----------------------->

                        </div>
                    </div>
                </div>
                <!--End DISPATCH Type -->
                <!--   BY NITIN JAMDHADE END          -->
                <!-- 14 Invoice Logo-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#invoicelogo">Invoice Logo</a>
                        </h4>
                    </div>
                    <div id="invoicelogo" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">  <h5 class="GreyColor">Select appropriate option for Invoice Logo </h5></div>
                            </div>

                            <div class="UserContainerDiv">  
                                <!--<form method="post" name="invoicelogoform" enctype="multipart/form-data" id="invoicelogoform">-->
                                <form method="post" name="invoicelogoform" id="invoicelogoform" enctype="multipart&#x2F;form-data">                                <div class="row">
                                                                        <!--                                <div class="col-lg-2 col-xs-4">
                                                                        <h5>
                                                                            <input name="invlogo1" type="radio" class="invlogo" value="0" checked  /> 
                                                                            Default Logo  </h5>
                                                                    </div>
                                                                    <div class="col-lg-2 col-sm-2">
                                                                        <h5>
                                                                            <input name="invlogo1" type="radio"  class="invlogo" value="1"  /> 
                                                                            Customize Logo   </h5>
                                                                    </div>-->
                                </div>
                                <div class="CompanyInputOuterDiv">
                                    <!--                                <label for="fileUploader">
                                                                        <label for="fileUploader" class="btn BrowseBtnIcon2"><img src="/images/inner-page-sprite.png" class="BrowsBtnIcon">choose file</label>
                                                                    </label>-->
                                    <label><input type="radio" name="invlogo" class="invlogo" value="0" checked="checked"> Default Logo </label><label><input type="radio" name="invlogo" class="invlogo" value="1">No Logo </label>                                                                    <!--<input name="logo" id="fileUploader"  type="file">-->
                                    <div class="ErrorDispalyDiv">

                                    </div>
                                </div>
                                <div class="CompanyInputOuterDiv logoupdiv" style="display:none" >
                                    <!--                                <label for="fileUploader">
                                                                        <label for="fileUploader" class="btn BrowseBtnIcon2"><img src="/images/inner-page-sprite.png" class="BrowsBtnIcon">choose file</label>
                                                                    </label>-->
                                    <input name="logo" type="file" id="fileUploader">                                                                    <!--<input name="logo" id="fileUploader"  type="file">-->
                                    <div id="errlogo">

                                    </div>
                                </div>
                                <div class="CompanyInputOuterDiv">
                                    <button name="button" class="btn btn-primary" type="button" id="invoicelogochange"> submit</button>
                                    <!--<input name="submit" class="btn btn-primary SubmitCommentBtn" id="invoicelogochange" value="Add" type="submit">-->
                                </div>

                                <!--</form>-->
                                </form> 

                                <!----------------------->


                                <!----------------------->

                            </div>
                        </div>
                    </div>
                </div>
                    <!--End Invoice Logo -->
                 <!-- 15 PACKAGE SEARCH Type-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#packagesearchtype">Package Destination Search</a>
                        </h4>
                    </div>
                    <div id="packagesearchtype" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">  <h5 class="GreyColor">Select appropriate option for Package to search by Destination </h5></div>
                            </div>
                            <div class="row">
                                                                <div class="col-lg-2 col-xs-4">
                                    <input name="pkgsearchtype" id="check_0" type="radio" class="radiopkgsearchtype" value="0" checked  style="float:left; margin: 0 5px;"/> 
                                    <label for="check_0" ><h5> Is Not Defined  </h5></label>
                                </div>
                                <div class="col-lg-2 col-sm-2">

                                    <input name="pkgsearchtype" id="check_1" type="radio"  class="radiopkgsearchtype" value="1"  style="float:left; margin: 0 5px;"/> 
                                    <label for="check_1" ><h5> Is Fixed </h5></label>
                                </div>
                                <div class="col-lg-2 col-sm-2">

                                    <input name="pkgsearchtype" id="check_2" type="radio"  class="radiopkgsearchtype" value="2"  style="float:left; margin: 0 5px;"/> 
                                    <label for="check_2" ><h5> Is Covered</h5></label>
                                </div>
                            </div>
                            <!----------------------->


                            <!----------------------->

                        </div>
                    </div>
                </div>
                <!--End PACKAGE SEARCH  Type -->
                             <!-- 2 Search Menu Setting-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a id="aMenuSetting"  data-toggle="collapse" data-parent="#accordion" href="#collapseTwo1">Set Vehicle Preference</a>
                        </h4>
                    </div>
                    <div id="collapseTwo1" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class="row optionBox1" id="sortable1">
                                  

                            </div>

                            <div class="row">
                                <div class="HundredPercentClass">
                                    <div class="col-lg-3">
                                        <button id="save_reorder1" type="button" class="btn btn-primary">Save Order</button>
                                    </div>
                                </div>
                            </div>  

                            
                        </div>
                    </div>
                </div>
                <!--End Search Menu Setting-->
                        </div>
            
        </div>
         
    </div>
    <div  class="commonPopupContainerDiv" style="display: none;text-align: center;opacity: 0.6; ">

    </div>
    <div id="popup_box">
        <img src="/images/loading.gif">
    </div>
</div>
    <!--email mobile add in ccr--> 
    <div aria-labelledby="mailinglLabel" role="dialog" tabindex="-1" id="emailmobccr" class="modal fade">
        <div role="document" class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button aria-label="Close" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span></button>
                    <h4 id="mailingModalLabel" class="modal-title">Email Or Mobile Number already registered add other Email and Mobile No. for API</h4>
                </div>
                                <div id="mainMsg"></div>   
                <div class="modal-body">
                    <div class="form-group">
                        <label for="recipient-name" class="control-label">Email Type Here</label>
                                                <input type="text" value="" id="apiemail" class="form-control">
                        <div id="erraddressType"></div>
                    </div>
                    <div class="form-group">
                        <label for="recipient-name" class="control-label">Mobile No. Type Here</label>
                                                <input type="text" value="" id="apimobile" class="form-control">
                        <div id="erraddressType"></div>
                    </div>

                </div> 
                <div class="modal-footer">
                    <button id="ccrapi" type="button" class="btn btn-primary">Add</button>       

                      
                     
                      
                </div>
                                </div>  
        </div>

    </div> 
    <!--email mobile add in ccry--> 



    <style>

        #popup_box {
            text-align: center;
            display: none;

            background: #fff none repeat scroll 0 0;
            border-radius: 8px;
            left: 40%;
            padding: 30px;
            position: fixed;
            top: 25%;
            width: 20%;
            z-index: 1000;
        }

    </style>
    <!--drag drop div-->
    <link rel="stylesheet" href="/css/date/jquery-ui.css">
    <script src="/js/date/jquery-ui.js"></script> 
    <!--chosen-->
    <script type='text/javascript' src='/js/chosen.jquery.min.js'></script>
    <script src="/js/newchosenrhishi.js" type="text/javascript"></script> 
    <script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.2/jquery.ui.touch-punch.min.js"></script>


    <link rel="stylesheet" type="text/css" href="/css/chosen.min.css" />
    <!--sweetalert-->
    <script src="/dist/sweetalert.min.js"></script>
    <link rel="stylesheet" type="text/css" href="/dist/sweetalert.css">

    <style>
        /*for search city box*/
        .chosen-container-multi .chosen-choices li{
            float: none !important;
        }
        li.search-field input[type="text"] {
            height: 30px !important;
        }
        #pCity_chosen{ width: 80% !important; }
        #selvehicle_chosen{ width: 80% !important; }
        #apiCity_chosen{ width: 80% !important; }
        /*for move and order teriff*/
        .block{ cursor:move;}
        .remove{ cursor:pointer; }
    </style>
    <script>
    // add and remove city for service
        $("#btnAddCity").click(function () {

            $.ajax({
                url: "addusercity",
                data: {data: $('#pCity').val()},
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    swal("Changes Saved");
                }
            });
        });
        $("#btnbookbeforemonth").click(function () {
            if ($("#limitmonth").val().length != 0) {
                $.ajax({
                    url: "addboookbeforemonth",
                    data: {data: $('#limitmonth').val()},
                    type: 'POST',
                    success: function (data, textStatus, jqXHR) {
                        swal("Changes Saved");
                    }
                });
            } else {
                swal("Oops", "Set Booking Before Month", "error");
            }
        });
    // add and remove api city for service
        $("#btnAddapiCity").click(function () {

            $.ajax({
                url: "addapicity",
                data: {data: $('#apiCity').val()},
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    var arrdata = data.split('-');
                    //alert(arrdata[0]);
                    //alert(arrdata[1]);
                    //alert(arrdata[2]);return false; 
                    if (arrdata[0] == 1)

                    {
                        swal("Oops...", "Email " + arrdata[2] + " Or Mobile Number " + arrdata[1] + " already registered", "error");
                        //swal();   
                        $('#emailmobccr').show();
                        $('#emailmobccr').modal('toggle');
                        return false;
                    } else
                    {
                        swal("Changes Saved");
                    }

                }
            });
        });
    // add and remove vehicles
        $("#btnAddVehicle").click(function () {
            $.ajax({
                url: "addownervehicle",
                data: {data: $('#selvehicle').val()},
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    swal("Changes Saved");
                }
            });
        });

        $(document).ready(function () {

//            $('#emailmobccr').hide();

            //add service in city dropdown onload
            var rescity = '[{"ctname":"Bangalore","cityId":31},{"ctname":"Chennai","cityId":57},{"ctname":"Chidambaram","cityId":59},{"ctname":"Coimbatore","cityId":65},{"ctname":"Kanchipuram","cityId":137},{"ctname":"Kumbakonam","cityId":170},{"ctname":"Madurai","cityId":185},{"ctname":"Mysore","cityId":209},{"ctname":"Nagapattinam","cityId":211},{"ctname":"Namakkal","cityId":219},{"ctname":"Pollachi","cityId":256},{"ctname":"Thanjavur","cityId":322},{"ctname":"Tirunelveli","cityId":329},{"ctname":"Tirupati","cityId":330},{"ctname":"Velankanni","cityId":341},{"ctname":"Yelagiri","cityId":358},{"ctname":"Yercaud","cityId":359},{"ctname":"Belgaum","cityId":406},{"ctname":"Hosur","cityId":520},{"ctname":"Krishnagiri","cityId":528},{"ctname":"Dharmapuri","cityId":531},{"ctname":"Karur","cityId":549},{"ctname":"Cuddalore","cityId":551},{"ctname":"Dindigul","cityId":562},{"ctname":"Thiruvarur","cityId":583},{"ctname":"Karaikudi","cityId":588},{"ctname":"Ramanathapuram","cityId":600},{"ctname":"Sivakasi","cityId":601},{"ctname":"Courtallam","cityId":617},{"ctname":"Erode","cityId":772},{"ctname":"Rameshwaram","cityId":838},{"ctname":"Theni","cityId":929},{"ctname":"Salem","cityId":1028},{"ctname":"Palani","cityId":1047},{"ctname":"Thoothukudi","cityId":1070},{"ctname":"Vellore","cityId":1083},{"ctname":"Ambur","cityId":1248},{"ctname":"Ariyalur","cityId":1302},{"ctname":"Chinna Salem","cityId":1809},{"ctname":"Devakottai","cityId":1934},{"ctname":"Gudiyattam","cityId":2247},{"ctname":"Kuttalam","cityId":2938},{"ctname":"Nagerkoil","cityId":3362},{"ctname":"Neyveli","cityId":3461},{"ctname":"Pattukottai","cityId":3626},{"ctname":"Perambalur","cityId":3648},{"ctname":"Ramnad","cityId":3815},{"ctname":"Ranipet","cityId":3835},{"ctname":"Sirkazi","cityId":4160},{"ctname":"Sivagangai","cityId":4173},{"ctname":"Tenkasi","cityId":4318},{"ctname":"Thiruvallur","cityId":4340},{"ctname":"Turaiyur","cityId":4348},{"ctname":"Tiruchengodu","cityId":4374},{"ctname":"Tirumala Temple","cityId":4378},{"ctname":"Tiruparankndrm","cityId":4381},{"ctname":"Tirupattur","cityId":4383},{"ctname":"Udumalaipettai","cityId":4430},{"ctname":"Vaniyambadi","cityId":4511},{"ctname":"Vilupuram","cityId":4566},{"ctname":"Virajpet","cityId":4568},{"ctname":"Virudhunagar","cityId":4578},{"ctname":"Pudukkottai","cityId":4754},{"ctname":"Tiruvannamalai","cityId":4816},{"ctname":"Mamallapuram","cityId":4859},{"ctname":"Oragadam","cityId":4917},{"ctname":"Tiruchirappalli","cityId":4990},{"ctname":"Tiruppur","cityId":5007},{"ctname":"Vijayapura","cityId":5113},{"ctname":"Pondicherry","cityId":5153},{"ctname":"Nilgiris","cityId":5154},{"ctname":"Udagamandalam (Ootacamund)","cityId":5155},{"ctname":"Arani","cityId":5158},{"ctname":"Gurugram","cityId":5160},{"ctname":"Vandavasi","cityId":5161},{"ctname":"Jayamkondan","cityId":5162},{"ctname":"Panruti","cityId":5163},{"ctname":"Chetpet (Arani)","cityId":5164},{"ctname":"Chetpet (Chennai)","cityId":5165},{"ctname":"Cheyyar","cityId":5166},{"ctname":"KGF","cityId":5167},{"ctname":"Alangayam","cityId":5168},{"ctname":"Thirukoilure","cityId":5169},{"ctname":"LALAPETTAI","cityId":5170},{"ctname":"Padavedu (Tiruvanamalai)","cityId":5171},{"ctname":"ARCOT","cityId":5172},{"ctname":"Virupakshapuram, Nellipatla, Andhra Pradesh","cityId":5173},{"ctname":"hoskote","cityId":5174},{"ctname":"Kilpennathur (TVM)","cityId":5175},{"ctname":"Ulundurpet","cityId":5177},{"ctname":"Odugathur Tamil Nadu vellore","cityId":5178},{"ctname":"Thirukazakundram","cityId":5179},{"ctname":"Sholinghur Tamil Nadu Near Arakkonam","cityId":5180},{"ctname":"Gobichettipalayam","cityId":5181},{"ctname":"Sricity Ap","cityId":5182}]';
            var cityarr = $.parseJSON(rescity);

            if (cityarr.length > 0)
            {
                var element = "";
                for (var i = 0; i < cityarr.length; i++) {
                    element += "<option value=" + cityarr[i]['cityId'] + " selected >" + cityarr[i]['ctname'] + "</option>";
                }
                $('#pCity').append(element);
            }
            // ----- end
            //service in city dropdown
            $('#pCity').chosen({no_results_text: "Oops, nothing found!"});
            $("#pCity").ajaxChosen({
                method: 'GET',
                url: "getoptionselectcity",
                dataType: 'json'
            }, function (data) {
                var terms = {};

                $.each(data, function (i, val) {
                    terms[i] = val;
                });

                return terms;

            });
            // ----- end
    //api in city dropdown
            $('#apiCity').chosen({no_results_text: "Oops, nothing found!"});
            $("#apiCity").ajaxChosen({
                method: 'GET',
                url: "getapiselectcity",
                dataType: 'json'
            }, function (data) {
                var terms = {};

                $.each(data, function (i, val) {
                    terms[i] = val;
                });

                return terms;

            });
            // ----- end        
            //service in city dropdown
            $("#selvehicle").chosen({no_results_text: "Oops, vehicle not found!"});
            $("#selvehicle").ajaxChosen({
                method: 'GET',
                url: "getvehicles",
                dataType: 'json'
            }, function (data) {
                var terms = {};

                $.each(data, function (i, val) {
                    terms[i] = val;
                });

                return terms;

            });
            // ----- end

            /// HSNSAC Number Dropdown
            $('#hsnnumber').chosen({no_results_text: "Oops, nothing found!", width: '100%'});
            $("#hsnnumber").ajaxChosen({
                method: 'GET',
                url: "gethsnsaclist",
                dataType: 'json'
            }, function (data) {
                var terms = {};

                $.each(data, function (i, val) {
                    terms[i] = val;
                });

                return terms;

            });
            $("#hsnnumber").change(function (e) {

                var val = $(this).val();
                swal({
                    title: "Are you sure?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, change it!",
                    cancelButtonText: "No, cancel!",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    showLoaderOnConfirm: true,
                },
                        function (isConfirm) {
                            if (isConfirm) {
                                $.ajax({
                                    url: "ajaxupdatehsncode",
                                    data: {hsncode: val},
                                    type: 'POST',
                                    success: function (data, textStatus, jqXHR) {
                                        var strdata = $.parseJSON(data);
                                        if (strdata == 'fail') {
                                            $("#hsnnumber").val("0").trigger('chosen:updated');
                                            swal("error", 'can not update!', "error");
                                        } else {
                                            $('.otx').text(strdata[1]);

                                            swal("success!", 'Update successfully', "success");
                                        }

                                    }
                                })

                            } else {
                                swal("Cancelled", "Changes Not saved", "error");
                            }
                        });

            });
            //-------- end
        });
    //sotable div
        $(function () {
            $("#sortable").sortable();
            $("#sortable").disableSelection();
            $("#sortable1").sortable();
            $("#sortable1").disableSelection();
            //  $('#sortable').draggable();

        });
    // ----- end
    //ajax loading image show hide function
        function loadclose() {
            $("#popup_box").css({"display": "none"});
            $(".commonPopupContainerDiv").css({"display": "none"});
        }

        function load() {
            $("#popup_box").css({"display": "block"});
            $(".commonPopupContainerDiv").css({"display": "block"});
        }
        var menusetting_changed = 0;// to call getpaymentmethodrow 0=do not call,1=call
    // ----- end        
    //checkbox change
        $('.tariffSListId').change(function () {
            menusetting_changed = 1;
            load();
            var obj = $(this).closest('.CmsCabServicesBox').children('.add');
            //if checked then add else remove
            if ($(this).prop('checked') == true) {
                obj.trigger('click');
            } else
            {
                var selected = [];
                var values = obj.attr('id').split('-');
    //     get all selected checkbox if 0 then remove .block
                selected = $(this).closest('.CmsCabServicesBox').find('.tariffSListId:checked');
                if (selected.length <= 0) {
                    $("#" + values[0]).children('.remove').trigger('click');
                    return false;
                }

                var data = {deltariffSListId: this.value, id: values[0], act: 'remove'}
                $.post("saveusertarriff", data).done(function (data) {
                    loadclose();
                    swal(data);
                });
            }

        });
    // ancker tag[hidden] for add teriff
        $('.add').click(function () {
            menusetting_changed = 1;
            load();
            var obj = $(this).parent();

            var selected = [];
            selected = obj.find('.tariffSListId:checked').map(function () {
                return this.value;
            }).get();
            var values = this.id.split('-');
            var data;
            if (selected.length <= 0) {
                setTimeout(function () {
                    $("#" + values[0]).children('.remove').trigger('click');
                    return false;
                }, 100);
            }

            $('#save_reorder').parent().show();

            data = {id: values[0], act: 'add', subtariff: selected}
            $.post("saveusertarriff", data).done(function (data) {
                loadclose();
                swal("Changes Saved.");

            });
            // if .block not exist then create append   
            if ($(".optionBox #" + values[0]).length < 1) {
                var append_dvbox = '<div class="HundredPercentClass ui-sortable-handle"><div id="' + values[0] + '" class="CloseDiv block">' + values[1] + '<img class="CloseIcon pull-right remove" align="absmiddle" width="1" height="1" src="/images/bg.png"></div></div>';

                $('.optionBox:last').append(append_dvbox);
                setTimeout(function () {
                    $("#save_reorder").trigger('click');
                }, 1000);
            }
        });

    //remove option from menu
        $('.optionBox').on('click', '.remove', function () {
            menusetting_changed = 1;
            load();
            var values = $(this).parent().attr('id');
            var $checked = $('#option' + values).find('.tariffSListId:checked');
            var length = $checked.length;
            if (length > 0) {
                $checked.attr('checked', false);
            }
            if (($('.block').length - 1) == 0) {
                $('#save_reorder').parent().hide();
            }
            $(this).closest('.HundredPercentClass').remove();
            var data = {id: values, act: 'remove'}
            $.post("saveusertarriff", data).done(function (data) {
                loadclose();
                swal(data)
            });
        });
    //change menu order

        $(".adlsearchclass,.deltsoutclass,.deltoutclass").change(function (e) {
            var obj = $(this);
            swal({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, change it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true,
            },
                    function (isConfirm) {
                        if (isConfirm) {
                            deals_pref_submit(obj.val())

                        } else {
                            var className = obj.attr('class');

                            $("." + className + ":not(:checked)").prop('checked', true);
                            swal("Cancelled", "Changes Not saved", "error");
                        }
                    });

        });
        $("#save_reorder").click(function (e) {
            menusetting_changed = 1;
            load();
            var h = [];
            $(".optionBox .block").each(function () {
                h.push($(this).attr('id'));
            });

            $.ajax({
                type: "POST",
                url: "saveordertarriff",
                data: {ids: "" + h + ""},
                success: function (data)
                {

                    loadclose();
                    if ("done" == $.parseJSON(data))
                        swal('Menu Order Changed.');

                }
            });
            return false;

        });
        
         $("#save_reorder1").click(function (e) {
            menusetting_changed = 1;
            load();
            var h = [];
            $(".optionBox1 .block1").each(function () {
                h.push($(this).attr('id'));
            });
     
     
            $.ajax({
                type: "POST",
                url: "saveOrderVehiclePre",
                data: {ids: "" + h + ""},
                success: function (data)
                {

                    loadclose();
                    if ("done" == $.parseJSON(data))
                        swal('Vehicle Order Changed.');

                }
            });
            return false;

        });

        $(".radiotds").change(function (e) {
            var obj = $(this);
            swal({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, change it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true,
            },
                    function (isConfirm) {
                        if (isConfirm) {
                            //var values =$(this).val().split('-');
                            tax_prefix_submit(obj.val())

                        } else {
                            var className = obj.attr('class');

                            $("." + className + ":not(:checked)").prop('checked', true);

                            swal("Cancelled", "Changes Not saved", "error");
                        }
                    });

        });
        $(".radiost").change(function (e) {
            if ($(this).val() === "st-1") {
                $("#gstnumber").show();


            } else {
                var obj = $(this);
                $("#gstnumber").hide();
                swal({
                    title: "Are you sure?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, change it!",
                    cancelButtonText: "No, cancel!",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    showLoaderOnConfirm: true,
                },
                        function (isConfirm) {
                            if (isConfirm) {
                                //var values =$(this).val().split('-');
                                tax_prefix_submit(obj.val())

                            } else {
                                var className = obj.attr('class');

                                $("." + className + ":not(:checked)").prop('checked', true);

                                swal("Cancelled", "Changes Not saved", "error");
                            }
                        });
            }
        });
        $(".radioclkm").change(function (e) {
            var obj = $(this);
            swal({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, change it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true,
            },
                    function (isConfirm) {
                        if (isConfirm) {
                            //var values =$(this).val().split('-');
                            clos_km_submit(obj.val())

                        } else {
                            var className = obj.attr('class');

    //      if('radiost'==className)
                            $("." + className + ":not(:checked)").prop('checked', true);
    //      if('radiotds'==className)
    //      $(".radiotds:not(:checked)").prop('checked',true);

                            //obj.prop('checked',false);

                            swal("Cancelled", "Changes Not saved", "error");
                        }
                    });

        });
        $(".radiowebbkg").change(function (e) {
            var obj = $(this);
            swal({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, change it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true,
            },
                    function (isConfirm) {
                        if (isConfirm) {
                            //var values =$(this).val().split('-');
                            web_cms_bkg_status(obj.val())

                        } else {
                            var className = obj.attr('class');

    //      if('radiost'==className)
                            $("." + className + ":not(:checked)").prop('checked', true);
    //      if('radiotds'==className)
    //      $(".radiotds:not(:checked)").prop('checked',true);

                            //obj.prop('checked',false);

                            swal("Cancelled", "Changes Not saved", "error");
                        }
                    });

        });

        $(".invlogo").change(function (e) {
            var val = $(this).val();
            if (val == 2) {
                $('.logoupdiv').css('display', "block");
            } else {
                $('.logoupdiv').css('display', "none");
            }
        });
        $("#invoicelogochange").click(function (e) {
            invoice_logo_status()

        });


        /////////// bY nITIN jAMDHADE
        $(".radiodispatchtype").change(function (e) {
            var obj = $(this);
            swal({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, change it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true,
            },
                    function (isConfirm) {
                        if (isConfirm) { 
                            cms_dispatch_type(obj.val())
                        } else {
                            var className = obj.attr('class');
 
                            $("." + className + ":not(:checked)").prop('checked', true); 
                            swal("Cancelled", "Changes Not saved", "error");
                        }
                    });
        });
        
        $(".radiopkgsearchtype").change(function (e) {
            var obj = $(this); 
            swal({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, change it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true,
            },
                    function (isConfirm) {
                        if (isConfirm) { 
                            cms_packagesearch_type(obj.val())
                        } else {
                            var className = obj.attr('class');
 
                            $("." + className + ":not(:checked)").prop('checked', true); 
                            swal("Cancelled", "Changes Not saved", "error");
                        }
                    });
        });

        $(".radioowntax").change(function (e) {
            var obj = $(this);
            swal({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, change it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true,
            },
                    function (isConfirm) {
                        if (isConfirm) {
                            cms_tax_from_other_db(obj.val())
                        } else {
                            var className = obj.attr('class');
                            $("." + className + ":not(:checked)").prop('checked', true);
                            swal("Cancelled", "Changes Not saved", "error");
                        }
                    });

        });
        /////////////


        $("#btnprefix").click(function (e) {
            swal({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, change it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
                    function (isConfirm) {
                        if (isConfirm) {
                            if ($("#txtprefix").val().length > 0 && $("#txtprefix").val().length < 6)
                                tax_prefix_submit("prefix-" + $("#txtprefix").val());
                            else
                                swal("Cancelled", "Min 1 and Max 5 Char Only", "error");
                        } else {

                            swal("Cancelled", "Changes Not saved", "error");
                        }
                    });

        });

        function deals_pref_submit(val) {
            $.ajax({
                url: "ajaxaddDealssrchpref",
                data: {postdata: val},
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    var strdata = $.parseJSON(data);
                    swal("Changed!", "You Have Successfully Changed.", "success");
                }
            })
        }
        function tax_prefix_submit(val) {
            $.ajax({
                url: "taxprefix",
                data: {data: val},
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    var strdata = $.parseJSON(data);
                    swal("Changed!", "You Have Successfully Changed.", "success");
                    location.reload();
                }
            })
        }
        function web_cms_bkg_status(val) {
    //        load();
            $.ajax({
                url: "webcmsbkgstatus",
                data: {data: val},
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    var strdata = $.parseJSON(data);
    //                loadclose();
                    swal("Changed!", "You Have Successfully Changed.", "success");
                }
            })
        }
        function invoice_logo_status() {
            var action = $('#invoicelogoform').attr('action'), method = $('#invoicelogoform').attr('method');
            $.ajax({
                url: "invoicelogostatus",
                data: new FormData($('#invoicelogoform')[0]),
                type: 'POST',
                processData: false,
                contentType: false,
                async: false,
                cache: false,
                success: function (data, textStatus, jqXHR) {
                    if (data != 1) {
                        var dt = $.parseJSON(data);
                        $.each(dt, function (k, v) {
                            $.each(v, function (k1, v1) {
                                $("#err" + k).addClass('error');
                                $("#err" + k).text(dt[k][k1]);
                            });
                        });
                    } else {
                        swal("Changed!", "You Have Successfully Changed.", "success");
                    }
                }
            })
    //        }
        }
        function cms_dispatch_type(val) {
    //        load();
            $.ajax({
                url: "cmsdispatchtype",
                data: {data: val},
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    var strdata = $.parseJSON(data);
    //                loadclose();
                    swal("Changed!", "You Have Successfully Changed.", "success");
                }
            })
        }
        function cms_packagesearch_type(val) {
    //        load();
            $.ajax({
                url: "cmspackagesearch",
                data: {data: val},
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    var strdata = $.parseJSON(data);
    //                loadclose();
                    swal("Changed!", "You Have Successfully Changed.", "success");
                }
            })
        }

        ////////  TAX FROM OTHER DB
        function cms_tax_from_other_db(val) {
    //        load();
            $.ajax({
                url: "cmstaxfromotherdb",
                data: {data: val},
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    var strdata = $.parseJSON(data);
    //                loadclose();
                    swal("Changed!", "You Have Successfully Changed.", "success");
                }
            })
        }
        function clos_km_submit(val) {
    //        load();
            $.ajax({
                url: "clskm",
                data: {data: val},
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    var strdata = $.parseJSON(data);
    //                loadclose();
                    swal("Changed!", "You Have Successfully Changed.", "success");
                }
            })
        }

        //paymentmethod
        function onload_clonepaymentmethod() {
            var subterifflist = '[{"utsId":1,"tariffSListId":1,"tariffSubName":"Roundtrip"},{"utsId":2,"tariffSListId":2,"tariffSubName":"Oneway"},{"utsId":3,"tariffSListId":3,"tariffSubName":"Multicity"},{"utsId":4,"tariffSListId":4,"tariffSubName":"Fullday"},{"utsId":5,"tariffSListId":5,"tariffSubName":"Halfday"},{"utsId":6,"tariffSListId":6,"tariffSubName":"Airport"},{"utsId":7,"tariffSListId":7,"tariffSubName":"Railway Station"},{"utsId":8,"tariffSListId":8,"tariffSubName":"Area \/ Hotel"},{"utsId":9,"tariffSListId":11,"tariffSubName":"Sharecab"},{"utsId":10,"tariffSListId":12,"tariffSubName":"Deal"},{"utsId":11,"tariffSListId":13,"tariffSubName":"Package"}]';
            var arrsubterifflist = $.parseJSON(subterifflist);
            var jsonBookingAdvance = '[{"tariffSListId":1,"value":50,"type":1,"bookbefore":"0:30","paytodriver":0}]';
            var BookingAdvance = $.parseJSON(jsonBookingAdvance);
    //for (i = 0; i < arrsubterifflist.length; i++)
    //        {
    //            var res=jQuery.grep(BookingAdvance, function (Booking) { return Booking.tariffSListId == arrsubterifflist[i]['tariffSListId'] });
    //console.log(res);
    //        }
            if (arrsubterifflist.length > 0)
            {
                clonepaymentmethod(arrsubterifflist, BookingAdvance);
            } else
            {
                $('#save_reorder').parent().hide();
            }
        }
        function clonepaymentmethod(arrsubterifflist, BookingAdvance) {
            menusetting_changed = 0;
            for (i = 1; i < arrsubterifflist.length; i++)
            {
                $("#paymentmethod").children(".dvclone:first").clone().insertBefore("#dvtbnpayment");
                var cloneobj = $("#paymentmethod").children(".dvclone:last");

                $(cloneobj).addClass("MarginTopBox");
                $(cloneobj).find(".percentbox").addClass("hidden");
                $(cloneobj).find(".flatbox").addClass("hidden");

                $(cloneobj).find(".hdntariffSListId").val(arrsubterifflist[i]['tariffSListId']);
                $(cloneobj).find(".txtsubteriffname").val(arrsubterifflist[i]['tariffSubName']);

                var res = jQuery.grep(BookingAdvance, function (Booking) {
                    return Booking.tariffSListId == arrsubterifflist[i]['tariffSListId']
                });
                if (res.length > 0)
                {
                    $(cloneobj).find(".selBookbefore").val(res[0].bookbefore);
                    if ('2' != res[0].type)
                    {
                        $(cloneobj).find(".typeadvance").val(res[0].type);
                    }
                    if ('0' == res[0].type) {
                        $(cloneobj).find(".flatbox").removeClass("hidden");
                        $(cloneobj).find(".flatbox").children("input").val(res[0].value);
                    } else if ('1' == res[0].type) {
                        $(cloneobj).find(".percentbox").removeClass("hidden");
                        $(cloneobj).find(".percentbox").children("select").val(res[0].value);
                    }

                    // for payto driver
                    if ('1' == res[0].paytodriver)
                    {
                        $(cloneobj).find(".paytodriver").prop('checked', true);
                    }
                }
            }
    //  for first row
            var firstobj = $("#paymentmethod").children(".dvclone:first");
            $(firstobj).find(".percentbox").addClass("hidden");
            $(firstobj).find(".flatbox").addClass("hidden");
            $(firstobj).find(".hdntariffSListId").val(arrsubterifflist[0]['tariffSListId']);
            $(firstobj).find(".txtsubteriffname").val(arrsubterifflist[0]['tariffSubName']);
            $(firstobj).find(".selBookbefore").val("0");
            $(firstobj).find(".typeadvance").val("blank");
            $(firstobj).find(".flatbox").children("input").val("");
            $(firstobj).find(".percentbox").children("select").val("5");
            var res = jQuery.grep(BookingAdvance, function (Booking) {
                return Booking.tariffSListId == arrsubterifflist[0]['tariffSListId']
            });
            if (res.length > 0)
            {
                $(firstobj).find(".selBookbefore").val(res[0].bookbefore);
                if ('2' != res[0].type)
                {
                    $(firstobj).find(".typeadvance").val(res[0].type);
                }
                if ('0' == res[0].type) {
                    $(firstobj).find(".flatbox").removeClass("hidden");
                    $(firstobj).find(".flatbox").children("input").val(res[0].value);
                } else if ('1' == res[0].type) {
                    $(firstobj).find(".percentbox").removeClass("hidden");
                    $(firstobj).find(".percentbox").children("select").val(res[0].value);
                }

                // for payto driver
                if ('1' == res[0].paytodriver)
                {
                    $(firstobj).find(".paytodriver").prop('checked', true);
                }
            }
    //        }, 1000);
        }
        onload_clonepaymentmethod();

        $("#aPaymenttab").click(function () {
            var arrsubterifflist_lenth = $('.tariffSListId:checked').length;
            if (arrsubterifflist_lenth <= 0)
            {
                swal("Please Select The Service", "Go to Menu setting and select atleast 1 service.", "warning");
                //$('#collapseThree').collapse('hide');
                return false;
            }
            if (menusetting_changed == 1)
            {
                load();
                $.ajax({
                    url: "getpaymentmethodrow",
                    success: function (data, textStatus, jqXHR) {
                        $(".dvclone:not(:first)").remove();
                        var arrdata = $.parseJSON(data);
                        var arrsubterifflist = arrdata.userSubTarriffListNames;
                        var BookingAdvance = arrdata.BookingAdvance;

                        if (arrsubterifflist.length > 0)
                        {
                            clonepaymentmethod(arrsubterifflist, BookingAdvance);
                        } else
                        {
                            swal("Please Select The Service", "Go to Menu setting and select atleast 1 service.", "warning");
                            //$('#collapseThree').collapse('hide');
                        }

                        loadclose();
                        menusetting_changed = 0;
                    }
                })
            }
        });
        $(document).on("change", ".typeadvance", function () {
            var opnclassname = $(this).children('option:selected').attr('class');
            if ("opnpercent" == opnclassname)
            {
                $(this).parent().siblings(".percentbox").removeClass("hidden");
                $(this).parent().siblings(".flatbox").addClass("hidden");
            } else if ("opnflat" == opnclassname)
            {
                $(this).parent().siblings(".flatbox").removeClass("hidden");
                $(this).parent().siblings(".percentbox").addClass("hidden");
            } else
            {
                $(this).parent().siblings(".percentbox").addClass("hidden");
                $(this).parent().siblings(".flatbox").addClass("hidden");
            }
        });

        function allnumeric(inputtxt)
        {
            var numbers = /^[0-9]+$/;
            if (inputtxt.match(numbers))
            {
                return true;
            } else
            {
                return false;
            }
        }

        $("#btnpaymentsubmit").click(function () {
            var dvcloneobj = $("#paymentmethod").children(".dvclone");
            var values = [];
            $(".alert-danger").removeClass("alert-danger");
            var flatNumValid = true;
            dvcloneobj.map(function (ind, obj) {
                var value = [];
                value[0] = $(this).find(".hdntariffSListId").val();
                value[1] = $(this).find(".selBookbefore").val();
                value[2] = $(this).find(".typeadvance").val();
                if ("blank" != $(this).find(".typeadvance").val())
                {
                    if ("0" != $(this).find(".typeadvance").val())
                    {
                        value[3] = $(this).find(".percentbox").children("select").val();
                    } else if ("1" != $(this).find(".typeadvance").val())
                    {
                        var flatobj = $(this).find(".flatbox").children("input");
                        if (allnumeric(flatobj.val()))
                        {
                            value[3] = flatobj.val();
                        } else
                        {
                            flatNumValid = false;
                            flatobj.addClass("alert-danger");
                        }
                    }
                }

                value[4] = '0';
                if ($(this).find(".paytodriver").prop('checked'))
                {
                    value[4] = '1';
                }

                values.push(value);
            }).get();
            console.log(values);
            if (flatNumValid == true)
            {
                $.ajax({
                    url: "setbookingadvance",
                    type: 'POST',
                    data: {data: values},
                    success: function (data, textStatus, jqXHR) {
                        swal("Success", "Changes Saved", "success");
                    }
                });
            } else {
                swal("Error", "Insert Correct Values", "error");
            }
        });

        $("#btnnotification").click(function (e) {
            var validation = true;

            var email = $(".txtemail").map(function () {

                if (this.value !== "")
                {
                    $(this).removeClass("alert alert-danger");
                    var inputVal = this.value;
                    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    if (!emailReg.test(inputVal)) {
                        $(this).addClass("alert alert-danger");
                        validation = false;
                    }
                    return this.value;
                }

            }).get();

            var mobile = $(".txtmobile").map(function () {

                if (this.value !== "")
                {
                    $(this).removeClass("alert alert-danger");
                    var inputVal = this.value;
                    var phoneno = /^\d{10}$/;
                    if (!phoneno.test(inputVal))
                    {
                        $(this).addClass("alert alert-danger");
                        validation = false;
                    }

                    return this.value;
                }

            }).get();
            if (validation == true)
            {
                $.ajax({
                    url: "addnotificationemail",
                    type: 'POST',
                    data: {email: email, mobile: mobile},
                    success: function (data, textStatus, jqXHR) {
                        swal("Changed!", "You Have Inserted", "success");
                    }
                });
            }
        });
        // gateway option
        $("#gatewayoption").change(function () {
            var val = this.value;
            if ('6' == val)
            {
                $("#dvskey").addClass("hidden");
                $("#txtskey").val("");
                $("#mkey").text("Merchant Key");
                $("#salt").text("PG Salt");
            } else if ('13' == val || '10' == val)
            {
                $("#dvskey").removeClass("hidden");
                $("#mkey").text("Api Key");
                $("#salt").text("Merchant ID");
            }
            //Add this code by pavan
            var modeValue = $('input[name=mode]:checked').val();
            if (modeValue != "") {
                var dataValue = {mode: modeValue, gateway: val}
                $.ajax({
                    url: "getPaymentGetwayValues",
                    data: dataValue,
                    type: 'POST',
                    dataType: 'json',
                    success: function (data) {
                        $('#mkey1').val(data[0].mkey);
                        $('#salt1').val(data[0].salt);
                        $('#txtskey').val(data[0].skey);
                    }
                });
            }
            //End Here 
        });
        $(".mode").change(function () {
            var val = $('#gatewayoption').val();
            //Add this code by pavan
            var modeValue = $('input[name=mode]:checked').val();
            if (val != "") {
                var dataValue = {mode: modeValue, gateway: val}
                $.ajax({
                    url: "getPaymentGetwayValues",
                    data: dataValue,
                    type: 'POST',
                    dataType: 'json',
                    success: function (data) {
                        $('#mkey1').val(data[0].mkey);
                        $('#salt1').val(data[0].salt);
                        $('#txtskey').val(data[0].skey);
                    }
                });
            }
            //End Here 
        });

        $("#sbmitgateway").click(function () {
            var frmdata = $("#frmGateway").serialize()
            $.ajax({
                url: "setUserGateway",
                data: frmdata,
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    swal('Success', 'You Have Selected Gateway', 'success');
                }
            });

        });
        //end gateway

        // sms detail
        $("#btnsms").click(function (e) {
            swal({
                title: "Are you sure?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, change it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true,
            },
                    function (isConfirm) {
                        if (isConfirm) {
                            var eml = /^[A-Z]{6}$/
                            if (eml.test($("#txtsms").val()) == true)
                            {
                                var data = {smsval: $.trim($("#txtsms").val())};
                                frm_submit(data, "addsmsdetail");
                            } else
                            {
                                setTimeout(function () {
                                    swal("Error!", "6 UPPER Case characters Only.", "error");
                                }, 2000);
                            }
                        } else {
//                            swal("Cancelled", "Changes Not saved", "error");
                        }
                    });

        });

        function frm_submit(data, url) {
            $.ajax({
                url: url,
                data: data,
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    var strdata = $.parseJSON(data);
                    swal("Changed!", "You Have Successfully Changed.", "success");
                }
            });
        }
        //end sms detail


        //Start Gst Inserrt Update//
        $("#gstinsbtn").click(function () {
            if ($("#staxnumtxt").val().length != 0) {

                var gst = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/;
                if ($("#staxnumtxt").val().match(gst)) {
                    $("#gstinsbtn").hide();
                    $.ajax({
                        url: "saveGst",
                        data: {gstnumber: $("#staxnumtxt").val()},
                        type: 'POST',
                        success: function (data) {
                            tax_prefix_submit($(".radiost:checked").val());

                            $("#gstinsbtn").show();
                        }
                    });
                } else {
                    swal("Oops", "Enter Valid Gst Number", "error");

                }
            } else {
                swal("Oops", "Enter Gst Number", "error");
            }
        });
    //End Gst Inserrt Update//

        ///validation for email and mobile no. for ccr API///
        $('#ccrapi').click(function (e) {
            var apimobile = $('#apimobile').val();
            var apiemail = $('#apiemail').val();
            if (apiemail !== "")
            {
                //$(this).removeClass("alert alert-danger");
                var inputVal = apiemail;
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!emailReg.test(inputVal)) {
                    // $(this).addClass("alert alert-danger");
                    //validation=false;  
                    swal("Opps", "Email address not valid", "error");
                    return false;
                }
                //return this.value;
            } else
            {
                swal("Opps", "Email address should be not empty", "error");
                return false;
            }

            // if(apimobile!=="")
            // {
            // $(this).removeClass("alert alert-danger");
            var inputVal = apimobile;
            var phoneno = /^\d{10}$/;
            if (!phoneno.test(inputVal))
            {
                // $(this).addClass("alert alert-danger");
                // validation=false;
                swal("Opps", "Mobile No. not valid", "error");
                return false;
            }

            //return this.value;
            //}
            // alert('ok');       
            $.ajax({
                url: "chkaddapicity",
                data: {data: $('#apiCity').val(), apimobile: apimobile, apiemail: apiemail},
                type: 'POST',
                success: function (data, textStatus, jqXHR) {
                    if (data == 1)
                    {
                        swal("This Email Or Mobile Number already registered");
                        return false;
                        $('#emailmobccr').show();
                        $('#emailmobccr').modal('show');
                        //$('#emailmobccr').modal('toggle');    
                    } else
                    {
                        swal("Changes Saved");
                        $('#emailmobccr').modal('toggle');
                    }

                }
            });

        });
        //end//

        //////////Key Press Code////////
        $("#limitmonth").keypress(function (e) {
            //if the letter is not digit then display error and don't type anything
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                //display error message
                $(".errmsg").html("Digits Only").show().fadeOut(3000);
                return false;
            }
        });
    </script>
    <script src="/js/chosen.ajax.js" type="text/javascript"></script>
    <style>
        body{
            font-family: 'OpenSansRegular' !important;
        }
    </style>
        

                    <div class="innerFooter">© 2009 - 2020  Powered by <a target="_blank" href="http://www.cabsaas.com/">CabSaaS</a>. · All Right Reserved. <a target="_blank" href="http://www.cabsaas.com/terms-n-conditions">Terms of Services</a>  </div>

                </div>
            </div>
        </div>


        <!-- Content End -->

        <script type="text/javascript" src="/js/editor.js"></script>
<script type="text/javascript" src="/js/html2canvas.min.js"></script>
<script type="text/javascript" src="/js/all-pages.js"></script>
<script type="text/javascript" src="/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/datatables/js/jquery.dataTables.js"></script>
<script type="text/javascript" src="/datatables/js/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="/js/jszip_2.5.0_jszip.min.js"></script>
<script type="text/javascript" src="/js/buttons.html5.min.js"></script>
<script type="text/javascript" src="/js/dataTables.buttons.min.js"></script>        <link rel="stylesheet" type="text/css" href="/css/buttons.dataTables.min.css"> 

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
        </script></body></html>
