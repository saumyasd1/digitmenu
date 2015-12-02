Ext.define('AOC.model.WebformModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        {name: 'sn', mapping:'sn',type: 'string'},
	    {name: 'fileName', mapping:'fileName',type: 'string'},
	    {name: 'fileType', mapping:'fileType',type: 'string'}
	    ]
});

