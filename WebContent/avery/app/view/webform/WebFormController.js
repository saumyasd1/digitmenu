Ext.define('AOC.view.webform.WebFormController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.webFormMain',
    runTime : AOC.config.Runtime,
    onPartnerChange:function(obj,newValue){
    	var productLineCombo=this.lookupReference('productLineCombo'),rboCombo=this.lookupReference('rboCombo');
    	store = Ext.create('AOC.store.PartnerProductLineStore',{
				storeId:'PartnerProductLineStoreStoreId',
				totalCount:'total',
				proxy: {
					type: 'rest',
			         url        : applicationContext+'/rest/productLines/partner/'+newValue+'?partnerId='+newValue,
			        reader      : {
			            type          : 'json',
			            rootProperty          : 'productlines'
			        }
			    },
			    listeners: {
			        'load' :  function(store,records,options) {
			        	var uniqueValueArray1=store.collect('rboName');
			        	var serviceStoreData1= [];
			        	  if(uniqueValueArray1.length>0){
			        		 uniqueValueArray1.forEach(function(item){
		                	 var service = [item];
		                	 serviceStoreData1.push(service);
		                   });
			        	     var serviceStore =  Ext.create('Ext.data.ArrayStore',{
	                 	   	 fields : ['rboName'],	
	            	         data : serviceStoreData1
	                    });
			        	rboCombo.bindStore(serviceStore);
			        	}
			        	var uniqueValueArray2=store.collect('productLineType');
			        	var serviceStoreData2= [];
			        	  if(uniqueValueArray2.length>0){
			        		  uniqueValueArray2.forEach(function(item){
	                		  var service = [item];
	                		  serviceStoreData2.push(service);
	                    	 });
			        	      var serviceStore =  Ext.create('Ext.data.ArrayStore',{
	                 	   		fields : ['productLineType'],	
	            	            data : serviceStoreData2
	                         });
			        	      productLineCombo.bindStore(serviceStore);
			        	     }
			        }
			    }
			});
    	productLineCombo.enable();
    	rboCombo.enable();
    },
    SaveDetails:function(obj){
    	var me=this;
    	    form = obj.up('form');
    			form.submit({
    	             url: 'powerpay/Order/PUT?action=uploadFile',
    	             headers : {'Content-type':'multipart/form-data'},
    				 waitMsg: 'Uploading your file...',
    				 success : function(form, action) {
    	            		var responseText='',response=action.response;
    						if (response != null) {
    	                          
    							}
    						},
    					failure : function(form, action) {
    	            	     Ext.Msg.alert('Failed', action.result.message);
    					  }
    			 			});
    },
    change:function(obj,value){
		   var value=value.substring(value.lastIndexOf("\\"));
		    value=value.replace("\\"," ");
		   var fileType=value.substr(value.lastIndexOf('.') + 1);
		   var fileName=value.substr(0,value.lastIndexOf('.')).trim();
			var AttachmentInfoGriditemId=Ext.ComponentQuery.query("#AttachmentInfoGriditemId")[0];
			var store = Ext.create('AOC.store.WebformStore',{
				storeId:'WebformStoreId',
				fields : [ 'sn', 'fileName', 'fileType' ],
				 data : [ {
					 sn : "1",
					 fileName : fileName,
					 fileType : fileType
				 }]
			});
			AttachmentInfoGriditemId.bindStore(store);
			store.load();
	 }
});