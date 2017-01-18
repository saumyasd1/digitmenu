Ext.define('AOC.view.email.EmailManagementGrid', {
	extend : 'Ext.grid.Panel',
	requires : ['AOC.util.Helper','AOC.view.ux.CustomSearchField'],
	controller:'emailManagementController',
	itemId : 'EmailMangementitemId',
    alias : 'widget.emailmanagementgrid',
    emptyText: AOCLit.emptyDataMsg,
    reserveScrollbar:true,
	columnLines:false,
	viewConfig : {
		stripeRows : true,
		enableTextSelection : true
	},
    initComponent : function(){
    	var me=this;
        Ext.apply(this,{
            columns : this.buildColumns(),
    		dockedItems : this.buildDockedItems(),
    		store:Ext.create('AOC.store.EmailManagementStore', {
    				storeId:'EmailManagementStoreId'}),
    		listeners:{
    	        activate:function(obj){
					me.down('pagingtoolbar').bindStore(obj.getStore());
				}
			},		
            tbar: { 
				height: AOC.config.Settings.config.defaultTbarHeight,
				items : me.buildtbar()
			}
        });
	   this.callParent(arguments);
	},
	buildColumns : function(){
      	var me=this;
		return [  
			{
				header: '<img src="' +  AOC.config.Settings.buttonIcons.menuIcon + '" />',
				width:25,
				xtype:'actioncolumn',
				menuDisabled  :true,
				baseCls:'custom-action',
				items:[{
				  icon: AOC.config.Settings.buttonIcons.menuIcon,
				  handler:'onClickMenu'//'showMenu'
				}]
			},
			{
  		       	header: '<img src="' +  AOC.config.Settings.buttonIcons.commentIcon + '" />',
  	            width:40,
  				dataIndex:'comment',
  				tooltip:'Comments',
  				menuDisabled :true,
  				baseCls:'custom-action',
  				renderer:function(value, metaData, rec){
  					if(value){
  						var status = rec.get('status');
  						if(status == AOCLit.emailUnidentifiedStatus){
  						var comment = Ext.String.htmlEncode(value);
  						metaData.tdAttr = 'data-qtip="<font color=blue>' + comment + '</font>"';
						return '<img src="' +  AOC.config.Settings.buttonIcons.commentIcon + '" />';
  						}
  					}else{
  						return '';
					}
  				} 
			},
			{
				text : '',
				width:40,
				dataIndex:'orderSource',
				menuDisabled  :true,
				renderer:function(v, metadata, record){
					if(v=='Email')
						return '<img class="viewemail" src="' +  AOC.config.Settings.buttonIcons.mailIcon + '" />';
					else{
						return '<img class="viewemail" src="' +  AOC.config.Settings.buttonIcons.browseIcon + '" />';
					}
				}	
			},
			{  
				text : 'Tracking #',
				width:120,
				align: 'right',
				dataIndex:'id',
				flex:1
			},
			{
				text : 'Partner Name',
				width:120,
				name:'PartnerName',
				menuDisabled :true,
				sortable:false,
				dataIndex:'PartnerName',
				flex:1
			},
			{
				text : 'RBO',
				width:120,
				dataIndex:'RBO',
				menuDisabled :true,
				sortable:false,
				flex:1
			},
			{
				text : 'Sender Email Id',
				width:120,
				dataIndex:'senderEmailId',
				flex:1
			},
			{
				text :'Subject',
				width:120,
				dataIndex:'subject',
				flex:1,
				renderer:function(v, metadata){
					return me.tipRenderer(v, metadata);
				}
			},
			{
				text :'Receiver Email Id',
				width:120,
				dataIndex:'Email',
				flex:1
			},
			{
				text :'Status',
				width:120,
				dataIndex:'status',
				flex:1,
				renderer:function(v, metadata,rec){
					return Helper.getSatus(rec);
				}
			},
			{
				text :'CC',
				width:120,
				dataIndex:'CC',
				flex:1,
				renderer:function(v, metaData){
					return me.tipRenderer(v, metaData);
				}
			},
			{  
				text : 'CSR Name',
				width:120,
				dataIndex:'csrName',
				flex:1
			},
			{
				text :'Received Date',
				width:120,
				dataIndex:'receivedDate',
				flex:1
			},
			{
				text :'Read Date',
				width:120,
				dataIndex:'readDate',
				flex:1
			},
			{
				text :'Acknowledged Date',
				width:120,
				dataIndex:'acknowledgementDate',
				flex:1
			},
			{
				text :'Last Modified By',
				width:120,
				dataIndex:'lastModifiedBy',
				flex:1
			},
			{
				text :'Last Modified Date',
				width:120,
				dataIndex:'lastModifiedDate',
				flex:1
			}
			
		]
	},
	
	tipRenderer:function(v, metaData){
		if(v){
			metaData.tdAttr = 'data-qtip="<font color=blue>' + Ext.String.htmlEncode(v) + '<font>"';
			return Ext.String.htmlEncode(v);
		}else {
			return '';
		}
	},
	buildtbar:function(){
		var me=this;
		return [
			{
				xtype : 'tbtext',
				itemId : 'EmailQueueTextId',
				text : 'Email Queue',
				style:AOC.config.Settings.config.tabHeaderTitleStyle
			},
			'->',
			{
				xtype: 'customsearchfield',
				searchCriteria:'',
				store : Ext.data.StoreManager.lookup(me.store),
				width: 200,
				emptyText: "Search by Email Subject "
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
     	var me = this;
		return [
 			{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				ui: 'darktoolbar',
				itemId:'pagingtoolbar',
				store:me.store,
				displayInfo:true,
				pageSize:pageSize,
				plugins:Ext.create('Ext.ux.ProgressBarPager',{width:250})
			}
		];
     }
});
