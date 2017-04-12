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
	
	//Save btn click
	onSaveBtnClick:function(btn){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wIForm,
			form = wiFormPanel.getForm(),
			values = form.getValues(),
			mode = wiFormPanel.mode;
		
		Ext.apply(values, {listWiSchemaIdentification:me.getSchemaIdentificationParams(values)});
		Ext.apply(values, {listWiSystem:me.processGridData(refs.wiSystemGrid)});
		Ext.apply(values, {listWiOrg:me.processGridData(refs.wiOrgGrid)});
		Ext.apply(values, {listWiAocField:me.processGridData(refs.wiaocfieldgrid)});
		Ext.apply(values, {listWiSystemLevel:me.processGridData(refs.wiorderfiberlinegrid, true)});
		
		if(AOCRuntime.getCurrentWiMode() == 'edit'){
			values.id =  AOCRuntime.getWiId().toString();
		}
		Ext.getBody().mask(AOCLit.pleaseWait);
		Ext.Ajax.request({
			url:AOCRuntime.getCurrentWiMode() == 'edit' ? applicationContext+'/rest/wi/update' : applicationContext+'/rest/wi',
			jsonData:values,
			method:AOCRuntime.getCurrentWiMode() == 'edit' ? 'PUT':'POST',
			success:function(response){
				var data = JSON.parse(response.responseText);
				form.reset();
				me.loadGridAfterFormSave(data.id);
				me.uploadFiles(data.id);
				me.uploadAOCFieldFiles(data.id);
//				Helper.showToast('success','Record has been suuccessfully saved');
			},
			failure:function(){
				Ext.getBody().unmask();
			}
		});
		
		console.log(values);
	},
	
	uploadAOCFieldFiles:function(wId){
		var me = this;
			refs = me.getReferences(),
			xhttp = new XMLHttpRequest(),
			fileArray = this.aocFieldAttachArray,
			formData = new FormData(),
			url = applicationContext+'/rest/aocfield/fileupload',
			len = fileArray.length;
			
		if(len > 0){
	    	formData.append('file',fileArray[len-1]);
	    	formData.append('id', fileArray[len-1].recordId);
	    	formData.append('fileName', fileArray[len-1].name);
	    	formData.append('wiId', wId);
	    	
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
	    					Ext.getBody().unmask();
	        			}else{
	        				console.log('AOC File Uploaded');
		        			me.uploadAOCFieldFiles(wId);
	        			}
	        			break;
	        	}
	        }
		}else{
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
			 emailFileNameContent : values.emailFileNameContent,
			 emailSubjectKeyWording : values.emailSubjectKeyWording,
			 emailSubjectDataStructureRule: values.emailSubjectDataStructureRule,
			 emailSubjectDataStructureOtherRule:values.emailSubjectDataStructureOtherRule,
			 orderFileRequired:values.orderFileRequired,
			 orderFileNameContent:values.orderFileNameContent,
			 orderFileKeyWording:values.orderFileKeyWording,
			 orderFileFormat:values.orderFileTypeFormat,
			 orderFileType:values.orderFileType,
			 orderTextFirstLastPage:values.orderTextFirstLastPage,
			 orderTextPosition:values.orderTextPosition,
			 orderExcelCell:values.orderExcelCell,
			 orderExcelSheet:values.orderExcelSheet,
			 attachmentRequired:values.attachmentRequired,
			 attachmentFileNameContent:values.attachmentFileNameContent,
			 attachmentFileKeyWording:values.attachmentFileKeyWording,
			 attachmentFormat:values.attachmentFormat,
			 attachmentFileType:values.attachmentFileType,
			 attachmentTextFirstLastPage:values.attachmentTextFirstLastPage,
			 attachmentTextPosition:values.attachmentTextPosition,
			 attachmentExcelCell:values.attachmentExcelCell,
			 attachmentExcelSheet:values.attachmentExcelSheet,
		 }
		 if(AOCRuntime.getCurrentWiMode() == 'edit'){
			 obj.id=AOCRuntime.getSchemaIdentificationId();
		 }
		 delete values.emailSubjectRequired;
		 delete values.emailFileNameContent;
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
		 delete values.attachmentRequired;
		 delete values.attachmentFileNameContent;
		 delete values.attachmentFileKeyWording;
		 delete values.attachmentFormat;
		 delete values.attachmentFileType;
		 delete values.attachmentTextFirstLastPage;
		 delete values.attachmentTextPosition;
		 delete values.attachmentExcelCell;
		 delete values.attachmentExcelSheet;
		 
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
			emailFileNameContent = refs.emailFileNameContent,
			emailSubjectKeyWording = refs.emailSubjectKeyWording,
			emailSubjectDataStructureRule = refs.emailSubjectDataStructureRule;
		
		if(newValue.emailSubjectRequired == 1){
			emailFileNameContent.setDisabled(false);
			emailSubjectKeyWording.setDisabled(false);
			emailSubjectDataStructureRule.setDisabled(false);
		}else{
			emailFileNameContent.setDisabled(true);
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
		
		if(newValue.attachmentRequired == 1){
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
	
	//System Grid
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
			name=file.name;
		
		 var fileReader = new window.FileReader();
         fileReader.onload = function(e,b){
             var fileContent = e.target.result;
             imageContainer.add(
	             {
	            	 xtype:'box',
	            	 style:'float:left;',
	            	 width:130,
	            	 html:'<a style="letter-spacing:.15px;color:#2c3e50;" href="'+fileContent+'" target="_blank" data-qtip="<font color=#3892d3>'+name+'</font>">'+Ext.util.Format.ellipsis(name,15)+'</a>'
	             }
             );
         }
         fileReader.readAsDataURL(file);
	},
	addFileInBox:function(obj, imageContainer, fileType){
		var me = this;
		
		if(me.totalCount < me.maxFileCount){
			var file = obj.getEl().down('input[type=file]').dom.files[0];
			
			if(!file){
				return;
			}
			var ext = file.name.lastIndexOf('.') > 0 ? file.name.substring(1 + file.name.lastIndexOf('.')) : '';
			file.extension = ext;
			file.fileType = fileType;
			me.fileArray.push(file);
			me.totalCount++;
			me.setImagePreview(file, imageContainer);
			obj.reset();
		}else{
			Helper.showToast('validation','You can not add more than '+me.maxFileCount);
		}
	},
	onOrderFileAttachmentChange:function(obj, value){
		var me = this,
			refs = me.getReferences(),
			orderFileImageContainer = refs.orderFileImageContainer;
		
		me.addFileInBox(obj, orderFileImageContainer,'Order');
	},
	onAttachmentChange:function(obj, value){
		var me = this;
			refs = me.getReferences(),
			attchmentContainer = refs.attchmentContainer;
		
		me.addFileInBox(obj, attchmentContainer,'Attachment');
	},
	onSampleFileChange:function(obj, value){
		var me = this,
			refs = me.getReferences(),
			sampleFileContainer = refs.sampleFileContainer;
		
		me.addFileInBox(obj, sampleFileContainer,'Sample' );
	},
	uploadFiles:function(wId, filePath){
    	var me = this;
    		refs = me.getReferences(),
    		xhttp = new XMLHttpRequest(),
    		fileArray = this.fileArray,
    		formData = new FormData(),
    		orderFileImageContainer = refs.orderFileImageContainer,
    		attchmentContainer = refs.attchmentContainer,
    		sampleFileContainer = refs.sampleFileContainer,
    		url =applicationContext+'/rest/wi/fileupload',
    		len = fileArray.length;
    		
    	if(len > 0){
	    	formData.append('file',fileArray[len-1]);
	    	formData.append('id', wId);
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
	    					Helper.showToast('success','Record has been save successfully.');
	    					orderFileImageContainer.removeAll();
	    					attchmentContainer.removeAll();
	    					sampleFileContainer.removeAll();
	    					me.fileArray = [];
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
    		Helper.showToast('success','Record has been save successfully.');
    		me.totalCount = 1;
    		orderFileImageContainer.removeAll();
			attchmentContainer.removeAll();
			sampleFileContainer.removeAll();
    		me.fileArray = [];
			me.onBackBtnClick();
    		
    		Ext.getBody().unmask();
    	}
    },
    
    //AOCField Grid
    
    onAOCFieldGridCellClick:function(obj, td, cellIndex, record, tr, rowIndex, e, eOpts){
    	var grid=obj;
		var el = Ext.get(e.target);
		this.currentAOCFieldRowId=rowIndex;
    	var inputEl = Ext.get('upload-file');
    	if(el.hasCls('upload-image')){
    		document.getElementById('upload-file').click();
    	}
    },
    onAOCFieldGridAfterRender:function(grid){
    	var me = this;
    	var inputEl = Ext.get('upload-file').dom;
    	inputEl.addEventListener('change', function() {
            me.onFilesChanged(inputEl.files);
        }, me);
    },
    onFilesChanged:function(files){
    	var me = this,
    	 	refs = me.getReferences(),
    	 	aocFieldGrid = refs.wiaocfieldgrid,
    	 	store = aocFieldGrid.store,
    	 	file = Ext.Array.from(files)[0],
    	 	currentAOCFieldRowId = me.currentAOCFieldRowId;
    	    fileName = file.name,
    	    rec = store.getAt(currentAOCFieldRowId);
    	    
    	var fileReader = new window.FileReader();
        fileReader.onload = function(e,b){
            var fileContent = e.target.result;
            rec.set('fileName',fileName);
            rec.set('filePath',fileContent);
        }
        fileReader.readAsDataURL(file);
        file.recordId = rec.get('id');
        var len = me.aocFieldAttachArray.length;
        for(var i =0;i<len;i++){
        	if(me.aocFieldAttachArray[i].recordId == rec.get('id')){
        		me.aocFieldAttachArray.splice(i,1);
        		break;
        	}
        }
        
        me.aocFieldAttachArray.push(file);
    }
});