Ext.define('AOC.view.webform.WebFormController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.webFormMain',
  
    runTime : AOC.config.Runtime,
    fileArray:[],
    totalFileCount:0,
    onPartnerChange:function(obj, newValue){
    	var me = this,
			rboCombo = me.lookupReference('rboCombo'),
			dataStructureCombo = me.lookupReference('dataStructureCombo'),
    	    email = me.lookupReference('email'),
    	    subject = me.lookupReference('subject'),
    	    emailBody = me.lookupReference('emailBody'),
    	    orderFileType = me.lookupReference('orderFileType'),
    	    attachment = me.lookupReference('attachment'),
    	    additionalDataFileKey = me.lookupReference('additionalDataFileKey');
			
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
   	    	 	webOrderAttachmentInfoGrid.store.removeAll();
   	    	 	webOrderAttachmentInfoGrid.getView().refresh();
   	    	 	orderFileType.setDisabled(true);
   	    	 	if(attachment){
	   	    	 	attachment.hide();
	   	    	 	additionalDataFileKey.hide();
	   	    	    attachment.reset();
	   	    	    additionalDataFileKey.reset();
   	    	 	}
    		}
    		emailBody.reset();
			dataStructureCombo.disable();
			rboCombo.bindStore(store);
			
			if(me.getView().rboId){
				var index = store.find('id',me.getView().rboId);
				if(index != -1){
					rboCombo.setValue(me.getView().rboId);
				}else{
					rboCombo.setValue('');
				}
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
	    		var index = store.find('id',me.getView().productLineId);
				if(index != -1){
					dataStructureCombo.setValue(me.getView().productLineId);
				}else{
					dataStructureCombo.setValue('');
				}
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
			attachementField = me.lookupReference('attachment'),
			additionalDataFileKey = me.lookupReference('additionalDataFileKey');
			
		if(attachementField){
			if(!Ext.isEmpty(newValue) && index != -1){
				var record = store.getAt(index),
					attachmentRequired = record.get('attachmentRequired');
					
				view.orderFileNameExtension = record.get('orderFileNameExtension');
				view.attachmentFileNameExtension_1 = record.get('attachmentFileNameExtension_1');
				
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
		var me = this,
			view = me.getView(),
			refs = me.getReferences(),
			webOrderForm = me.lookupReference('webform'),
			orderFileTypeCont = refs.orderFileTypeCont;
		
		var file = obj.getEl().down('input[type=file]').dom.files[0];
		if(!file){
			return;
		}
		file.fileContentType ='Order';
		
		value = value.replace("\\"," ");
		if(!Ext.isEmpty(value)){
			var extension=value.substring(value.lastIndexOf(".")+1);
			if(!Ext.isEmpty(view.orderFileNameExtension)){
				if(view.orderFileNameExtension.toLowerCase().indexOf(extension.toLowerCase())==-1){
					obj.reset();
					Ext.Msg.alert('','Please attach only ' +view.orderFileNameExtension +' type of files');
					return false;
				}else{
					if(view.down('#weborderformItemId').isResubmit){
						view.down('#oldOrderFileDeleted').setValue(true);
					}
					if(webOrderForm.isResubmit){
						var fileId = me.totalFileCount++,
							len = me.fileArray.length;
						
		    			file.fileId = fileId;
		    			for(var i=0;i<len;i++){
		    				if(me.fileArray[i].fileContentType == 'Order'){
		    					me.fileArray.splice(i, 1);
		    					break;
		    				}
		    			}
		    			me.fileArray.push(file); 
						me.insertFileInGrid(value,'Order File Type',false, fileId);
						obj.reset();
						obj.allowBlank=true;
					}else{
			    		if(webOrderForm.orderFileAttachmentCount <= webOrderForm.maximumOrderFileCount){
			    			var fileId = me.totalFileCount++;
			    			file.fileId = fileId;
			    			me.fileArray.push(file); 
							me.insertFileInGrid(value,'Order File Type',true, fileId);
							webOrderForm.orderFileAttachmentCount++;
							obj.reset();
							obj.allowBlank=true;
			    		}else{
			    			Ext.Msg.alert(AOCLit.warningTitle,'You can upload only'+webOrderForm.maximumOrderFileCount+' order file.')
							obj.reset();
			    		}
					}
				}
			}else{
				obj.reset();
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
			attachment = refs.attachment,
			oldAdditionalFileId = refs.oldAdditionalFileId,
			oldFileIds = [],
			odFileId = 0;
		
		var len = store.getCount();
		for(var i = 0; i < len; i++){
			odFileId= store.getAt(i).get('fileId');
			if(odFileId!=0){
				oldFileIds.push(odFileId);
			}
		}
		if(oldAdditionalFileId.getValue().length>0){
			attachment.allowBlank = true;
		}
		if(oldFileIds.length>0){
			orderFileType.allowBlank = orderFileType ? true : '';
		}
		
		form.setValues({"oldFileIds":oldFileIds});
		if(form.isValid()){
			var url='',
				oldOrderId = webOrderFormView.down('#oldOrderId').getValue();
			
			if(webOrderFormView.isResubmit){
				url=applicationContext+'/rest/emailqueue/newweborder';
			}else{
				url=applicationContext+'/rest/emailqueue/newweborder';
			}
			var fieldParams = form.getValues(false,false,false,true);
			if(webOrderFormView.isResubmit){
				fieldParams.isResubmit = 'true';
			}
			Ext.getBody().mask(AOCLit.pleaseWait);
			Ext.Ajax.request({
				url:url,
				jsonData:fieldParams,
				success:function(response){
					var data = JSON.parse(response.responseText);
					me.uploadFiles(data.emailQueueId, data.filePath);
				},
				failure:function(action){
					Ext.getBody().unmask();
				}
			});
			
		}else{
			Ext.getBody().unmask();
			Helper.showToast('validation', AOCLit.fillMandatoryFieldMsg);
		}
    },
    uploadFiles:function(emailQueueId, filePath){
    	var me = this;
    		refs = me.getReferences(),
    		webOrderFormView = refs.webform,
    		form = webOrderFormView.getForm(),
    		xhttp = new XMLHttpRequest(),
    		fileArray = this.fileArray,
    		formData = new FormData(),
    		url =applicationContext+'/rest/emailqueue/fileupload',
    		values = form.getValues(),
    		len = fileArray.length;
    		
    	if(fileArray.length > 0){
	    	formData.append('file',fileArray[len-1]);
	    	formData.append('emailQueueId', emailQueueId);
	    	formData.append('fileName', fileArray[len-1].name);
	    	formData.append('filePath', filePath);
	    	formData.append('dataStructureName', values.dataStructureName);
	    	formData.append('additionalDataFileKey', fileArray[len-1].additionalDataFileKey ? fileArray[len-1].additionalDataFileKey:'');
	    	formData.append('fileContentType', fileArray[len-1].fileContentType);
	    	formData.append('oldOrderId', values.oldOrderId);
	    	if(webOrderFormView.isResubmit){
	    		formData.append('isResubmit', 'true');
			}
	    	if(fileArray.length == 1){
	    		formData.append('sendAcknowledgementFlag', 'true');
	    	}else{
	    		formData.append('sendAcknowledgementFlag', 'false');
	    	}
	    	
	    	formData.append('email', values.email);
	    	
	        xhttp.onreadystatechange = function() {
	            (4 === xhttp.readyState) && uploadDone(xhttp);
	        };
	   
	        xhttp.open("POST", url, true);
	        xhttp.send(formData);
	        
	        function uploadDone(xhttp){
	        	switch(xhttp.status){
	        		case 200:
	        			fileArray.pop();
	        			if(fileArray.length == 0){
	        				Helper.resetWebOrderForm(me.getView());
	    					webOrderFormView.resetFormFields();
	    					me.totalFileCount = 0;
	    					Ext.getBody().unmask();
	        			}else{
	        				console.log('File Uploaded');
		        			me.uploadFiles(emailQueueId, filePath);
	        			}
	        			break;
	        	}
	        }
    	}else{
    		Ext.getBody().unmask();
    	}
    },
    onAttachmentChange:function(obj, value){
    	if(!Ext.isEmpty(value)){
			var me = this,
				webOrderForm = me.lookupReference('webform'),
				additionalDataFileKey = me.lookupReference('additionalDataFileKey'),
				view = me.getView();
			
			var file =obj.getEl().down('input[type=file]').dom.files[0];
			if(!file){return;}
			
			file.fileContentType ='AdditionalData';
			file.additionalDataFileKey = additionalDataFileKey.getValue();
			
			var value = value.substring(value.lastIndexOf("\\"));
		    value = value.replace("\\"," ");
			
		    var extension = value.substring(value.lastIndexOf(".")+1);
			
		    if(!Ext.isEmpty(view.attachmentFileNameExtension_1)){
		    	if(view.attachmentFileNameExtension_1.toLowerCase().indexOf(extension.toLowerCase())==-1){
		    		obj.reset();
		    		Ext.getBody().unmask();
		    		Ext.Msg.alert(AOCLit.warningTitle,'Please attach only ' +view.attachmentFileNameExtension_1 +' type of files');
		    		return false;
		    	}else{
		    		if(webOrderForm.attachmentCount <= webOrderForm.maxAttachmentCount){
		    			var fileId = me.totalFileCount++;
		    			file.fileId = fileId;
		    			me.fileArray.push(file); 
						this.insertFileInGrid(value, 'Attachment', true, fileId, additionalDataFileKey.getValue());
						obj.reset();
						obj.allowBlank=true;
						additionalDataFileKey.reset();
						webOrderForm.attachmentCount++;
					}else{
						Ext.Msg.alert(AOCLit.warningTitle,'You can upload only'+webOrderForm.maxAttachmentCount+' attachment.')
						obj.reset();
						additionalDataFileKey.reset();
					}
		    	}
		    }else{
			    	obj.reset();
			    	Ext.Msg.alert(AOCLit.warningTitle,'Attachment File Extension is not defined for this productline. Please configure the productline correctly before proceding.');
		    		return false;
		    }
    	}
	},
	insertFileInGrid:function(fileName, fileType, multiAllowed, id, additionalDataFileKey){
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
				fileName: fileName,
				fileType: fileType,
				type:'new',
				fileId:id,
				additionalDataFileKey:additionalDataFileKey
			});
		}
	 },
	
	 onAttachmentGridCellClick:function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		 var el = Ext.get(e.target);
		 if(el.hasCls('deleteClass')){
			var view = this.getView(),
				form = view.lookupReference('webform'),
				fileType = record.get('fileType'),
				webOrderAttachmentInfoGrid = view.lookupReference('webOrderAttachmentInfoGrid'),
				store = webOrderAttachmentInfoGrid.store;
				
			if(fileType == 'Attachment'){
				if(form.isResubmit){
					var fileIdValue = form.down('#oldAdditionalFileId').getValue(),
						fileIdArray = fileIdValue.split(','),
						len = fileIdArray.length;
					
					for(var i = 0; i < len; i++){
						if(record.get('fileId') == fileIdArray[i]){
							fileIdArray.pop();
							break;
						}
					}
					form.down('#oldAdditionalFileId').setValue(fileIdArray.join(','));
				}
			}
			else{
				if(form.isResubmit){
					form.down('#oldOrderFileDeleted').setValue(true);
				}
			}
			store.remove(record);
			this.removeFileFromFileArray(record.get('fileId'));
			webOrderAttachmentInfoGrid.getView().refresh();
		}
	},
	removeFileFromFileArray:function(id){
		var me = this,
			len = me.fileArray.length;
		
		for(var i = 0; i<len; i++){
			if(me.fileArray[i].fileId == id){
				me.fileArray.splice(i,1);
				me.totalFileCount--;
				break;
			}
		}
	},
	onCancelBtnClick:function(){
		var me = this,
			refs = me.getReferences()
			webOrderForm = refs.webform,
			webOrderAttachmentInfoGrid = refs.webOrderAttachmentInfoGrid;
		
		Helper.resetWebOrderForm(me.getView());
		webOrderForm.resetFormFields();
		webOrderAttachmentInfoGrid.store.removeAll();
		webOrderAttachmentInfoGrid.getView().refresh();
	},
	notifyByMessage: function(config){
	},
    backButton:function(){
    	var con = AOC.app.getController('MenuController');
		con.selectCard('orderqueueview');
		con.selectMenuItem('orderqueueview');
	},
     
	onAdditionalDataKeyCellChange:function(editor, context){
		var view = this.getView(),
			record = context.record,
			attachmentField = view.lookupReference('attachment'), 
			additionalDataFileKey = view.lookupReference('additionalDataFileKey');
		
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
