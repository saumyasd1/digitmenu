<!DOCTYPE html>
<%
String applicationContext = request.getContextPath();
int pageSize=25;
%>

<html lang="en">
<head>
<style type="text/css">
::-ms-clear {
   display: none;
}
</style>
  <meta charset="UTF-8">
  <title>Avery Dennison Web App</title>    
  <script>
  var applicationContext = "<%=applicationContext%>";
  var pageSize = "<%=pageSize%>";
  </script>
	<!-- The line below must be kept intact for Sencha Cmd to build your application -->
    <script id="microloader" type="text/javascript" src="avery/bootstrap.js"></script>
</head>
</html>
