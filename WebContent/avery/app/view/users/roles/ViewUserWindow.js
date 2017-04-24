Ext.define('AOC.view.users.roles.ViewUserWindow', {
    extend: 'AOC.view.base.NewBaseWindow',
    alias: 'widget.viewuserwindow',
    itemId: 'viewUserWindow',
    reference: 'viewUserWindow',
    layout: 'fit',
    width: 500,
    height: 500,
    title: 'View Users',
    initComponent: function () {
        var me = this;
        me.items = me.buildItems();

        me.callParent(arguments);
    },
    afterRender:function(){
		var me = this;
		me.callParent(arguments);
		this.mask(AOCLit.pleaseWaitTitle);
		var	grid = me.down('grid'),
			store = new Ext.data.JsonStore({
				fields:['id','email','firstName','lastName'],
				proxy : {
					type : 'rest',
					url : applicationContext+'/rest/role/users/'+ me.recordId,
					reader:{
						type:'json', 
						rootProperty: 'ArrayList'
					}
				},
				autoLoad:true
			});
		
		grid.bindStore(store);
		this.unmask();
	},
    buildItems: function () {
        var me = this;
        return [{
            xtype: 'grid',
            reference:'userGrid',
            reserveScrollbar: true,
            columnLines: true,
            border: true,
            emptyText: AOCLit.noContentTypeDispMsg,
            columns: [{
                text: AOCLit.firstName,
                flex: 0.5,
                dataIndex: 'firstName',
                name: 'firstName',
                resizable: false,
                sortable: false,
                resizable: false
            },{
                text: AOCLit.lastName,
                flex: 0.5,
                dataIndex: 'lastName',
                name: 'lastName',
                resizable: false,
                sortable: false,
                resizable: false
            
            }, {
                text: AOCLit.Email,
                flex: 1,
                dataIndex: 'email',
                name: 'email',
                resizable: false,
                sortable: false,
                resizable: false
            }]
        }];
    }
});
