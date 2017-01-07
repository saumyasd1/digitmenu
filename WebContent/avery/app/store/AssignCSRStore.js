Ext.define('AOC.store.AssignCSRStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.AssignCSRModel',
	autoLoad : true,
	remoteSort: true,
	storeId:'AssignCSRStore',
	proxy:{
		type:'ajax',
//		url: 'avery/app/data/CSRData.json',
		url: applicationContext+'/rest/users',
		reader:{
	        type:'json', 
	        rootProperty:'users' //temp name for now
	    }
	}
});