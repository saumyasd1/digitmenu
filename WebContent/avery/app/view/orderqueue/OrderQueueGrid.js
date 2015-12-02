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
        return [{
            text : 'Partner Name',
            width:80,
            dataIndex:'PartnerName'
        },
		{
            text : 'RBO',
            width:60,
            dataIndex:'RBOName'
        },{
            text : 'Product Line', 
            width:80,
            dataIndex:'ProductLineType'
        },{
            text : 'Order Status',
            width:80,
			dataIndex:'Status'
        },
		{
            text : 'Date Received',
            width:150,
			dataIndex:'receivedDate'
        },
        {
            text : 'Sender EmailID',
            width:150,
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
            text : 'Order Source',
            width:150,
			dataIndex:'OrderSource'
        },
		{
            text : 'Submitted By',
            width:150,
			dataIndex:'SubmittedBy'
        },
		{
            text : 'Submitted Date',
            width:150,
			dataIndex:'submittedDate'
        },
        {
            text : 'Order File',
            width:150,
			dataIndex:'OrderFile',
			renderer:function(v){
				if(v.length!=0)
					return '<span accessKey="orderFile" class="" style="cursor:pointer;color : #0085cf !important;">'+v[0].fileName+'</span></div>';
        }
        },
        {
            text : 'Attachment',
            width:150,
            hideable: true,
            dataIndex:'attachmentPresent',
			renderer:function(v,cell,record){
				if(v)
					return '<div><span class="viewattachment" style="cursor:pointer;color : #0085cf !important;">View Attachments</span></div>';
				else
					return '<div>N/A</div>'
        }
        },
		{
            text : 'Comments',
            width:150,
			dataIndex:'Comments'
        },
		{
            text : 'Error Message',
            width:150,
			dataIndex:'error'
        },
		{
            text : 'Action',
            width:60,
			xtype:'actioncolumn',
			locked   : true,
			menuDisabled  :true,
			items:[{
			  icon:menuIcon,
			  handler:'showMenu'
		  }]
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
//    	
//    	//this.getView().refreshNode(record);
//    	if(e.target.className=='attachment')
//    		alert(e.target.accessKey);
    }
});