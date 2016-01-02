Ext.define('AOC.view.home.ReportFormController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.reportcontroller',
    runTime: AOC.config.Runtime,
    getReport:function(){
    	var view=this.getView(),url='';
    	var radioGroupValue=this.lookupReference('radioGroup').getValue().rb,query='',obj;
     	 if(radioGroupValue=='dailyReport'){
     		 url=applicationContext + '/rest/orders/download/dailyreport';
     	 }else{
     		url=applicationContext + '/rest/orders/download/openreport';
     		obj={datecriteriavalue:'receivedDate'};
     		obj.fromDate=this.lookupReference('fromDate').getSubmitValue();
     		obj.toDate=this.lookupReference('toDate').getSubmitValue();
     		query=Ext.JSON.encode(obj);
     	 }
     	var form = Ext.create('Ext.form.Panel', { 
            standardSubmit: true,   
            url : url
            
        });
        form.submit({
        	method : 'GET',
        	params:{query:query}
        });
    },
    onRadioButtonChange:function(obj){
    	var value=obj.getValue().rb;
    	if(value=='dailyReport'){
    		this.lookupReference('fromDate').setHidden(true);
    		this.lookupReference('toDate').setHidden(true);
    	}else{
    		this.lookupReference('fromDate').setHidden(false);
    		this.lookupReference('toDate').setHidden(false);
    	}
    }
})