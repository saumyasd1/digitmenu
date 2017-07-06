Ext.define('AOC.view.users.myprofile.SystemCsrCodeGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.systemcsrcodegrid',
    cls: 'aoc-panel',
    emptyText: AOCLit.emptyDataMsg,
    recordBeingEdit: null,
    hidden:true,
    initComponent: function () {
        var me = this;

        Ext.apply(this, {
            columns: this.buildColumns(),
            height: 160,
            scrollable: true,
            columnLines: false,
            tbar: {
                height: AOC.config.Settings.config.defaultTbarHeight,
                items: me.buildtbar()
            },
            store:Ext.create('AOC.store.SystemCsrCodeStore'),
            listeners: {
                cellClick: 'onSystemCsrCodeCellClick'
            },
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true
            }
        });
        this.callParent(arguments);
    },
    
    buildColumns: function () {
        var me = this;
        return [{
            text: 'System',
            width: 120,
            sortable: true,
            align:'left',
            dataIndex: 'systemName',
            flex: 1
        },{
            text: 'Org Code',
            width: 120,
            align:'left',
            sortable: true,
            dataIndex: 'orgCode',
            flex: 1
        }, {
            text: 'CSR Code',
            width: 120,
            align:'left',
            sortable: true,
            dataIndex: 'csrCode',
            flex: 1
        }, {
        	 text: 'Code Owner',
             width: 120,
             align:'left',
             sortable: true,
             dataIndex: 'codeOwner',
             flex: 0.5
        }, {
            text: 'Remove Row',
            width: 120,
            sortable: true,
            align:'center',
            flex: 0.5,
            renderer:function(value,metaData,record){
            	return '<i class="fa fa-trash-o delete-row" style = "font-size=16px;color=#2c3e50;"></i>'
            }
        }];
    },
    buildtbar: function () {
        var me = this;
        return [
            {
				xtype:'combobox',
				displayField:'name',
				reference:'systemName',
				valueField:'id',
				queryMode :'local',
				disabled:true,
				emptyText:'System',
				width:120,
				editable:false,
				store: Ext.create('AOC.store.SystemStore',{storeId:'userSystemStore'}),
	            queryMode: 'local',
	            listeners:{
	            	select:'onSystemSelected'
	            }
			},
			{
				xtype:'combobox',
				displayField:'name',
				valueField:'id',
				width:140,
				reference:'orgCode',
				queryMode :'local',
				disabled:true,
				emptyText:'Org Code',
				editable:false,
				store: Ext.create('AOC.store.OrgStore',{storeId:'userOrgStore'}),
                queryMode: 'local',
                listeners:{
                	select:'onOrgSelected'
                }
			},
			{
				xtype:'combobox',
				displayField:'csrCode',
				valueField:'id',
				width:140,
				reference:'csrCode',
				itemId:'csrCode',
				emptyText:'CSR Code',
				queryMode :'local',
				disabled:true,
				editable:true,
				store: Ext.create('AOC.store.SystemCsrCodeStore',{storeId:'userCsrCodeStore'}),
				listeners: {
					select:'onSelectCsrCode',
					blur:'onBlurCsrCode'
				}
			},
			{
 				xtype:'combobox',
 				queryMode :'local',
 				emptyText:'Owner',
 				reference:'codeOwner',
 				disabled:true,
 				editable:false,
 				width:90,
 				store: [['Y','Y'],['N','N']],
 				listeners:{
 					select:'onSelectCodeOwner'
 				}
			},
			{
				xtype:'button',
	            text: 'Insert',
	            reference:'insertBtn',
	            itemId: 'insertDataIntoGrid',
	            disabled:true,
	            handler: 'insertDataIntoGrid',
	            iconCls: 'fa fa-plus',
	            iconAlign: 'left',
	            cls: 'blue-btn'
	        }
		];
    }
});
