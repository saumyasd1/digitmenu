Ext.define('AOC.model.OrderHeaderModel',{
    extend: 'Ext.data.Model',
	idProperty:null,
    fields: [
        {
		name : 'PartnerName',
		mapping : 'PartnerName',
		type: 'string'
	}, {
		name : 'RBOName',
		mapping : 'RBOName'
	}, {
		name : 'CustomerPONumber',
		mapping : 'CustomerPONumber'
	},{
		name : 'OrderedDate',
		mapping : 'OrderedDate'
	},{
		name : 'Status',
		mapping : 'Status'
	}
    ]
});