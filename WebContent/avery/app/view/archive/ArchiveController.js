Ext.define('AOC.view.archive.ArchiveController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.archiveMain',
    requires : ['AOC.view.orderqueue.SalesOrderExpandableGrid','AOC.view.advsearch.AddressAdvanceSearch'],
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
		}
});