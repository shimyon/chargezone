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