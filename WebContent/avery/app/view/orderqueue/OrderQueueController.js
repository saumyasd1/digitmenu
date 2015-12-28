Ext.define('AOC.view.orderqueue.OrderQueueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orderqueue',
    requires: ['AOC.view.orderqueue.SalesOrderExpandableGrid', 
               'AOC.view.advsearch.OrderQueueAdvanceSearch', 
               'AOC.view.orderqueue.OrderLineContainer'],
    runTime: AOC.config.Runtime,
    getOrdersBasedOnSearchParameters: function() {
        var OrderQueueStore = Ext.create('AOC.store.OrderQueueStore', {});
        var bulkupdategrid = this.getView();
        bulkupdategrid.bindStore(OrderQueueStore);
    },
    menuAction: function(menu, item, e, currentRecord) {
        var id = currentRecord.get('id');
        this.runTime.setOrderQueueId(id);
        this.runTime.setOrderQueueActiveRecord(currentRecord);
        this.runTime.setOrderQueueStatus(currentRecord.get('Status'));
        var bulkUpdate = Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
        if(item)
        if (item.action == 'viewSales') {
            var owner = this.getView().ownerCt;
            var store = Ext.create('AOC.store.SalesOrderStore', {
                proxy: {
                    type: 'rest',
                    url: applicationContext + '/rest/salesorders/order/' + id,
                    reader: {
                        type: 'json',
                        rootProperty: 'ArrayList'
                    }
                }
            });
            owner.insert({
                xtype: 'salesrrderexpandablegrid',
                flex: 1,
                store: store
            });
            owner.getLayout().setActiveItem(1);

        } else if (item.action == 'cancelOrder') {
            this.getCancelOrderWindow(id);
        } else if (item.action == 'viewOrders') {
        	Ext.getBody().mask('Loading...');
            var owner = this.getView().ownerCt;
            var status=currentRecord.get('Status');
            var store = Ext.create('AOC.store.OrderLineStore', {
                storeId: 'OrderLineStoreId',
                proxy: {
                    type: 'rest',
                    url: applicationContext + '/rest/orderLines/order/' + id,
                    reader: {
                        type: 'json',
                        rootProperty: 'orderLine'
                    }
                }
            });
            owner.insert({
                xtype: 'orderlinecontainer',
                flex: 1,
                store: store
            });
            
            var orderlinecontainer = owner.down('orderlinecontainer'),
    		grid=orderlinecontainer.down('grid');
            validateButton = orderlinecontainer.lookupReference('validateButton'),
            bulkUpdateButton=grid.lookupReference('bulkUpdateButton'),
            salesViewOrderbutton= orderlinecontainer.lookupReference('salesViewOrderbutton'),
            salesOrderbutton=orderlinecontainer.lookupReference('salesOrderbutton'),
            cancelOrderButton=orderlinecontainer.lookupReference('cancelOrderButton'),
            form=grid.lookupReference('form'),salesOrderCount=currentRecord.get('salesOrderCount');
            if(status != waitingForCSRStatus) {
            	validateButton.disable();
            	bulkUpdateButton.disable();
            	salesViewOrderbutton.disable();
            	salesOrderbutton.disable();
            	cancelOrderButton.disable();
            	form.disable();
            }
            if(salesOrderCount!=0){
            	salesViewOrderbutton.enable();
            }
            owner.getLayout().setActiveItem(1);
            Ext.getBody().unmask();
        }
    },
    openAdvancedSearchWindow: function( e, t, eOpts) {
        var temp = Ext.ComponentQuery.query('#orderqueueadvancesearchIDWindow')[0];
        if (!temp) {
            store = Ext.create('AOC.store.PartnerProductLineStore', {
                storeId: 'PartnerProductLineStoreStoreId',
                totalCount: 'total',
                proxy: {
                    type: 'rest',
                    url: applicationContext + '/rest/productLines',
                    reader: {
                        type: 'json',
                        rootProperty: 'ArrayList',
                        totalProperty: 'totalCount'
                    }
                },
                listeners: {
                    'load': function(store, records, options) {
                        var uniqueValueArray = store.collect('productLineType');
                        var serviceStoreData = [];
                        if (uniqueValueArray.length > 0) {
                            uniqueValueArray.forEach(function(item) {
                                var service = [item];
                                serviceStoreData.push(service);
                            });
                            var serviceStore = Ext.create('Ext.data.ArrayStore', {
                                fields: ['productLineType'],
                                data: serviceStoreData
                            });
                            temp.down('#productLineComboItemId').bindStore(serviceStore);
                        }
                    }
                }
            });

            temp = Ext.create('AOC.view.base.BaseWindow', {
                height: 500,
                width: 560,
                //title: advancedSearchWindowTitle,
                itemId: 'orderqueueadvancesearchIDWindow',
                layout: 'fit',
                draggable: false,
                modal: true,
                store: store,
                closeAction:'hide',
                listeners: {
//                    afterrender: function(obj) {
//                        store.load();
//                    },
//                    beforedestroy: function(btn) {
//                        cmp.enable();
//                    }
                },
                items: [{
                    xtype: 'orderqueueadvancesearch'
                }]
            });
        }
        if (Ext.isIE || Ext.isGecko) {
            browser = "IE";
            var d = Ext.get(e.getTarget());
            var width = temp.width; //width of advanced search panel
           // box = this.getBox();
            width = width - 25; //remove margin
            x = d.getX();
            y = d.getY();
            temp.showAt();
        } else if (Ext.isChrome || Ext.isSafari) {
            browser = "Chrome";
            var d = Ext.get(e.getTarget());
            var width = temp.width;
            width = width - 24;
            x = d.getX();
            y = d.getY();
            temp.show();
        }
        return false;
    },
    getOrderBasedOnSearchParameters: function(store) {
        var valueObj = this.getView().getForm().getValues(false, true);
        var FromDate=valueObj.fromDate;
	 	var ToDate=valueObj.toDate;
	 	if(FromDate<=ToDate)
	 		{
        if (!valueObj.hasOwnProperty('datecriteriavalue'))
            valueObj.datecriteriavalue = 'receivedDate';
        var parameters = Ext.JSON.encode(valueObj);
        var grid = this.runTime.getActiveGrid();
    	var archievegrid=Ext.ComponentQuery.query('#orderFileQueueArchiveManageGriditemId')[0];
    	if(archievegrid !=null)
    		{
    		var currentView = Ext.ComponentQuery.query('#archivemanageitemId')[0];
    		var valueObj=(currentView.lookupReference('cmbformArchive')).getForm().getValues(false,true);
			var grid=archievegrid;
    		}
        var store = grid.store;
        store.proxy.setFilterParam('query');
        store.setRemoteFilter(true);
        if (!store.proxy.hasOwnProperty('filterParam')) {
            store.proxy.setFilterParam('query');
        }
        store.proxy.encodeFilters = function(filters) {
            return filters[0].getValue();
        };
        store.filter({
            id: 'query',
            property: 'query',
            value: parameters
        });
        grid.down('#clearadvanedsearch').show();
        this.getView().up('window').hide();
	 		}
	 	else
	 		{
	 	var ordersearch=Ext.ComponentQuery.query('#orderqueueadvancesearchIDWindow')[0];
	 	ordersearch.down('#messageFieldItemId').setValue('<center><font color=red>From Date must be less than or equal to To Date</font></center>').setVisible(true);
	 		}
    },
    clearAdvancedSerach: function(widget) {
    	var temp=Ext.ComponentQuery.query('#orderqueueadvancesearchIDWindow')[0];
    	temp.destroy();
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        store.loadPage(1);
        widget.setVisible(false);
        var temp = grid.down('#advancesearchbutton');
        temp.enable();
    },
    getQuickSearchResults: function(cmp) {
        var store = this.getView().store;
        var value = cmp.getValue();
        if (value != null && value != '') {
            store.proxy.setFilterParam('query');
            var parameters = '{"PartnerName":"' + value + '"}';
            store.setRemoteFilter(true);
            if (!store.proxy.hasOwnProperty('filterParam')) {
                store.proxy.setFilterParam('query');
            }
            store.proxy.encodeFilters = function(filters) {
                return filters[0].getValue();
            };
            store.filter({
                id: 'query',
                property: 'query',
                value: parameters
            });
        }
        cmp.orderedTriggers[0].show();
    },
    getSearchResults: function(cmp, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.getQuickSearchResults(cmp);
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
    showMenu: function(view, rowIndex, colIndex, item, e) {
        var me = this,
            currentRecord = e.record,
            disableCancelOption = true,disableOrderLineOption=false,disableSalesOrderOption=false,disableResubmitOrder=true;
        var status = currentRecord.get('Status'),orderLineCount=currentRecord.get('orderLineCount'),salesOrderCount=currentRecord.get('salesOrderCount');
        var error = currentRecord.get('error');
        if (status == orderError) {
        	disableCancelOption = false;
        	disableResubmitOrder=false;
        }
        if(salesOrderCount==0){
        	disableSalesOrderOption=true;
        }
        if(orderLineCount==0){
        	disableOrderLineOption=true;
        }
        var menu = Ext.create('Ext.menu.Menu', {
            width: 150,
            //layout:'fit',
            margin: '0 0 10 0',
            items: [{
                text: 'View Order Line',
                action: 'viewOrders',
                disabled:disableOrderLineOption
            }, {
                text: 'View Sales Order',
                action: 'viewSales',
                disabled: disableSalesOrderOption
            }, {
                text: 'ReSubmit Order',
                action: 'reSubmitOrder',
                disabled: disableResubmitOrder
            }, {
                text: 'Cancel Order',
                action: 'cancelOrder',
                disabled: disableCancelOption
            }],
            listeners: {
                click: function(menu, item, e) {
                    me.menuAction(menu, item, e, currentRecord);
                }
            }
        });
        menu.showAt(e.getX() - 140, e.getY() + 10);
    },
    getCancelOrderWindow: function(id) {
        var win = Ext.create('AOC.view.orderqueue.CancelOrderWindow');
        win.show();
    },
    notifyByMessage:function()
    {
    	var ordersearch=Ext.ComponentQuery.query('#orderqueueadvancesearchIDWindow')[0];
	 	ordersearch.down('#messageFieldItemId').setValue('').setVisible(true);
    }
})