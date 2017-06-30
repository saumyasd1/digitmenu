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
     		rboName = [],
     		partnerCombo =  this.lookupReference('partner'),
     		partnerStore = partnerCombo.store,
     		partnerName = [],
     		siteCombo = this.lookupReference('siteName'),
     		siteStore = siteCombo.store,
     		siteName = [],
     		csrCombo = this.lookupReference('csrCombo'),
     		csrStore = csrCombo.store,
     		csrName = [];
	
 	if(rboCombo.getValue() == 'all'){
 		rboStore.each(function(rec){
			if(rec.get('id') != 'all' ){
				rboName.push(rec.get('rboName'));
			}
		});
	}else{
		rboName.push(rboCombo.getRawValue());
	}
	
	if(partnerCombo.getValue() == 'all'){
		partnerStore.each(function(rec){
			if(rec.get('id') != 'all' ){
				partnerName.push(rec.get('id'));
			}
		});
	}else{
		partnerName.push(partnerCombo.getValue());
	}
	
	if(siteCombo.getValue() == 'all'){
		siteStore.each(function(rec){
			if(rec.get('id') != 'all' ){
				siteName.push(rec.get('id'));
			}
		});
	}else{
		siteName.push(siteCombo.getValue());
	}
	
	if(csrCombo.getValue() == 'all'){
		csrStore.each(function(rec){
			if(rec.get('userId') != 'all' ){
				csrName.push(rec.get('userId'));
			}
		});
	}else{
		csrName.push(csrCombo.getValue());
	}
	
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
	
	obj.partnerId = partnerName.join(',');
	obj.RBOName = rboName.join(',');
	obj.siteId = siteName.join(',');
	obj.csrId = csrName.join(',');
	obj.Status = statusCode.join(',');
	var values = reportForm.getValues();
		query = Ext.JSON.encode(obj);
	
     	var form = Ext.create('Ext.form.Panel', { 
            standardSubmit: true,   
            url : url
            
        });
     	form.submit({
        	method : 'GET',
        	params:{query:query}
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
    	var me = this,
    		view = me.getView(),
    		statusCombo =this.lookupReference('status');
    	if(newValue != null){
	    	var productLineCombo = me.lookupReference('productLineCombo'),
	    		rboCombo = me.lookupReference('rboName'),
	    		partnerCombo = me.lookupReference('partner'),
	    		partnerStore = partnerCombo.store,
		    	partnerId =[];

	    	if(partnerCombo.getValue() == 'all'){
	    		partnerStore.each(function(rec){
	    			if(rec.get('id') != 'all'){
	    				partnerId.push(rec.get('id'));
	    			}
	    		});
	    	}else{
	    		partnerId.push(partnerCombo.getValue());
	    	}
	    	
	    	var response = Ext.Ajax.request({
	    		url: applicationContext + '/rest/productLines/rboList',
	    		method:'GET',
	    		params:{partnerId:partnerId.join()},
	    		success : function(response, opts) {
	    				var jsonValue = Ext.decode(response.responseText).productlines;
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
		    		    	var uniqueValueArray = [],
		    		    		rboStoreData= [];
		    		    	store.each(function(rec,index){
		    		    		uniqueValueArray.push(rec.get('rbo'));
		    		    	})
		    		    	
		    		    	rboStoreData.push({id:'all', rboName:'Select All'});
		    		    	if(uniqueValueArray.length>0){
		    		    		var rboStore = rboCombo.store;
		    		    		
		    		    		 uniqueValueArray.forEach(function(item){
		    		    			 rboStoreData.push(item);
		    		    		 });
		    		    		 rboStore.loadData(rboStoreData);
		    		    	}
		    	    	}else{
		    	    		Helper.showToast('failure',AOCLit.noRboMsg);
		    	    	}
			        },
		        failure: function(response, opts) {
	                    msg = response.responseText;
	                    Helper.showToast('failure', msg);
	                    view.unmask();
	                    view.close();
	                }
	    	});
	    	
	    	rboCombo.enable();
	    	statusCombo.enable();
    	}
		if(!this.getView().isResubmit || !obj.isChangedForFirstTime){
			rboCombo.reset();
			statusCombo.reset();
		}
    },
    onPartnerAfterRender: function(obj){
	    var userInfo = AOCRuntime.getUser(),
	    	siteId = userInfo.siteId,
	    	store = obj.store,
	    	storeObj = {id:'all',partnerName:'Select All'};
	    
	    obj.getStore().proxy.extraParams = {
		    siteId: siteId
		};
		store.on('load',function(){
			store.insert(0,new Ext.data.Record(storeObj));
		},store);	
    },
    onReportFormAfterRender: function(form){
    	  var siteCombo = form.lookupReference('siteName'),
	          siteStore = siteCombo.store,
	          userInfo = AOCRuntime.getUser(),
	          roleId = userInfo.role,
	          siteId = userInfo.siteId;
      
	      siteStore.load({
	          params: {
	              siteId: siteId
	          }
	      });
    },
    onSiteSelect: function(siteCombo){
    	var me = this,
    		siteComboValue = siteCombo.getValue(),
    		siteComboStore = siteCombo.store,
    		refs = me.getReferences(),
    		csrCombo = refs.csrCombo;
    	csrCombo.enable();
    	csrCombo.store.proxy.extraParams = {
		    siteId: siteComboValue == 'all' ? 1 : siteComboValue
		};
    	csrCombo.store.load();
    	csrCombo.reset();
    }
})