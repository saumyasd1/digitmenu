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
				text : 'Order Source',
				width:80,
				align:'center',
				dataIndex:'orderSource',
				menuDisabled  :true,
				renderer:function(v, metadata, record){
					if(v=='Email')
						return '<img data-qtip="<font color=blue>Email</font>" class="viewemail" src="' +  AOC.config.Settings.buttonIcons.mailIcon + '" />';
					else{
						return '<i data-qtip="<font color=blue>Web</font>" style="font-size:16px; color:black"; class="fa fa-globe"></i>';
					}
				}	
			},
			{  
				text : AOCLit.TrackingNo,
				width:80,
				align: 'right',
				dataIndex:'id'
			},
			{
				text : 'Partner Name',
				width:150,
				name:'PartnerName',
				menuDisabled :true,
				sortable:false,
				dataIndex:'PartnerName'
			},
			{
				text : 'RBO',
				width:150,
				dataIndex:'RBO',
				menuDisabled :true,
				sortable:false
			},
			{
				text : 'Sender Email Id',
				width:120,
				dataIndex:'senderEmailId'
			},
			{
				text :'Subject',
				width:120,
				dataIndex:'subject',
				renderer:function(v, metadata){
					return me.tipRenderer(v, metadata);
				}
			},
			{
				text :'Receiver Email Id',
				width:120,
				dataIndex:'Email'
			},
			{
				text :'Status',
				width:120,
				dataIndex:'status',
				renderer:function(v, metadata,rec){
					return Helper.getSatus(rec);
				}
			},
			{
				text :'CC',
				width:120,
				dataIndex:'CC',
				renderer:function(v, metaData){
					return me.tipRenderer(v, metaData);
				}
			},
			{  
				text : 'CSR Name',
				width:120,
				dataIndex:'csrName'
			},
			{
				text :'Received Date',
				width:150,
				dataIndex:'receivedDate'
			},
			{
				text :'Read Date',
				width:150,
				dataIndex:'readDate'
			},
			{
				text :'Acknowledged Date',
				width:150,
				dataIndex:'acknowledgementDate'
			},
			{
				text :'Last Modified By',
				width:120,
				dataIndex:'lastModifiedBy'
			},
			{
				text :'Last Modified Date',
				width:150,
				dataIndex:'lastModifiedDate'
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
