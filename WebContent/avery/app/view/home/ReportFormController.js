Ext.define('AOC.view.home.ReportFormController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.reportcontroller',
    runTime: AOC.config.Runtime,
    getReport:function(){
    	var view=this.getView(),url='';
    	var reportForm=view.getForm();
    	if(reportForm.isValid()){
    	var radioGroupValue=this.lookupReference('radioGroup').getValue().rb,query='',obj='';
    	obj={datecriteriavalue:'orderemailqueue.receivedDate'};
     	 if(radioGroupValue=='dailyReport'){
     		 url=applicationContext + '/rest/orders/download/dailyreport';
     	 }else{
     		url=applicationContext + '/rest/orders/download/openreport';
     		obj.fromDate=this.lookupReference('fromDate').getSubmitValue();
     		obj.toDate=this.lookupReference('toDate').getSubmitValue();
     	 } 
     	var rboCombo =this.lookupReference('rboName'),
		rboStore = rboCombo.store,
		rboName = [];
	
	rboStore.each(function(rec){
		if(rec.get('id') != 'all'){
			rboName.push(rec.get('rboName'));
		}
	});
	
	var statusCombo =this.lookupReference('status'),
	statusStore = statusCombo.store,
	statusCode =[];
	if(statusCombo.getValue() == 'all'){
		statusStore.each(function(rec){
			if(rec.get('code') != 'all'){
				statusCode.push(rec.get('code'));
			}
		});
	}else{
		statusCode.push(statusCombo.getValue());
	}
	
	obj.PartnerName=this.lookupReference('partner').getDisplayValue();
	obj.RBOName=rboName.join(',');
	obj.Status=statusCode.join(',');
	var values = reportForm.getValues();
	query=Ext.JSON.encode(obj);
	
     	var form = Ext.create('Ext.form.Panel', { 
            standardSubmit: true,   
            url : url
            
        });
     	form.submit({
        	method : 'GET',
        	params:{query:query,timezone:values.timeZone}
        });
    	}else{
    		 Ext.MessageBox.alert('', AOCLit.emptyFilter);
    	}
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
    },
    
    onPartnerChange:function(obj,newValue){
    	var me = this;
    	var statusCombo =this.lookupReference('status');
    	if(newValue != null){
	    	var productLineCombo = me.lookupReference('productLineCombo'),
	    		rboCombo = me.lookupReference('rboName');
	    	
	        var response = Ext.Ajax.request({
	            async: false,
	            url:applicationContext+'/rest/productLines/partner/'+newValue+'?partnerId='+newValue
	        });
	        
	      	var jsonValue = Ext.decode(response.responseText).productlines,
	      		serviceStoreData = [];
	      	
	    	if(jsonValue.length>0){
	    		jsonValue.forEach(function(item){
	    			var service = item;
	    			serviceStoreData.push(service);
	    		});
	    		
		    	var store =  Ext.create('Ext.data.Store',{
		    		fields:['id'],
		            data : serviceStoreData
		    	});
		    	
		    	var uniqueValueArray1 = store.collect('rbo'),
		    		serviceStoreData1= [];
		    	
		    	serviceStoreData1.push({id:'all', rboName:'Select All'});
		    	if(uniqueValueArray1.length>0){
		    		var rboStore = rboCombo.store;
		    		
		    		 uniqueValueArray1.forEach(function(item){
			        	 serviceStoreData1.push(item);
		    		 });
		    		 rboStore.loadData(serviceStoreData1);
		    	}
	    	}
	    	rboCombo.enable();
	    	statusCombo.enable();
    	}
    	if(!this.getView().isResubmit || !obj.isChangedForFirstTime){
    		rboCombo.reset();
    		statusCombo.reset();
    	}
    }
})