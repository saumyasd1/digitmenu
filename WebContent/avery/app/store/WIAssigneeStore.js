Ext.define('AOC.store.WIAssigneeStore', {
	extend : 'Ext.data.Store',
	fields:['artWorkHold','csrName','defaultOrg','invoiceLineInstruction','manufacturing', 'packingInstruction',
        'shipMark','splitByShipSet', 'systemName','variableDataBreakdown'
    ],
    model:'AOC.model.WIAssigneeModel',
	autoLoad:false,
	proxy: {
        type: 'rest',
        url : applicationContext+ '/rest/wiusers/assignee',
        reader: {
            type: 'json',
            rootProperty:'assignee'
        }
    }
});

