Ext.define('AOC.view.webform.WebOrderForm',{
	extend:'Ext.form.Panel',
	alias:'widget.weborderform',
	itemId:'weborderformItemId',
	controller:'webFormMain',
	bodyPadding: 5,
	width: 700,
	border:false,
	url: applicationContext+'/rest/orders/attachments/1',
	 layout: {
        type: 'vbox'
    },
    initComponent : function(){
    	var me=this;
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildItem(),
                //buttons:this.buildButtons()
            });
            this.callParent(arguments);
        },
        buildItem:function(){
        	var me=this;
        	return [{
        			xtype:'fieldcontainer',
        			layout:'hbox',
        			items:[{
        				xtype:'combo',
        				emptyText:'Partner Name',
        				store:'PartnerManagementStore',
        				valueField:'id',
        				name:'partnerName',
        				editable:false,
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
        				editable:false,
        				displayField:'rboName',
        				name:'rboName',
        				valueField:'rboName',
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
        				valueField:'productLineType',
        				editable:false,
        				name:'productLineType',
        				emptyText:'Product Line',
        				disabled:true,
        				listeners:{
        					'change':'onProductLineSelection'
        				}
        			}]
        		},{
                	xtype :'tbspacer',
                	width :20
        		},{
        	
        			xtype:'textfield',
        			itemId:'PNItemId',
        			labelAlign:'right',
        			name: 'email',
        			fieldLabel:'Sender Email',
        			value:'',
        		    labelSeparator:'',
        		    disabled:true,
                    allowBlank: true,
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
        			name: 'subject',
        			fieldLabel:'Email Subject',
        			value:'',
        			labelSeparator:'',
                    allowBlank: true,
                    disabled:true,
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
        			disabled:true,
                    allowBlank: true,
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
        			disabled:true,
        			fieldLabel:'Order Date',
        			labelSeparator:'',
                    allowBlank: true,
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
        			allowBlank : true, 
        			disabled:true,
        			forceSelection : true,
        			 enforceMaxLength: true,
        			 listeners:{
         				 'change':'onOrderFileChange'
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
        			name: 'attachment1',
        			fieldLabel:'Attachments',
        			labelSeparator:'',
                    allowBlank: true,
                    labelWidth : 100,
                    disabled:true,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		             multiple: true, // multiupload (multiple attr)
  		            listeners:{
     				 'change':'onAttachemnetChange'
     			 }
        		}
               ]
               
        }
});
