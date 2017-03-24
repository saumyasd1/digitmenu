<%
String applicationContext = request.getContextPath();
int pageSize=100;
%>
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <script src="https://use.fontawesome.com/515eec56c1.js"></script>
  <style type="text/css">
::-ms-clear {
   display: none;
}
		#loading{
			position:absolute;
			top:0;
			left:0;
			height:100%;
			width:100%;
			background-color:#f6f6f6;
		}
	    #loading #loading-text{
			color:#666;
			background-color:#fff;
	        padding:5px 20px 15px 20px;
	        border:1px solid #ccc;
			position:absolute;
	        top:50%;
	        left:50%;
			margin-left:-110px;
			margin-top:-60px;
			border-radius:7px;
			font-size:15px!important;
			text-align:center;
			font-family: "Lucida Grande","Helvetica Neue","Helvetica","Arial","Verdana","sans-serif"!important;
		}
		.nestedGrid .x-grid-item, body{
			color:#2c3e50 !important;
		}
		.hide-row-expander .custom-row-expander {
		    visibility: hidden;
		}
		.aoc-win .x-window-header-title-default{
			font-weight:bold;
		}
		.aoc-win .x-window-header-default {
		    border-width: 1px !important;
		    padding: 9px;
		    border-color: #ccc;
		} 
		.x-btn.aoc-btn{
			border-width:0px;
			background-image: none !important;
			color:#2c3e50;
			background-color:#fff;
		}
		.aoc-btn:hover{
		    color:#ccc;
		}
		.aoc-btn .aoc-icon{
			font-size:16px;
			width:16px !important;
			height:16px;
		}
		.success-icon{
			color:#4BDE4B;
		}
		.failure-icon:{
			color:#ff0000;
		}
		.warning-icon{
			color:orange;
		}
		.main-menu-list .section-wrap .section-wrap-text{color:#2c3e50 !important;}
		.main-menu-list .section-wrap-text{ padding-top:0px !important;}
		.main-menu-list .section-wrap-selected .section-wrap-img,
		.main-menu-list .section-wrap-selected .section-wrap-text,
		.main-menu-list .section-wrap .section-wrap-text:hover,
		.main-menu-list .section-over .section-wrap-img{color:#3892d3 !important;}
		main-menu-list .section-wrap-selected .section-wrap-text{font-weight:bold;}
		.orderline-expandable-grid .x-grid-inner-locked{border-right-color:#ccc !important;}
		.aoc-panel .x-toolbar .x-btn .x-btn-icon-el{
			height:16px;font-size:16px;
		}
		.aoc-panel .x-toolbar .x-btn .x-btn-icon-el-blue-small{color:#fff;}
		.blue-btn.x-btn-over{box-shadow: 0px 0px 4px 0px #65beed;}
		.x-btn{border-radius:2px !important;}
		.aoc-wi-form .x-accordion-item .x-panel-header-default {
		    border: solid 1px #f5f5f5;
		}
		.wi-form-panel-header{border:solid 1px #ccc;}
		.aoc-wi-form .wi-form-panel-header .x-panel-header{border:solid 1px #ccc;background:rgb(246, 246, 246);}
		
	</style>
  <title>Avery Dennison Web App</title>    
  <script>
  var applicationContext = "<%=applicationContext%>";
  var pageSize = "<%=pageSize%>";
  </script>
	<!-- The line below must be kept intact for Sencha Cmd to build your application -->
    <script id="microloader" type="text/javascript" src="avery/bootstrap.js"></script>
</head>
<body>
<div  id="loading">
		<div id="loading-text">
		<div><img style="width:60px;height:60px" src="avery/resources/images/logo_avery.gif"></div>
			Loading...
		</div>
	</div>
</body>
</html>
