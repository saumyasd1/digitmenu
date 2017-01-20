Ext.define('AOC.view.orderqueue.OrgController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.orgcontroller',
    requires : ['AOC.util.Helper'],
    runTime : AOC.config.Runtime,
    onOrgChange:function(cmp,newValue){
    	Ext.getBody().mask('Setting...');
    	var view=this.getView(),me=this,systemId=view.systemId;
		//me.attachCombo('freightTerms',systemId,newValue,'freightTermscombo',obj.freightTerm,'freightTerms');
		//me.attachCombo('shippingMethod',systemId,record.get('id'),'shippingMethodCombo',obj.shippingMethod,'shippingMethod');
    },
	attachCombo:function(variableName,systemId,orgId,referenceValue){
		var variableFieldStore=AOC.util.Helper.loadDependendVariableComboStore(variableName,systemId,orgId),
		variableField=this.getView().lookupReference(referenceValue);
		variableField.bindStore(variableFieldStore);
	},
    onOrgCodeCellRender:function(value,metadata){
    	var me=this.getView();
    	if(Ext.isEmpty(value)){
    		if(me.showValidationError){
    			metadata.style = AOCLit.mandatoryValidationCellColor;
    		}
    		me.isOrgGridNotValid=true;
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
//		Ext.getBody().mask()
		var view=this.getView();
		if(!Ext.isEmpty(newValue)){
		var gridStore=view.getStore(),
			alreadyPresent=gridStore.find('orgCodeId',newValue);
		if(alreadyPresent!=-1){
			cmp.setValue('');
			AOC.util.Helper.fadeoutMessage('Error','This Org is already selected. Please select another one');
			return false;
		}
		var record=cmp.ownerCt.context.record;
		var freightTermsData=AOC.util.Helper.getDependendVariableComboStore('freightTerms',view.systemId,newValue);
		record.set('freightTermsData',freightTermsData);
		view.columns[3].getEditor().bindStore(freightTermsData);
		var shippingMethodData=AOC.util.Helper.getDependendVariableComboStore('shippingMethod',view.systemId,newValue);
		record.set('shippingMethodData',shippingMethodData);
		view.columns[4].getEditor().bindStore(freightTermsData);
		}
	},
	OnBeforeEdit:function(editor,context){
		  var grid=editor.grid,record=context.record,
		  freightTermsData=record.get('freightTermsData'),orgCodeId=record.get('orgCodeId'),
		  shippingMethodData=record.get('shippingMethodData');
		  if(!Ext.isEmpty(orgCodeId)){
			  if(Ext.isEmpty(freightTermsData)){
				  freightTermsData=AOC.util.Helper.getDependendVariableComboStore('freightTerms',grid.systemId,orgCodeId);
				  record.set('freightTermsData',freightTermsData);
				  grid.columns[3].getEditor().bindStore(freightTermsData);
			  }else{
				  grid.columns[3].getEditor().bindStore(freightTermsData);
			  } 
			  if(Ext.isEmpty(shippingMethodData)){
				  shippingMethodData=AOC.util.Helper.getDependendVariableComboStore('shippingMethod',grid.systemId,orgCodeId);
				  record.set('shippingMethodData',shippingMethodData);
				  grid.columns[4].getEditor().bindStore(shippingMethodData);
			  }else{
				  grid.columns[4].getEditor().bindStore(shippingMethodData);
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
    }
});