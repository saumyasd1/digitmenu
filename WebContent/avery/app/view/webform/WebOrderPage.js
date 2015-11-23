Ext.define('AOC.view.webform.WebOrderPage',{
	extend:'Ext.panel.Panel',
	alias:'widget.weborderpage',
	itemId:'weborderpageItemId',
	requires:['AOC.view.webform.AttachmentInfoGrid'],
	bodyPadding: 5,
	width: 700,
	border:false,
	 layout: {
        type: 'hbox',
        pack: 'center'
    },
    initComponent : function(){
    	var me=this;
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildItem()
            });
            this.callParent(arguments);
        },
        buildButtons : function(){
            return [{
            	text : 'Save',
                scope : this,
                action : 'SaveDetails'
            },
            {
            	text : 'Cancel',
                scope : this,
                action : 'CancelDetails'
            }];
        },
        buildItem:function(){
        	var me=this;
        	return [{
        		xtype:'displayfield',
        		itemId:'messageFieldItemId',
        		hidden:true
        	},{
        		xtype:'form',
        		itemId:'listPanel',
        		border:false,
        		items:[{
        			xtype:'fieldcontainer',
        			layout:'hbox',
        			items:[{
        				xtype:'combo',
        				emptyText:'Partner Name'
        			},
        			{
                    	xtype :'tbspacer',
                    	width :20
            		},
        			{
        				xtype:'combo',
        				emptyText:'RBO'
        			},
        			{
                    	xtype :'tbspacer',
                    	width :20
            		},
        			{
        				xtype:'combo',
        				emptyText:'Product Line'
        			}]
        		},{
                	xtype :'tbspacer',
                	width :20
        		},{
        	
        			xtype:'textfield',
        			itemId:'PNItemId',
        			labelAlign:'right',
        			name: 'partnerName',
        			fieldLabel:'Sender Email',
        			value:'',
        		    labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
		            width : 500,
		            labelSeparator : '',
		            labelAlign:'right',
		           // minLength:'4',//added check for minimum user name length
		            maxLength : '50',
		            blankText : 'Name field is required',
		            enforceMaxLength: true
		        
        		},
        		{
                	xtype :'tbspacer',
                	width :20
        		},
        		{
        			xtype:'textfield',
        			itemId:'RNtemId',
        			labelAlign:'right',
        			name: 'rboName',
        			fieldLabel:'Email Subject',
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            blankText : 'Name field is required',
  		            enforceMaxLength: true
        		},
        		{
        			
        			xtype:'textareafield',
        			itemId:'AItemId',
        			labelAlign:'right',
        			name: 'address',
        			fieldLabel:'Email Body',
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            blankText : 'Name field is required',
  		            enforceMaxLength: true
        		},
        		{
                	xtype :'tbspacer',
                	width :10
        		},
        		{   
        			xtype:'datefield',
        			itemId:'ODItemId',
        			labelAlign:'right',
        			name: 'orderDate',
        			fieldLabel:'Order Date',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
   		            enforceMaxLength: true
        		},
        		{
                	xtype :'tbspacer',
                	width :10
        		},
        		{
        			xtype:'combobox',
        			itemId:'OFTItemId',
        			labelAlign:'right',
        			name: 'orderFileType',
        			fieldLabel:'Order File Type',
        			emptyText:'File Type',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true
        		},
        		{
                	xtype :'tbspacer',
                	width :10
        		},
        		{ 
        			xtype : 'fileuploadfield', 
        			name : 'orderFileType', 
        			fieldLabel : 'Order File Type', 
        			labelSeparator:'',
        			labelWidth : 100,
        			width : 500,
        			allowBlank : false, 
        			forceSelection : true,
        			 enforceMaxLength: true
        			},
        		{
                	xtype :'tbspacer',
                	width :10
        		},
        		{   
        			xtype:'fileuploadfield',
        			itemId:'AItemId',
        			labelAlign:'right',
        			name: 'attachments',
        			fieldLabel:'Attachments',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		            handler:function()
  		            {
  		            	
  		            }
        		},
        		{
                	xtype :'tbspacer',
                	width :10
        		},
        		   {
	 				xtype:'panel',
	 				layout:'fit',
	 				items:[
					 {
						 xtype:'attachmentinfoGrid',
					     height: 200,
					     width:550,
					     flex:1
					 }]
        		  }
               ],
               buttons:this.buildButtons()
        	}]
        }
});
