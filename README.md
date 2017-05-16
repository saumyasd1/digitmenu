# AveryDennisonWeb
Web Application for Avery Dennison Project
# Guide Lines to import the project 
# Step 1 : open your eclispe
# Step 2 : import the project from git choose Clone URI
# Step 3 : put the git URL and your user id and password click on Next
# Step 4 : Select the New Project Wizard 
# Step 5 : Select Dynamic Web Project
# Step 6 : create resources folder , click on Next
# Step 7 : Choose Web.xml then FINISH
# Step 8 : Change database configuration in spring-context.xml
# Step 9 : Change the path in context-param in value in web.xml like 'C:/Users/Deepak/git/AveryDennisonWeb' 
#Step 10 : Change in Catalina.properties of tomcat Add two given properties and path
           # ogback.configurationFile= C:/Users/Deepak/git/AveryDennisonWeb/resources/logback.xml
           # app.working.dir.path = C:/Users/Deepak/git/AveryDennisonWeb 
#Step 11 : If Already Sencha and ruby installed , please open cmd and run the command sencha app watch till in your given project path like ('C:\Users\Deepak\git\AveryDennisonWeb\WebContent\avery') , If Not Installed please install both first          
#Step 12 : If It executes properly 	Then, 
#Step 11 : Refresh the project and then Clean and Build your Project and then Run. It will run properly.

#for War file deployment
#Step for War : You can export your project into war format , then you can directly put into your application server (apache tomcat)
#Points to remember need to verify the database connection in spring-context.xml, param path in web.xml and need to add two path (ogback.configurationFile, app.working.dir.path) in server catalina property.   