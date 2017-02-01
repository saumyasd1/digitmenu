Ext.define('AOC.view.home.ReportFormController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.reportcontroller',
    runTime: AOC.config.Runtime,
    getReport:function(){
    	//debugger;
    	var view=this.getView(),url='';
    	var radioGroupValue=this.lookupReference('radioGroup').getValue().rb,query='',obj='';
     	 if(radioGroupValue=='dailyReport'){
     		 url=applicationContext + '/rest/orders/download/dailyreport';
     	 }else{
     		url=applicationContext + '/rest/orders/download/openreport';
     		obj={datecriteriavalue:'receivedDate'};
     		obj.fromDate=this.lookupReference('fromDate').getSubmitValue();
     		obj.toDate=this.lookupReference('toDate').getSubmitValue();
     	 
//     		 obj.PartnerName=this.lookupReference('partner').getDisplayValue();
//         	 obj.RBOName=this.lookupReference('rboName').getDisplayValue();
//         	 obj.Status=this.lookupReference('status').getDisplayValue();
     	 } 
     	
//     	 obj.PatnerName=this.lookupReference('id').getValue();
//     	 obj.RBO=this.lookupReference('id').getValue();
//     	 obj.Status=this.lookupReference('code').getValue();
     	 query=Ext.JSON.encode(obj);
       
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
    },
    
    onPartnerChange:function(obj,newValue){
    	var me = this;
    	
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
    	}
    }
})