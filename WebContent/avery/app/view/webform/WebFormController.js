Ext.define('AOC.view.webform.WebFormController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.webFormMain',
    runTime : AOC.config.Runtime,
    onPartnerChange:function(obj,newValue){
    	var messageField=this.getView().down('#messageFieldItemId');
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
    	     productLineCombo.reset();
    	     rboCombo.bindStore(serviceStore);
    	     rboCombo.reset();
    	     rboCombo.enable();
    	     messageField.hide();
    	  }
    	}else{
  		  messageField.setValue('No RBO configured for the selected Parter. Please select a differet partner to proceed further');
		  messageField.show();
	  }
    	}
    },
    SaveDetails:function(obj){
	var me=this;
    	Ext.getBody().mask('Saving....');
    	   var form = this.getView().down('form').getForm(),me=this;
    	   var store =Ext.ComponentQuery.query('weborderview attachmentinfoGrid')[0].getStore();
    	   var oldFileIds=[],odFileId=0;
    	  for(var i=0;i<store.getCount();i++){
    	  odFileId= store.getAt(i).get('fileId');
    	  if(odFileId!=0)
    	  oldFileIds.push(odFileId);
    	  }
    	  if(oldFileIds.length>0){
    	   me.getView().down('form').lookupReference('orderFileType').allowBlank=true;
    	  var fileField= me.getView().down('form').lookupReference('attachment1');
    	  if(fileField)
    	      fileField.allowBlank=true;
    	  }
    	   var messageField=this.getView().down('#messageFieldItemId');
    	   form.setValues({"oldFileIds":oldFileIds});
    	    if(form.isValid()){
    	    	
    			form.submit({
    				url: applicationContext+'/rest/orders/attachments/1',
    		        getParams: function(useModelValues) {
    		            var fieldParams = this.form.getValues(false,true,false,true);
    		            return Ext.apply({}, fieldParams);
    		        },
    		        buildForm: function() {
    		            var me = this,
    		                fieldsSpec = [],
    		                formSpec, formEl,
    		                basicForm = me.form,
    		                params = me.getParams(),
    		                uploadFields = [],
    		                uploadEls = [],
    		                fields = basicForm.getFields().items,
    		                i,
    		                len = fields.length,
    		                field, key, value, v, vLen, el;
    		            for (i = 0; i < len; ++i) {
    		                field = fields[i];
    		                if (field.isFileUpload() && field.isDirty()) {
    		                    uploadFields.push(field);
    		                }
    		            }
    		            for (key in params) {
    		                if (params.hasOwnProperty(key)) {
    		                    value = params[key];
    		                    if (Ext.isArray(value)) {
    		                        vLen = value.length;
    		                        for (v = 0; v < vLen; v++) {
    		                            fieldsSpec.push(me.getFieldConfig(key, value[v]));
    		                        }
    		                    } else {
    		                        fieldsSpec.push(me.getFieldConfig(key, value));
    		                    }
    		                }
    		            }
    		            formSpec = {
    		                tag: 'form',
    		                role: 'presentation',
    		                action: me.getUrl(),
    		                method: me.getMethod(),
    		                target: me.target ? (Ext.isString(me.target) ? me.target : Ext.fly(me.target).dom.name) : '_self',
    		                style: 'display:none',
    		                cn: fieldsSpec
    		            };
    		            if (!formSpec.target) {
    		                Ext.Error.raise('Invalid form target.');
    		            }
    		            
    		            if (uploadFields.length) {
    		                formSpec.encoding = formSpec.enctype = 'multipart/form-data';
    		            }
    		            
    		            formEl = Ext.DomHelper.append(Ext.getBody(), formSpec);
    		            
    		            
    		            
    		            len = uploadFields.length;
    		            for (i = 0; i < len; ++i) {
    		                el = uploadFields[i].extractFileInput();
    		                formEl.appendChild(el);
    		                uploadEls.push(el);
    		            }
    		            return {
    		                formEl: formEl,
    		                uploadFields: uploadFields,
    		                uploadEls: uploadEls
    		            };
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
    }
    	    else{
    	    	Ext.getBody().unmask();
    	    	var message=messageField.setValue('Please fill valid entry in the field marked as mandatory <img src='+errorIcon+' width="15" height="15"></font>');
    	    	message.setVisible(true);
    		}
    },
    onAttachemnetChange:function(obj,value){
    	if(value!=null && value!=''){
    	Ext.getBody().mask('Loading......');
    	var form=this.getView();
		   var value=value.substring(value.lastIndexOf("\\"));
		    value=value.replace("\\"," ");
		    var extension=value.substring(value.lastIndexOf(".")+1);
		    	if(extension!='pdf'){
		    		obj.reset( );
		    		Ext.Msg.alert('',uploadOnlyPdfFileAlert);
		    		Ext.getBody().unmask();
		    		return false;
		    	}
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
       			anchor:'100%',
       			labelWidth : 200,
 		        labelSeparator : '',
 		        labelAlign:'right',
 		        listeners:{
    				 'change':'onAttachemnetChange'
    			 }
		   });
		   form.attachmentCount++;
		   this.insertFileInGrid(value,'Attachment',true,count);
		   obj.hide();
		   Ext.getBody().unmask();
    	}
	 },
	 insertFileInGrid:function(fileName,fileType,multiAllowed,i,id){
		 var AttachmentInfoGriditemId=this.getView().nextSibling('#AttachmentInfoGriditemId');
		 id = (Ext.isEmpty(id))?0:id;
			var store=AttachmentInfoGriditemId.store;
			if(store.storeId!='WebformStoreId'){
				var store = Ext.create('AOC.store.WebformStore',{
					storeId:'WebformStoreId',
					fields : [ 'fileName', 'fileType','fileId'],
					 data : [{
						 fileName : fileName,
						 fileType : fileType,
						 type:'new',
						 internalId:i,
						 fileId:id
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
						 internalId:i,
						 fileId:id
					 });
			}
	 },
	 onOrderFileChange:function(obj,value){
		 var value=value.substring(value.lastIndexOf("\\"));
		    value=value.replace("\\"," ");
		    if(value!=null && value!=''){
			    var extension=value.substring(value.lastIndexOf(".")+1);
			    if(obj.orderSchemaType=='Excel'){
			    	if(extension!='xls' && extension!='xlsx'){
			    		obj.reset( );
			    		Ext.Msg.alert('',uploadOnlyExcelFileAlert);
			    		return false;
			    	}
			    }
			    this.insertFileInGrid(value,'Order File Type',false);
		    }
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
	    			if(fileField){
	    				fileField.destroy();
	    				form.attachmentCount--;
	    			}
	    		}
	    		else{
	    			fileField=form.lookupReference('orderFileType');
	    			if(fileField)
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
			 this.getView().lookupReference('orderFileType').orderSchemaType=orderSchemaType;
			 if(!attachmentRequired){
				 this.getView().lookupReference('attachment1').hide();
			 }else{
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
			 //this.getView().lookupReference('attachment1').disable();
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
		 store.filterBy(function(record){
			 if(record.get('rboName')==newValue)
				 return true;
       });
		 productLineCombo.reset();
		 productLineCombo.enable();
		 }
		 Ext.getBody().unmask();
	 },
	 CancelDetails:function()
	 {
		 this.getView().down('form').reset();
		 var AttachmentInfoGriditemId=this.getView().down('#AttachmentInfoGriditemId');
	    	AttachmentInfoGriditemId.store.removeAll();
	    	AttachmentInfoGriditemId.getView().refresh();
		 var messageField=this.getView().down('#messageFieldItemId');
		 messageField.setValue('');
	 },
	 notifyByMessage : function(config){
     	var messageField=this.getView().down('#messageFieldItemId');
		var message=messageField.setValue('');
		    message.setVisible(false);
},
    backButton:function(){
    	var panel=this.getView().ownerCt;
        panel.getLayout().setActiveItem(1);
        var ordeQueueGrid=panel.down('#OrderQueueGridItemId');
        ordeQueueGrid.store.load();
        this.getView().destroy();
     }
});