Ext.define('AOC.view.workinstruction.WIFormController',{
	extend:'Ext.app.ViewController',
	alias:'controller.wiformcontroller',
	fileArray:[],
	aocFieldAttachArray :[],
	maxFileCount:6,
	totalCount:1,
	//Back button click
	onBackBtnClick:function(btn){
		var view = this.getView();
		var parentCont = view.up('wicontainer');
		parentCont.getLayout().setActiveItem(0);
		parentCont.getLayout().getActiveItem().store.load();
	},
	config: {
        listen: {
        	store: {
        		'#wiSystemStore': {
        			load: 'onSystemGridStoreLoad'
        		},
        		'#wiOrgStore':{
        			load:'onOrgLevelStoreLoad'
        		}
    		}
        }
    },
    onWiFormAfterRender:function(wiForm){
    	wiForm.getEl().on('click',this.onWiFormElClick,this);
    },
    onWiFormElClick:function(e, target){
    	var me = this,
    		refs = me.getReferences(),
    		el = Ext.get(target);
    	
    	if(el.hasCls('delete-file')){
    		var fileName = el.getAttribute('fileName'),
    			fileType = el.getAttribute('fileType'),
    			fPath = el.getAttribute('filePath'),
    			filePath = fPath+'/'+fileName,
    			fileId = el.getAttribute('fileId'),
    			parent = el.parent('.file-box'),
    			mainCont = parent.parent().component;
    		
    		//var orderFileImageContainer = refs.orderFileImageContainer;
    		
    		if(AOCRuntime.getCurrentWiMode() == 'edit'){
    			mainCont.remove(Ext.get(parent).component);
    			this.deleteFile(filePath, fileId);
    		}
    		else if(AOCRuntime.getCurrentWiMode() == 'add'){
    			mainCont.remove(Ext.get(parent).component);
    			this.removeFileFromFileArray(fileName);
    		}
    	}else if(el.hasCls('download-attachment-link')){
    		var fileName = el.getAttribute('fileName'),
				fPath = el.getAttribute('filePath'),
				filePath = fPath+'/'+fileName;
    		
    		this.downloadFile(filePath);
    	}else if(el.hasCls('view-image-preview')){
			var filePath = el.getAttribute('filePath');
			this.showImagePreview(filePath);
    	}
    },
    downloadFile:function(filePath){
		var form = Ext.create('Ext.form.Panel', { 
			standardSubmit: true,   
			url : applicationContext+'/rest/wifiles/download' ,
			
		});
		form.submit({
			getParams: function() {
				return Ext.apply({}, {filePath:encodeURIComponent(filePath)});
			},
			method : 'GET'
		});
    },
    deleteFile:function(filePath, fileId){
    	Ext.Ajax.request({
    		method:'GET',
    		url:applicationContext+'/rest/wifiles/delete',
    		params:{filePath:encodeURIComponent(filePath), id:fileId.toString()},
    		success:function(response){
    			var data = JSON.parse(response.responseText);
    			Helper.showToast('success',data.message);
    		},
    		failure:function(msg){
    			Helper.showToast('failure', msg);
    		}
    	})
    },
    removeFileFromFileArray:function(fileName){
    	var me = this,
    		fileArray = me.fileArray,
    		len = fileArray.length;
    	
    	for(var i=0; i<len; i++){
    		if(fileArray[i].name === fileName){
    			fileArray.splice(i, 1);
    			break;
    		}
    	}
    },
    
	//Order File section
	onOrderRadioChange:function(field, newValue, oldValue){
		var me = this;
		if(newValue.orderFileType == 2){
			me.showHideOrderTextExcelField(true);
		}else{
			me.showHideOrderTextExcelField(false);
		}
	},
	showHideOrderTextExcelField:function(showFlag){
		var me = this,
			refs = this.getReferences(),
			orderTextFirstLastPage = refs.orderTextFirstLastPage,
			orderTextPosition = refs.orderTextPosition,
			orderExcelCell = refs.orderExcelCell,
			orderExcelSheet = refs.orderExcelSheet;
		
		orderTextFirstLastPage[showFlag ? 'hide' : 'show']();
		orderTextPosition[showFlag ? 'hide' : 'show']();
		orderExcelCell[showFlag ? 'show' : 'hide']();
		orderExcelSheet[showFlag ? 'show' : 'hide']();
	},
	//End of Order File section
	
	//Attachment section
	onAttachmentRadioChange:function(field, newValue, oldValue){
		var me = this;
		if(newValue.attachmentFileType == 2){
			me.showHideAttachmentTextExcelField(true);
		}else{
			me.showHideAttachmentTextExcelField(false);
		}
	},
	showHideAttachmentTextExcelField:function(showFlag){
		var me = this,
			refs = this.getReferences(),
			attachmentTextFirstLastPage = refs.attachmentTextFirstLastPage,
			attachmentTextPosition = refs.attachmentTextPosition,
			attachmentExcelCell = refs.attachmentExcelCell,
			attachmentExcelSheet = refs.attachmentExcelSheet;
		
		attachmentTextFirstLastPage[showFlag ? 'hide' : 'show']();
		attachmentTextPosition[showFlag ? 'hide' : 'show']();
		attachmentExcelCell[showFlag ? 'show' : 'hide']();
		attachmentExcelSheet[showFlag ? 'show' : 'hide']();
	},
	
	//End of Attachment section
	
	onWiSubmitBtnClick:function(btn){
		var me = this;
		Ext.Msg.show({
		    title:'Submit WI',
		    message: 'Make sure that you have save all changes before submit WI form.All unsaved changes will be lost afte submit.',
		    buttons: Ext.Msg.YESNO,
		    icon: Ext.Msg.QUESTION,
		    fn: function(btn) {
		        if (btn === 'yes') {
		        	me.submitWIForm();
		        } 
		    }
		});
	},	
	submitWIForm:function(){
		if(AOCRuntime.getCurrentWiMode() != 'add'){
			var me = this,
				refs = me.getReferences(),
				wiFormPanel = refs.wIForm,
				form = wiFormPanel.getForm(),
				values = form.getValues(),
				userInfo = AOCRuntime.getUser();
			
			
			 if(Ext.isEmpty(values.status)){
				Helper.showToast('validation', 'Please select Status before submit form.');
				return;
			}else if(Ext.isEmpty(values.assignee)){
				Helper.showToast('validation', 'Please select Assigne before submit form.');
				return;
			}else{
				var obj = {
					assignee : values.assignee,
					status:values.status,
					id: AOCRuntime.getWiId().toString(),
					lastModifiedBy : userInfo.firstName +' '+userInfo.lastName
				};
			
				Helper.showMask();
				Ext.Ajax.request({
					url:applicationContext+'/rest/wi/submit',
					jsonData:obj,
					success:function(response){
						var data = JSON.parse(response.responseText);
						form.reset();
						Helper.showToast('success', data.message ? data.message : 'Record has been submitted successfully');
						Ext.getBody().unmask();
						me.onBackBtnClick();
					},
					failure:function(){
						Ext.getBody().unmask();
					}
				});
			}
		}
	},
	
	//Save btn click
	onSaveBtnClick:function(btn){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wIForm,
			form = wiFormPanel.getForm(),
			values = form.getValues(),
			mode = wiFormPanel.mode,
			userInfo = AOCRuntime.getUser();
		
		if(form.isValid()){
			Ext.apply(values, {listWiSchemaIdentification:me.getSchemaIdentificationParams(values)});
			Ext.apply(values, {listWiSystem:me.processGridData(refs.wiSystemGrid)});
			Ext.apply(values, {listWiOrg:me.processGridData(refs.wiOrgGrid)});
			Ext.apply(values, {listWiAocField:me.processGridData(refs.wiaocfieldgrid)});
			Ext.apply(values, {listWiSystemLevel:me.processGridData(refs.wiorderfiberlinegrid, true)});
			Ext.apply(values, {listWiBillShipMapping:me.processGridData(refs.billShipMappingGrid, true)});
			
			if(AOCRuntime.getCurrentWiMode() == 'edit'){
				values.id =  AOCRuntime.getWiId().toString();
			}
			values.lastModifiedBy = userInfo.firstName +' '+userInfo.lastName;
			values.assignee = userInfo.role;//later will use user id instead of role
			if(Ext.isEmpty(values.status)){
				Helper.showToast('validation', 'Please select Status before proceed WI form.');
				return;
			}
			if(Ext.isEmpty(values.assignee)){
				Helper.showToast('validation', 'Please select Assigne before save WI form.');
				return;
			}
			Ext.getBody().mask(AOCLit.pleaseWait);
			Ext.Ajax.request({
				url:AOCRuntime.getCurrentWiMode() == 'edit' ? applicationContext+'/rest/wi/update' : applicationContext+'/rest/wi',
				jsonData:values,
				method:AOCRuntime.getCurrentWiMode() == 'edit' ? 'PUT':'POST',
				success:function(response){
					var data = JSON.parse(response.responseText);
					form.reset();
					me.uploadFiles(data.id);
				},
				failure:function(){
					Ext.getBody().unmask();
				}
			});
		}else{
			Helper.showToast('validation', 'Please fill form correctly.');
		}
		
		console.log(values);
	},
	uploadFiles:function(wId, filePath){
    	var me = this;
    		refs = me.getReferences(),
    		xhttp = new XMLHttpRequest(),
    		fileArray = this.fileArray,
    		formData = new FormData(),
    		orderFileImageContainer = refs.orderFileImageContainer,
    		url =applicationContext+'/rest/wi/fileupload',
    		len = fileArray.length;
    		
    	if(len > 0){
	    	formData.append('file',fileArray[len-1]);
	    	formData.append('id', fileArray[len-1].recordId  ? fileArray[len-1].recordId : wId);
	    	formData.append('wiId', wId);
	    	formData.append('fileName', fileArray[len-1].name);
	    	formData.append('fileType', fileArray[len-1].fileType);
	    	
	    	if(len == 1){
	    		formData.append('sendAcknowledgementFlag', 'true');
	    	}else{
	    		formData.append('sendAcknowledgementFlag', 'false');
	    	}
	    	
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
	    					me.totalCount = 1;
	    					orderFileImageContainer.removeAll();
	    					me.fileArray = [];
	    					
    						Helper.showToast('success','Record has been save successfully.');
    						me.onBackBtnClick();
	    					Ext.getBody().unmask();
	    					
	        			}else{
	        				console.log('File Uploaded');
		        			me.uploadFiles(wId, filePath);
	        			}
	        			break;
	        	}
	        }
    	}else{
    		me.totalCount = 1;
    		orderFileImageContainer.removeAll();
    		me.fileArray = [];
    		Helper.showToast('success','Record has been save successfully.');
			me.onBackBtnClick();
    		Ext.getBody().unmask();
    	}
    },
	loadGridAfterFormSave:function(id){
		var me = this,
			refs = me.getReferences(),
			wiOrgGrid = refs.wiOrgGrid,
			wiSystemGrid = refs.wiSystemGrid,
			aocFieldGrid = refs.wiaocfieldgrid,
			wiorderfiberlinegrid = refs.wiorderfiberlinegrid;
		
		wiOrgGrid.store.load({params:{id:id}});
		wiSystemGrid.store.load({params:{id:id}});
		aocFieldGrid.store.load({params:{id:id}});
		wiorderfiberlinegrid.store.load({params:{id:id}});
	},
	getSchemaIdentificationParams:function(values){
		 var obj ={
			 emailSubjectRequired : values.emailSubjectRequired,
			 emailSubjectIdentificationType:values.emailSubjectIdentificationType,
			 emailSubjectKeyWording : values.emailSubjectKeyWording,
			 emailSubjectDataStructureRule: values.emailSubjectDataStructureRule,
			 emailSubjectDataStructureOtherRule:values.emailSubjectDataStructureOtherRule,
			 orderFileRequired:values.orderFileRequired,
			 orderFileNameContent:values.orderFileNameContent,
			 orderFileKeyWording:values.orderFileKeyWording,
			 orderFileTypeFormat:values.orderFileTypeFormat,
			 orderFileType:values.orderFileType,
			 orderTextFirstLastPage:values.orderTextFirstLastPage,
			 orderTextPosition:values.orderTextPosition,
			 orderExcelCell:values.orderExcelCell,
			 orderExcelSheet:values.orderExcelSheet,
			 attachmentFileRequired:values.attachmentFileRequired,
			 attachmentFileNameContent:values.attachmentFileNameContent,
			 attachmentFileKeyWording:values.attachmentFileKeyWording,
			 attachmentFormat:values.attachmentFormat,
			 attachmentFileType:values.attachmentFileType,
			 attachmentTextFirstLastPage:values.attachmentTextFirstLastPage,
			 attachmentTextPosition:values.attachmentTextPosition,
			 attachmentExcelCell:values.attachmentExcelCell,
			 attachmentExcelSheet:values.attachmentExcelSheet,
			 emailBodyRequired:values.emailBodyRequired,
			 emailBodyIdentificationType:values.emailBodyIdentificationType,
			 emailBodyKeyWording:values.emailBodyKeyWording
		 }
		 if(AOCRuntime.getCurrentWiMode() == 'edit'){
			 obj.id=AOCRuntime.getSchemaIdentificationId();
		 }
		 delete values.emailSubjectRequired;
		 delete values.emailSubjectIdentificationType;
		 delete values.emailSubjectKeyWording;
		 delete values.emailSubjectDataStructureRule;
		 delete values.emailSubjectDataStructureOtherRule;
		 delete values.orderFileRequired;
		 delete values.orderFileNameContent;
		 delete values.orderFileKeyWording;
		 delete values.orderFileTypeFormat;
		 delete values.orderFileType;
		 delete values.orderTextFirstLastPage;
		 delete values.orderTextPosition;
		 delete values.orderExcelCell;
		 delete values.orderExcelSheet;
		 delete values.attachmentFileRequired;
		 delete values.attachmentFileNameContent;
		 delete values.attachmentFileKeyWording;
		 delete values.attachmentFormat;
		 delete values.attachmentFileType;
		 delete values.attachmentTextFirstLastPage;
		 delete values.attachmentTextPosition;
		 delete values.attachmentExcelCell;
		 delete values.attachmentExcelSheet;
		 
		 delete values.emailBodyRequired;
		 delete values.emailBodyIdentificationType;
		 delete values.emailBodyKeyWording;
		 
		 return obj;
	},
	processGridData:function(grid, addRecordIdFlag){
		var store = grid.store,
			records = [];
	
		store.each(function(rec){
			var modifiedRecords = rec.getChanges();
			Ext.apply(rec.data, modifiedRecords);
			if(rec.data.id && AOCRuntime.getCurrentWiMode() == 'add'){
				rec.data.parentId = !addRecordIdFlag ? (rec.data.id).toString() : '';
				delete rec.data.id;
			}
			records.push(rec.data);
		});
		return records;
	},
	
	//SChema Identification
	onEmailSubjectRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			emailSubjectIdentificationType = refs.emailSubjectIdentificationType,
			emailSubjectKeyWording = refs.emailSubjectKeyWording,
			emailSubjectDataStructureRule = refs.emailSubjectDataStructureRule;
		
		if(newValue.emailSubjectRequired == 1){
			emailSubjectIdentificationType.setDisabled(false);
			emailSubjectKeyWording.setDisabled(false);
			emailSubjectDataStructureRule.setDisabled(false);
		}else{
			emailSubjectIdentificationType.setDisabled(true);
			emailSubjectKeyWording.setDisabled(true);
			emailSubjectDataStructureRule.setDisabled(true);
		}
	},
	onEmailBodyRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			emailBodyIdentificationType = refs.emailBodyIdentificationType,
			emailBodyKeyWording = refs.emailBodyKeyWording;
		
		if(newValue.emailBodyRequired == 1){
			emailBodyIdentificationType.setDisabled(false);
			emailBodyKeyWording.setDisabled(false);
		}else{
			emailBodyIdentificationType.setDisabled(true);
			emailBodyKeyWording.setDisabled(true);
		}
	},
	onAttachmentRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			attachmentFileNameContent = refs.attachmentFileNameContent,
			attachmentFileKeyWording = refs.attachmentFileKeyWording,
			attachmentFormat = refs.attachmentFormat;
		
		if(newValue.attachmentFileRequired == 1){
			attachmentFileNameContent.setDisabled(false);
			attachmentFileKeyWording.setDisabled(false);
			attachmentFormat.setDisabled(false);
		}else{
			attachmentFileNameContent.setDisabled(true);
			attachmentFileKeyWording.setDisabled(true);
			attachmentFormat.setDisabled(true);
		}
	},
	onOrderRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			orderFileNameContent = refs.orderFileNameContent,
			orderFileKeyWording = refs.orderFileKeyWording,
			orderFileTypeFormat = refs.orderFileTypeFormat;
		
		if(newValue.orderFileRequired == 1){
			orderFileNameContent.setDisabled(false);
			orderFileKeyWording.setDisabled(false);
			orderFileTypeFormat.setDisabled(false);
		}else{
			orderFileNameContent.setDisabled(true);
			orderFileKeyWording.setDisabled(true);
			orderFileTypeFormat.setDisabled(true);
		}
	},
	
	//System/Org Grid
	onSystemGridBeforeEdit:function(e, editor){
		var me = this,
			currentRecord = editor.record,
			systemName = currentRecord.get('systemName'),
			dataIndex = editor.column.dataIndex,
			defaultOrg = currentRecord.get('defaultOrg');
		
		if((systemName == 'Sparrow' ||(systemName == 'VIPS' && defaultOrg == 10)) 
				&& (dataIndex == AOCLit.variableDataBreakdown || dataIndex == AOCLit.splitByShipSet || dataIndex == AOCLit.shipMark)){
			return false;
		}
		else if((systemName == 'VIPS' && (defaultOrg == 6 || defaultOrg == 7 || defaultOrg == 8)) 
				&& (dataIndex == AOCLit.variableDataBreakdown || dataIndex == AOCLit.splitByShipSet || dataIndex == AOCLit.manufacturing
					|| dataIndex == AOCLit.invoiceLineInstruction)){
			return false;
		}
		else if((systemName == 'VIPS' && (defaultOrg == 4 || defaultOrg == 5 || defaultOrg == 9)) 
				&& (dataIndex == AOCLit.variableDataBreakdown || dataIndex == AOCLit.shipMark)){
			return false;
		}
	},
	onSystemDefaultOrgExpand:function(field){
		field.store.clearFilter();
		var grid = field.up('grid'),
			context = grid.editingPlugin.context,
			rowIdx = context.rowIdx,
			record = grid.store.getAt(rowIdx),
			system = record.get('systemName'),
			comboStore = field.store;
		
		switch(system){
		case 'Oracle':
			comboStore.filter('systemId', 31);
			break;
		case 'VIPS':
			comboStore.filter('systemId', 32);
			break;
		case 'Sparrow':
			comboStore.filter('systemId', 33);
			break;
		}
	},
	onSystemGridStoreLoad:function(store, record){
    	var me = this,
    		refs = this.getReferences(),
    		wiSystemGrid = refs.wiSystemGrid;
    	
    	store.each(function(record){
    		if(record.get('defaultSelected') == true){
    			wiSystemGrid.getSelectionModel().select(record);
    		}
    	});
    	
    },
    onOrgLevelStoreLoad:function(store, record){
    	var me = this,
    		refs = this.getReferences(),
    		wiOrgGrid = refs.wiOrgGrid;
    	
    	store.each(function(record){
    		if(record.get('defaultSelected') == true){
    			wiOrgGrid.getSelectionModel().select(record);
    		}
    	});
    	
    },
    onSystemGridRowSelect:function(view, record, index){
    	var store = view.store;
    	store.each(function(record){
    		record.set('defaultSelected', false);
    	});
    	record.set('defaultSelected', true);
    },
    onOrgGridRowSelect:function(view, record, index){
    	var store = view.store;
    	store.each(function(record){
    		record.set('defaultSelected', false);
    	});
    	record.set('defaultSelected', true);
    },
    //END of System/Org grid
    
	onSiteSelect:function(field){
		var me = this;
		me.showHideOrgView(field);
	},
	onSystemSelect:function(field){
		var me = this;
		me.showHideOrgView(field);
	},
	showHideOrgView:function(field){
		var me = this,
			refs = me.getReferences(),
			siteField = refs.site,
			wiOrgGrid = refs.wiOrgGrid,
			systemCombo = refs.sysetemField;
		
		if(siteField.getValue() && systemCombo.getValue()){
			wiOrgGrid.show();
		}else{
			wiOrgGrid.hide();
		}
	},
	
	//Upload section
	setImagePreview:function(file, imageContainer){
		var me = this,
			name = file.name,
			fileType = file.fileType;
		
		 var fileReader = new window.FileReader();
         fileReader.onload = function(e,b){
             var fileContent = e.target.result;
             imageContainer.add(
	             {
	            	 xtype:'box',
	            	 style:'float:left;margin-right:5px;border:solid 1px #ccc;padding:3px;',
	            	 width:150,
	            	 cls:'file-box',
	            	 html:me.getImagePreviewHtml(file, fileContent)
	             }
             );
         }
         fileReader.readAsDataURL(file);
	},
	getImagePreviewHtml:function(file, fileContent){
		var name = file.name,
			fileType = file.fileType,
			type = file.type,
			imgIndex = type ? type.indexOf('image') : '',
			html = '';
			
		if(imgIndex > -1){
			html = [
			        '<img filePath="'+fileContent+'" class="view-image-preview" src="'+fileContent+'" style="width:120px;height:60px;float:left;border:solid 1px #ccc;border-radius:4px;margin-right:5px;cursor:pointer;"></img>',
			        '<i class="fa fa-times delete-file"style="margin-top:20px;font-size:16px;color#2c3e50;cursor:pointer; float:right;" fileName="'+name+'" fileType="'+fileType+'"></i>',
			        '<div style="clear:both"></div>'
		        ];
		}else{
			html = [
     	       '<a style="letter-spacing:.15px;color:#2c3e50;margin-right:5px;" href="'+fileContent+'" target="_blank" data-qtip="<font color=#3892d3>'+name+'</font>">'+Ext.util.Format.ellipsis(name,15)+'</a>',
    	       '<i class="fa fa-times delete-file"style="font-size:16px;color#2c3e50;cursor:pointer; float:right;" fileName="'+name+'" fileType="'+fileType+'"></i>',
    	       '<div style="clear:both"></div>',
    	     ];
		}
		return html;
		
	},
	addFileInBox:function(obj, imageContainer, fileType){
		var me = this;
			file = obj.getEl().down('input[type=file]').dom.files[0];
		
		if(!file){
			return;
		}
		if(!me.isFileRemaining){
			me.isFileRemaining = true;
		}
		var ext = file.name.lastIndexOf('.') > 0 ? file.name.substring(1 + file.name.lastIndexOf('.')) : '';
		file.extension = ext;
		file.fileType = fileType;
		me.fileArray.push(file);
		me.totalCount++;
		me.setImagePreview(file, imageContainer);
		obj.reset();
	},
	checkTotalFile:function(obj, fileType){
		var me = this;
			refs = me.getReferences(),
			orderFileImageContainer = refs.orderFileImageContainer;
			
		if(me.totalCount <= me.maxFileCount){	
			this.addFileInBox(obj, orderFileImageContainer, fileType);
		}else{
			Helper.showToast('validation','You can not add more than '+me.maxFileCount);
		}
	},
	onOrderFileAttachmentChange:function(obj, value){
		this.checkTotalFile(obj, 'Order');
	},
	onAttachmentChange:function(obj, value){
		this.checkTotalFile(obj, 'Attachment');
	},
	onSampleFileChange:function(obj, value){
		this.checkTotalFile(obj, 'Sample' );
	},
	onFieldImageUploadChange:function(obj, value){
		var me = this;
			refs = me.getReferences(),
			imageCont = Ext.get(Ext.get(obj.el.parent('.field-image-cont')).query('.image-wrapper')[0]).component,
			file = obj.getEl().down('input[type=file]').dom.files[0];
			
		if(file){
			var type = file.type,
				imgIndex = type ? type.indexOf('image') : '';
				
			if(imgIndex > -1){
				this.addFileInBox(obj, imageCont, imageCont.itemId );
			}else{
				Helper.showToast('validation','You can upload only image');
				obj.reset();
			}
		}
	},
    
	//order fiber line grid
	onWIOrderFiberLineCellClick:function(obj , td , cellIndex , record , tr , rowIndex , e , eOpts){
		var el = Ext.get(e.target);
		if(el.hasCls('view-image-preview')){
			var filePath = el.getAttribute('filePath');
			this.showImagePreview(filePath);
		}
	},
    //AOCField Grid
	onAOCFieldGridCellClick:function(obj , td , cellIndex , record , tr , rowIndex , e , eOpts){
		var el = Ext.get(e.target);
		if(el.hasCls('view-image-preview')){
			var filePath = el.getAttribute('filePath');
			this.showImagePreview(filePath);
		}	
	},
	showImagePreview:function(filePath){
		var win = Ext.create('AOC.view.workinstruction.ImageViewerWindow',{fileSrc:filePath});
		win.show();
	},
    onFilesChanged:function(obj, value){
    	var me = this,
    	 	file = obj.getEl().down('input[type=file]').dom.files[0];
    	    rec = obj.getWidgetRecord(),
    	    gridType = obj.gridType;
    	    
	    if(!file){
			return;
		}
	    var type = file.type,
			imgIndex = type ? type.indexOf('image') : '';
			
	    if(imgIndex == -1){
			obj.reset();
			Ext.Msg.alert('','Please attach only image');
			return false;
		}else{
		    var fileName = file.name;
	    	var fileReader = new window.FileReader();
	        fileReader.onload = function(e,b){
	            var fileContent = e.target.result;
	            rec.set('fileName',fileName);
	            rec.set('fileContent',fileContent);
	        }
	        
	        fileReader.readAsDataURL(file);
	        
	        if(gridType == 'aocField'){
	        	if(AOCRuntime.getCurrentWiMode() == 'edit'){
	            	file.recordId = rec.get('parentId');
	    		}else{
	    			file.recordId = rec.get('id');
	    		}
	        	file.fileType = 'AocField';
	        }else{
	        	file.recordId = rec.get('defaultId');
	        	file.fileType = 'SystemLevel';
	        }
	        
	        var len = me.fileArray.length;
	        for(var i =0;i<len;i++){
	        	if(me.fileArray[i].recordId == rec.get('id')){
	        		me.fileArray.splice(i,1);
	        		break;
	        	}
	        }
	        me.fileArray.push(file);
	        obj.reset();
		}
    },
    onAssigneeComboChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
//			store = field.store,
//		    record = store.findRecord('id', field.getValue()),
//		    roleId = record.get('roleId')
			statusCombo = refs.statusCombo;
		
		statusCombo.store.load({params:{id:field.getValue()}});
	},
	
	onWIComboBlur:function(field, e){
		Helper.clearCombo(field, e);
	},
	onStatusSelect:function(field, value){
		var me = this,
			refs = me.getReferences(),
			assigneeCombo = refs.assigneeCombo,
			val = field.getValue();
		
		assigneeCombo.reset();
		assigneeCombo.setDisabled(false);
		assigneeCombo.store.load({params:{id:val.toString()}});
	},
	onComboSelect:function(field, e){
		Helper.selectCombo(field);
	}
   
});