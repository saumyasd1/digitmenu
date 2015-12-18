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
        		xtype:'displayfield',
        		itemId:'messageFieldItemId',
        		value:'',
        		hidden:false
        	},{
        			xtype:'fieldcontainer',
        			layout:'hbox',
        			items:[{
        				xtype:'combo',
        				emptyText:'Partner Name',
        				store:'PartnerManagementStore',
        				valueField:'id',
        				name:'partnerName',
        				editable:false,
        				allowBlank : false, 
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
        				allowBlank : false, 
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
        				allowBlank : false, 
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
        			fieldLabel:'Sender Email<font color=red>*</font>',
        			value:'',
        		    labelSeparator:'',
        		    disabled:true,
                    allowBlank: false,
                    labelWidth : 100,
		            width : 500,
		            blankText : 'Sender Email is required',
		            listeners:{
	      				  blur : this.notifyByImage
	      			 }
		        
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
        			fieldLabel:'Email Subject<font color=red>*</font>',
        			value:'',
        			labelSeparator:'',
                    allowBlank: false,
                    disabled:true,
                    labelWidth : 100,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            blankText : 'Email Subject is required',
  		            listeners:{
      				  blur : this.notifyByImage
      			 }
        		},
        		{
        			
        			xtype:'textareafield',
        			itemId:'AItemId',
        			labelAlign:'right',
        			name: 'emailBody',
        			reference:'emailBody',
        			fieldLabel:'Email Body<font color=red>*</font>',
        			value:'',
        			labelSeparator:'',
        			disabled:true,
                    allowBlank: false,
                    labelWidth : 100,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            blankText :'Email Body is required',
  		            listeners:{
      				  blur : this.notifyByImage
      			 }
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
        			fieldLabel : 'Order File Type<font color=red>*</font>', 
        			labelSeparator:'',
        			labelWidth : 100,
        			width : 500,
        			allowBlank : false, 
        			disabled:true,
        			forceSelection : true,
        			 enforceMaxLength: true,
        			blankText :'Order File Type is required',
        			 listeners:{
         				 'change':'onOrderFileChange',
         				  blur : this.notifyByImage
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
        			fieldLabel:'Attachments<font color=red>*</font>',
        			labelSeparator:'',
                    allowBlank: false,
                    labelWidth : 100,
                    disabled:true,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            listeners:{
     				 'change':'onAttachemnetChange',
     				  blur : this.notifyByImage
     			 }
        		}
               ]
        },
        notifyByImage : function(config){
	    	 if(config.isValid())
	    		   config.setFieldStyle('background-image:url(avery/resources/images/valid_field.png);background-repeat:no-repeat;background-position:right;');
				else
				   config.setFieldStyle('background-image:url(avery/resources/images/invalid_field.jpg);background-repeat:no-repeat;background-position:right;');
	     }
});
