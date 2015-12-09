Ext.define('AOC.view.orderqueue.OrderQueueGrid', {
	extend : 'Ext.grid.Panel',
    alias : 'widget.orderqueuegrid',
    itemId:'OrderQueueGridItemId',
	emptyText:'<div align=center> No content type(s) to display.</div>',
	controller: 'orderqueue',
    initComponent : function(){
	var me=this;
	this.fieldArray = [];
        Ext.apply(this,{
            columns : this.buildColumns(),
			columnLines:true,
			dockedItems : this.buildDockedItems(),
			layout:'fit',
			tbar: { 
				height: 50,
    		    items : me.buildtbar()
              },
              listeners:{
            	  cellclick:'onCellClickToView'
              }
        });
        this.callParent(arguments);
    },
    buildColumns : function(){
    	var me=this;
    	var store= Ext.data.StoreManager.lookup('orderfilequeueid') == null ? AOC.util.Helper.getCodeStore('orderfilequeue') : Ext.data.StoreManager.lookup('orderfilequeueid')
        return [{
        	xtype:'rownumberer'
        },{
            text : '',
            width:25,
			xtype:'actioncolumn',
			menuDisabled  :true,
			items:[{
			  icon:menuIcon,
			  handler:'showMenu'
		  }]
        },
        {
            text : '',
            width:40,
			dataIndex:'Comments',
			renderer:function(v,cell,record){
				if(v)
					return '<div><img class="viewcomment" src="' + CommentIcon + '" /></div>';
				else
					return '';
        }
        },{
            text : 'Order File',
            width:45,
			dataIndex:'OrderFile',
			renderer:function(v){
				if(v.length!=0){
					var fileName=v[0].fileName
					return '<div><img data-qtip="'+fileName+'" accessKey="orderFile" class="viewattachment" src="' + attacheImageSrc + '" /></div>';
				}else 
					return '';
        }
        },
        {
            text : 'Additional data',
            width:75,
            hideable: true,
            dataIndex:'attachmentPresent',
			renderer:function(v,cell,record){
				if(v)
					return '<div><img class="viewattachment" src="' + attacheImageSrc + '" /></div>';
				else
					return ''
        }
        },{
            text : 'Partner Name',
            width:80,
            dataIndex:'PartnerName'
        },
		{
            text : 'RBO',
            width:80,
            dataIndex:'RBOName'
        },{
            text : 'Product Line', 
            width:80,
            dataIndex:'productLineType'
        },{
            text : 'Order Status',
            width:80,
			dataIndex:'Status',
			editor:{
				xtype:'combo',
				store: Ext.data.StoreManager.lookup('orderfilequeueid') == null ? AOC.util.Helper.getCodeStore('orderfilequeue') : Ext.data.StoreManager.lookup('orderfilequeueid')
			},
			renderer:function(v){
				var statusRecord=store.findRecord( 'code', v);
				if(statusRecord.get('value')!='')
					return statusRecord.get('value');
				else
					return '';
			}
        },
		{
            text : 'Process Date',
            width:98,
			dataIndex:'receivedDate'
        },
        {
            text : 'Sender EmailID',
            width:128,
			dataIndex:'SenderEmailID'
        },
		{
            text : 'Subject',
            width:150,
			dataIndex:'Subject'
        },
		{
            text : 'Email Body',
            width:150,
			dataIndex:'EmailBody'
        },
		{
            text : '',
            width:40,
			dataIndex:'OrderSource',
			renderer:function(v,cell,record){
				if(v=='Email')
					return '<div><img src="' + MailIcon + '" /></div>';
				else
					return '<div><img src="' + BrowseIcon + '" /></div>';
        }
        },
		{
            text : 'Submitted By',
            width:82,
			dataIndex:'SubmittedBy'
        },
		{
            text : 'Submitted Date',
            width:95,
			dataIndex:'submittedDate'
        },
		{
            text : 'Error Message',
            width:150,
			dataIndex:'error'
        }
		];
    },
    buildtbar:function(){
		var me=this;
			return [
					 '->',
				{
	            	xtype: 'customsearchfield',
	            	searchCriteria:'',
	            	message:'Showing all accounts with',
	    			store : Ext.data.StoreManager.lookup(me.store),
	    			width: 200,
	    			emptyText: "Quick Search:Partner Name "
				 },
	            {
					xtype:'button',
					refrence:'advancesearchbutton',
					text:advSearchText,
					icon   : advSearchIcon,
					iconAlign: "right",
					handler:'openAdvancedSearchWindow'
				 },
			{
				//icon   : PowerPay.config.Settings.buttonIcons.error,
				hidden:true, 
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
            
        }];
    },
    onCellClickToView:function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
    	if(e.target.accessKey=='orderFile'){
    		var id=record.get('OrderFile')[0].id;
	        var form = Ext.create('Ext.form.Panel', { 
	            standardSubmit: true,   
	            url : applicationContext+'/rest/orderattachements/download/'+id
	        });
	        form.submit({
	        	method : 'GET'
	        });
	}else if(e.target.className=='viewattachment'){
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
	}
	else if(e.target.className=='viewcomment')
		{
		if(cellIndex=='2')
		   var html=e.record.data.Comments;
		    tooTip = new Ext.ToolTip({
		    target:e.target,
		    html:html
		    });
		    tooTip.show();
		
		}
    }
});