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
			menuDisabled  :true,
			renderer:function(value, metadata,rec){
				if(value){
					var comment=rec.data.Comments;
		           return '<div><img data-qtip=" '+comment+'"  src="' + commentIcon + '" /></div>';
				}
				else
					return '';
			} 
		   	},
			
        {
            text : '',
            width:40,
			dataIndex:'error',
			menuDisabled  :true,
			renderer:function(value, metadata,rec){
				if(value){
					var error=rec.data.error;
					return '<div><img data-qtip=" '+error+'" src="' + errorIcon + '" /></div>';
				}
				else
					return '';
        }
        },
        {
            text : '',
            width:40,
			dataIndex:'OrderSource',
			menuDisabled  :true,
			renderer:function(v,cell,record){
				if(v=='Email')
					return '<div><img data-qtip="Email" src="' + mailIcon + '" /></div>';
				else
					return '<div><img data-qtip="Web" src="' + browseIcon + '" /></div>';
        }
        },
        {
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
            width:120,
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
			dataIndex:'SenderEmailID',
			renderer:function(v){
				if(v){
					return '<div><span data-qtip="'+v+'" />'+v+'</span></div>';
				}else 
					return '';
        }
        },
		{
            text : 'Subject',
            width:150,
			dataIndex:'Subject',
			renderer:function(v){
				if(v){
					return '<div><span data-qtip="'+v+'" />'+v+'</span></div>';
				}else 
					return '';
        }
        },
		{
            text : 'Email Body',
            width:150,
			dataIndex:'EmailBody',
			renderer:function(v){
				if(v){
					return '<div><span data-qtip="'+v+'" />'+v+'</span></div>';
				}else 
					return '';
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
					itemId:'advancesearchbutton',
					text:advSearchText,
					icon   : advSearchIcon,
					iconAlign: "right",
					handler:'openAdvancedSearchWindow'
				 },
			{
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
    }
});