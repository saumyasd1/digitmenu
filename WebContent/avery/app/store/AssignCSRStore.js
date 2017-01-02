Ext.define('AOC.store.AssignCSRStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.AssignCSRModel',
	autoLoad : true,
	remoteSort: true,
	storeId:'AssignCSRStore',
	proxy:{
		type:'ajax',
		url: 'avery/app/data/CSRData.json',
		reader:{
	        type:'json', 
	        rootProperty:'items' //temp name for now
	    }
	}
});