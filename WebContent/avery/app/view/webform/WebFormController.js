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
    	   var form = this.getView().down('form').getForm();
    	    if(form.isValid())
    			form.submit({
    	             
    	             method: 'POST',
    	             //headers : {'Content-type':'multipart/form-data'},
    				 waitMsg: 'Uploading your file...',
    				 scope : this,
    		    	    success : function(form,action){
    	            		var responseText='',response=action.response;
    						if (response != null) {
    	                          
    							}
    						},
    					failure : function(form, action) {
    	            	     Ext.Msg.alert('Failed', action.result.message);
    					  }
    			 			});
    },
    onAttachemnetChange:function(obj,value){
    	Ext.getBody().mask('Loading......');
    	var form=this.getView();
		   var value=value.substring(value.lastIndexOf("\\"));
		    value=value.replace("\\"," ");
		   this.insertFileInGrid(value,'Attachment',true);
		   var count=obj.name.replace('attachment','');
		   var i=parseInt(count)+1;
		   form.add({
       			xtype:'fileuploadfield',
       			labelAlign:'right',
       			name: 'attachment'+i,
       			fieldLabel:'Attachments',
       			labelSeparator:'',
                   allowBlank: true,
                   labelWidth : 100,
 		            width : 500,
 		            labelSeparator : '',
 		            labelAlign:'right',
 		            maxLength : '50',
 		            enforceMaxLength: true,
 		            listeners:{
    				 'change':'onAttachemnetChange'
    			 }
		   });
		   obj.hide();
		   Ext.getBody().unmask();
	 },
	 insertFileInGrid:function(fileName,fileType,multiAllowed){
		 var AttachmentInfoGriditemId=this.getView().nextSibling('#AttachmentInfoGriditemId');
			var store=AttachmentInfoGriditemId.store;
			if(store.storeId!='WebformStoreId'){
				var store = Ext.create('AOC.store.WebformStore',{
					storeId:'WebformStoreId',
					fields : [ 'fileName', 'fileType' ],
					 data : [{
						
						 fileName : fileName,
						 fileType : fileType
					 } ]
				});
				AttachmentInfoGriditemId.bindStore(store);
			}else{
				if(!multiAllowed){
					var index=store.find('fileType',fileType);
					if(index!=-1){
						store.removeAt(index);
					}
				}
					store.add({
						
						 fileName : fileName,
						 fileType : fileType
					 });
			}
			store.load();
	 },
	 onOrderFileChange:function(obj,value){
		 var value=value.substring(value.lastIndexOf("\\"));
		    value=value.replace("\\"," ");
		   this.insertFileInGrid(value,'Order File Type',false);
	 },
	 onAttachmentGridCellClick:function(obj,value){
		 
	 },
	 onProductLineSelection:function(obj){
		 var store=obj.store;
		 this.getView().enable();
		 debugger;
	 }
});