Ext.define('AOC.view.partner.PartnerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.partnerMain',
    requires: ['AOC.view.advsearch.PartnerAdvanceSearch'],
    onSaveBtnClick: function() {
    	var me = this,
    		refs = me.getReferences(),
    		view = me.getView(),
    		partnerName = refs.partnerName,
    		messageLabelField = refs.messageLabelField,
    		partnerManagementGrid = AOCRuntime.getActiveGrid(),
    		form = refs.createPartnerForm,
    		editMode = view.editMode,
    		url = '',
    		valueObj ='',
    		method ='',
    		msg ='';
    	
        var length = 0;
        if (editMode) {
            url = applicationContext + '/rest/partners/' + view.partnerId;
            form.updateRecord();
            method = 'PUT';
            valueObj = form.getRecord().getChanges();
            length = Object.keys(valueObj).length;
            msg = AOCLit.updatePartnerMsg;
        } else {
            url = applicationContext + '/rest/partners';
            valueObj = form.getValues(false, true, false, true);
            method = 'POST';
            length = 1;
            msg = AOCLit.addPartnerMsg;
        }
        var parameters = Ext.JSON.encode(valueObj);
        
       
        if (length > 0) {
            if (form.isValid()) {
            	view.mask('Saving....');
                Ext.Ajax.request({
                    method: method,
                    jsonData: parameters,
                    url: url,
                    success: function(response, opts) {
                        var jsonString = Ext.JSON.decode(response.responseText);
                        var valueExist = jsonString.valueExist;
                        if (valueExist) {
                        	view.unmask();
                            partnerName.focus();
                            messageLabelField.show();
                            messageLabelField.setValue(AOCLit.partExistMsg);
                            return false;
                        }
                        view.unmask();
                        view.close();
                        Helper.showToast('success',msg);
                        partnerManagementGrid.store.load();
                    },
                    failure: function(response, opts) {
                    	msg = response.responseText;
                    	msg = Msg.replace("Exception:", " ");
                        Helper.showToast('failure', msg);
                        view.unmask();
                        view.close();
                    }
                });
            } else {
            	messageLabelField.setValue(AOCLit.fillMandatoryFieldMsg).setVisible(true);
            }

            AOCRuntime.setWindowInEditMode(false);
        } else {
        	messageLabelField.setValue(AOCLit.editFieldEntryMsg).setVisible(true);
        }
    },
    onCancelBtnClick: function() {
        Ext.getBody().unmask();
        this.getView().destroy();
        AOCRuntime.setWindowInEditMode(false);
        AOCRuntime.getActiveGrid().store.load();
    },

    createpartner: function() {
        var win = Ext.ComponentQuery.query("#createpartnerItemId")[0];
        if (!win) {
            win = Ext.create('AOC.view.partner.CreatePartner', {
            	title:AOCLit.addPartner
            });
            win.show();
        }
    },

    onClickMenu: function(obj, rowIndex, colIndex, item, e, record) {
        var me = this;
        var callout = Ext.widget('callout', {
            cls: 'white more-menu-item-callout extra',
            html: me.buildMenuTpl.apply("{}"),
            target: e.target,
            calloutArrowLocation: 'top-left',
            relativePosition: 't-b',
            relativeOffsets: [52, 23],
            dismissDelay: 0,
            listeners: {
                afterrender: me.onAfterRenderEditCallout,
                edit: function(cmp) {
                    var data = e.record;
                    var win = Ext.ComponentQuery.query('#createpartnerItemId')[0];
                    if (!win) {
                        var id = data.id;
                        var partnerName = data.get('PartnerName');
                        win = Ext.create('AOC.view.partner.CreatePartner', {
                            editMode: true,
                            rec: data,
                            partnerId: id,
                            partnerName: partnerName,
                            title:AOCLit.editPartner,
                            listeners: {
                                'close': function(panel, eOpts) {
                                    Ext.getBody().unmask();
                                    win.destroy();
                                }
                            }
                        });
                        win.show();
                    }
                    callout.destroy();
                },
                deletepartner: function(cmp) {
                    var data = e.record;
                    var id = data.id;
                    var productLineCount = data.get('productLineCount');
                    var addressCount = data.get('addressCount');
                    if (productLineCount != 0 || addressCount != 0) //removing order count to delete the partner(vishal sharma)
                        Ext.MessageBox.alert('', AOCLit.deletePartner);
                    else {
                        Ext.MessageBox.confirm('Confirm Action',AOCLit.deletePartnerMsg, function(response) {
                            if (response == 'yes') {
                                Ext.Ajax.request({
                                    method: 'DELETE',
                                    url: applicationContext + '/rest/partners/' + id,
                                    success: function(response, opts) {
                                        AOC.util.Helper.fadeoutMessage('Success', AOCLit.delPartnerMsg);
                                        AOCRuntime.getActiveGrid().store.load();
                                    },
                                    failure: function(response, opts) {}
                                });
                            } else if (response == 'no') {
                                return true;
                            }
                        });
                        this.destroy();
                    }
                    callout.destroy();
                },
                productLine: function(cmp) {

                    var data = e.record;
                    var id = data.id;
                    var partnerName = data.get('partnerName');
                    store = Ext.create('AOC.store.PartnerProductLineStore', {
                        storeId: 'PartnerProductLineStoreStoreId',
                        totalCount: 'total',

                        proxy: {
                            type: 'rest',
                            url: applicationContext + '/rest/productLines/partner/' + id + '?partnerId=' + id,
                            reader: {
                                type: 'json',
                                rootProperty: 'productlines',
                                totalProperty: 'totalCount'
                            }
                        }
                    });
                    panel = Ext.ComponentQuery.query('#partnerPanel')[0];
                    var partnerproduct = Ext.ComponentQuery.query('#partnerproductlinegriditemId')[0];
                    partnerproduct.bindStore(store);
                    panel.getLayout().setActiveItem(1);
                    //var partnergrid=Ext.ComponentQuery.query('#partnertitleItemid')[0];
                    partnerproduct.partnerid = id;
                    partnerproduct.partnerName = partnerName;
                    partnerproduct.down('#pagingtoolbar').bindStore(store);
                    AOCRuntime.setActiveGrid(partnerproduct);
                    //partnergrid.setText('<b></b>');
                    callout.destroy();
                }

            }
        });
        //Adding functionality related to Menu item visibility(KKaY)
        callout.show();
        var heightAbove = e.getY() - Ext.getBody().getScroll().top,
        heightBelow = Ext.Element.getViewportHeight() - heightAbove;
  	    if(heightBelow<(callout.getHeight()+40)){
  		  callout.calloutArrowLocation='bottom-left'; 
  		  callout.relativePosition='b-t';
  		  callout.relativeOffsets = [75, 0];
  	  }else{
  		  callout.calloutArrowLocation='top-left'; 
  		  callout.relativePosition='t-b';
  		callout.relativeOffsets = [75, 5];
  	  }
        callout.show();
    },
    onAfterRenderEditCallout: function(cmp) {
        var me = this;
        cmp.el.on({
            delegate: 'div.user-profile-menu-item',
            click: function(e, element) {
                var el = Ext.get(element),
                    event = el.getAttribute('event');
                if (event && !el.hasCls('edit-menu-disabled')) {
                    //	                    cmp.destroy();
                    me.fireEvent(event);
                }
            }
        });
    },
    buildMenuTpl: function() {
        var me = this;
        return Ext.create('Ext.XTemplate',
            '<div style="width: 180px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="edit"">Edit</div>',
            '</tpl>',
            '<div style="width: 180px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="deletepartner"">Delete</div>',
            '</tpl>',
            '<div style="width: 180px !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="productLine"">Partner Data Structure</div>',
            '</tpl>'
        );
    },
    openAdvancedSearchWindow:function(){
    	var advanceSearchWin = Ext.create('AOC.view.advsearch.PartnerAdvanceSearch',{contextGrid:this.getView()});
    	if(!advanceSearchWin.isVisible()){
    		advanceSearchWin.show();
    	}
    },
    onSearchBtnClicked:function(btn){
    	  var view = this.getView(),
    	  	  refs = view.getReferences(),
    	  	  form = refs.partnerAdvanceSearchForm.getForm(),
    	  	  values = form.getValues();
    	  	  values.datecriteriavalue = 'createdDate';
    	  	  store = view.contextGrid.store;
              Helper.advancedSearch(view,values);
    },
    clearAdvancedSearch:function(btn){
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        btn.hide();
    },
    getQuickSearchResults: function(cmp) {
    	var view = this.getView(),
        value = cmp.getValue();
        Helper.quickSearch(view,{partnerName: value}),
        cmp.orderedTriggers[0].show();
    },
    getSearchResults: function(cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.getQuickSearchResults(cmp);
        }
    },
    getAdvancedSearchResults: function(cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onSearchBtnClicked();
        }
    },
    clearSearchResults: function(cmp) {
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        cmp.setValue('');
        cmp.orderedTriggers[0].hide();
    },
    hideMandatoryMessage: function() {
        var obj = this.getView();
        Helper.hideMandatoryMessage(obj);
    },
    notifyByMessage: function() {
        var obj = this.getView();
        Helper.notifyByMessage(obj);
    },
    notifyByImage: function(config) {
        Helper.notifyByImage(config);
    }

});