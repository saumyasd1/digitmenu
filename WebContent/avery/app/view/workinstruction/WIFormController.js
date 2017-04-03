Ext.define('AOC.view.workinstruction.WIFormController',{
	extend:'Ext.app.ViewController',
	alias:'controller.wiformcontroller',
	
	//Back button click
	onBackBtnClick:function(btn){
		var view = this.getView();
		var parentCont = view.up('wicontainer');
		parentCont.getLayout().setActiveItem(0);
	},
	
	//Order File section
	onOrderRadioChange:function(field, newValue, oldValue){
		var me = this;
		if(newValue.order == 2){
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
		if(newValue.attach == 2){
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
			values = form.getValues();
		
		Ext.apply(values, {listWiSchemaIdentification:me.getSchemaIdentificationParams(values)});
		Ext.apply(values, {listWiSystem:me.processOrgSystemData(refs.wiSystemGrid)});
		Ext.apply(values, {listWiOrg:me.processOrgData(refs.wiOrgGrid)});
		
		Ext.Ajax.request({
			url:applicationContext+'/rest/wi',
			jsonData:values,
			success:function(response){
				Helper.showToast('success','Record has been suuccessfully saved');
			},
			failure:function(){
				
			}
		});
		
		console.log(values);
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
			 attachmentExcelSheet:values.attachmentExcelSheet
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
	processOrgSystemData:function(grid){
		var store = grid.store,
			records = [];
		
		store.each(function(rec){
			var modifiedRecords = rec.getChanges();
			Ext.apply(rec.data, modifiedRecords);
			
			records.push(rec.data);
		});
		return records;
	},
	processOrgData:function(grid){
		var store = grid.store,
			records = [];
		
		store.each(function(rec){
			var modifiedRecords = rec.getChanges();
			Ext.apply(rec.data, modifiedRecords);
			
			records.push(rec.data);
		});
		return records;
	},
	
	//SChema Identification
	onEmailSubjectRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			emailSubjectFieldCont = refs.emailSubjectFieldCont;
		
		if(newValue.emailSubjectRequired == 1){
			emailSubjectFieldCont.setDisabled(false);
		}else{
			emailSubjectFieldCont.setDisabled(true);
		}
	},
	onEmailBodyRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			emailBodyFieldCont = refs.emailBodyFieldCont;
		
		if(newValue.emailBodyRequired == 1){
			emailBodyFieldCont.setDisabled(false);
		}else{
			emailBodyFieldCont.setDisabled(true);
		}
	},
	onAttachmentRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			attachmentFieldCont = refs.attachmentFieldCont;
		
		if(newValue.attachmentRequired == 1){
			attachmentFieldCont.setDisabled(false);
		}else{
			attachmentFieldCont.setDisabled(true);
		}
	},
	onOrderRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences(),
			orderFileFieldCont = refs.orderFileFieldCont;
		
		if(newValue.orderFileRequired == 1){
			orderFileFieldCont.setDisabled(false);
		}else{
			orderFileFieldCont.setDisabled(true);
		}
	},
	
	//System Grid
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
			comboStore.filter('systemName',31);
			break;
		case 'VIPS':
			comboStore.filter('systemName',32);
			break;
		case 'Sparrow':
			comboStore.filter('systemName',33);
			break;
		}
	}
});