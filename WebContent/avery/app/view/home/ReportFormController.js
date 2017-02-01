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
    	var me=this;
    	if(newValue!=null){
    	var productLineCombo=this.lookupReference('productLineCombo'),rboCombo=this.lookupReference('rboName');
    	var store=null;
        var response = Ext.Ajax.request({
            async: false,
            url        : applicationContext+'/rest/productLines/partner/'+newValue+'?partnerId='+newValue
        });
      	var jsonValue=Ext.decode(response.responseText).productlines;
    	var serviceStoreData = [];
    	if(jsonValue.length>0){
    	jsonValue.forEach(function(item){
  		var service = item;
  		serviceStoreData.push(service);
  		
  	});
    	store =  Ext.create('Ext.data.Store',{
    		fields:['id'],
            data : serviceStoreData
      });
    	var uniqueValueArray1=store.collect('rbo');
    	var serviceStoreData1= [];
    	  if(uniqueValueArray1.length>0){
//    		 uniqueValueArray1.forEach(function(item){
//    			 var index=store.find('rboName',item);
//    			 var currentRecord=store.getAt(index);
//        	 serviceStoreData1.push(currentRecord);
//           });
    	     var serviceStore = Ext.create('Ext.data.Store',{
		     	   	 fields : ['rboName','id','productLineType'],	
			         data : uniqueValueArray1
		        });
    	    // serviceStore.insert(0,new Ext.data.Record({id:'all', rboName:'SelectAll'}));
    	     var form =me.getView();
    	     if(form !=null && !form.isResubmit){
    	    	 rboCombo.reset();
    	     }
    	     rboCombo.bindStore(serviceStore);
    	     rboCombo.enable();
    	  }
    	}
    	}
    }
})