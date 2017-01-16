Ext.define('AOC.view.taskmanager.TaskManagerGrid', {
	extend : 'Ext.grid.Panel',
	requires : ['AOC.util.Helper'],
	controller:'taskManagerController',
	itemId : 'TaskManagerGriditemId',
    alias : 'widget.taskManagergrid',
    emptyText: AOCLit.emptyDataMsg,
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
  		       	header: '<img src="' +  AOC.config.Settings.buttonIcons.commentIcon + '" />',
  	            width:40,
  				dataIndex:'comment',
  				menuDisabled :true,
  				baseCls:'custom-action',
  				renderer:function(value, metaData, rec){
  					if(value){
  						var comment = Ext.String.htmlEncode(value);
  						metaData.tdAttr = 'data-qtip="<font color=blue>' + comment + '</font>"';
						return '<img src="' +  AOC.config.Settings.buttonIcons.commentIcon + '" />';
  					}else{
  						return '';
					}
  				} 
			},
			{  
				text : 'Tracking #',
				//width:120,
				align: 'right',
				dataIndex:'id',
				flex:0.5
			},
			{
				text :'CSR',
				sortable : true,
				dataIndex:'csrName',
				flex:0.5
			},
			{
				text : 'From',
				sortable : true,
				dataIndex:'senderEmailId',
				flex:0.5
			},
			{
				text :'Subject',
				sortable : true,
				dataIndex:'subject',
				flex:0.5,
				renderer:function(v,metadata){
					return me.tipRenderer(v, metadata);
				}
			},
			{
				text :'CC',
				sortable : true,
				dataIndex:'ccMailId',
				flex:0.5,
				renderer:function(v,metadata){
					return me.tipRenderer(v, metadata);
				}
			},
			{
				text :'Status',
				sortable : true,
				dataIndex:'status',
				flex:0.5,
				renderer:function(v, metadata,rec){
					return Helper.getSatus(rec);
				}
			},
			{
				text : 'Date-Time',
				sortable : true,
				dataIndex:'createdDate',
				align: 'right',
				flex:0.5
			},
			{
				text :'Last Modified By',
				dataIndex:'lastModifiedBy',
				flex:0.5
			},
			{
				text :'Last Modified Date',
				dataIndex:'lastModifiedDate',
				flex:0.5
			}
		];
	},
	tipRenderer:function(v, metaData){
		if(v){
			metaData.tdAttr = 'data-qtip="<font color=blue>' + Ext.String.htmlEncode(v) + '<font>"';
			return Ext.String.htmlEncode(v);
		}else {
			return '';
		}
	},
	buildTbar:function(){
  		var me=this;
		return [
			{
				xtype : 'tbtext',
				itemId : 'TaskManagerTextId',
				text:'TaskManager',
				style:'color:#2c3e50;font-weight:bold;'
			},'->',
			{
				xtype: 'customsearchfield',
				searchCriteria:'',
				store : Ext.data.StoreManager.lookup(me.store),
				width: 200,
				emptyText: "Search by Email Subject"
			},
			{
				xtype :'tbspacer',
				width :10
		    },
		    {
				xtype:'button',
				refrence:'advancesearchbutton',
				text:AOCLit.advSearchText,
				icon   :  AOC.config.Settings.buttonIcons.advSearchIcon,
				iconAlign: "right",
				handler:'openAdvancedSearchWindow'
			 },
			 {
					hidden:true, 
					icon   :  AOC.config.Settings.buttonIcons.clearSearchIcon,
					itemId:'clearadvanedsearch',
					reference:'clearAdvSearch',
					handler:'clearAdvancedSearch',
					tooltip:'Clear Search'
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
				pageSize:pageSize,
				plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
			}
		];
	}
});

