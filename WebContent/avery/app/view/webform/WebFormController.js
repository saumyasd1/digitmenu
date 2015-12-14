Ext.define('AOC.view.webform.WebFormController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.webFormMain',
    runTime : AOC.config.Runtime,
    onPartnerChange:function(obj,newValue){
    	if(newValue!=null){
    	var productLineCombo=this.lookupReference('productLineCombo'),rboCombo=this.lookupReference('rboCombo');
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
    	var uniqueValueArray1=store.collect('rboName');
    	var serviceStoreData1= [];
    	  if(uniqueValueArray1.length>0){
    		 uniqueValueArray1.forEach(function(item){
    			 var index=store.find('rboName',item);
    			 var currentRecord=store.getAt(index);
        	 serviceStoreData1.push(currentRecord);
           });
    	     var serviceStore =  Ext.create('Ext.data.Store',{
     	   	 fields : ['rboName','id','productLineType'],	
	         data : serviceStoreData1
        });
    	     productLineCombo.bindStore(store);
    	rboCombo.bindStore(serviceStore);
    	rboCombo.enable();
    	  }
    	}
    	}
    },
    SaveDetails:function(obj){
    	Ext.getBody().mask('Saving....');
    	   var form = this.getView().down('form').getForm(),me=this;
    	    if(form.isValid())
    			form.submit({
    				url: applicationContext+'/rest/orders/attachments/1',
    		        getParams: function(useModelValues) {
    		            var falseVal = false,
    		                fieldParams = this.form.getValues(falseVal, true, this.submitEmptyText !== falseVal, useModelValues,  true);
    		            return Ext.apply({}, fieldParams);
    		        },
    	             method: 'POST',
    				 waitMsg: 'Uploading your file...',
    				 scope : this,
    		    	    success : function(form,action){
    		    	    	Ext.Msg.alert('',webSubmissionSuccesFulMsg);
    		    	    	form.reset();
    		    	    	var AttachmentInfoGriditemId=this.getView().down('#AttachmentInfoGriditemId');
    		    	    	AttachmentInfoGriditemId.store.removeAll();
    		    	    	AttachmentInfoGriditemId.getView().refresh();
    		    	    	//me.getView().lookupReference('attachment1').show();
    		    	    	Ext.getBody().unmask();
    						},
    					failure : function(form, action) {
    	            	     Ext.Msg.alert('Failed', action.result.message);
    	            	     Ext.getBody().unmask();
    					  }
    			 			});
    },
    onAttachemnetChange:function(obj,value){
    	Ext.getBody().mask('Loading......');
    	var form=this.getView();
		   var value=value.substring(value.lastIndexOf("\\"));
		    value=value.replace("\\"," ");
		   var count=obj.name.replace('attachment','');
		   var i=parseInt(count)+1;
		   form.add({
       			xtype:'fileuploadfield',
       			labelAlign:'right',
       			name: 'attachment'+i,
       			reference: 'attachment'+i,
       			fieldLabel:'Attachments',
       			labelSeparator:'',
                   allowBlank: true,
                   labelWidth : 100,
 		            width : 500,
 		            labelSeparator : '',
 		            labelAlign:'right',
 		            listeners:{
    				 'change':'onAttachemnetChange'
    			 }
		   });
		   this.insertFileInGrid(value,'Attachment',true,count);
		   obj.hide();
		   Ext.getBody().unmask();
	 },
	 insertFileInGrid:function(fileName,fileType,multiAllowed,i){
		 var AttachmentInfoGriditemId=this.getView().nextSibling('#AttachmentInfoGriditemId');
			var store=AttachmentInfoGriditemId.store;
			if(store.storeId!='WebformStoreId'){
				var store = Ext.create('AOC.store.WebformStore',{
					storeId:'WebformStoreId',
					fields : [ 'fileName', 'fileType' ],
					 data : [{
						
						 fileName : fileName,
						 fileType : fileType,
						 type:'new',
						 internalId:i
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
						 fileType : fileType,
						 type:'new',
						 internalId:i
					 });
			}
			store.load();
	 },
	 onOrderFileChange:function(obj,value){
		 var value=value.substring(value.lastIndexOf("\\"));
		    value=value.replace("\\"," ");
		   this.insertFileInGrid(value,'Order File Type',false);
	 },
	 onAttachmentGridCellClick:function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
	    	if(e.target.className=='deleteClass'){
	    		Ext.getBody().mask('Deleting...');
	    		 var form=this.getView().down('form');
	    		var internalId=record.get('internalId');
	    		var fileType=record.get('fileType');
	    		var fileField;
	    		var AttachmentInfoGriditemId=this.getView().down('#AttachmentInfoGriditemId');
    	    	var store=AttachmentInfoGriditemId.store;
	    		if(fileType=='Attachment'){
	    			fileField=form.lookupReference('attachment'+internalId);
	    			fileField.destroy();
	    		}
	    		else{
	    			fileField=form.lookupReference('orderFileType');
	    			fileField.reset( );
	    		}
	    		store.remove(record);
	    		AttachmentInfoGriditemId.getView().refresh();
	    		Ext.getBody().unmask();
	    	}
	 },
	 onProductLineSelection:function(obj,newValue){
		 if(newValue !=null && newValue!=''){
			 var store=obj.store;
			 var record=store.getById(newValue);
			 var orderSchemaType=record.get('orderSchemaType'),attachmentRequired=record.get('attachmentRequired');
			 this.getView().lookupReference('subject').enable();
			 if(!attachmentRequired){
				 this.getView().lookupReference('attachment1').hide();
				 this.getView().lookupReference('attachment1').allowBlank=true;
			 }else{
				 this.getView().lookupReference('attachment1').allowBlank=false;
				 this.getView().lookupReference('attachment1').show();
			 }
			 this.getView().lookupReference('emailBody').enable();
			 this.getView().lookupReference('email').enable();
			 this.getView().lookupReference('attachment1').enable();
			 this.getView().lookupReference('orderFileType').enable();
		 }else{
			 this.getView().lookupReference('subject').disable();
			 this.getView().lookupReference('emailBody').disable();
			 this.getView().lookupReference('email').disable();
			 this.getView().lookupReference('attachment1').disable();
			 this.getView().lookupReference('orderFileType').disable();
		 }
		 
	 },
	 onRBOChange:function(obj,newValue){
		 if(newValue !=null && newValue!=''){
		 Ext.getBody().mask('Loading....');
		 var productLineCombo=this.getView().lookupReference('productLineCombo');
		 productLineCombo.setValue('');
		 var store=productLineCombo.store;
		 store.clearFilter();
		 store.load();
		 productLineCombo.bindStore();
		 store.filterBy(function(record){
			 if(record.get('rboName')==newValue)
				 return true;
       });
		 productLineCombo.bindStore(store);
		 productLineCombo.enable();
		 Ext.getBody().unmask();
		 }
	 }
});