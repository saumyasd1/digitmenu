Ext.define('AOC.view.webform.WebFormController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.webformcontroller',
    runTime : AOC.config.Runtime,
    fileArray:[],
    totalFileCount:0,
    
    resetWebOrderForm:function(){
    	var me = this,
    		refs= me.getReferences(),
    	    attachment = refs['attachment'],
    	    additionalDataFileKey = refs['additionalDataFileKey'],
    		webForm = refs['webform'],
    		webOrderAttachmentInfoGrid = refs['webOrderAttachmentInfoGrid'];
    	
    	refs['rboCombo'].reset();
    	refs['assignCSR'].reset();
    	refs['dataStructureCombo'].reset();
    	refs['email'].reset();
    	refs['subject'].reset();
    	refs['emailBody'].reset();
   	 	
   	 	webForm.orderFileAttachmentCount=1;
	 	webForm.attachmentCount =1;
   	 	me.fileArray = [];
   	 	
   	 	webOrderAttachmentInfoGrid.store.removeAll();
	 	webOrderAttachmentInfoGrid.getView().refresh();
	 	
	 	refs['orderFileType'].setDisabled(true);
	 	
	 	if(attachment){
    	 	attachment.hide();
    	 	additionalDataFileKey.hide();
    	    attachment.reset();
    	    additionalDataFileKey.reset();
   	 	}
    	
    },
    getRBOList:function(newValue){
    	var me = this,
    		view = me.getView(),
    		refs = me.getReferences();
    	
    	view.mask(AOCLit.pleaseWait);
    	
    	Ext.Ajax.request({
            async: false,
            url:applicationContext+'/rest/productLines/rbo/'+newValue,
            success:function(response){
            	var jsonData = JSON.parse(response.responseText),
            		store = Ext.create('Ext.data.JsonStore',{
        				fields:['id','rboName','site'],
        				data: jsonData
        			});
            	
            	refs['rboCombo'].bindStore(store);
            	refs['rboCombo'].enable();
            	if(view.rboId){
    				me.setValueInRBOCombo(view.rboId);
    			}
            	view.unmask();
            },
            failure:function(){
            	view.unmask();
            }
        });
    },
    onPartnerChange:function(obj, newValue){
    	var me = this,
    		refs = me.getReferences(),
    		webForm = refs['webform'],
			rboCombo = me.lookupReference('rboCombo'),
			dataStructureCombo = me.lookupReference('dataStructureCombo'),
    	    emailBody = me.lookupReference('emailBody');
    	
    	if(!Ext.isEmpty(newValue)){
    		emailBody.reset();
			dataStructureCombo.disable();
			
    		if(!webForm.isResubmit || !obj.isChangedForFirstTime){
    			me.resetWebOrderForm();
    		}
    		
    		me.getRBOList(newValue);
			
    	}else{
			dataStructureCombo.disable();
			rboCombo.disable();
    	}
    },
    setValueInRBOCombo:function(rboId){
    	var me = this,
			refs = me.getReferences(),
			rboCombo = refs['rboCombo'],
			index = rboCombo.store.find('id', rboId);
    	
		if(index != -1){
			rboCombo.setValue(rboId);
		}else{
			rboCombo.setValue('');
		}
    },
    
    getDataStructure:function(partnerId, newValue){
    	var me = this,
    		view = me.getView(),
    		refs = me.getReferences(),
			dataStructureCombo =refs['dataStructureCombo'];
    	
    	view.mask(AOCLit.pleaseWait);
    	Ext.Ajax.request({
            async: false,
            url: applicationContext+'/rest/productLines/getdatastructures/'+partnerId+'/'+newValue,
            success:function(response){
            	var jsonValue = Ext.decode(response.responseText),
	            	store =  Ext.create('Ext.data.Store',{
	    	    		fields:['id','dataStructureName','attachmentRequired','site'],
	    				data : jsonValue
	    	    	});
            	
            	if(AOCRuntime.getUser().role != '1'){
    		    	store.filter('site', AOCRuntime.getUser().siteId);
    			}
            	dataStructureCombo.bindStore(store);
            	dataStructureCombo.enable();
            	if(view.productLineId){
            		me.setProductLine(view.productLineId);
            	}
            	view.unmask();
            },
            failure:function(){
            	view.unmask();
            }
        });
    },
    setProductLine:function(productLineId){
    	var me = this,
			refs = me.getReferences(),
			dataStructureCombo =refs['dataStructureCombo'],
			store = dataStructureCombo.store,
    		index = store.find('id',productLineId);
    	
    	if(index != -1){
			dataStructureCombo.setValue(productLineId);
		}else{
			dataStructureCombo.setValue('');
		}
    },
	onRBOChange:function(obj, newValue){
		var me = this,
			refs = me.getReferences(),
			webForm = refs['webform'],
			dataStructureCombo = refs['dataStructureCombo'],
			partnerCombo = refs['partnerCombo'],
			partnerId = partnerCombo.getValue();
			
		if(!Ext.isEmpty(newValue)){
			me.getDataStructure(partnerId, newValue);
			
	    	if(!webForm.isResubmit || !obj.isChangedForFirstTime ){
	    		dataStructureCombo.reset();
   	    	 	obj.isChangedForFirstTime = false;
    		}
		 }else{
			 dataStructureCombo.disable();
		 }
	},
	
	onDataStructureSelection:function(cmp, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			store = cmp.getStore(),
			index = store.find('id', newValue),
			view = me.getView(),
			attachementField = me.lookupReference('attachment'),
			additionalDataFileKey = me.lookupReference('additionalDataFileKey'),
			assignCSRCombo = me.lookupReference('assignCSR'),
			enableFlag = false;
		
		var record = store.getById(newValue);
		if(record){
			assignCSRCombo.getStore().load({params:{siteId:record.get('site')}});
		}
			
		if(attachementField){
			if(!Ext.isEmpty(newValue) && index != -1){
				enableFlag = true;
				var record = store.getAt(index),
					attachmentRequired = record.get('attachmentRequired'),
					attachmentOptional = record.get('attachmentOptional');
					
				view.orderFileNameExtension = record.get('orderFileNameExtension');
				view.attachmentFileNameExtension_1 = record.get('attachmentFileNameExtension_1');
				
				attachementField[attachmentRequired ? 'show' : 'hide']();
				attachementField[attachmentRequired ? 'enable' : 'disable']();
				
				//jira issue #AOC-1035
				attachementField.allowBlank = (attachmentRequired && !record.get('optionalAttachment')) ? false : true;
				
				additionalDataFileKey[attachmentRequired ? 'show' : 'hide']();
				additionalDataFileKey[attachmentRequired ? 'enable' : 'disable']();
				
			 }else{
				view.orderFileNameExtension = null;
				view.attachmentFileNameExtension_1 = null;
				
				attachementField.hide();
				attachementField.disable();
				attachementField.allowBlank = true;
			}
			
			refs['assignCSR'][enableFlag ? 'enable' : 'disable']();
			refs['emailBody'][enableFlag ? 'enable' : 'disable']();
			refs['email'][enableFlag ? 'enable' : 'disable']();
			refs['subject'][enableFlag ? 'enable' : 'disable']();
			refs['orderFileType'][enableFlag ? 'enable' : 'disable']();
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
			var url=applicationContext+'/rest/emailqueue/newweborder',
				oldOrderId = webOrderFormView.down('#oldOrderId').getValue();
			
			var fieldParams = form.getValues(false,false,false,true),
				assignCsrSelection = refs['assignCSR'].selection["data"];
			
			fieldParams.siteId = assignCsrSelection.siteId;
			fieldParams.systemCsrCode = assignCsrSelection.csrCode;
			
			if(webOrderFormView.isResubmit){
				fieldParams.isResubmit = 'true';
			}
			fieldParams.lastModifiedBy = Helper.setLastModifiedBy();
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
	    	formData.append('lastModifiedBy',Helper.setLastModifiedBy());
	    	
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
	    					me.goToEmailQueueScreen(emailQueueId);
	        			}else{
	        				console.log('File Uploaded');
		        			me.uploadFiles(emailQueueId, filePath);
	        			}
        			break;
	        	}
	        }
    	}else{
    		Helper.resetWebOrderForm(me.getView());
			webOrderFormView.resetFormFields();
    		Ext.getBody().unmask();
    		me.goToEmailQueueScreen(emailQueueId);
    	}
    },
    goToEmailQueueScreen:function(emailQueueId){
    	Ext.Msg.show({
		    title:'Go To Email Screen',
		    message: 'Do you want to go to Email Screen to see <b>Email# '+emailQueueId+'</b> ?',
		    buttons: Ext.Msg.YESNO,
		    icon: Ext.Msg.QUESTION,
		    fn: function(btn) {
		        if (btn === 'yes') {
		        	Helper.changeScreen('emailmanagement', AOCLit.tablist.emailQueueTabIndex);
		        } 
		    }
		});
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
				form.attachmentCount--;
			}
			else{
				if(form.isResubmit){
					form.down('#oldOrderFileDeleted').setValue(true);
				}
				form.orderFileAttachmentCount--;
				if(form.orderFileAttachmentCount == 1){
					orderFileType = view.lookupReference('orderFileType');
					orderFileType.allowBlank = false;
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
		me.fileArray =[];
		webOrderAttachmentInfoGrid.store.removeAll();
		webOrderAttachmentInfoGrid.getView().refresh();
	},
    backButton:function(){
    	var con = AOC.app.getController('MenuController');
    	con.changeTabPanel(3);
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
	},
	onAfterRenderCSRList: function(obj){
	   obj.getStore().load();
	},
	onAfterRenderPartner: function(combo){
		Helper.getPartnerListBySiteId(combo);
	}
});
