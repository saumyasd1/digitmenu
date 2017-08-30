Ext.define('AOC.model.LocalItemLookupModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
             {name: 'customerItemNO', mapping:'customerItemNO',type: 'string'},
             {name: 'glid', mapping:'glid',type: 'string'},
             {name: 'identifierValue', mapping:'identifierValue',type: 'string'},
             {name: 'partnerName', mapping:'partnerName',type: 'string'},
             {name: 'rboName', mapping:'rboName',type: 'string'},
             {name: 'orgCode', mapping:'orgCode',type: 'string'},
             {name: 'system', mapping:'system',type: 'string'},
             {name: 'lastModifiedBy', mapping:'lastModifiedBy',type: 'string'},
             {name: 'lastModifiedDate', mapping:'lastModifiedDate',type: 'string'}
            ]
});

