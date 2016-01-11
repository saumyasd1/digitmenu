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
	bodyPadding: '0 200 0 200',
	border:false,
	layout: {
        type: 'anchor'
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
        		anchor:'100%',
        		hidden:true
        	       },{
        			xtype:'fieldcontainer',
        			layout:'hbox',
        			anchor:'100%',
        			labelWidth : 200,
        			fieldLabel:' ',
        			items:[{
        				xtype:'combo',
        				emptyText:'Partner Name',
        				store:'PartnerManagementStore',
        				valueField:'id',
        				name:'partnerName',
        				editable:false,
        				allowBlank : false,
        				margin:'0 20 0 0',
        				flex:1,
        				displayField:'partnerName',
        				listeners:{
        					'change':'onPartnerChange',
        					'focus': 'notifyByMessage'
        				}
        			},
        			{
        				xtype:'combo',
        				emptyText:'RBO',
        				reference:'rboCombo',
        				editable:false,
        				displayField:'rboName',
        				name:'rboName',
        				flex:1,
        				margin:'0 20 0 0',
        				valueField:'rboName',
        				allowBlank : false, 
        				disabled:true,
        				listeners:{
        					'change':'onRBOChange',
        					'focus': 'notifyByMessage'
        				}
        			},
        			{
        				xtype:'combo',
        				reference:'productLineCombo',
        				displayField:'productLineType',
        				valueField:'id',
        				editable:true,
        				flex:1,
        				name:'productLineType',
        				emptyText:'Product Line',
        				allowBlank : false, 
        				disabled:true,
        				listeners:{
        					'change':'onProductLineSelection',
        					'focus': 'notifyByMessage'
        				}
        			}]
        		},{
        	
        			xtype:'textfield',
        			itemId:'PNItemId',
        			labelAlign:'right',
        			name: 'email',
        			reference:'email',
        			anchor:'100%',
        			vtype:'email',
        			fieldLabel:'Sender Email<font color=red>*</font>',
        			value:'',
        		    labelSeparator:'',
        		    disabled:true,
                            allowBlank: false,
                            labelWidth : 200,
		            blankText : 'Sender Email is required',
		            listeners:{
	      				  blur : this.notifyByImage,
	      				'focus': 'notifyByMessage'
	      			 }
		        
        		},
        		{
        			xtype:'textfield',
        			itemId:'RNtemId',
        			labelAlign:'right',
        			name: 'subject',
        			anchor:'100%',
        			reference:'subject',
        			fieldLabel:'Email Subject<font color=red>*</font>',
        			value:'',
        			labelSeparator:'',
        			allowBlank: false,
        			disabled:true,
        			labelWidth : 200,
        			labelSeparator : '',
        			labelAlign:'right',
        			maxLength : '50',
        			blankText : 'Email Subject is required',
        			listeners:{
      				  blur : this.notifyByImage,
      				'focus': 'notifyByMessage'
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
        			anchor:'100%',
        			labelWidth : 200,
        			labelSeparator : '',
        			labelAlign:'right',
        			maxLength : '50',
        			blankText :'Email Body is required',
        			listeners:{
      				  blur : this.notifyByImage,
      				'focus': 'notifyByMessage'
      			 }
        		},
        		{ 
        			xtype : 'fileuploadfield', 
        			name : 'orderFileType',
        			reference:'orderFileType',
        			fieldLabel : 'Order File Type<font color=red>*</font>', 
        			labelSeparator:'',
        			labelWidth : 200,
        			anchor:'100%',
        			labelAlign:'right',
        			allowBlank : false, 
        			disabled:true,
        			forceSelection : true,
        			enforceMaxLength: true,
        			blankText :'Order File Type is required',
        			 listeners:{
         				 'change':'onOrderFileChange',
         				  blur : this.notifyByImage,
         				 'focus': 'notifyByMessage'
         			 }
        			},
        		{   
        			xtype:'fileuploadfield',
        			labelAlign:'right',
        			name: 'attachment1',
        			anchor:'100%',
        			reference: 'attachment1',
        			fieldLabel:'Attachments',
        			labelSeparator:'',
        			allowBlank: true,
        			labelWidth : 200,
                    		disabled:true,
                    		labelSeparator : '',
                    		labelAlign:'right',
                    		listeners:{
     				 'change':'onAttachemnetChange',
     				  blur : this.notifyByImage,
     				  'focus': 'notifyByMessage'
     			 }
        		},{
     			     xtype:'hidden',
     			     name:'oldOrderId'
     			 },
     			 {
     			     xtype:'hidden',
     			     name:'oldFileIds'
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
