Ext.apply(Ext.form.VTypes, {
             excelUpload: function(val, field) {                              
                                 var fileName = /^.*\.(gif|png|bmp|jpg|jpeg)$/i;
                                 return fileName.test(val);
                           },                 
             excelUploadText: 'Image must be in .gif,.png,.bmp,.jpg,.jpeg format'
  });
Ext.define('AOC.view.webform.WebOrderForm',{
	extend:'Ext.form.Panel',
	alias:'widget.weborderform',
	itemId:'weborderformItemId',
	controller:'webFormMain',
	bodyPadding: 5,
	width: 700,
	border:false,
	 layout: {
        type: 'vbox'
    },
    initComponent : function(){
    	var me=this;
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildItem()
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
        				disabled:true,
        				listeners:{
        					'change':'onRBOChange'
        				}
        			},
        			{
                    	xtype :'tbspacer',
                    	width :15
            		},
        			{
        				xtype:'combo',
        				reference:'productLineCombo',
        				displayField:'productLineType',
        				valueField:'id',
        				editable:true,
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
        			reference:'email',
        			vtype:'email',
        			fieldLabel:'Sender Email',
        			value:'',
        		    labelSeparator:'',
        		    disabled:true,
                    allowBlank: false,
                    labelWidth : 100,
		            width : 500,
		            labelSeparator : ''
		        
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
        			reference:'subject',
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
        			name: 'emailBody',
        			reference:'emailBody',
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
                	xtype :'tbspacer',
                	width :10
        		},
        		{ 
        			xtype : 'fileuploadfield', 
        			name : 'orderFileType',
        			reference:'orderFileType',
        			fieldLabel : 'Order File Type', 
        			labelSeparator:'',
        			labelWidth : 100,
        			width : 500,
        			allowBlank : true, 
        			disabled:true,
        			//vtype:'excelUpload',
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
        			labelAlign:'right',
        			name: 'attachment1',
        			reference: 'attachment1',
        			fieldLabel:'Attachments',
        			labelSeparator:'',
                    allowBlank: true,
                    labelWidth : 100,
                    disabled:true,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            listeners:{
     				 'change':'onAttachemnetChange'
     			 }
        		}
               ]
        }
});
