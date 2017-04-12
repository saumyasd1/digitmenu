Ext.define('AOC.store.WIAOCFieldStore', {
	extend : 'Ext.data.Store',
	fields:['id','createdBy','createdDate', 'lastModifiedBy' ,'lastModifiedDate','aocFieldName'
        ,'fieldValueExample','logic','validation','reference','fileName','filePath'
    ],
    autoLoad:false,
	proxy: {
        type: 'rest',
        url : applicationContext+ '/rest/aocfield/fielddata',
        reader: {
            type: 'json',
            rootProperty: 'aocfields'
        }
    }
});



