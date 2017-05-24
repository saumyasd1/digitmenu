Ext.define('AOC.store.AssignCSRStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.AssignCSRModel',
	remoteSort: true,
	storeId:'AssignCSRStore',
	proxy:{
		type:'ajax',
		url: applicationContext+'/rest/users/csrlist',
		reader:{
	        type:'json', 
	        rootProperty:'users' //temp name for now
	    }
	}
});