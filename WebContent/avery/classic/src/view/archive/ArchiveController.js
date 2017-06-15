Ext.define('AOC.view.archive.ArchiveController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.archiveMain',
    requires : ['AOC.view.orderqueue.SalesOrderExpandableGrid','AOC.view.advsearch.AddressAdvanceSearch','AOC.view.advsearch.ArchiveManageAdvanceSearch'],
    //stores:['ArchiveStore'],
    runTime : AOC.config.Runtime,
    refs : [
	    {
		   	selector : 'viewport #orderFileQueueArchiveManageGriditemId',
	 	 	ref : 'ar_orderfilequeue'
	    }
	 	],
	 	onButtonClick : function(button, e, options){
			var currentView = this.getView();
			var archiveView=currentView.down('#archivePanel');
			var activeItem = archiveView.getLayout().getActiveItem();
			if(activeItem){
				activeItem.destroy();
			}
			var valueObj=(currentView.lookupReference('cmbformArchive')).getForm().getValues(false,true);
			var parameters=Ext.JSON.encode(valueObj);
			var archiveStore=Ext.create('AOC.store.ArchiveStore', {
				proxy : {
					type : 'rest',
					url : applicationContext+'/rest/'+valueObj.tableName,
					//params : parameters,
					reader:{
				        type:'json', 
				        rootProperty: valueObj.tableName,
				        totalProperty : 'totalCount'
				    },
			        headers     : {
			            "Authorization" : "Basic YWRtaW46aW5kaWdvMQ=="
			        }
			}
			});
			var store=archiveStore;
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
			//console.log(archiveStore);
			archiveView.insert({
			   	xtype:valueObj.tableName,
			    flex:1,
			    store:archiveStore
		   });
			archiveView.getLayout().setActiveItem(0);
			//archivetables.reconfigure(archiveStore);
			archiveStore.load();
		},
		
		openAdvancedSearchWindow:function(e,t,eOpts)
		{
				 var temp=Ext.ComponentQuery.query('#archivesearchItemIdwin')[0];
		 if(!temp){
				 temp = Ext.create('AOC.view.base.BaseWindow',{
						 	height:350,
							width:300,
							//title:advancedSearchWindowTitle,
							itemId:'archivesearchItemIdwin',
							layout: 'fit',
							draggable: false,
							modal:true,
							closeAction:'hide',
						 	items : [{  xtype : 'archiveadvancesearch' }]
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
			         temp.showAt(x - width, y + 26);
			     } 
					else if (Ext.isChrome || Ext.isSafari) {
						 browser = "Chrome";
						 var d = Ext.get(e.getTarget());
						 var width = temp.width;
						 width=width-24;
						 x=d.getX();
						 y=d.getY();
	  	        		 temp.show();
					}
					return false;
			},
			getArchiveBasedOnSearchParameters: function() {
				var currentView=Ext.ComponentQuery.query('#archivemanageitemId')[0];
				archiveView=currentView.down('#archivePanel');
				var grid=archiveView.getLayout().getActiveItem();
				var valueObj=this.getView().getForm().getValues(false,true);
				var FromDate=this.lookupReference('fromDate').getValue();
			 	var ToDate=this.lookupReference('toDate').getValue();
				 if(FromDate<=ToDate)
				 		{
		    	 if(!valueObj.hasOwnProperty('datecriteriavalue'))
		    		valueObj.datecriteriavalue='createdDate';
				    var parameters=Ext.JSON.encode(valueObj);
		    		var valueObj=(currentView.lookupReference('cmbformArchive')).getForm().getValues(false,true);
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
		        this.getView().up('window').hide();
				 		}
			     else
			    	 {
			       var archivesearch=Ext.ComponentQuery.query('#archivesearchItemIdwin')[0];
				    archivesearch.down('#messageFieldItemId').setValue(AOCLit.setDateMsg).setVisible(true);
			    	 }
			},
			clearAdvancedSerach:function(widget){
				    var win = Ext.ComponentQuery.query('#archivesearchItemIdwin')[0];
				    win.destroy();
					var currentView=Ext.ComponentQuery.query('#archivemanageitemId')[0];
					archiveView=currentView.down('#archivePanel');
					var grid=archiveView.getLayout().getActiveItem();
				   	var store = grid.store;
					store.clearFilter();
					store.loadPage(1);
					widget.setVisible(false);
					var temp=grid.down('#advancesearchbutton');
				    temp.enable();
			},
			  notifyByMessage:function()
			    {
				  var archivesearch=Ext.ComponentQuery.query('#archivesearchItemIdwin')[0];
				  archivesearch.down('#messageFieldItemId').setValue('').setVisible(true);
			    }
});