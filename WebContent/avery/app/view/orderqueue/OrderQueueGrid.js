Ext.define('AOC.view.orderqueue.OrderQueueGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.orderqueuegrid',
    itemId:'OrderQueueGridItemId',
	emptyText: AOCLit.noContentTypeDispMsg,
	controller: 'orderqueue',
	requires:['Ext.form.action.StandardSubmit','Ext.grid.plugin.Clipboard'],
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
			},
              
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
				items:[{
				  icon: AOC.config.Settings.buttonIcons.menuIcon,
				  handler:'onClickMenu'//'showMenu'
				}]
			},
			{
				header: '<img src="' +  AOC.config.Settings.buttonIcons.commentIcon + '" />',
				width:40,
				dataIndex:'Comments',
				menuDisabled:true,
				baseCls:'custom-action',
				renderer:function(value, metadata,rec){
					if(value){
						var comment=Ext.String.htmlEncode(rec.data.comment);
					   return '<div><img data-qtip="<font color=blue>'+comment+'</font>"  src="' +  AOC.config.Settings.buttonIcons.commentIcon + '" /></div>';
					}
					else{
						return '';
					}
				} 
		   	},
			{
				 header: '<img src="' + AOC.config.Settings.buttonIcons.error + '" />',
					width:40,
					dataIndex:'error',
					menuDisabled  :true,
					baseCls:'custom-action',
					renderer:function(value, metadata,rec){
						if(value){
							var error=Ext.String.htmlEncode(rec.data.error);
							return '<img data-qtip="<font color=blue>'+error+'</font>"   src="' +  AOC.config.Settings.buttonIcons.error + '" />';
						}
						else{
							return '';
						}
				}
			},
			{
				text : '',
				width:40,
				dataIndex:'OrderSource',
				menuDisabled  :true,
				renderer:function(v,cell,record){
					var href='data:text/plain;charset=utf-8,'+ encodeURIComponent(record.get('emailBody'));
					var filename=record.get('emailQueueId');
					if(v=='Email')
						return '<img class="viewemail" src="' +  AOC.config.Settings.buttonIcons.mailIcon + '" />';
					else{
						return '<img class="viewemail" src="' +  AOC.config.Settings.buttonIcons.browseIcon + '" />';
					}
				}	
			},
			{   header: '<img src="' +  AOC.config.Settings.buttonIcons.attacheImageSrc + '" />',
				//text : 'Order File',
				width:40,
				dataIndex:'OrderFile',
				renderer:function(v,cell,record){
					return '<img class="vieworderattachment" src="' + attacheImageSrc + '" />';
					/*if(v.length!=0){
						var fileName=v[0].fileName
						return '<div><img data-qtip="'+fileName+'"  class="vieworderattachment" src="' + attacheImageSrc + '" /></div>';
					}else 
						return '';*/
				}
			},
			{
				header: '<img src="' + AOC.config.Settings.buttonIcons.clip + '" />',
			   // text : 'Additional data',
				width:40,
				hideable: true,
				dataIndex:'attachmentPresent',
				renderer:function(v,cell,record){
					if(v){
						return '<img class="viewattachment" src="' + AOC.config.Settings.buttonIcons.clip + '" />';
					}
					else{
						return ''
					}
				}
			},
			{
				text : AOCLit.TrackingNo,
				width:50,
				dataIndex:'TrackingId',
				align: 'right',
			},
			{
				text : AOCLit.orderTrackNo,
				width:50,
				dataIndex:'id',
				align: 'right',
			},
			{
				text : AOCLit.prvOrderTrackNo,
				width:80,
				dataIndex:'prvOrderQueueID',
				align: 'right',
			},
			{
				text :AOCLit.PONumber,
				width:120,
				dataIndex:'ponumber'
			},
			{
				text : AOCLit.partnerName,
				width:80,
				dataIndex:'PartnerName'
			},
			{
				text :AOCLit.RBO,
				width:80,
				dataIndex:'RBOName'
			},
			{
				text : AOCLit.productLine, 
				width:80,
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
				renderer:function(v){
					return AOC.util.Helper.getSatus(v);
				}
			},
			{
				text : AOCLit.processedDate,
				width:98,
				dataIndex:'receivedDate'
			},
			{
				text : AOCLit.senderEmailID,
				width:128,
				dataIndex:'SenderEmailID',
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
				text : AOCLit.Subject,
				width:150,
				dataIndex:'Subject',
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
				text : AOCLit.emailBody,
				width:150,
				dataIndex:'subEmailBody',
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
				text : AOCLit.submittedBy,
				width:82,
				dataIndex:'SubmittedBy'
			},
			{
				text : AOCLit.submittedDate,
				width:95,
				dataIndex:'submittedDate'
			},
			{
				text : AOCLit.acknowledgeDate,
				width:105,
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
				xtype: 'customsearchfield',
				searchCriteria:'',
				message:'Showing all accounts with',
				store : Ext.data.StoreManager.lookup(me.store),
				width: 200,
				margin:'0 10 0 0',
				emptyText: "Search Partner Name "
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
						click: 'openAdvancedSearchWindow'
					}
				}
			},
			{
				hidden:true, 
				icon   :  AOC.config.Settings.buttonIcons.clearSearchIcon,
				itemId:'clearadvanedsearch',
				handler:'clearAdvancedSerach'
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
    },
    onCellClickToView:function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		if(e.target.className=='vieworderattachment'){
			var form = Ext.create('Ext.form.Panel', { 
				standardSubmit: true,   
				url : applicationContext+'/rest/orders/download/orderfile/'+record.get('id')
			});
			form.submit({
				method : 'GET'
			});
		}
		else if(e.target.className=='viewattachment'){
			var list=record.get('attachmentFileList'),htmlString='';
			for(var i=0;i<list.length;i++){
				htmlString=htmlString+'<div><span accessKey="'+list[i].id+'" class="attachment">'+list[i].fileName+'</span></div>';
			}
			td.innerHTML='<div class="ParameterCls" style="cursor:pointer;color : #0085cf !important;">'+htmlString+'</div>';
		}else if(e.target.className=='attachment'){
			var id=e.target.accessKey;
			var form = Ext.create('Ext.form.Panel', { 
				standardSubmit: true,   
				url : applicationContext+'/rest/orderattachements/download/'+id
			});
			form.submit({
				method : 'GET'
			});
		}else if(e.target.className=='viewemail'){
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