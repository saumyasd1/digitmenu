Ext.define('AOC.store.WIAOCFieldStore', {
	extend : 'Ext.data.Store',
	fields:['id','createdBy','createdDate', 'lastModifiedBy' ,'lastModifiedDate','aocFieldName'
        ,'fieldValueExample','logic','validation','reference'
    ]
});



