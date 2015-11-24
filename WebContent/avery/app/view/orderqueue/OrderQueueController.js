Ext.define('AOC.view.orderqueue.OrderQueueController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.orderqueue',
    requires : ['AOC.view.orderqueue.SalesOrderExpandableGrid','AOC.view.advsearch.OrderQueueAdvanceSearch','AOC.view.orderqueue.OrderLineExpandableGrid'],
    runTime : AOC.config.Runtime,
    getOrdersBasedOnSearchParameters: function() {
		var OrderQueueStore=Ext.create('AOC.store.OrderQueueStore',{
		});
		var bulkupdategrid=this.getView();
		bulkupdategrid.bindStore(OrderQueueStore);
   },
   menuAction:function( menu, item, e, currentRecord){
	   var id= currentRecord.get('id');
	   this.runTime.setOrderQueueId(id);
	   if(item.action=='viewSales'){
		   var owner=this.getView().ownerCt;
		   owner.insert({
			   	xtype:'salesrrderexpandablegrid',
			    flex:1
		   });
		   owner.getLayout().setActiveItem(1);
	   }else if(item.action=='cancelOrder'){
		  this.cancelOrder(id);
	   }else if(item.action=='viewOrders'){
		   var owner=this.getView().ownerCt;
		   var store=Ext.create('AOC.store.OrderLineStore', {
				proxy : {
					type : 'rest',
					url : applicationContext+'/rest/orderLines/order/'+id,
					reader:{
				        type:'json', 
				        rootProperty: 'ArrayList'
				    }
			}
			});

		   owner.insert({
			   	xtype:'orderlineexpandablegrid',
			    flex:1,
			    store:store
		   });
		   owner.getLayout().setActiveItem(1);
	   }
   },
  openAdvancedSearchWindow:function(cmp,event){
	   var temp=Ext.ComponentQuery.query('#orderqueueadvancesearchID')[0];
		 if(!temp){
			 
				store = Ext.create('AOC.store.PartnerProductLineStore',{
						storeId:'PartnerProductLineStoreStoreId',
						totalCount:'total',
						proxy: {
							type: 'rest',
					         url        : applicationContext+'/rest/productLines',
					        reader      : {
					            type          : 'json',
					            rootProperty          : 'productlines',
					            totalProperty : 'totalCount'
					        }
					    }
					});
				 temp = Ext.create('Ext.window.Window',{
						 	height:280,
							width:600,
							title:"Advance Search",
							itemId:'orderqueueadvancesearchID',
							layout: 'fit',
							draggable: false,
							modal:true,
						 	listeners:{ 
						 	      afterrender:function(obj){
						 	    	 obj.down('#productLineComboItemId').bindStore(store);
						 	    	 store.load();
						 	},
						 	beforedestroy: function(btn) {
						 		 cmp.enable();
						 	}
				        },
						 	items : [{  xtype : 'orderqueueadvancesearch' }]
					 });
		         }
					if (Ext.isIE || Ext.isGecko) {
						browser = "IE";
						var width = temp.width; //width of advanced search panel
						box = this.getBox();
						width=width-25; //remove margin
	  	        		temp.showAt(box.x-width,box.y+26);
					}
					else if (Ext.isChrome || Ext.isSafari) {
						 browser = "Chrome";
						 var d = Ext.get(event.getTarget());
						 var width = temp.width;
						 width=width-24;
						 x=d.getX();
						 y=d.getY();
	  	        		 temp.showAt(x-width,y+20);
					}
					return false;
   },
   getOrderBasedOnSearchParameters:function(store){
	 	var valueObj=this.getView().getForm().getValues(false,true);
    	if(!valueObj.hasOwnProperty('datecriteriavalue'))
    		valueObj.datecriteriavalue='createdDate';
		var parameters=Ext.JSON.encode(valueObj);
    	var grid=this.runTime.getActiveGrid();
    	var store=grid.store;
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
            property:'query',
            value:parameters
        });
        grid.down('#clearadvanedsearch').show();
        this.getView().up('window').destroy();
	},
	clearAdvancedSerach:function(widget){
		 var grid=this.getView();
		   	var store = grid.store;
			store.clearFilter();
			store.loadPage(1);
			widget.setVisible(false);
			var temp=grid.lookupReference('#advancesearchbutton');
		    temp.enable();
	},
	getQuickSearchResults:function(cmp){
		var store=this.getView().store;
		   var value=cmp.getValue();
		   if(value!=null && value!=''){
	       store.proxy.setFilterParam('query');
	       var parameters='{"PartnerName":"'+value+'"}';
	       store.setRemoteFilter(true);
	       if (!store.proxy.hasOwnProperty('filterParam')) {
	           store.proxy.setFilterParam('query');
	       }
	       store.proxy.encodeFilters = function(filters) {
	           return filters[0].getValue();
	       };
	       store.filter({
	    	   id: 'query',
	           property:'query',
	           value:parameters
	       });
		   }
		   cmp.orderedTriggers[0].show();
	},
	   getSearchResults:function(cmp,e){
		   var me=this;
		   if (e.getKey() == e.ENTER) {
			   me.getQuickSearchResults(cmp);
		   }
	   },
	   clearSearchResults:function(cmp){
		   var grid=this.getView();
		   	var store = grid.store;
			store.clearFilter();
			store.loadPage(1);
			cmp.setValue('');
			cmp.orderedTriggers[0].hide();
	   },
   showMenu : function(view,rowIndex,colIndex,item,e) {
		var me=this,currentRecord=e.record;;
			var menu=Ext.create('Ext.menu.Menu', {
   		    width: 150,
   		    margin: '0 0 10 0',
   		 items: [{
				text: 'Cancel Order',
				action:'cancelOrder'
			},{
				text: 'View Order Line',
				action:'viewOrders'
			},{
				text: 'View Sales Order',
				action:'viewSales'
			},{
				text: 'ReSubmit Order',
				action:'reSubmitOrder'
			}
		  ],
		  listeners : {
				click: function(menu, item, e){
				me.menuAction(menu, item, e,currentRecord);
				}
				}
   		});
   	menu.showAt(e.getX()-140,e.getY()+10);
	},
	cancelOrder:function(id){
		var me=this;
		Ext.Msg.confirm('', 'Are you sure you want to cancel the order?',function(btn){
			  if(btn=='yes'){
				  var parameters='{\"status\":\"Cancelled\"}';
					Ext.Ajax.request( {
				        url : applicationContext+'/rest/orders/'+id,
				        method:'PUT',
				        jsonData:parameters,
				        success : function(response, opts) {
					  		Ext.Msg.alert('Order cancelled successfully');
					  		Ext.getBody().unmask();
					  		me.getView().store.load();
				        },
				        failure: function(response, opts) {
				        	Ext.getBody().unmask();
			          }
			  	});
			  }
		});
	}
})