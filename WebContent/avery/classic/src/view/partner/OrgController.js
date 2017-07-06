Ext.define('AOC.view.partner.OrgController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.orgcontroller',
    requires : ['AOC.util.Helper'],
    runTime : AOC.config.Runtime,
    onOrgCodeCellRender:function(value,metadata){
    	var me=this.getView();
    	if(Ext.isEmpty(value)){
    		return '';
    	}
    	me.isOrgGridNotValid=false;
    	var record=me.orgStore.find('id',value);
    	if(record==-1)
    		return '';
    	return '<div>'+me.orgStore.getAt(record).get('name')+'</div>';
    },
    onOrgeCodeComboRender:function(cmp){
		var me=this.getView(),store=cmp.getStore(),
		record=cmp.up('editor').context.record,
		gridStore=me.getStore(),
		index=gridStore.indexOf(record);
    	store.on('load',function(store) {
    		if(index==0)
    	      cmp.select(store.getAt(0).get('id'));
    	});
    	store.load();
	},
	onOrgeCodeComboChange:function(cmp,newValue){
		if(cmp.getValue() == 'None'){
			cmp.setValue('');
			return;
		}
//		Ext.getBody().mask()
		var view=this.getView();
		if(!Ext.isEmpty(newValue)){
		var gridStore=view.getStore(),
			alreadyPresent=gridStore.find('orgCodeId',newValue);
		if(alreadyPresent!=-1){
			cmp.setValue('');
			Helper.showToast('Error','This Org is already selected. Please select another one');
			return false;
		}
		var record=cmp.ownerCt.context.record;
		var freightTermsData=AOC.util.Helper.getDependendVariableComboStore('freightTerms',view.systemId,newValue);
		record.set('freightTermsData',freightTermsData);
		var frieghtTermTempArray = ['None'].concat(freightTermsData);
		view.columns[3].getEditor().bindStore(frieghtTermTempArray);
		var shippingMethodData=AOC.util.Helper.getDependendVariableComboStore('shippingMethod',view.systemId,newValue);
		record.set('shippingMethodData',shippingMethodData);
		var shippingMethodDataArray = ['None'].concat(shippingMethodData);
		view.columns[4].getEditor().bindStore(shippingMethodDataArray);
		}
	},
	OnBeforeEdit:function(editor,context){
		if(AOCRuntime.getUser().role == 3 || this.getView().up('#createpartnerproductlineItemId').mode == 'view'){
			return false;
		}else{
		  var grid=editor.grid,record=context.record,
		  freightTermsData=record.get('freightTermsData'),orgCodeId=record.get('orgCodeId'),
		  shippingMethodData=record.get('shippingMethodData');
		  if(!Ext.isEmpty(orgCodeId)){
			  if(Ext.isEmpty(freightTermsData)){
				  freightTermsData=AOC.util.Helper.getDependendVariableComboStore('freightTerms',grid.systemId,orgCodeId);
				  record.set('freightTermsData',freightTermsData);
				  
			  }
			  var frieghtTermTempArray = ['None'].concat(freightTermsData);
			  grid.columns[3].getEditor().bindStore(frieghtTermTempArray);
			  if(Ext.isEmpty(shippingMethodData)){
				  shippingMethodData=AOC.util.Helper.getDependendVariableComboStore('shippingMethod',grid.systemId,orgCodeId);
				  record.set('shippingMethodData',shippingMethodData);
			  }
			  var shippingMethodDataArray = ['None'].concat(shippingMethodData);
			  
			  grid.columns[4].getEditor().bindStore(shippingMethodDataArray);
		  }
		}
	},
	validationRendered:function(value,metadata){
    	var me=this.getView();
    	if(Ext.isEmpty(value)){
    		if(me.showValidationError){
    			metadata.style = AOCLit.mandatoryValidationCellColor;
    		}
    		me.isOrgGridNotValid=true;
    	}
    	return value;
    },
    onAddOrgBtnClick:function(btn){
    	if(this.getView().up('#createpartnerproductlineItemId').mode == 'view'){
    		return;
    	}
    	var me = this,
    		view = me.getView(),
    		store = view.store;
    	
    	if((store.getCount() < view.maxRecord) && (AOCRuntime.getUser().role != 3) ){
    		store.add({orgCodeId:'',newRecord:true, isDefault:false});
		}else{
			if(AOCRuntime.getUser().role != 3){
				Helper.showToast('validation','Cannot add any more rows.');
			}
		}
    }
});