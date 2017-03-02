Ext.define('AOC.view.orderqueue.OrderQueueGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.orderqueuegrid',
    itemId:'OrderQueueGridItemId',
	emptyText: AOCLit.emptyDataMsg,
	controller: 'orderqueue',
	requires:[
          'Ext.form.action.StandardSubmit',
          'Ext.grid.plugin.Clipboard',
          'AOC.view.ux.CustomSearchField'
    ],
	reserveScrollbar:true,
	columnLines:false,
	viewConfig : {
		stripeRows : true
	},
    initComponent : function(){
		var me=this;
		this.fieldArray = [];
        Ext.apply(this,{
            columns : this.buildColumns(),
			dockedItems : this.buildDockedItems(),
			tbar: { 
				height: AOC.config.Settings.config.defaultTbarHeight,
    		    items : me.buildtbar()
			},
			store:'OrderQueueStore',
			selModel: {
			   type: 'spreadsheet',
			   rowNumbererHeaderWidth:0
			},
			plugins: [{
				ptype: 'clipboard'
			}],
			listeners:{
				cellclick:'onCellClickToView',
				activate:function(obj){
					me.down('pagingtoolbar').bindStore(obj.getStore());
				}
			}
        });
        this.callParent(arguments);
    },
    buildColumns : function(){
    	
        return [
			{
				header: '<img src="' +  AOC.config.Settings.buttonIcons.menuIcon + '" />',
				width:25,
				xtype:'actioncolumn',
				menuDisabled  :true,
				baseCls:'custom-action',
				tooltip:'Menu Action',
				items:[{
				  icon: AOC.config.Settings.buttonIcons.menuIcon,
				  handler:'onClickMenu'//'showMenu'
				}]
			},
			{
				header: Settings.config.defaultIcons.commentColumnIcon,
				width:40,
				dataIndex:'Comments',
				menuDisabled:true,
				tooltip:'Comments',
				baseCls:'custom-action',
				renderer:function(value, metadata,rec){
					if(value){
						var comment=Ext.String.htmlEncode(rec.data.comment);
						metadata.tdAttr = 'data-qtip="<font color=blue>'+ comment +'</font>"';
					   return Settings.config.defaultIcons.commentColumnIcon;
					}
					else{
						return '';
					}
				} 
		   	},
			{
		   			header: Settings.config.defaultIcons.errorColumnIcon,
					width:40,
					dataIndex:'error',
					tooltip:'Error',
					menuDisabled  :true,
					baseCls:'custom-action',
					renderer:function(value, metadata,rec){
						if(value){
							var error=Ext.String.htmlEncode(rec.data.error);
							metadata.tdAttr = 'data-qtip="<font color=blue>'+error+'</font>"';
							return Settings.config.defaultIcons.errorColumnIcon;
						}
						else{
							return '';
						}
				}
			},
			{   header: '<img src="' +  AOC.config.Settings.buttonIcons.attacheImageSrc + '" />',
				width:40,
				dataIndex:'OrderFile',
				tooltip:'Order File',
				renderer:function(v, metadata, record){
					var filename=record.get('orderFileName');
					metadata.tdAttr = 'data-qtip="<font color=blue>' + Ext.String.htmlEncode(filename) + '</font>"';
					return '<img class="vieworderattachment" src="' + attacheImageSrc + '" />';
				}
			},
			{
				header: '<img src="' + AOC.config.Settings.buttonIcons.clip + '" />',
				width:50,
				hideable: true,
				tooltip:'Additional File',
				dataIndex:'attachmentPresent',
				renderer:function(v,cell,record){
					var fileCount = record.data.additionalFileCount;
					if(fileCount>0){
					return '<img style="cursor:pointer;" class="viewattachment" src="' + AOC.config.Settings.buttonIcons.clip + '" />';
					}
					else{
						return '';
					}
				}
			},
			{
				text : AOCLit.emailBody,
				width:80,
				align:'center',
				renderer:function(v, metadata, record){
						var emailBody = record.get('emailBody'); 
						metadata.tdAttr = 'data-qtip="<font color=blue>CompleteEmail.html</font>"';
						return '<i class="viewemail fa fa-envelope-o" style="font-size:16px;"></i>';
				}	
			
			},
			{
				text : AOCLit.TrackingNo,
				width:80,
				dataIndex:'TrackingId',
				align: 'left',
				renderer:function(v, metadata, record){
					return 'E# '+ v;
				}
			},
			{
				text : AOCLit.orderTrackNo,
				width:80,
				dataIndex:'id',
				align: 'left',
				renderer:function(v, metadata, record){
					return 'O# '+ v;
				}
			},
			{
				text : AOCLit.prvOrderTrackNo,
				width:80,
				dataIndex:'prvOrderQueueID',
				align: 'right'
			},
			{
				text :AOCLit.PONumber,
				width:180,
				dataIndex:'ponumber'
			},
			{
				text : AOCLit.partnerName,
				width:80,
				dataIndex:'PartnerName'
			},
			{
				text :AOCLit.RBO,
				width:120,
				dataIndex:'RBOName'
			},
			{
				text : AOCLit.productLine, 
				width:100,
				dataIndex:'productLineType'
			},
			{
				text : AOCLit.orderStatus,
				width:200,
				dataIndex:'status',
				editor:{
					xtype:'combo',
					queryMode :'local',
					store: Ext.data.StoreManager.lookup('orderfilequeueid') == null ? AOC.util.Helper.getCodeStore('OrderQueue') : Ext.data.StoreManager.lookup('orderfilequeueid')
				},
				renderer:function(v, metadata,rec){
					return Helper.getSatus(rec);
				}
			},
			{
				text : AOCLit.processedDate,
				width:150,
				dataIndex:'createdDate'
			},
			{
				text : AOCLit.senderEmailID,
				width:180,
				dataIndex:'SenderEmailID',
				renderer:function(v,metadata){
					if(v){
						metadata.tdAttr = 'data-qtip="<font color=blue>' + Ext.String.htmlEncode(v) + '</font>"';
						return '<div>'+v+'</div>';
					}else {
						return '';
					}
				}
			},
			{
				text : AOCLit.Subject,
				width:150,
				dataIndex:'Subject',
				renderer:function(v,metadata){
					if(v){
						metadata.tdAttr = 'data-qtip="<font color=blue>' + Ext.String.htmlEncode(v) + '</font>"';
						return '<div>'+v+'</div>';
					}else {
						return '';
					}
				}
			},
			{
				text : AOCLit.submittedBy,
				width:100,
				dataIndex:'SubmittedBy'
			},
			{
				text : AOCLit.submittedDate,
				width:150,
				dataIndex:'submittedDate'
			},{
				text :AOCLit.lastmodifiedby,
				dataIndex:'lastModifiedBy',
				width:120
			},
			{
				text :AOCLit.lastmodifieddate,
				dataIndex:'lastModifiedDate',
				width:150
			},
			{
				text : AOCLit.acknowledgeDate,
				width:150,
				dataIndex:'acknowledgementDate'
			}
		];
    },
    buildtbar:function(){
		var me=this;
		return [
			{
				xtype : 'tbtext',
				itemId : 'OrderQueuetextItemId',
				text : 'Order Queue',
				style:AOC.config.Settings.config.tabHeaderTitleStyle
			},
			'->',
			{
				 xtype       : 'button',
		            icon : AOC.config.Settings.buttonIcons.report,
					iconAlign : "left",
		            reference      : 'report',
		            margin      :'0 15 0 0',
		            text:'Report',
		           // ui:'blue',
		            listeners:{
		            	'click':'getReportView'
		            }
			},
			{
				xtype: 'customsearchfield',
				searchCriteria:'',
				message:'Showing all accounts with',
				store : Ext.data.StoreManager.lookup(me.store),
				width: 200,
				margin:'0 10 0 0',
				emptyText: "Search by Order Track #"
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
    },
    onCellClickToView:function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
    	var el =Ext.get(e.target);
		if(el.hasCls('vieworderattachment')){
			var form = Ext.create('Ext.form.Panel', { 
				standardSubmit: true,   
				url : applicationContext+'/rest/orders/download/orderfile/'+record.get('id')
			});
			form.submit({
				method : 'GET'
			});
		}
		else if(el.hasCls('viewattachment')){
			var id = record.get('id');
			var attachmentWin = Ext.create('AOC.view.orderqueue.OrderQueueAttachmentWindow',{recordId: id});
			attachmentWin.show();
		}
		else if(el.hasCls('attachment')){
			var id=e.target.accessKey;
			var form = Ext.create('Ext.form.Panel', { 
				standardSubmit: true,   
				url : applicationContext+'/rest/orderattachements/download/'+id
			});
			form.submit({
				method : 'GET'
			});
		}else if(el.hasCls('viewemail')){
			var form = Ext.create('Ext.form.Panel', { 
				standardSubmit: true,   
				url : applicationContext+'/rest/orders/download/emailbody/'+record.get('emailQueueId')
			});
			
			form.submit({
				method : 'GET'
			});
		}
    }
});