Ext.define('AOC.view.partner.CreatePartnerProductLine',{
	extend:'Ext.window.Window',
	alias:'widget.createpartnerproductline',
	itemId:'createpartnerproductlineItemId',
	controller:'productlineMain',
	bodyPadding: 5,
	width: 1100,
	border:false,
    modal:true,
    draggable:false,
    editMode:false,
    rec:null,
    productlineId:null,
    partnerid:null,
    partnerName:null,
    initComponent : function(){
    	var me=this;
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildItem(),
                listeners:{
            	'afterrender':function(obj){
            	if(me.rec!=null){
            		var form=me.down('form').loadRecord(me.rec);
            	}
            }
            }
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
                handler : 'CancelDetails'
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
        			xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
        			xtype:'textfield',
        			itemId:'PNItemId',
        			labelAlign:'right',
        			name: 'partnerName',
        			fieldLabel:'Partner Name',
        			value:me.partnerName,
        		    labelSeparator:'',
                    labelWidth : 200,
		            width : 500,
		            labelSeparator : '',
		            readOnly:true,
		            labelAlign:'right',
		            maxLength : '50',
		            enforceMaxLength: true
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'combobox',
        			itemId:'OSTItemId',
        			labelAlign:'right',
        			name: 'orderSchemaType',
        			fieldLabel:'Order Schema Type',
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            store: [['Excel', 'Excel']],
  		            maxLength : '50',
  		            enforceMaxLength: true
        		}]
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
        			xtype:'textfield',
        			itemId:'RItemId',
        			labelAlign:'right',
        			name: 'rboName',
        			fieldLabel:'RBO Name',
        			allowBlank: false,
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		            blankText : 'RBO Name is required'
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'OHItemId',
        			labelAlign:'right',
        			name: 'orderMappingID',
        			fieldLabel:'Order Header Schema Name ',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true
        		}]
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
        			xtype:'textfield',
        			itemId:'PLItemId',
        			labelAlign:'right',
        			name: 'productLineType',
        			fieldLabel:'Product Line',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		            blankText : 'Product Line is required',
  		            listeners : {
  		            	 blur : this.notifyByImage,
 	                	focus : this.notifyByMessage
 	                    }
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'OHMItemId',
        			labelAlign:'right',
        			name: 'orderMappingID',
        			fieldLabel:'Order Header MappingID',//?/
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
        			xtype:'textfield',
        			itemId:'CItemId',
        			labelAlign:'right',
        			name: 'csrName',
        			fieldLabel:'CSR',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '100',
  		            enforceMaxLength: true,
  		            blankText : 'CSR is required',
  		            listeners : {
  		            	 blur : this.notifyByImage,
 	                	focus : this.notifyByMessage
 	                    }
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'ODMItemId',
        			labelAlign:'right',
        			name: 'orderMappingID',
        			fieldLabel:'Order Detail MappingID',//?/
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
        			xtype:'textfield',
        			itemId:'CSRItemId',
        			labelAlign:'right',
        			name: 'csrEmail',
        			fieldLabel:'CSR Email',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '100',
  		            enforceMaxLength: true,
  		            blankText : 'CSR is required',
  		            listeners : {
  		            	 blur : this.notifyByImage,
 	                	focus : this.notifyByMessage
 	                    }
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'OEDItemId',
        			labelAlign:'right',
        			name: 'orderEmailDomain',
        			fieldLabel:'Order Email Domain',//?/
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
        			xtype:'textfield',
        			itemId:'SONItemId',
        			labelAlign:'right',
        			name: 'shippingOnlyNotes',
        			fieldLabel:'Shipping Only Notes',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            height:50,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '500',
  		            enforceMaxLength: true,
  		            blankText : 'Shipping Only Notes is required',
  		            listeners : {
  		            	blur : this.notifyByImage,
 	                	focus : this.notifyByMessage
 	                    }
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'AItemId',
        			labelAlign:'right',
        			name: 'attachmentIdentifier_1',
        			fieldLabel:'Attachment Identifier 1',
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
        			xtype:'textfield',
        			itemId:'PItemId',
        			labelAlign:'right',
        			name: 'packingInstruction',
        			fieldLabel:'Packing Instuction',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            height:50,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '500',
  		            enforceMaxLength: true,
  		            blankText : 'Packing Instuction is required',
  		            listeners : {
  		            	 blur : this.notifyByImage,
 	                	focus : this.notifyByMessage
 	                    }
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'AItemId',
        			labelAlign:'right',
        			name: 'attachmentSchemaType_1',
        			fieldLabel:'Attachment Schema Type 1',
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true
        		
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
        			xtype:'textfield',
        			itemId:'PItemId',
        			labelAlign:'right',
        			name: 'invoiceLineInstruction',
        			fieldLabel:'Invoice Line Instruction',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            height:50,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '500',
  		            blankText : 'Invoice Line Instruction  is required',
  		            enforceMaxLength: true,
  		            listeners : {
  		            	 blur : this.notifyByImage,
 	                	focus : this.notifyByMessage
 	                    }
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'AItemId',
        			labelAlign:'right',
        			name: 'attachmentSchemaType_1',
        			fieldLabel:'Attachment Schema Name 1',//?/
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true
        		
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
                    	xtype:'textfield',
            			itemId:'MNItemId',
            			labelAlign:'right',
            			name: 'manufacturingNotes',
            			fieldLabel:'Manufacturing Notes',
            			value:'',
            			labelSeparator:'',
                        labelWidth : 200,
      		            width : 500,
      		            height:50,
      		            maxLength : '500',
      		            blankText : 'Manufacturing Notes  is required',
      		            labelAlign:'right',
      		            enforceMaxLength: true,
      		            listeners : {
      		            	 blur : this.notifyByImage,
     	                	focus : this.notifyByMessage
     	                    }
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'AMNItemId',
        			labelAlign:'right',
        			name: 'attachmentMappingID_1',
        			fieldLabel:'Attachment Mapping  Name',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            maxLength : '50',
  		            enforceMaxLength: true
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
                    	xtype:'textfield',
            			itemId:'VBItemId',
            			labelAlign:'right',
            			name: 'variableDataBreakdown',
            			fieldLabel:'Variable Breakdown',
            			allowBlank: false,
            			value:'',
            			labelSeparator:'',
                        labelWidth : 200,
      		            width : 500,
      		            height:50,
      		            labelSeparator : '',
      		            labelAlign:'right',
      		            blankText : 'Variable Breakdown  is required',
      		            maxLength : '500',
      		            enforceMaxLength: true,
      		            listeners : {
      		            	 blur : this.notifyByImage,
     	                	focus : this.notifyByMessage
     	                    }
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'MNItemId',
        			labelAlign:'right',
        			name: 'attachmentMappingID_2',
        			fieldLabel:'Attachment Mapping Name 2',
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            labelAlign:'right',
  		            margin : '5 0 0 5',
  		            enforceMaxLength: true
        		}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{ 
        			xtype:'textfield',
        			itemId:'SSSBItemId',
        			labelAlign:'right',
        			name: 'splitShipSetBy',
        			fieldLabel:'Split Ship Set By',
        			allowBlank: false,
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 500,
  		            labelSeparator : '',
  		            blankText : 'Split Ship Set By  is required',
  		            labelAlign:'right',
  		            margin : '5 0 0 5',
  		            maxLength : '5',
  		            enforceMaxLength: true,
  		            listeners : {
  		            	 blur : this.notifyByImage,
 	                	focus : this.notifyByMessage
 	                    }
        		}
               ],
        		buttons:this.buildButtons()
        	}]
        },
        notifyByMessage : function(config){
			   var me = this;
			   if(config.up('#listPanel').ownerCt){
				   if(config.up('#listPanel').ownerCt.editMode)
					       config.up('#listPanel').ownerCt.setTitle('Edit Partner Product Line');
				   else
					       config.up('#listPanel').ownerCt.setTitle('Add Partner Product Line');
			   }
		   },
		   notifyByImage : function(config){
		    	 if(config.isValid())
		    		   config.setFieldStyle('background-image:url(avery/resources/images/valid_field.png);background-repeat:no-repeat;background-position:right;');
					else
					   config.setFieldStyle('background-image:url(avery/resources/images/invalid_field.jpg);background-repeat:no-repeat;background-position:right;');
		     }
                 });
