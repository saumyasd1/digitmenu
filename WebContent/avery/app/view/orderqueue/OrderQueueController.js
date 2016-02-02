Ext.define('AOC.view.orderqueue.OrderQueueController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orderqueue',
    requires: ['AOC.view.orderqueue.SalesOrderExpandableGrid', 
               'AOC.view.advsearch.OrderQueueAdvanceSearch', 
               'AOC.view.orderqueue.OrderLineContainer'],
    runTime: AOC.config.Runtime,
    getOrdersBasedOnSearchParameters: function() {
        var OrderQueueStore = Ext.create('AOC.store.OrderQueueStore', {storeId:'OrderQueueId'});
        var bulkupdategrid = this.getView();
        bulkupdategrid.bindStore(OrderQueueStore);
    },
    init : function(){
	     var me=this;
	 me.menuTpl=me.buildMenuTpl();    
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
                height: 600,
                width: 580,
                //title: advancedSearchWindowTitle,
                itemId: 'orderqueueadvancesearchIDWindow',
                layout: 'fit',
                draggable: false,
                modal: true,
                store: store,
                closeAction:'hide',
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
        
        var FromDate=this.lookupReference('fromDate').getValue();
	 	var ToDate=this.lookupReference('toDate').getValue();
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
    	if(temp){
    	temp.destroy();
    	}
        var grid = this.getView();
        var store = grid.store;
        store.clearFilter();
        widget.setVisible(false);
        var temp = grid.down('#advancesearchbutton');
        if(temp)
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
    onClickMenu:function(obj,rowIndex,colIndex,item,e,record){
	      var me=this;
	      var callout = Ext.widget('callout', {
	          cls                  : 'white more-menu-item-callout extra',
	          html                 : me.menuTpl.apply(record.data),
	          target               : e.target,
	          calloutArrowLocation : 'top-left',
	          relativePosition     : 't-b',
	          relativeOffsets      : [52,23],
	          dismissDelay         : 0,
	          listeners            : {
            afterrender : me.onAfterRenderEditCallout,
            viewOrders: function(cmp){
               currentRecord = e.record;
        	   var id = currentRecord.get('id');
               me.runTime.setOrderQueueId(id);
               me.runTime.setOrderQueueActiveRecord(currentRecord);
               me.runTime.setOrderQueueStatus(currentRecord.get('Status'));
               me.runTime.setAllowOrderLineEdit(true);
               var bulkUpdate = Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
        	   Ext.getBody().mask('Loading...');
                var owner = me.getView().ownerCt;
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
            	callout.destroy();
            },
            viewSales: function(cmp){
            	  currentRecord = e.record;
            	  var id = currentRecord.get('id');
            	  me.runTime.setOrderQueueId(id);
            	  me.runTime.setOrderQueueActiveRecord(currentRecord);
            	  me.runTime.setOrderQueueStatus(currentRecord.get('Status'));
            	  me.runTime.setAllowOrderLineEdit(true);
                  var bulkUpdate = Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
                      var owner = me.getView().ownerCt;
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
            	callout.destroy();
            },
            cancelOrder: function(cmp){
               currentRecord = e.record;
        	   var id = currentRecord.get('id');
        	   me.runTime.setOrderQueueId(id);
        	   me.runTime.setOrderQueueActiveRecord(currentRecord);
        	   me.runTime.setOrderQueueStatus(currentRecord.get('Status'));
        	   me.runTime.setAllowOrderLineEdit(true);
               var bulkUpdate = Ext.ComponentQuery.query('#bulkUpdateItemId')[0];
            	me.getCancelOrderWindow(id);
            	
            },
            reSubmitOrder:function(cmp){
                var rec =e.record;
                var con=AOC.app.getController('MenuController');
                con.selectCard('weborderview');
                con.selectMenuItem('weborderview');
                var weborderview=Ext.ComponentQuery.query('weborderview')[0];
                var weborderform=weborderview.down('#weborderformItemId'),
                attachmentinfoGrid=weborderview.down('#AttachmentInfoGriditemId');
                weborderform.reset();
                attachmentinfoGrid.store.removeAll();
                attachmentinfoGrid.getView().refresh();
                var partnerId =(Ext.isEmpty(rec.get('partner')))?"":rec.get('partner').id,
                productLineId =(Ext.isEmpty(rec.get('productLine')))?"":rec.get('productLine').id,
                rboId =(Ext.isEmpty(rec.get('productLine')))?"":rec.get('productLine').rboId,
                oderFileName = (Ext.isEmpty(rec.get('OrderFile')[0]))?"":rec.get('OrderFile')[0].fileName;
                weborderform.getForm().setValues({"partnerName":partnerId,
            	"rboName":rec.get('RBOName'),"productLineType":productLineId,
            	"email":rec.get('SenderEmailID'),"subject":rec.get('Subject'),
            	"emailBody":rec.get('emailBody'),"orderFileType":oderFileName,
            	"oldOrderId":rec.get('id')
                });
                var controller=  weborderform.getController();
                if(!Ext.isEmpty(oderFileName)){
                controller.insertFileInGrid(oderFileName,'Order File Type',false,null,rec.get('OrderFile')[0].id);
                }
                var attachFile=(Ext.isEmpty(rec.get('orderFileAttachment')))?[]:rec.get('orderFileAttachment');
            	 for(var i=0;i<attachFile.length;i++){
            	     if(attachFile[i].fileContentType!="Order")
            	     controller.insertFileInGrid(attachFile[i].fileName,'Attachment',true,i,attachFile[i].id); 
            	 }
            	weborderview.down('#backButtonimage').setVisible(true);
            	weborderview.updateHeaderLabel(fixAndResubmitWebOredr);
            }
        }
	          });
	      callout.show();   
	  },
	  onAfterRenderEditCallout : function(cmp){
	        var me = this;
	        cmp.el.on({
	            delegate: 'div.user-profile-menu-item',
	            click    : function(e,element){
	                var el    = Ext.get(element),
	                    event = el.getAttribute('event');
	                if (event && !el.hasCls('edit-menu-disabled')){
	                    me.fireEvent(event);
	                    if(cmp)
	                    	cmp.destroy();
	                }
	            }
	        });
	    },
	  buildMenuTpl : function(){
	    	  var me=this;
	    	 return Ext.create('Ext.XTemplate',
	    		  '<tpl if="this.isViewOrderDisabled(values)==false">',
	    	      '<div style="width: 140px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="viewOrders">View Order Line</div>',
	              '</tpl>',
	              '<tpl if="this.isViewOrderDisabled(values)">',
	    	      '<div style="width: 140px  !important;border-bottom: none !important;background: #FFFFFF;cursor:default;" class="user-profile-menu-callout order-profile-menu-item">View Order Line</div>',
	              '</tpl>',
	              '<tpl if="this.isViewSalesDisabled(values)==false">',
	              '<div style="width: 140px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="viewSales">View Sales Order</div>',
	              '</tpl>',
	              '<tpl if="this.isViewSalesDisabled(values)">',
	              '<div style="width: 140px !important;border-bottom: none !important;background: #FFFFFF;cursor:default;" class="user-profile-menu-callout order-profile-menu-item">View Sales Order</div>',
	              '</tpl>',
	              '<tpl if="this.isReSubmitOrderDisabled(values)==false">',
	              '<div style="width: 140px !important;border-bottom: none !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item"  event="reSubmitOrder">ReSubmit Order</div>',
	              '</tpl>',
	              '<tpl if="this.isReSubmitOrderDisabled(values)">',
	              '<div style="width: 140px !important;border-bottom: none !important;background: #FFFFFF;cursor:default;" class="user-profile-menu-callout order-profile-menu-item">ReSubmit Order</div>',
	              '</tpl>',
	              '<tpl if="this.isCancelOrderDisabled(values)==false">',
	              '<div style="width: 140px !important;background: #FFFFFF;cursor:pointer;" class="user-profile-menu-callout user-profile-menu-item "  event="cancelOrder">Cancel Order</div>',
	              '</tpl>',
	              '<tpl if="this.isCancelOrderDisabled(values)">',
	              '<div style="width: 140px !important;background: #FFFFFF;cursor:default;" class="user-profile-menu-callout order-profile-menu-item"">Cancel Order</div>',
	              '</tpl>',
	              {
	    		 isViewOrderDisabled:function(v){
		    	   return (v.orderLineCount==0);
	    		 },
	    		 isViewSalesDisabled:function(v){
		    	  return (v.salesOrderCount==0);
	    		 },
	    		 isReSubmitOrderDisabled:function(v){
	    		 return (v.Status!=cancelStatus);
	    		 },
		         isCancelOrderDisabled : function(v){
	    		 return (v.Status!=orderError);
		         }
	              }
	          );
	       },
    getCancelOrderWindow: function(id) {
        var win = Ext.create('AOC.view.orderqueue.CancelOrderWindow');
        win.show();
    },
    notifyByMessage:function()
    {
    	var ordersearch=Ext.ComponentQuery.query('#orderqueueadvancesearchIDWindow')[0];
	 	ordersearch.down('#messageFieldItemId').setValue('').setVisible(true);
	 	ordersearch.down('#messageFieldItemId').setHidden('true');
    }
})