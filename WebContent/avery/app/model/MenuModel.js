Ext.define('AOC.model.MenuModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        {
		name : 'name',
		mapping : 'ServiceName'
	}, {
		name : 'parentservice',
		mapping : 'Path'
	}, {
		name : 'displayname',
		mapping : 'DisplayName'
	},{
		name : 'align',
		mapping : 'Align'
	}
    ]
});