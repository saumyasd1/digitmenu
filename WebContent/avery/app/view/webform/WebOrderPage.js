Ext.define('AOC.view.webform.WebOrderPage',{
	extend:'Ext.panel.Panel',
	alias:'widget.weborderpage',
	itemId:'weborderpageItemId',
	controller:'webFormMain',
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
                handler : 'SaveDetails'
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
        				emptyText:'Partner Name',
        				store:'PartnerManagementStore',
        				valueField:'id',
        				displayField:'partnerName',
        				listeners:{
        					'change':'onPartnerChange'
        				}
        			},
        			{
                    	xtype :'tbspacer',
                    	width :20
            		},
        			{
        				xtype:'combo',
        				emptyText:'RBO',
        				reference:'rboCombo',
        				displayField:'rboName',
        				valueField:'rboId',
        				disabled:true
        			},
        			{
                    	xtype :'tbspacer',
                    	width :20
            		},
        			{
        				xtype:'combo',
        				reference:'productLineCombo',
        				displayField:'productLineType',
        				valueField:'id',
        				emptyText:'Product Line',
        				disabled:true
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
        			name: 'orderFileType',
        			fieldLabel:'Order File Type',
        			emptyText:'File Type',
        			labelSeparator:'',
                    labelWidth : 100,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right'
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
        			 enforceMaxLength: true,
        			 listeners:{
        				 'change':function(obj,value){
        				 }
        			 }
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
  		             multiple: true, // multiupload (multiple attr)
  		            listeners:{
     				 'change':'change'
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
					     flex:1,
					    // store:me.store
					 }]
        		  }
               ],
               buttons:this.buildButtons()
        	}]
        }
});
