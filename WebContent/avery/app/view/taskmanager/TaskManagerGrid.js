Ext.define('AOC.view.taskmanager.TaskManagerGrid', {
	extend : 'Ext.grid.Panel',
	requires : ['AOC.util.Helper'],
	controller:'taskManagerController',
	itemId : 'TaskManagerGriditemId',
    alias : 'widget.taskManagergrid',
    reserveScrollbar:true,
	columnLines:false,
	store:Ext.create('AOC.store.TaskManagerStore', {
		storeId:'TaskManagerStoreId'
	}),
	viewConfig : {
		stripeRows : true,
		enableTextSelection : true
	},
    initComponent : function(){
    	var me=this;
		this.columns = this.buildColumns();
		this.dockedItems = this.buildDockedItems();
		
        Ext.apply(me,{
    		listeners:{
    	        activate:function(obj){
					me.down('pagingtoolbar').bindStore(obj.getStore());
				}
			},		
            tbar: { 
				height: 50,
				items : me.buildTbar()
			}
        });
	   me.callParent(arguments);
	},
	plugins: [
		Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit: 1
		})
	],
	selType: 'checkboxmodel',
	buildColumns : function(){
      	var me=this;
		return [  
			{
				xtype:'actioncolumn',
				width:25,
				header: '<img src="'+AOC.config.Settings.buttonIcons.menuIcon + '" />',
				baseCls:'custom-action',
				items:[
					{	
						icon: AOC.config.Settings.buttonIcons.menuIcon,
						handler: 'onClickMenu'
					}
				]
			},
			{
				text :'CSR',
				sortable : true,
				dataIndex:'CSR',
				flex:0.5
			},
			{
				text : 'From',
				sortable : true,
				dataIndex:'senderEmailId',
				flex:0.5,
				renderer:function(v,metadata){
					if(v){
						metadata.tdAttr = 'data-qtip="<font color=blue>' + Ext.String.htmlEncode(v) + '<font>"';
						return '<div>'+v+'</div>';
					}else {
						return '';
					}
				}
			},
			{
				text :'Subject',
				sortable : true,
				dataIndex:'subject',
				flex:0.5,
				renderer:function(v,metadata){
					if(v){
						metadata.tdAttr = 'data-qtip="<font color=blue>' + Ext.String.htmlEncode(v) + '<font>"';
						return '<div>'+v+'</div>';
					}else {
						return '';
					}
				}
			},
			{
				text :'CC',
				sortable : true,
				dataIndex:'ccMailId',
				flex:0.5
			},
			{
				text :'Status',
				sortable : true,
				dataIndex:'status',
				flex:0.5
			},
			{
				text : 'Date/Time',
				sortable : true,
				dataIndex:'createdDate',
				align: 'right',
				flex:0.5
			}
		];
	},
	buildTbar:function(){
  		var me=this;
		return [
			{
				xtype : 'tbtext',
				itemId : 'TaskManagerTextId',
				text:'TaskManager',
				style:'color:#2c3e50;font-weight:bold;'
			}          
		];
	},
	buildDockedItems : function(){
     	var me=this;
		return [
			{
				xtype : 'pagingtoolbar',
				dock : 'bottom',
				ui : 'darktoolbar',
				itemId:'pagingtoolbar',
				store:me.store,
				displayInfo:true,
				plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
			}
		];
	}
});

