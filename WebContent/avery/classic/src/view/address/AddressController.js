Ext.define('AOC.view.address.AddressController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.addresscontroller',
    requires: ['AOC.view.advsearch.AddressAdvanceSearch'],
    runTime: AOC.config.Runtime,
    init: function () {
        var me = this;
        me.menuTpl = me.buildMenuTpl();
    },
    clearAdvancedSearch: function (btn) {
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        btn.hide();
    },
    getQuickSearchResults: function (cmp) {
        var view = this.getView(),
            value = cmp.getValue();
        Helper.quickSearch(view, {
                siteNumber: value
            }),
            cmp.orderedTriggers[0].show();
    },
    getSearchResults: function (cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.getQuickSearchResults(cmp);
        }
    },
    clearSearchResults: function (cmp) {
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        cmp.setValue('');
        cmp.orderedTriggers[0].hide();
    },
    getAdvancedSearchResults: function (cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.onSearchBtnClicked();
        }
    },

    openAdvancedSearchWindow: function () {
        var advanceSearchWin = Ext.create('AOC.view.advsearch.AddressAdvanceSearch', {
            contextGrid: this.getView()
        });
        if (!advanceSearchWin.isVisible()) {
            advanceSearchWin.show();
        }
    },
    onSearchBtnClicked: function (btn) {
        var view = this.getView(),
            refs = view.getReferences(),
            form = refs.addressAdvanceSearchForm.getForm(),
            values = form.getValues();
        values.datecriteriavalue = 'createdDate';
        store = view.contextGrid.store;
        Helper.advancedSearch(view, values);
    },
    openAddAddressWindow: function (currentRecord, id) {
        var view = this.getView(),
        	mode = this.runTime.getWindowInEditMode(),
        	title = mode ? 'Edit Address' : 'Add Address';
           	win = Ext.create('AOC.view.address.AddAddressWin', {
                title: AOCLit.addAddress,
                rec: currentRecord,
                editMode: mode,
                ID: id
            });
           	
         win.show(); 	
    },
    
    onClickMenu: function (obj, rowIndex, colIndex, item, e, record) {
        var me = this;
        var callout = Ext.widget('callout', {
            cls: 'white more-menu-item-callout extra',
            html: me.menuTpl.apply(record.data),
            target: e.target,
            calloutArrowLocation: 'top-left',
            relativePosition: 't-b',
            relativeOffsets: [52, 23],
            dismissDelay: 0,
            listeners: {
                afterrender: me.onAfterRenderEditCallout,
                edit: function (cmp) {
                    currentRecord = e.record;
                    me.runTime.setWindowInEditMode(true);
                    me.openAddAddressWindow(currentRecord, currentRecord.get('id'));
                    callout.destroy();
                },
                viewAddress: function (cmp) {
                    var currentRecord = e.record;
                    me.runTime.setWindowInEditMode(true);
                    me.openAddAddressWindow(currentRecord, currentRecord.get('id'));
                    callout.destroy();
                },
                deleteaddress: function (cmp) {
                    currentRecord = e.record;
                    var ID = record.get('id');
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
                    callout.destroy();
                }
            }
        });
        callout.show();
        var heightAbove = e.getY() - Ext.getBody().getScroll().top,
            heightBelow = Ext.Element.getViewportHeight() - heightAbove;
        if (heightBelow < (callout.getHeight() + 40)) {
            callout.calloutArrowLocation = 'bottom-left';
            callout.relativePosition = 'b-t';
            callout.relativeOffsets = [55, 0];
        } else {
            callout.calloutArrowLocation = 'top-left';
            callout.relativePosition = 't-b';
            callout.relativeOffsets = [55, 5];
        }
        callout.show();
    },
    
    onAfterRenderEditCallout: function (cmp) {
        var me = this;
        cmp.el.on({
            delegate: 'div.user-profile-menu-item',
            click: function (e, element) {
                var el = Ext.get(element),
                    event = el.getAttribute('event');
                if (event && !el.hasCls('edit-menu-disabled')) {
                    //	                    cmp.destroy();
                    me.fireEvent(event);
                }
            }
        });
    },
    buildMenuTpl: function () {
        var me = this;
        return Ext.create('Ext.XTemplate',
            '<div style="width: 140px !important;border-bottom: none !important;{[this.getEditAddressStyle(values)]}" class="user-profile-menu-callout {[this.isEditEnableDisable(values)]}"  event="edit">Edit</div>',
            '<div style="width: 140px !important;border-bottom: none !important;{[this.getViewAddressStyle(values)]}" class="user-profile-menu-callout {[this.isViewEnableDisable(values)]}"  event="viewAddress">View</div>',
            '<div style="width: 140px !important;border-bottom: none {[this.getDeleteAddressStyle(values)]}" class="user-profile-menu-callout {[this.isDeleteEnableDisable(values)]}"  event="deleteaddress">Delete</div>', {
                isEditEnableDisable: function (v) {
                    if (AOCRuntime.getUser().role == 3) {
                        return 'order-profile-menu-item';
                    }
                    return 'user-profile-menu-item';
                },
                getEditAddressStyle: function (v) {
                    if (AOCRuntime.getUser().role == 3) {
                        return Helper.getDisableMenuItemStyle();
                    }
                    return Helper.getEnableMenuItemStyle();
                },
                isDeleteEnableDisable: function (v) {
                    if (AOCRuntime.getUser().role == 3) {
                        return 'order-profile-menu-item';
                    }
                    return 'user-profile-menu-item';
                },
                getDeleteAddressStyle: function (v) {
                    if (AOCRuntime.getUser().role == 3) {
                        return Helper.getDisableMenuItemStyle();
                    }
                    return Helper.getEnableMenuItemStyle();
                },
                isViewEnableDisable: function (v) {
                    if (AOCRuntime.getUser().role == 3) {
                        return 'user-profile-menu-item';
                    }
                    return 'order-profile-menu-item';
                },
                getViewAddressStyle: function (v) {
                    if (AOCRuntime.getUser().role == 3) {
                        return Helper.getEnableMenuItemStyle();
                    }
                    return Helper.getDisableMenuItemStyle();
                }
            }
        );
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
    }
    
});
