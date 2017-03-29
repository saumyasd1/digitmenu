Ext.define('AOC.view.workinstruction.WIFormController',{
	extend:'Ext.app.ViewController',
	alias:'controller.wiformcontroller',
	
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
	
	onSaveBtnClick:function(btn){
		var me = this,
			refs = me.getReferences(),
			wiFormPanel = refs.wIForm,
			form = wiFormPanel.getForm(),
			values = form.getValues();
		
		Ext.Ajax.request({
			url:applicationContext+'/rest/wi',
			jsonData:Ext.JSON.encode(values),
			success:function(response){
				Helper.showToast('success','Record has been suuccessfully saved');
			},
			failure:function(){
				
			}
		});
		
		console.log(values);
	},
	onBackBtnClick:function(btn){
		var view = this.getView();
		var parentCont = view.up('wicontainer');
		parentCont.getLayout().setActiveItem(0);
	},
	//SChema Identification
	onEmailRequiredRadioChange:function(field, newValue, oldValue){
		var me = this,
			refs = me.getReferences();
		
		if(newValue.emailRequired == 1){
			
		}
	},
	
	//System Grid
	onSystemDefaultOrgExpand:function(field){
		field.store.clearFilter();
		var grid = field.up('grid'),
			context = grid.editingPlugin.context,
			rowIdx = context.rowIdx,
			record = grid.store.getAt(rowIdx),
			system = record.get('system'),
			comboStore = field.store;
		
		switch(system){
		case 'Oracle':
			comboStore.filter('systemId',31);
			break;
		case 'VIPS':
			comboStore.filter('systemId',32);
			break;
		case 'Sparrow':
			comboStore.filter('systemId',33);
			break;
		}
	}
});