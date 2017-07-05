Ext.define('AOC.view.address.AddressWinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.addresswincontroller',
    runTime: AOC.config.Runtime,
    
    onSaveBtnClick: function () {
        var me = this;
        me.getView().el.mask('Saving....');
        var Msg = '';
        var createaddress = this.getView();
        var grid = Ext.ComponentQuery.query('#AddressManageGriditemId')[0];
        var panel = createaddress.down('#listPanel');
        var valueObj = '',
            form = this.getView().down('form');
        var refs = this.getReferences();
        var editMode = this.getView().editMode,
            url = '';
        var methodMode = '';
        var length = 0;
        if (editMode) {
            ID = createaddress.ID;
            url = applicationContext + '/rest/address/' + ID;
            form.updateRecord();
            methodMode = 'PUT';
            valueObj = form.getRecord().getChanges();
            var formData =  form.getValues();
            if (valueObj.partnerId != null) {
                var varPartner = valueObj.partnerId;
                var partnerCombo = refs.partnerName;
                var store = partnerCombo.store;
                store.each(function (rec) {
                    if (rec.get('id') == partnerCombo.getValue()) {
                        valueObj.address = rec.get('address')
                        valueObj.partnerName = rec.get('partnerName')
                        valueObj.contactPerson = rec.get('contactPerson')
                        valueObj.phone = rec.get('phone')
                        valueObj.active = rec.get('active')
                        valueObj.lastModifiedBy = rec.get('lastModifiedBy')
                        valueObj.lastModifiedDate = rec.get('lastModifiedDate')
                    }
                });
                valueObj.varPartner = {
                    id: valueObj.partnerId
                };
            }
            else{
            	valueObj.varPartner = {
                        id: formData.partnerId
                    };
            }
            if (valueObj.orgCodeId != null) {
                var varOrgCode = valueObj.orgCodeId;
                var orgCodeCombo = refs.orgName;
                var orgStore = orgCodeCombo.store;
                var siteCombo = refs.siteName;
                var systemCombo = refs.systemName;
                valueObj.orgName = orgCodeCombo.getRawValue();
                valueObj.siteName = siteCombo.getRawValue();
                valueObj.systemName = systemCombo.getRawValue();

                orgStore.each(function (rec) {
                    if (rec.get('id') == orgCodeCombo.getValue()) {
                        valueObj.systemId = rec.get('systemId')
                    }
                });
                valueObj.varOrgCode = {
                    id: valueObj.orgCodeId
                };
            }
            else{
            	valueObj.varOrgCode = {
                        id: formData.orgCodeId
                    };
            }

            length = Object.keys(valueObj).length;
            //Msg='Address Updated Successfully';
            var Msg = AOCLit.updateAddressMsg;
            var parameters = Ext.JSON.encode(valueObj);
        } else {
            url = applicationContext + '/rest/address';
            valueObj = form.getValues(false, true, false, true);
            var partnerCombo = refs.partnerName;
            var orgCodeCombo = refs.orgName;
            var siteCombo = refs.siteName;
            var systemCombo = refs.systemName;
            valueObj.orgName = orgCodeCombo.getRawValue();
            valueObj.siteName = siteCombo.getRawValue();
            valueObj.systemName = systemCombo.getRawValue();
            var store = partnerCombo.store;
            var orgStore = orgCodeCombo.store;

            orgStore.each(function (rec) {
                if (rec.get('id') == orgCodeCombo.getValue()) {
                    valueObj.systemId = rec.get('systemId')
                }
            });
            store.each(function (rec) {
                if (rec.get('id') == partnerCombo.getValue()) {
                    valueObj.address = rec.get('address')
                    valueObj.partnerName = rec.get('partnerName')
                    valueObj.contactPerson = rec.get('contactPerson')
                    valueObj.phone = rec.get('phone')
                    valueObj.active = rec.get('active')
                    valueObj.lastModifiedBy = rec.get('lastModifiedBy')
                    valueObj.lastModifiedDate = rec.get('lastModifiedDate')
                }
            });

            valueObj.orgName = orgCodeCombo.getRawValue();
            methodMode = 'POST';
            length = 1;
            //Msg='Address Added Successfully';
            var Msg = AOCLit.addAddressMsg;
            var parameters = {
                varOrgCode: {
                    id: valueObj.orgCodeId
                },
                orgName: valueObj.orgName,
                system: valueObj.system,
                siteId: valueObj.siteId,
                partnerId: valueObj.partnerId,
                siteNumber: valueObj.siteNumber,
                description: valueObj.description,
                address1: valueObj.address1,
                address2: valueObj.address2,
                address3: valueObj.address3,
                address4: valueObj.address4,
                address: valueObj.address,
                city: valueObj.city,
                state: valueObj.state,
                country: valueObj.country,
                zip: valueObj.zip,
                contact: valueObj.contact,
                phone1: valueObj.phone1,
                phone2: valueObj.phone2,
                fax: valueObj.fax,
                email: valueObj.email,
                shippingMethod: valueObj.shippingMethod,
                freightTerms: valueObj.freightTerms,
                shippingInstructions: valueObj.shippingInstructions,
                siteType: valueObj.siteType,
                varPartner: {
                    id: valueObj.partnerId
                }
            }
        }

        if (length > 0) {
            if (panel.getForm().isValid()) {
                Ext.Ajax.request({
                    method: methodMode,
                    jsonData: parameters,
                    url: url,
                    success: function (response, opts) {
                        me.getView().unmask();
                        createaddress.destroy();
                        Helper.showToast('Success', Msg);
                        grid.store.load();

                    },
                    failure: function (response, opts) {
                        Ext.getBody().unmask();
                        createaddress.destroy();
                    }
                });
            } else {
                createaddress.down('#messageFieldItemId').setValue(AOCLit.fillMandatoryFieldMsg).setVisible(true);
            }
            this.runTime.setWindowInEditMode(false);
        } else {
            createaddress.down('#messageFieldItemId').setValue(AOCLit.editFieldEntryMsg).setVisible(true);
        }
    },
    
    onSiteSelect: function (combo, record) {
        var me = this,
            refs = me.getReferences(),
            org = refs.orgName,
            shippingMethod = refs.shippingMethod,
            freightTerms = refs.freightTerms,
            system = refs.systemName,
            systemStore = system.store,
            siteId = record.get('id');

        me.loadSystemStore(systemStore, siteId);
        var form = me.getView();
        if (form != null && !form.isResubmit) {
            system.reset();
            org.reset();
            shippingMethod.reset();
            freightTerms.reset();
            shippingMethod.disable();
            freightTerms.disable();
            org.disable();
        }
        system.enable();
        system.bindStore(systemStore);

    },
    onSystemSelect: function (combo, record) {

        var refs = this.getReferences(),
            org = refs.orgName,
            store = org.store,
            systemId = record.get('id');
        var form = this.getView();
        if (form != null && !form.isResubmit) {
            org.reset();

        }

        org.enable();
        var proxy = new Ext.data.proxy.Rest({
            url: applicationContext + '/rest/org/system/' + combo.getValue(),
            appendId: true,
            reader: {
                type: 'json',
                rootProperty: 'org',
                totalProperty: 'totalCount'
            },
            autoLoad: true
        });

        store.setProxy(proxy);
        // dynamically add validation for empty store of org (Saumya)
        store.load(function () {
            if (store.getCount() > 0) {
                var form = this.getView();
                if (form != null && !form.isResubmit) {
                    org.reset();
                }

                org.enable();
            } else {
                org.disable();
                var msg = AOCLit.orgCountMsg;
                Helper.showToast('Success', msg);
            }
        });
    },
    loadSystemStore: function (systemStore, value) {
        var me = this,
            refs = me.getReferences(),
            org = refs.orgName,
            shippingMethod = refs.shippingMethod,
            freightTerms = refs.freightTerms,
            system = refs.systemName,
            systemStore = system.store;
        var proxy = new Ext.data.proxy.Rest({
            url: applicationContext + '/rest/system/site/' + value,
            appendId: true,
            reader: {
                type: 'json',
                rootProperty: 'system',
                totalProperty: 'totalCount'
            },
            autoLoad: true
        });

        systemStore.setProxy(proxy);
        //calcuting store count for adding validation (Saumya)		  
        systemStore.load(function () {
            if (systemStore.getCount() > 0) {
                var form = me.getView();
                if (form != null && !form.isResubmit) {
                    system.reset();
                    org.reset();
                    shippingMethod.reset();
                    freightTerms.reset();
                    shippingMethod.disable();
                    freightTerms.disable();
                    org.disable();
                }
                if (systemStore.getCount() > 0) {
                    system.enable();
                }

                system.bindStore(systemStore);
            } else {
                system.disable();
                var msg = AOCLit.systemCountMsg;
                Helper.showToast('Success', msg);

            }
        });
    },
    onOrgSelect: function (combo, record) {

        var me = this,
            refs = me.getReferences(),
            systemRefs = refs.systemName,
            shippingMethod = refs.shippingMethod,
            freightTerms = refs.freightTerms,
            freightStore = freightTerms.store,
            shippinStore = shippingMethod.store,
            systemId = systemRefs.getValue(),
            shipingUrl = 'ShippingMethod/' + systemId + '/' + combo.getValue(),
            freightUrl = 'FreightTerms/' + systemId + '/' + combo.getValue();

        me.loadShippingMethodStore(shippinStore, shipingUrl);
        me.loadShippingMethodStore(freightStore, freightUrl);
        var form = me.getView();
        if (form != null && !form.isResubmit) {
            shippingMethod.reset();
            freightTerms.reset();
        }

        shippingMethod.enable();
        freightTerms.enable();

    },
    closeWindow: function () {
        Ext.getBody().unmask();
        this.getView().close();
        this.runTime.setWindowInEditMode(false);
        var grid = Ext.ComponentQuery.query('#AddressManageGriditemId')[0];
        grid.store.load();
    },
    loadShippingMethodStore: function (store, url) {
        var response = Ext.Ajax.request({
            async: false,
            url: applicationContext + '/rest/orderconfigurations/orgId/' + url
        });

        var items = Ext.decode(response.responseText);
        var jsonValue = Ext.decode(response.responseText);
        var serviceStoreData = [];

        if (jsonValue.length > 0) {
            Ext.Array.forEach(jsonValue, function (item) {
                var service = [item];
                serviceStoreData.push(service);
            });
            store.loadRawData(serviceStoreData);
        } else {
            store.removeAll();
        }
    },
    deleteResource: function (record) {
        var ID = record.get('id');
        var me = this;
        Ext.Msg.confirm('Alert', AOCLit.deleteAddressMsg, function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    method: 'DELETE',
                    url: applicationContext + '/rest/address/' + ID,
                    success: function (response, opts) {
                        Helper.showToast('Success', AOCLit.deleteAddMsg);
                        me.runTime.getActiveGrid().store.load();
                    },
                    failure: function (response, opts) {}
                });
            }
        });
    },
    HideMandatoryMessage: function () {
        var createaddress = this.getView();
        createaddress.down('#messageFieldItemId').setValue('').setVisible(true);
        createaddress.down('#messageFieldItemId').setHidden('true');
    },
    notifyByMessage: function () {
        var addresssearch = Ext.ComponentQuery.query('#addressAdvancedSerachwindow')[0];
        addresssearch.down('#messageFieldItemId').setValue('').setVisible(true);
        addresssearch.down('#messageFieldItemId').setHidden('true');
    },
    onAfterRenderSiteCombo:function(obj){
	    var userInfo = AOCRuntime.getUser(),
	    	userId = userInfo.id,
	    	siteId = userInfo.siteId;
    	obj.getStore().proxy.extraParams = {
		    siteId: siteId,
		    userId: userId
		};
    	obj.getStore().load();
    },
    onAfterRenderPartnerCombo:function(obj){
	    var userInfo = AOCRuntime.getUser(),
	    	siteId = userInfo.siteId;
	    obj.getStore().proxy.extraParams = {
	    siteId: siteId
	    };
	    obj.getStore().load();
    },
    
    onAddressAfterRender:function(){
    	var me = this,
    		refs = me.getReferences(),
    		view = me.getView(),
    		userinfo = AOCRuntime.getUser(),
    		roleId = userinfo.role;
	
		if(view.rec!=null){
			if(view.rec.data!=null){
				var orgName = refs['orgName'],
					siteId = view.rec.get('siteId'),
					systemId = view.rec.get('system');
				
				refs['partnerName'].store.load();
				refs['siteName'].store.load();
				
				refs['shippingMethod'].enable();
				refs['freightTerms'].enable();
				orgName.enable();
				
				me.loadSystemStoreA(refs['systemName'].store,siteId);
				me.loadOrgStoreA(orgName.store,systemId);
				
				refs['addressForm'].getForm().loadRecord(view.rec);
			}else{
				refs['addressForm'].getForm().loadRecord(view.rec);
			}
		}
		if(roleId == 3){
			me.setReadOnlyView(true);
		}
    },
    loadSystemStoreA:function(systemStore, value){
		var proxy = new Ext.data.proxy.Rest({
			url: applicationContext+'/rest/system/site/'+ value,
			appendId: true,
			reader: {
				type:'json',
				rootProperty: 'system',
				totalProperty: 'totalCount'
			},
			autoLoad:true
		});

		systemStore.setProxy(proxy);
		systemStore.load();
	},
	loadOrgStoreA:function(orgStore, value){
		var proxy = new Ext.data.proxy.Rest({
			url: applicationContext+'/rest/org/system/'+ value,
			appendId: true,
			reader: {
				type: 'json',
				rootProperty: 'org',
				totalProperty: 'totalCount'
			},
			autoLoad:true
		});

		orgStore.setProxy(proxy);
		orgStore.load();
	},
    setReadOnlyView: function (readOnlyFlag) {
	    var refs = this.getReferences(),
	        addressForm = refs.addressForm,
	        textFieldArray = addressForm.query('[xtype = textfield]'),
	        comboArray = addressForm.query('[xtype = combobox]'),
	        tempArray = [].concat(textFieldArray)
	        			.concat(comboArray);

	    var len = tempArray.length;
	    for(var i = 0; i < len; i++) {
	    	tempArray[i].setReadOnly(readOnlyFlag);
	    }
	}
});
