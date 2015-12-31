Ext.define('AOC.view.partner.CreatePartnerProductLine',{
	extend:'AOC.view.base.BaseWindow',
	alias:'widget.createpartnerproductline',
	itemId:'createpartnerproductlineItemId',
	controller:'productlineMain',
	bodyPadding: 5,
	width: 670,
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
            		var AdvancedPropertiesForm=me.down('#AdvancedPropertiesForm').loadRecord(me.rec);
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
        	return [
			{
				xtype:'displayfield',
				itemId:'titleItemId',
				vale:'',
				hidden:false,
				margin : '5 0 0 220'
			   },
			   {
			   	xtype :'tbspacer',
			   	height:1,
				},
        	    {
        		xtype:'displayfield',
        		itemId:'messageFieldItemId',
        		hidden:true
        	},{
        		xtype:'form',
        		itemId:'listPanel',
        		border:false,
        		height:300,
        		scrollable : true,
        		items:[{
        			xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
        			xtype:'textfield',
        			itemId:'PNItemId',
        			labelAlign:'top',
        			name: 'partnerName',
        			fieldLabel:'Partner Name',
        			value:me.partnerName,
        		    labelSeparator:'',
                    labelWidth : 200,
		            width : 300,
		            readOnly:true,
		            maxLength : '50',
		            enforceMaxLength: true
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'RItemId',
        			labelAlign:'top',
        			name: 'rboName',
        			fieldLabel:'RBO Name',
        			allowBlank: false,
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		            blankText : 'RBO Name is required'
        		}]
        		},
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
            			xtype:'textfield',
            			itemId:'PLItemId',
            			labelAlign:'top',
            			name: 'productLineType',
            			fieldLabel:'Product Line',
            			allowBlank: false,
            			labelSeparator:'',
                        labelWidth : 200,
      		            width : 300,
      		            maxLength : '50',
      		            enforceMaxLength: true,
      		            blankText : 'Product Line is required',
      		            listeners : {
      		            	 blur : this.notifyByImage,
      		            	'focus' : 'HideMandatoryMessage'
     	                    }
            		},
            		{
                    	xtype :'tbspacer',
                    	width :30
            		},
            		{
            			xtype:'textfield',
            			itemId:'CItemId',
            			name: 'csrName',
            			fieldLabel:'CSR',
            			allowBlank: false,
            			labelSeparator:'',
                        labelWidth : 200,
      		            width : 300,
      		            labelAlign:'top',
      		            maxLength : '100',
      		            enforceMaxLength: true,
      		            blankText : 'CSR is required',
      		            listeners : {
      		            	 blur : this.notifyByImage,
      		            	'focus' : 'HideMandatoryMessage'
     	                    }
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
        			itemId:'CSREmaidId',
        			labelAlign:'top',
        			name: 'csrEmail',
        			value:'',
        			fieldLabel:'CSR Email',
        			allowBlank: false,
        			labelSeparator:'',
        			vtype: 'email' ,
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '100',
  		            enforceMaxLength: true,
  		            blankText : 'CSR is required',
  		            listeners : {
  		            	 blur : this.notifyByImage,
  		            	'focus' : 'HideMandatoryMessage'
 	                    }
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'SONItemId',
        			labelAlign:'top',
        			name: 'shippingOnlyNotes',
        			fieldLabel:'Shipping Only Notes',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '300',
  		            enforceMaxLength: true,
  		            blankText : 'Shipping Only Notes is required',
  		            listeners : {
  		            	blur : this.notifyByImage,
  		            	'focus' : 'HideMandatoryMessage'
 	                    }
        		}
        		]
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
        			itemId:'PIItemId',
        			labelAlign:'top',
        			name: 'packingInstruction',
        			fieldLabel:'Packing Instuction',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
   		            maxLength : '300',
  		            enforceMaxLength: true,
  		            blankText : 'Packing Instuction is required',
  		            listeners : {
  		            	 blur : this.notifyByImage,
  		            	'focus' : 'HideMandatoryMessage'
 	                    }
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			itemId:'PItemId',
        			labelAlign:'top',
        			name: 'invoiceLineInstruction',
        			fieldLabel:'Invoice Line Instruction',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
   		            maxLength : '300',
  		            blankText : 'Invoice Line Instruction  is required',
  		            enforceMaxLength: true,
  		            listeners : {
  		            	 blur : this.notifyByImage,
  		            	'focus' : 'HideMandatoryMessage'
 	                    }
        		}
        		]
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
            			labelAlign:'top',
            			name: 'manufacturingNotes',
            			fieldLabel:'Manufacturing Notes',
            			value:'',
            			labelSeparator:'',
                        labelWidth : 200,
      		            width : 300,
      		            height:60,
      		            maxLength : '300',
      		            blankText : 'Manufacturing Notes  is required',
      		            enforceMaxLength: true,
      		            allowBlank: false,
      		            listeners : {
      		            	 blur : this.notifyByImage,
      		            	'focus' : 'HideMandatoryMessage'
     	                    }
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
                	xtype:'textfield',
        			itemId:'VBItemId',
        			labelAlign:'top',
        			name: 'variableDataBreakdown',
        			fieldLabel:'Variable Breakdown',
        			allowBlank: false,
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            labelSeparator : '',
  		            blankText : 'Variable Breakdown  is required',
  		            maxLength : '300',
  		            enforceMaxLength: true,
  		            listeners : {
  		            	 blur : this.notifyByImage,
  		            	'focus' : 'HideMandatoryMessage'
 	                    }
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
        			itemId:'SSSBItemId',
        			labelAlign:'top',
        			name: 'splitShipSetBy',
        			fieldLabel:'Split Ship Set By',
        			allowBlank: false,
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            labelSeparator : '',
  		            blankText : 'Split Ship Set By  is required',
  		            maxLength : '5',
  		            enforceMaxLength: true,
  		            listeners : {
  		            	 blur : this.notifyByImage,
  		            	'focus' : 'HideMandatoryMessage'
 	                    }
        		},{
                	xtype :'tbspacer',
                	width :30
        		},{
        			xtype:'textfield',
        			itemId:'EmailDomainItemId',
        			labelAlign:'top',
        			name: 'orderEmailDomain',
        			fieldLabel:'Order Email Domain',
        			//allowBlank: false,
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            blankText : 'Order Email Domain  is required',
  		            maxLength : '5',
  		            enforceMaxLength: true,
  		            listeners : {
  		            	 blur : this.notifyByImage,
  		            	'focus' : 'HideMandatoryMessage'
 	                    }
        			}]
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		}
               ]
        	},
        	{
        		xtype: 'form',
        		itemId:'AdvancedPropertiesForm',
                width:1100,
                collapseDirection: 'top',
                animCollapse: false,
                collapsible: true,
                collapsed :true,
                title: 'Advanced Properties',
                titleCollapse: true,
                region: 'south',
                items:[ {
        			xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
                	
            			xtype:'combobox',
            			itemId:'OSTItemId',
            			labelAlign:'top',
            			name: 'orderSchemaType',
            			fieldLabel:'Order Schema Type',
            			value:'',
            			labelSeparator:'',
                        labelWidth : 200,
      		            width : 300,
      		            labelSeparator : '',
      		            editable:false,
      		            store: [['Excel', 'Excel']],
      		            maxLength : '50',
      		            enforceMaxLength: true
            		
                       },
        		{
                	xtype :'tbspacer',
                	width :30
        		},{
          			xtype:'textfield',
        			itemId:'OHMItemId',
        			labelAlign:'top',
        			name: 'orderSchemaID',
        			fieldLabel:'Order SchemaID',//?/
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            labelSeparator : '',
  		            maxLength : '50',
  		            enforceMaxLength: true
        		}
        		  ]
        		 },
                     {
                       	xtype :'tbspacer',
                       	width :30
               		  },
               		 {
              			xtype: 'fieldcontainer',
                          layout: 'hbox',
                          margin : '5 0 0 5',
                          items:[{
                  			xtype:'textfield',
                			itemId:'ODMItemId',
                			labelAlign:'top',
                			name: 'orderMappingID',
                			fieldLabel:'Order MappingID',//?/
                			value:'',
                			labelSeparator:'',
                            labelWidth : 200,
          		            width : 300,
          		            labelSeparator : '',
          		            maxLength : '50',
          		            enforceMaxLength: true
                		},
              		{
                      	xtype :'tbspacer',
                      	width :30
              		},
              		{
            			xtype:'textfield',
            			itemId:'PreProcessPID',
            			labelAlign:'top',
            			name: 'preProcessPID',
            			fieldLabel:'Pre Process PID',//?/
            			value:'',
            			labelSeparator:'',
                        labelWidth : 200,
      		            width : 300,
      		            maxLength : '50',
      		            enforceMaxLength: true
            		}]
              		}
]
                },
                {
                	xtype :'tbspacer',
                	width :100
        		},
        	{ buttons:this.buildButtons()}
        	]
       
        },
		   notifyByImage : function(config){
		    	 if(config.isValid())
		    		   config.setFieldStyle('background-image:url('+successImageSrc+');background-repeat:no-repeat;background-position:right;');
					else
					   config.setFieldStyle('background-image:url('+errorIcon+');background-repeat:no-repeat;background-position:right;');
		     }
                 });
