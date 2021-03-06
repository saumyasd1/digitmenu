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
  <link rel="shortcut icon" type="image/gif" href="logo_avery.gif"/>
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
		
		
	</style>
  <title>Avery Dennison Web App</title>    
  <script>
  var applicationContext = "<%=applicationContext%>";
  var pageSize = "<%=pageSize%>";
  </script>
	<!-- The line below must be kept intact for Sencha Cmd to build your application -->
    <script id="microloader" type="text/javascript" src="avery/bootstrap.js"></script>
</head>
<body oncontextmenu="return false;">
<div  id="loading">
		<div id="loading-text">
		<div><img style="width:60px;height:60px" src="resources/images/logo_avery.gif"></div>
			Loading...
		</div>
	</div>
</body>
</html>
