Ext.define('AOC.store.SiteStore', {
	extend : 'Ext.data.Store',
	fields:['id','name'],
	storeId:'siteId',
	proxy: {
        type: 'rest',
        //url : 'aoc/Partner/GET?action=getList',
        url         : applicationContext+'/rest/site',
        reader      : {
            type          : 'json',
            rootProperty          : 'ArrayList'
        }
        
    }
});

