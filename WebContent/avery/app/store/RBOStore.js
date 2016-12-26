Ext.define('AOC.store.RBOStore', {
	extend : 'Ext.data.Store',
	fields:['id','rboName'],
	storeId:'rboId',
	proxy: {
        type: 'rest',
        url         : applicationContext+'/rest/rbo',
        reader      : {
            type          : 'json',
            rootProperty          : 'ArrayList'
        }
        
    }
});

