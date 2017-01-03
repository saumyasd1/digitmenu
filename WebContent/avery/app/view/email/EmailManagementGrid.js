Ext.define('AOC.view.email.EmailManagementGrid', {
	extend : 'Ext.grid.Panel',
	requires : ['AOC.util.Helper'],
	controller:'emailManagementController',
	itemId : 'EmailMangementitemId',
    alias : 'widget.emailmanagementgrid',
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
				height: 50,
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
  				dataIndex:'Comments',
  				menuDisabled  :true,
  				baseCls:'custom-action',
  				renderer:function(value, metadata, rec){
  					if(value){
  						var comment=Ext.String.htmlEncode(rec.data.Comments);
						return '<div><img data-qtip="<font color=blue>'+comment+'</font>"  src="' +  AOC.config.Settings.buttonIcons.commentIcon + '" /></div>';
  					}else{
  						return '';
					}
  				} 
			},
			{
				xtype:'actioncolumn',
				width:25,
				baseCls:'custom-action'
			},
			{  
				text : 'Tracking #',
				width:120,
				sortable : true,
				align: 'right',
				dataIndex:'Tracking #',
				flex:1
			},
			{
				text : 'Partner Name',
				width:120,
				sortable : true,
				name:'PartnerName',
				dataIndex:'PartnerName',
				flex:1,
				renderer:function(val, metaData, record){
					var listOrderFileAttachment = record.get('listOrderFileAttachment'),
						partnerName =[],
						len = listOrderFileAttachment.length;
					
					for(var i=0;i<len;i++){
						var data = listOrderFileAttachment[i];
						data.varProductLine  ? partnerName.push(data.varProductLine.varPartner ? data.varProductLine.varPartner.partnerName  :'') :'';
					}
					return partnerName.join('');
				 }
			},
			{
				text : 'RBO',
				width:120,
				sortable : true,
				dataIndex:'RBO',
				flex:1,
				renderer:function(val, metaData, record){
					var listOrderFileAttachment = record.get('listOrderFileAttachment'),
						rboName =[],
						len = listOrderFileAttachment.length;
					
					for(var i=0;i<len;i++){
						var data = listOrderFileAttachment[i];
						data.varProductLine  ? rboName.push(data.varProductLine.rbo ? data.varProductLine.rbo.rboName : '') :'';
					}
					return rboName.join('');
				}
			},
			{
				text : 'Sender Email Id',
				width:120,
				sortable : true,
				dataIndex:'Sender Email Id',
				flex:1,
				renderer:function(v,metadata){
					if(v){
						metadata.tdAttr = 'data-qtip="<font color=blue>' + Ext.String.htmlEncode(v) + '<font>"';
						return '<div>'+v+'</div>';
					}else{ 
						return '';
					}
				}	
			},
			{
				text :'Subject',
				width:120,
				sortable : true,
				dataIndex:'Subject',
				flex:1,
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
				text :'Email',
				width:120,
				sortable : true,
				dataIndex:'Email',
				flex:1,
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
				text :'Status',
				width:120,
				sortable : true,
				dataIndex:'Status',
				flex:1,
				renderer:function(value, metaData, rec){
					return AOC.util.Helper.getSatus(value);
				}
			},
			{
				text :'Received Date',
				width:120,
				sortable : true,
				dataIndex:'Received Date',
				flex:1
			},
			{
				text :'Read Date',
				width:120,
				sortable : true,
				dataIndex:'Read Date',
				flex:1
			},
			{
				text :'Acknowledged Date',
				width:120,
				sortable : true,
				dataIndex:'Acknowledged Date',
				flex:1
			},
			{
				text :'CC',
				width:120,
				sortable : true,
				dataIndex:'CC',
				flex:1
			}
		]
	},
	buildtbar:function(){
		var me=this;
		return [
			{
				xtype : 'tbtext',
				itemId : 'EmailQueueTextId',
				text : '<div style="color:#2c3e50;font-weight:bold;">Email Queue</div>'
			},
			'->',
			{
				xtype: 'customsearchfield',
				searchCriteria:'',
				store : Ext.data.StoreManager.lookup(me.store),
				width: 200,
				emptyText: "Search Email "
			},
			{
					xtype :'tbspacer',
					width :10
			},
			{
				xtype: 'component',
				itemId:'advancesearchbutton',
				autoEl: {
					tag: 'a',
					href: '#',
					html:AOCLit.advSearchTitle
				},
				listeners: {
					el : {
						click    : 'openAdvancedSearchWindow'	
					}
				}
			},
			{
				itemId: 'clearadvanedsearch',
				hidden:true, 
				handler : 'clearAdvancedSerach',
				icon:  AOC.config.Settings.buttonIcons.clearSearchIcon
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
