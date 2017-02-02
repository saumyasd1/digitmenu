Ext.define('AOC.view.webform.WebFormController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.webFormMain',
  
    runTime : AOC.config.Runtime,
    hideAndDestroyAttachmentField:function(){
    	var me = this,
    		refs = me.getReferences(),
    		form = refs.webform,
    		i = form.attachmentCount,
    		currentAttachment;
    		
    	for(var j=2;j<=i;j++){
    		currentAttachment=form.queryById('attachment'+j),
    		additionalDataFileKey=form.queryById('additionalDataFileKey'+j);
    		if(currentAttachment){
    			currentAttachment.destroy();
    			if(additionalDataFileKey){
    				additionalDataFileKey.destroy();
				}
    		}
    	}
    	form.attachmentCount = 1;
    },
    onPartnerChange:function(obj, newValue){
    	var me = this,
			rboCombo = me.lookupReference('rboCombo'),
			dataStructureCombo = me.lookupReference('dataStructureCombo'),
    	    email = me.lookupReference('email'),
    	    subject = me.lookupReference('subject'),
    	    emailBody = me.lookupReference('emailBody'),
    	    orderFileType = me.lookupReference('orderFileType'),
    	    attachment1 = me.lookupReference('attachment1'),
    	    additionalDataFileKey1 = me.lookupReference('additionalDataFileKey1');
			
    	if(!Ext.isEmpty(newValue)){
	    	var store = null;
	        var response = Ext.Ajax.request({
	            async: false,
	            url:applicationContext+'/rest/productLines/rbo/'+newValue
	        });
	      	var jsonValue = Ext.decode(response.responseText);
			store = Ext.create('Ext.data.ArrayStore',{
				fields:['id','rboName'],
				data: jsonValue
			});
    		if(!this.getView().down('#weborderformItemId').isResubmit || !obj.isChangedForFirstTime){
    			var refs = this.getReferences(),
	    			webOrderFormView = refs.webform,
	    			form = webOrderFormView.getForm(),
	    			webOrderAttachmentInfoGrid = refs.webOrderAttachmentInfoGrid;
    			
    			rboCombo.reset();
   	    	 	dataStructureCombo.reset();
   	    	 	email.reset();
   	    	 	subject.reset();
   	    	 	emailBody.reset();
   	    	 	orderFileType.reset();
   	    	 	webOrderAttachmentInfoGrid.store.removeAll();
   	    	 	webOrderAttachmentInfoGrid.getView().refresh();
   	    	 	orderFileType.setDisabled(true);
   	    	 	
   	    	 	attachment1.hide();
   	    	 	additionalDataFileKey1.hide();
   	    	    attachment1.reset();
   	    	    additionalDataFileKey1.reset();
   	    	 	obj.isChangedForFirstTime=false;
   	    	 	me.hideAndDestroyAttachmentField();
    		}
    		
			dataStructureCombo.disable();
			rboCombo.bindStore(store);
			
			if(me.getView().rboId){
				rboCombo.setValue(me.getView().rboId);
			}
			rboCombo.enable();
    	}else{
			dataStructureCombo.disable();
			rboCombo.disable();
    	}
    },
	onRBOChange:function(obj,newValue){
		var me = this,
			dataStructureCombo = me.lookupReference('dataStructureCombo'),
			partnerCombo = me.lookupReference('partnerCombo'),
			partnerId = partnerCombo.getValue();
			
		 if(newValue !=null && newValue!=''){
			 Ext.getBody().mask('Loading....');
			
			 var response = Ext.Ajax.request({
		            async: false,
		            url: applicationContext+'/rest/productLines/getdatastructures/'+partnerId+'/'+newValue
		        });
			var jsonValue=Ext.decode(response.responseText);
	    	store =  Ext.create('Ext.data.Store',{
	    		fields:['id','dataStructureName','attachmentRequired'],
				data : jsonValue
	    	});
			
	    	if(!this.getView().down('#weborderformItemId').isResubmit || !obj.isChangedForFirstTime  ){
	    		dataStructureCombo.reset();
   	    	 	obj.isChangedForFirstTime=false;
    		}
	    	dataStructureCombo.bindStore(store);
	    	dataStructureCombo.enable();
	    	if(me.getView().productLineId){
	    		dataStructureCombo.setValue(me.getView().productLineId);
			}
		 }else{
			 dataStructureCombo.disable();
		 }
		 Ext.getBody().unmask();
	},
	onDataStructureSelection:function(cmp,newValue){
		var me = this,
			store = cmp.getStore(),
			index = store.find('id', newValue),
			view = me.getView(),
			//attachmentCount = view.attachmentCount,
			attachementField = me.lookupReference('attachment1'),
			additionalDataFileKey = me.lookupReference('additionalDataFileKey1');
			
		if(attachementField){
			if(!Ext.isEmpty(newValue) && index != -1){
				var record = store.getAt(index),
					attachmentRequired = record.get('attachmentRequired');
					
				view.orderFileNameExtension = record.get('orderFileNameExtension');
				view.attachmentFileNameExtension_1 = record.get('attachmentFileNameExtension_1');
				if(attachmentRequired){
					me.hideAndDestroyAttachmentField();
				}
				attachementField[attachmentRequired ? 'show' : 'hide']();
				attachementField[attachmentRequired ? 'enable' : 'disable']();
				attachementField.allowBlank = attachmentRequired ? false : true;
				additionalDataFileKey[attachmentRequired ? 'show' : 'hide']();
				additionalDataFileKey[attachmentRequired ? 'enable' : 'disable']();
			 
				view.lookupReference('emailBody').enable();
				view.lookupReference('email').enable();
				view.lookupReference('subject').enable();
				view.lookupReference('orderFileType').enable();
			 }else{
				view.lookupReference('subject').disable();
				view.lookupReference('emailBody').disable();
				view.lookupReference('email').disable();
				view.lookupReference('subject').disable();
				view.orderFileNameExtension=null;
				view.attachmentFileNameExtension_1=null;
				attachementField.hide();
				attachementField.disable();
				attachementField.allowBlank = true;
			}
		}
	},

	onOrderFileChange:function(obj, value, eOpts){
		value = value.substring(value.lastIndexOf("\\"));
		var view = this.getView();
		value = value.replace("\\"," ");
		if(!Ext.isEmpty(value)){
			var extension=value.substring(value.lastIndexOf(".")+1);
			if(!Ext.isEmpty(view.orderFileNameExtension)){
				if(view.orderFileNameExtension.toLowerCase().indexOf(extension.toLowerCase())==-1){
					obj.reset( );
					Ext.Msg.alert('','Please attach only ' +view.orderFileNameExtension +' type of files');
					return false;
				}else{
					if(view.down('#weborderformItemId').isResubmit){
						view.down('#oldOrderFileDeleted').setValue(true);
					}
					this.insertFileInGrid(value,'Order File Type',false,null);
				}
			}else{
				obj.reset( );
				Ext.Msg.alert('','Order File Extension is not defined for this productline. Please configure the productline correctly before proceding.');
				return false;
			}
		}
	},
	onSaveBtnClick:function(obj){
		var me = this,
			refs = this.getReferences(),
			webOrderFormView = refs.webform,
			form = webOrderFormView.getForm(),
			webOrderAttachmentInfoGrid = refs.webOrderAttachmentInfoGrid,
			store = webOrderAttachmentInfoGrid.store,
			orderFileType = refs.orderFileType,
			//attachmentField = refs.attachmentField,
			//additionalDataFileKeyField = refs.additionalDataFileKeyField,
			oldFileIds = [],
			odFileId = 0,
			messageField = this.getView().down('#messageFieldItemId');
		
		var len = store.getCount();
		for(var i = 0; i < len; i++){
			odFileId= store.getAt(i).get('fileId');
			if(odFileId!=0){
				oldFileIds.push(odFileId);
			}
		}
		if(oldFileIds.length>0){
			orderFileType.allowBlank = true;
		}
		
		form.setValues({"oldFileIds":oldFileIds});
		if(form.isValid()){
			var url='',
				oldOrderId = webOrderFormView.down('#oldOrderId').getValue();
			
			if(webOrderFormView.isResubmit){
				url=applicationContext+'/rest/orders/attachments/'+oldOrderId;
			}else{
				url=applicationContext+'/rest/emailqueue/createweborder';
			}
			form.submit({
				url: url,
				getParams: function(useModelValues) {
					var fieldParams = this.form.getValues(false,false,false,true);
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
					Ext.Msg.alert('Success', AOCLit.webSubmissionSuccesFulMsg);
					Helper.resetWebOrderForm(me.getView());
					orderFileType.setDisabled(true);
					Ext.getBody().unmask();
				},
				failure : function(form, action) {
					Ext.Msg.alert('Failed', action.result.message);
					Ext.getBody().unmask();
				}
			});
		}else{
			Ext.getBody().unmask();
			var message=messageField.setValue(AOCLit.fillMandatoryFieldMsg);
			message.setVisible(true);
		}
    },
    onAttachmentChange:function(obj, value){
    	if(!Ext.isEmpty(value)){
			var me = this,
				webOrderForm = me.lookupReference('webform'),
				view = me.getView();
				
			var value = value.substring(value.lastIndexOf("\\"));
		    value = value.replace("\\"," ");
			
		    var extension = value.substring(value.lastIndexOf(".")+1);
			
		    if(!Ext.isEmpty(view.attachmentFileNameExtension_1)){
		    	if(view.attachmentFileNameExtension_1.toLowerCase().indexOf(extension.toLowerCase())==-1){
		    		obj.reset( );
		    		Ext.getBody().unmask();
		    		Ext.Msg.alert(AOCLit.warningTitle,'Please attach only ' +view.attachmentFileNameExtension_1 +' type of files');
		    		return false;
		    	}else{
		    		var count=obj.name.replace('attachment','');
		    		var i=parseInt(count)+1;
		    		var additionalDataFileKey= me.lookupReference('additionalDataFileKey'+count);
		    		if(webOrderForm.attachmentCount <= webOrderForm.maxAttachmentCount){
			    		webOrderForm.add({
							xtype:'fieldcontainer',
							layout:'hbox',
							flex:1,
							scope:me,
							margin:'0 0 5 0',
							defaults:{
								labelSeparator:'',
								labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
								labelAlign:AOC.config.Settings.form.defaultLabelAlign,
								labelWidth:150
							},
							items:[
								{   
									xtype:'textfield',
									name: 'additionalDataFileKey'+i,
									reference: 'additionalDataFileKey'+i,
									fieldLabel:'Additional DataFile Key',
									itemId:'additionalDataFileKey'+i,
									flex:1.8,
									scope:me,
									listeners:{
										'focus': 'notifyByMessage'
									 }
								},
								{
									xtype:'fileuploadfield',
									name: 'attachment'+i,
									reference: 'attachment'+i,
									fieldLabel:'Attachments',
									itemId:'attachment'+i,
									allowBlank: true,
									flex:1.8,
									margin:'0 0 0 10',
									scope:me,
									listeners:{
										'change':'onAttachmentChange'
									}
								},
								{
									xtype:'box',
									flex:0.3,
									html:''
								}
							]
						});
		    		
						//webOrderForm.totalAttachmentCount++;
						webOrderForm.attachmentCount++;
						this.insertFileInGrid(value, 'Attachment', true, count, null, additionalDataFileKey.getValue());
						obj.hide();
						additionalDataFileKey.hide();
					}else{
						Ext.Msg.alert(AOCLit.warningTitle,'You can upload only'+webOrderForm.maxAttachmentCount+' attachment.')
						obj.reset();
						additionalDataFileKey.reset();
						obj.hide();
						additionalDataFileKey.hide();
					}
		    	}
		    }else{
			    	obj.reset( );
			    	Ext.Msg.alert(AOCLit.warningTitle,'Attachment File Extension is not defined for this productline. Please configure the productline correctly before proceding.');
		    		return false;
		    }
    	}
	},
	insertFileInGrid:function(fileName,fileType,multiAllowed,i,id,additionalDataFileKey){
		var me = this,
			webOrderAttachmentInfoGrid = me.lookupReference('webOrderAttachmentInfoGrid'),
			id = (Ext.isEmpty(id)) ? 0 : id,
			store = webOrderAttachmentInfoGrid.store;
			
		if(store.storeId!='WebformStoreId'){
			store = Ext.create('AOC.store.WebformStore',{
				storeId:'WebformStoreId',
				fields : [ 'fileName', 'fileType','fileId'],
				data : [{
					fileName : fileName,
					fileType : fileType,
					type:'new',
					internalId:i,
					fileId:id,
					additionalDataFileKey:additionalDataFileKey
				}]
			});
			webOrderAttachmentInfoGrid.bindStore(store);
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
				fileId:id,
				additionalDataFileKey:additionalDataFileKey
			});
		}
	 },
	
	 onAttachmentGridCellClick:function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		if(e.target.className=='deleteClass'){
			Ext.getBody().mask('Deleting...');
			var view = this.getView(),
				form = view.lookupReference('webform'),
				internalId=record.get('internalId'),
				fileType=record.get('fileType'),
				attachmentFileField,
				webOrderAttachmentInfoGrid = view.lookupReference('webOrderAttachmentInfoGrid'),
				store=webOrderAttachmentInfoGrid.store;
				attachmentFileField = view.lookupReference('attachment'+internalId);
				
			if(fileType == 'Attachment'){
				var additionalDataFileKey = view.lookupReference('additionalDataFileKey'+internalId);
				if(attachmentFileField){
					attachmentFileField.destroy();
					additionalDataFileKey.destroy();
				}
			}
			else{
				if(form.isResubmit){
					form.down('#oldOrderFileDeleted').setValue(true);
					
				}
				if(attachmentFileField){
					attachmentFileField.reset();
				}
			}
			store.remove(record);
			webOrderAttachmentInfoGrid.getView().refresh();
			Ext.getBody().unmask();
		}
	},
	 
	onCancelBtnClick:function(){
		var me = this,
			refs = me.getReferences()
			webOrderForm = refs.webform,
			webOrderAttachmentInfoGrid = refs.webOrderAttachmentInfoGrid;
			
		webOrderForm.resetFormFields();
		webOrderAttachmentInfoGrid.store.removeAll();
		webOrderAttachmentInfoGrid.getView().refresh();
		var messageField = this.getView().down('#messageFieldItemId');
		messageField.setValue('');
	},
	notifyByMessage: function(config){
     	var messageField=this.getView().down('#messageFieldItemId');
		var message = messageField.setValue('');
		message.setVisible(false);
	},
    backButton:function(){
    	var con = AOC.app.getController('MenuController');
		con.selectCard('orderqueueview');
		con.selectMenuItem('orderqueueview');
	},
     
	onAdditionalDataKeyCellChange:function(editor, context){
		var view = this.getView(),
			record = context.record,
			internalId = record.get('internalId'),
			attachmentField = view.lookupReference('attachment'+internalId), 
			additionalDataFileKey = view.lookupReference('additionalDataFileKey'+internalId);
		
		//context.record.commit();
		if(additionalDataFileKey){
			additionalDataFileKey.setValue(context.value);
			//attachmentField.setValue(record.get('fileName'));
		}
	},
	beforeEditorShow:function(editor,context){
		view=this.getView(),
			record = context.record,
			fileType = record.get('fileType');
			
		if(fileType=='Order File Type'){
			return false;
		}
	}
});
