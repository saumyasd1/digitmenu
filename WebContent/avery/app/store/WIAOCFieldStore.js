Ext.define('AOC.store.WIAOCFieldStore', {
	extend : 'Ext.data.Store',
	fields:['id','createdBy','createdDate', 'lastModifiedBy' ,'lastModifiedDate','aocFieldName'
        ,'fieldValueExample','logic','validation','reference'
    ],
    autoLoad:false,
	proxy: {
        type: 'rest',
        url : applicationContext+ '/rest/wiaocfield',
        reader: {
            type: 'json'
        }
    }
});



