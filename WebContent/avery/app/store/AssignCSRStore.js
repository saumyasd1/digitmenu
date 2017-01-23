Ext.define('AOC.store.AssignCSRStore', {
	extend : 'Ext.data.Store',
	model:'AOC.model.AssignCSRModel',
	autoLoad : true,
	remoteSort: true,
	storeId:'AssignCSRStore',
	proxy:{
		type:'ajax',
		url: applicationContext+'/rest/users/csrlist',
		reader:{
	        type:'json', 
	        rootProperty:'users' //temp name for now
	    }
	},
	sorters: [{
 		property:'csrName',
 		direction:'ASC'
 	}]
});