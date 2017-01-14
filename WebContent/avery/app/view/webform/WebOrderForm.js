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
	requires: ['AOC.lang.lit'],
	border:false,
	attachmentCount:1,
	isResubmit:false,
	layout: {
        type: 'anchor'
    },
    reset: function() {
    	this.isResubmit=false;
    	var i=this.attachmentCount,currentAttachment,form=this;
    	for(var j=2;j<=i;j++){
    		currentAttachment=form.lookupReference('attachment'+j);
    		if(currentAttachment){
    			currentAttachment.destroy();
    		}
    	}
    	this.attachmentCount=1;
    	currentAttachment=form.lookupReference('attachment1');
    	if(currentAttachment)
    		currentAttachment.hide();
    	else{
    		form.add({
       			xtype:'fileuploadfield',
       			labelAlign:'right',
       			name: 'attachment1',
       			reference: 'attachment1',
       			fieldLabel:'Attachments',
       			labelSeparator:'',
       			allowBlank: true,
       			anchor:'100%',
       			labelWidth : 200,
 		        labelSeparator : '',
 		        hidden:true,
 		        labelAlign:'right',
 		        listeners:{
    				 'change':'onAttachemnetChange'
    			 }
		   });
    	}
        this.form.reset();
        this.lookupReference('email').setFieldStyle(AOC.lang.lit.hideImage);
        this.lookupReference('subject').setFieldStyle(AOC.lang.lit.hideImage);
        this.lookupReference('emailBody').setFieldStyle(AOC.lang.lit.hideImage);
        this.lookupReference('orderFileType').setFieldStyle(AOC.lang.lit.hideImage);
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
        				emptyText:AOCLit.partnerName,
        				reference:'partnerCombo',
        				itemId:'partnerCombo',
        				store:Ext.create('AOC.store.UniquePartnerStore'),
        				valueField:'id',
        				name:'partnerName',
        				editable:false,
        				allowBlank : false,
        				margin:'0 10 0 0',
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
        				itemId:'rboCombo',
        				editable:false,
        				displayField:'rboName',
        				name:'rboName',
        				flex:1,
        				margin:'0 10 0 0',
        				valueField:'id',
        				allowBlank : false, 
        				disabled:true,
        				listeners:{
        					'change':'onRBOChange',
        					'focus': 'notifyByMessage'
        				}
        			},
        			{
        				xtype:'combo',
        				reference:'dataStructureCombo',
        				itemId:'dataStructureCombo',
        				displayField:'dataStructureName',
        				valueField:'id',
        				editable:true,
        				flex:1,
        				name:'dataStructureName',
        				emptyText:AOCLit.productLine,
        				allowBlank : false, 
        				disabled:true,
        				listeners:{
        					'change':'onDataStructureSelection',
        					'focus': 'notifyByMessage'
        				}
        			}]
        		},{
        	
        			xtype:'textfield',
        			itemId:'PNItemId',
        			labelAlign:'right',
        			name: 'email',
        			reference:'email',
        			itemId:'email',
        			anchor:'100%',
        			vtype:'email',
        			fieldLabel:'Sender Email',
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
        			fieldLabel:'Email Subject',
        			itemId:'subject',
        			value:'',
        			labelSeparator:'',
        			allowBlank: false,
        			disabled:true,
        			labelWidth : 200,
        			labelAlign:'right',
        			maxLength : '100',
        			blankText : AOCLit.emailSubReq,
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
        			fieldLabel:AOCLit.emailBody,
        			itemId:'emailBody',
        			value:'',
        			labelSeparator:'',
        			disabled:true,
        			allowBlank: false,
        			anchor:'100%',
        			labelWidth : 200,
        			labelAlign:'right',
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
        			fieldLabel : 'Order File', 
        			itemId:'orderFileType',
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
        			itemId:'attachment1',
        			labelSeparator:'',
        			allowBlank: true,
        			labelWidth : 200,
                    		disabled:true,
                    		hidden:true,
                    		labelSeparator : '',
                    		labelAlign:'right',
                    		listeners:{
     				 'change':'onAttachemnetChange',
     				  //blur : this.notifyByImage,
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
	    		   config.setFieldStyle('background-image:url( AOC.config.Settings.buttonIcons.valid_field);background-repeat:no-repeat;background-position:right;');
		     else
				   config.setFieldStyle('background-image:url(AOC.config.Settings.buttonIcons.invalid_field);background-repeat:no-repeat;background-position:right;');
	    	
	     }
});
