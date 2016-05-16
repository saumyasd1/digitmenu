Ext.define('AOC.view.partner.CreatePartnerProductLine',{
	extend:'AOC.view.base.BaseWindow',
	alias:'widget.createpartnerproductline',
	itemId:'createpartnerproductlineItemId',
	controller:'productlineMain',
	bodyPadding: 5,
	width: 690,
	border:false,
    modal:true,
    draggable:false,
    editMode:false,
    rec:null,
    productlineId:null,
    partnerid:null,
    partnerName:null,
	scrollable : true,
    initComponent : function(){
    	var me=this;
    	this.fieldArray = [],
            Ext.apply(this,{
                items:this.buildContainerItem(),
                
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
            	text : AOCLit.Save,
                handler : 'SaveDetails'
            },
            {
            	text : AOCLit.Cancel,
                handler : 'CancelDetails'
            }];
        },
        buildContainerItem:function(){
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
					   	height:1
						},
					    {
						xtype:'displayfield',
						itemId:'messageFieldItemId',
						hidden:true
					},
        			{
        				xtype:'container',
        				height:400,
        				scrollable:true,
        				items:this.buildItem()
        			},
        			{buttons:this.buildButtons()}]
        },
        buildItem:function(){
        	var me=this;
        	return [
        	{
        		xtype:'form',
        		itemId:'listPanel',
        		border:false,
        		height:400,
        		items:[{
        			xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
        			xtype:'textfield',
        			itemId:'PNItemId',
        			labelAlign:'top',
        			name: 'partnerName',
        			fieldLabel:AOCLit.partnerName,
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
        			reference:'rboName',
        			fieldLabel:'RBO Name',
        			allowBlank: false,
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		            blankText : 'RBO Name is required',
  		            listeners : {
		            	 blur : this.notifyByImage,
		            	'focus' : 'HideMandatoryMessage'
	                    }
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
            			fieldLabel:AOCLit.productLine,
            			allowBlank: false,
            			labelSeparator:'',
                        labelWidth : 200,
      		            width : 300,
      		            maxLength : '50',
      		            enforceMaxLength: true,
      		            blankText : AOCLit.prodLineReq,
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
            			fieldLabel:AOCLit.CSR,
            			allowBlank: false,
            			labelSeparator:'',
                        labelWidth : 200,
      		            width : 300,
      		            labelAlign:'top',
      		            maxLength : '100',
      		            enforceMaxLength: true,
      		            blankText : AOCLit.CSRReq,
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
        			fieldLabel:AOCLit.CSREmail,
        			allowBlank: false,
        			labelSeparator:'',
        			regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/, //Allowed Space Between Email Ids
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '100',
  		            enforceMaxLength: true,
  		            blankText : AOCLit.CSRReq,
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
        			fieldLabel:AOCLit.shippingOnlyNotes,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '300',
  		            enforceMaxLength: true,
  		            listeners : {
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
        			fieldLabel:AOCLit.packingInstruction,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
   		            maxLength : '300',
  		            enforceMaxLength: true,
  		            listeners : {
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
        			fieldLabel:AOCLit.invoiceLineInstruction,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
   		            maxLength : '300',
  		            enforceMaxLength: true,
  		            listeners : {
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
            			fieldLabel:AOCLit.manufacturingNotes,
            			value:'',
            			labelSeparator:'',
                        labelWidth : 200,
      		            width : 300,
      		            height:60,
      		            maxLength : '300',
      		            enforceMaxLength: true,
      		            listeners : {
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
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            labelSeparator : '',
  		            maxLength : '300',
  		            enforceMaxLength: true,
  		            listeners : {
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
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            labelSeparator : '',
  		            maxLength : '5',
  		            enforceMaxLength: true,
  		            listeners : {
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
        			value:'',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            allowBlank: false,
  		            blankText : 'Order Email Domain  is required',
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
                width:660,
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
            			fieldLabel:AOCLit.orderSchemaType,
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
        			fieldLabel:AOCLit.orderSchemaId,//?/
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
                			fieldLabel:AOCLit.orderMappingID,//?/
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
            			fieldLabel:AOCLit.preProcessPID,//?/
            			value:'',
            			labelSeparator:'',
                        labelWidth : 200,
      		            width : 300,
      		            maxLength : '50',
      		            enforceMaxLength: true
            		}]
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
                    	    xtype:'checkbox',
                  			itemId:'additonaldataItemId',
                  			labelAlign:'top',
                  			name: 'attachmentRequired',
                  			fieldLabel:AOCLit.addDataReq,
                  			value:'',
                  			labelSeparator:'',
                            labelWidth : 200,
            		        width : 300,
            		        enforceMaxLength: true
                  		    }]
                		}
]
                },
                {
                	xtype :'tbspacer',
                	width :100
        		}

        	]
       
        },
		   notifyByImage : function(config){
		    	 if(config.isValid())
		    		   config.setFieldStyle('background-image:url('+ AOC.config.Settings.buttonIcons.successImageSrc+');background-repeat:no-repeat;background-position:right;');
					else
					   config.setFieldStyle('background-image:url('+ AOC.config.Settings.buttonIcons.errorIcon+');background-repeat:no-repeat;background-position:right;');
		     }
                 });
