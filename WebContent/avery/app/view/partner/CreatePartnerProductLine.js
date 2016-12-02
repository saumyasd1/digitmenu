Ext.define('AOC.view.partner.CreatePartnerProductLine',{
	extend:'AOC.view.base.BaseWindow',
	alias:'widget.createpartnerproductline',
	itemId:'createpartnerproductlineItemId',
	controller:'productlineMain',
	bodyPadding: 5,
	width: 1000,
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
        		height:710,
        		width:980,
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
        			xtype:'combo',
        			itemId:'RItemId',
        			labelAlign:'top',
        			name: 'rboName',
        			reference:'rboName',
        			fieldLabel:AOCLit.RBO,
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
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'combo',
        			itemId:'orgCodeId',
        			labelAlign:'top',
        			name: 'orgCode',
        			fieldLabel:AOCLit.orgCode,
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		            //blankText : AOCLit.prodLineReq,
  		            listeners : {
  		            	 blur : this.notifyByImage,
  		            	'focus' : 'HideMandatoryMessage'
 	                    }
        		}]
        		},{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[
            		{
            			xtype:'combo',
            			itemId:'SiteId',
            			name: 'site',
            			fieldLabel:'Site',
            			allowBlank: false,
            			labelSeparator:'',
                        labelWidth : 200,
      		            width : 300,
      		            labelAlign:'top',
      		            maxLength : '100',
      		            enforceMaxLength: true,
      		            //blankText : AOCLit.CSRReq,
      		            listeners : {
      		            	 blur : this.notifyByImage,
      		            	'focus' : 'HideMandatoryMessage'
     	                    }
            		},{
                    	xtype :'tbspacer',
                    	width :30
            		},
            		{
                   	 xtype: 'fieldcontainer',
                       defaultType: 'radiofield',
                       defaults: {
                           flex: 1
                       },
           			labelAlign:'top',
           			layout: 'hbox',
           			width:300,
           			name:'emailId',
           			fieldLabel:'Email Domain Type',
           			items:[{
                           boxLabel  : 'Private',
                           name      : 'emailId',
                           inputValue: 'private',
                           id        : 'radio1'	
                       }, {
                           boxLabel  : 'Public',
                           name      : 'emailId',
                           inputValue: 'public',
                           id        : 'radio2'
                       }]
           		},
           		{
                	xtype :'tbspacer',
                	width :30
        		},
           		{
        			xtype:'textfield',
        			//itemId:'EmailId',
        			name: 'EmailId',
        			fieldLabel:'Email IDs',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            labelAlign:'top',
  		            maxLength : '100',
  		            enforceMaxLength: true,
  		            listeners : {
  		            	 blur : this.notifyByImage,
  		            	'focus' : 'HideMandatoryMessage'
 	                    }
        		}]
        		},{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
            			xtype:'combo',
            			labelAlign:'top',
            			itemId:'CSRPEmailId',
            			name: 'CSRPrimaryEmail',
            			fieldLabel:'CSR Primary Email',
            			//allowBlank: false,
            			regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/, //Allowed Space Between Email Ids
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
            			xtype:'combo',
            			itemId:'CSRSEmailId',
            			name: 'CSRSecondaryEmail',
            			fieldLabel:'CSR Secondary Email',
            			//allowBlank: false,
            			labelSeparator:'',
            			regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/, //Allowed Space Between Email Ids
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
            		},
            		{
                    	xtype :'tbspacer',
                    	width :30
            		},
            		{
            			xtype:'combo',
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
            		}]
        		},
        		
        		
        		{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
        			xtype:'textfield',
        			labelAlign:'top',
        			name: 'billToCode',
        			fieldLabel:'Bill To Code',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '100',
  		            enforceMaxLength: true
  		            //blankText : AOCLit.CSRReq
  		           
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        		    //itemId:'SONItemId',
        			labelAlign:'top',
        			name: 'shipToCode',
        			fieldLabel:'Ship To Code',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '300',
  		            enforceMaxLength: true
        		},{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			//itemId:'CSREmaidId',
        			labelAlign:'top',
        		    name: 'invoiceLineInstruction',
        			fieldLabel:'Invoice Instruction',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '100',
  		            enforceMaxLength: true
        		}
        		]
        		},{   xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[
        		{
        			xtype:'textfield',
        			//itemId:'SONItemId',
        			labelAlign:'top',
        			name: 'packingInstruction',
        			fieldLabel:'Packaging Instruction',
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
        			labelAlign:'top',
        			name: 'variableDataBreakdown',
        			fieldLabel:'Variable Data Breakdown',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '100',
  		            enforceMaxLength: true
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			//itemId:'SONItemId',
        			labelAlign:'top',
        			name: 'manufacturingNotes',
        			fieldLabel:'Manufacturing Notes',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '300',
  		            enforceMaxLength: true
        		}]
        		},{
        			xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
        			xtype:'textfield',
        			labelAlign:'top',
        			name: 'shippingOnlyNotes',
        			fieldLabel:'Shipping Only Notes',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '100',
  		            enforceMaxLength: true
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'combo',
        			//itemId:'SONItemId',
        			labelAlign:'top',
        			name: 'splitShipSetBy',
        			fieldLabel:'Split Ship Set By',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '300',
  		            enforceMaxLength: true
        		},
        		{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'combo',
        			//itemId:'CSREmaidId',
        			labelAlign:'top',
        			name: 'artWorkHold',
        			fieldLabel:'ArtWork Hold',
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '100',
  		            enforceMaxLength: true
        		}]
        		},{
        			xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[
        		{
        			xtype:'textfield',
        			//itemId:'SONItemId',
        			labelAlign:'top',
        			name: 'miscCSRInstruction',
        			fieldLabel:'Misc. CSR Instructions',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '300',
  		            enforceMaxLength: true
        		},{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			//itemId:'SONItemId',
        			labelAlign:'top',
        			name: 'shippingMethod',
        			fieldLabel:'Shipping Method',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '300',
  		            enforceMaxLength: true
        		},{
                	xtype :'tbspacer',
                	width :30
        		},
        		{
        			xtype:'textfield',
        			//itemId:'SONItemId',
        			labelAlign:'top',
        			name: 'freightTerm',
        			fieldLabel:'Freight Term',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '300',
  		            enforceMaxLength: true
        		}]
        		},{

        			xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[
        		{
        			xtype:'textfield',
        			//itemId:'SONItemId',
        			labelAlign:'top',
        			name: 'shippingInstruction',
        			fieldLabel:'Shipping Instruction',
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            height:60,
  		            maxLength : '300',
  		            enforceMaxLength: true
        		}]
        		},{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Validations',
                    defaultType: 'checkboxfield',
                    layout:'hbox',
                    margin : '5 0 0 5',
                    labelAlign:'top',
                    name:'validation',
                    items: [
                        {
                            boxLabel  : 'Waive MOA',
                            name      : 'validation',
                            inputValue: 'waivemoa',
                            checked   : true,
                            id        : 'waivemoa'
                        },{
                        	xtype :'tbspacer',
                        	width :30
                		}, {
                            boxLabel  : 'Waive MOQ ',
                            name      : 'validation',
                            inputValue: 'waivemoq',
                            checked   : true,
                            id        : 'waivemoq'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'CSR Attention',
                    defaultType: 'checkboxfield',
                    layout:'hbox',
                    margin : '5 0 0 5',
                    labelAlign:'top',
                    name:'CSRAttention',
                    items: [
                        {
                            boxLabel  : 'Size Check',
                            name      : 'CSRAttention',
                            inputValue: 'sizecheck',
                            checked   : true,
                            id        : 'sizecheck'
                        },{
                        	xtype :'tbspacer',
                        	width :30
                		}, {
                            boxLabel  : 'Discount Price',
                            name      : 'CSRAttention',
                            inputValue: 'discountprice',
                            checked   : true,
                            id        : 'discountprice'
                        },
                        {
                        	xtype:'tbspacer',
                        	width:30
                        },
                        {
                            boxLabel  : 'Fabric Check',
                            name      : 'CSRAttention',
                            inputValue: 'fabriccheck',
                            checked   : true,
                            id        : 'fabriccheck'
                        },
                        {
                        	xtype:'tbspacer',
                        	width:30
                        },
                        {
                            boxLabel  : 'Ship Mark',
                            name      : 'CSRAttention',
                            inputValue: 'shipmark',
                            checked   : true,
                            id        : 'shipmark'
                        },
                        {
                        	xtype:'tbspacer',
                        	width:30
                        },
                        {
                            boxLabel  : 'LLKK',
                            name      : 'CSRAttention',
                            inputValue: 'llkk',
                            checked   : true,
                            id        : 'llkk'
                        },
                        {
                        	xtype:'tbspacer',
                        	width:30
                        },
                        {
                            boxLabel  : 'Local Billing',
                            name      : 'CSRAttention',
                            inputValue: 'localbilling',
                            checked   : true,
                            id        : 'localbilling'
                        },
                        {
                        	xtype:'tbspacer',
                        	width:30
                        },
                        {
                            boxLabel  : 'Factory Transfer',
                            name      : 'CSRAttention',
                            inputValue: 'factorytransfer',
                            checked   : true,
                            id        : 'factorytransfer'
                        },
                        {
                        	xtype:'tbspacer',
                        	width:30
                        },
                        {
                            boxLabel  : 'Shipment Sample',
                            name      : 'CSRAttention',
                            inputValue: 'shipmentsample',
                            checked   : true,
                            id        : 'shipmentsample'
                        }
                        
                    ]
                },
                {

        			xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
                        xtype: 'togglebutton',
                        fieldLabel: 'Active',
                        value: 0,
                        labelSeparator:'',
                        labelAlign:'top',
                        labelWidth : 200,
      		            width : 30,
      		            height:60,
                        listeners: {
                            changecomplete: function(slider, newValue, thumb, eOpts ){
                                // 'do the required action'
                            }
                        }
        		}]
        		}
               ]
        	},
        	{
        		xtype: 'form',
        		itemId:'AdvancedPropertiesForm',
                width:985,
                collapseDirection: 'top',
                animCollapse: false,
                collapsible: true,
                collapsed :true,
                title: 'Advanced Properties',
                titleCollapse: true,
                region: 'south',
                items:[ {
        			xtype: 'fieldcontainer',
                    layout: 'vbox',
                    margin : '5 0 0 5',
                    items:[
                           /*Order Tab*/
                           {	
                        	   xtype: 'form',
                       		   itemId:'OrderForm',
                               width:960,
                               collapseDirection: 'top',
                               animCollapse: false,
                               collapsible: true,
                               collapsed :true,
                               title: 'Order',
                               titleCollapse: true,
                               region: 'south',
                               items:[ {
                             			xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        margin : '5 0 0 5',
                                        items:[{
                                		xtype:'combo',
                              			itemId:'FileType',
                              			labelAlign:'top',
                              			name: 'fileType',
                              			fieldLabel:AOCLit.fileType,//?/
                              			value:'',
                              			labelSeparator:'',
                                          labelWidth : 200,
                        		            width : 250,
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
                          			itemId:'FileNamePattern',
                          			labelAlign:'top',
                          			name: 'fileNamePattern',
                          			fieldLabel:AOCLit.fileNamePattern,//?/
                          			value:'',
                          			labelSeparator:'',
                                      labelWidth : 200,
                    		          width : 250,
                    		          maxLength : '50',
                    		          enforceMaxLength: true
                          		}]
                            		},
                            		 {
                             			xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        margin : '5 0 0 5',
                                        items:[{
                                		xtype:'combo',
                              			itemId:'Schema',
                              			labelAlign:'top',
                              			name: 'schema',
                              			fieldLabel:AOCLit.schema,//?/
                              			value:'',
                              			labelSeparator:'',
                                          labelWidth : 200,
                        		            width : 250,
                        		            labelSeparator : '',
                        		            maxLength : '50',
                        		            enforceMaxLength: true
                              		},
                            		{
                                    	xtype :'tbspacer',
                                    	width :30
                            		},
                            		{
                          			xtype:'combo',
                          			itemId:'Mapping',
                          			labelAlign:'top',
                          			name: 'mapping',
                          			fieldLabel:AOCLit.mapping,//?/
                          			value:'',
                          			labelSeparator:'',
                                      labelWidth : 200,
                    		          width : 250,
                    		          maxLength : '50',
                    		          enforceMaxLength: true
                          		}]
                            		}
                           ]
                        	   
                           },
                           /*Start Additional Data*/
                           {
                                 	 xtype: 'form',
                                     defaultType: 'radiofield',
                                     defaults: {
                                         flex: 1
                                     },
                         			width:300,
                         			bodyPadding: 10,
                         			layout: 'hbox',
                         			name:'additionalData',
                         			title:'Additional Data',
                         			items:[
                         			    {
                                         boxLabel  : 'Yes',
                                         name      : 'additionalData',
                                         inputValue: 'yes',
                                         checked: true,
                                         id        : 'yes',
//                                         listeners: {
//                                             change: function (field, newValue, oldValue) {
//                                            	 var value = newValue;
//                                            	 if (value == true) {
//                                                     var additionalData = Ext.getCmp('additionalData');
//                                                     additionalData.enable();
//                                                 }
//                                            	 if (value == false) {
//                                                     var additionalData = Ext.getCmp('additionalData');
//                                                     additionalData.disable();
//                                                 }
//                                             }
//                                         }
                                     }, {
                                         boxLabel  : 'No',
                                         name      : 'additionalData',
                                         inputValue: 'no',
                                         id        : 'no'
                                     }]
                           },
                           {	
                        	   xtype: 'form',
                       		   itemId:'AdditionalData',
                               width:960,
                               id:'additionalData',
                               collapseDirection: 'top',
                               animCollapse: false,
                               collapsible: true,
                               collapsed :true,
                               title: 'Additional Data',
                               titleCollapse: true,
                               region: 'south',
                               items:[ {
                             			xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        margin : '5 0 0 5',
                                        items:[{
                                		xtype:'combo',
                              			itemId:'FileType',
                              			labelAlign:'top',
                              			name: 'fileType',
                              			fieldLabel:AOCLit.fileType,//?/
                              			value:'',
                              			labelSeparator:'',
                                          labelWidth : 200,
                        		            width : 250,
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
                          			itemId:'FileNamePattern',
                          			labelAlign:'top',
                          			name: 'fileNamePattern',
                          			fieldLabel:AOCLit.fileNamePattern,//?/
                          			value:'',
                          			labelSeparator:'',
                                      labelWidth : 200,
                    		          width : 250,
                    		          maxLength : '50',
                    		          enforceMaxLength: true
                          		}]
                            		},
                            		 {
                             			xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        margin : '5 0 0 5',
                                        items:[{
                                		xtype:'textfield',
                              			itemId:'SchemaId',
                              			labelAlign:'top',
                              			name: 'schemaId',
                              			fieldLabel:AOCLit.schemaId,//?/
                              			value:'',
                              			labelSeparator:'',
                                          labelWidth : 200,
                        		            width : 250,
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
                          			itemId:'MappingId',
                          			labelAlign:'top',
                          			name: 'mappingId',
                          			fieldLabel:AOCLit.mappingId,//?/
                          			value:'',
                          			labelSeparator:'',
                                      labelWidth : 200,
                    		          width : 250,
                    		          maxLength : '50',
                    		          enforceMaxLength: true
                          		}]
                            		},
                            		 {
                             			xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        margin : '5 0 0 5',
                                        items:[{
                                		xtype:'textfield',
                              			itemId:'MatchType',
                              			labelAlign:'top',
                              			name: 'matchType',
                              			fieldLabel:'Match Type',//?/
                              			value:'',
                              			labelSeparator:'',
                                          labelWidth : 200,
                        		            width : 250,
                        		            labelSeparator : '',
                        		            maxLength : '50',
                        		            enforceMaxLength: true
                              		}]
                            		}]
                           },/*End Additional Data*/
                           
                           /*Start of Email subject match*/
                           {	
                        	    xtype: 'form',
                       		   itemId:'EmailSubjectMatch',
                               width:960,
                               collapseDirection: 'top',
                               animCollapse: false,
                               collapsible: true,
                               collapsed :true,
                               title: 'Email Subject Match',
                               titleCollapse: true,
                               region: 'south',
                               items:[ {
                             			xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        margin : '5 0 0 5',
                                        items:[{
                                		xtype:'textfield',
                              			itemId:'RBO',
                              			labelAlign:'top',
                              			name: 'rbo',
                              			fieldLabel:'RBO',
                              			value:'',
                              			labelSeparator:'',
                                          labelWidth : 200,
                        		            width : 250,
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
                          			itemId:'ProductLine',
                          			labelAlign:'top',
                          			name: 'productLine',
                          			fieldLabel:AOCLit.productLine,//?/
                          			value:'',
                          			labelSeparator:'',
                                      labelWidth : 200,
                    		          width : 250,
                    		          maxLength : '50',
                    		          enforceMaxLength: true
                          		},
                          		{
                                	xtype :'tbspacer',
                                	width :30
                        		}]
                            		},
                            		{
                             			xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        margin : '5 0 0 5',
                                        items:[{
                          			xtype:'textfield',
                          			itemId:'Instruction',
                          			labelAlign:'top',
                          			name: 'instruction',
                          			fieldLabel:AOCLit.instruction,//?/
                          			value:'',
                          			labelSeparator:'',
                                      labelWidth : 200,
                    		          width : 250,
                    		          maxLength : '50',
                    		          enforceMaxLength: true
                          		}]
                            		}]
                           },
                           /*End of Email subject match*/
                           
                           /*Start of Email match*/
                           {	
                        	    xtype: 'form',
                       		   itemId:'EmailMatch',
                               width:960,
                               collapseDirection: 'top',
                               animCollapse: false,
                               collapsible: true,
                               collapsed :true,
                               title: 'Email Match',
                               titleCollapse: true,
                               region: 'south',
                               items:[ {
                             			xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        margin : '5 0 0 5',
                                        items:[{
                                		xtype:'textfield',
                              			itemId:'RBO',
                              			labelAlign:'top',
                              			name: 'rbo',
                              			fieldLabel:'RBO',
                              			value:'',
                              			labelSeparator:'',
                                          labelWidth : 200,
                        		            width : 250,
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
                          			itemId:'ProductLine',
                          			labelAlign:'top',
                          			name: 'productLine',
                          			fieldLabel:AOCLit.productLine,//?/
                          			value:'',
                          			labelSeparator:'',
                                      labelWidth : 200,
                    		          width : 250,
                    		          maxLength : '50',
                    		          enforceMaxLength: true
                          		},
                          		{
                                	xtype :'tbspacer',
                                	width :30
                        		}]
                            		},
                            		{
                             			xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        margin : '5 0 0 5',
                                        items:[{
                          			xtype:'textfield',
                          			itemId:'Instruction',
                          			labelAlign:'top',
                          			name: 'instruction',
                          			fieldLabel:AOCLit.instruction,//?/
                          			value:'',
                          			labelSeparator:'',
                                      labelWidth : 200,
                    		          width : 250,
                    		          maxLength : '50',
                    		          enforceMaxLength: true
                          		}]
                            		}]
                           },     /*End of Email match*/
                           /*Start of File Match- Order File*/
                           
                           {	
                       	    xtype: 'form',
                      		  itemId:'FileMatchOrderFile',
                              width:960,
                              collapseDirection: 'top',
                              animCollapse: false,
                              collapsible: true,
                              collapsed :true,
                              title: 'File Match - Order File',
                              titleCollapse: true,
                              region: 'south',
                              items:[ {
                            			xtype: 'fieldcontainer',
                                       layout: 'hbox',
                                       margin : '5 0 0 5',
                                       items:[{
                               		    xtype:'textfield',
                             			itemId:'RBO',
                             			labelAlign:'top',
                             			name: 'rbo',
                             			fieldLabel:'RBO',
                             			value:'',
                             			labelSeparator:'',
                                         labelWidth : 200,
                       		            width : 250,
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
                         			//itemId:'Sheet',
                         			labelAlign:'top',
                         			name: 'sheet',
                         			fieldLabel:'Sheet',//?/
                         			value:'',
                         			labelSeparator:'',
                                     labelWidth : 200,
                   		          width : 250,
                   		          maxLength : '50',
                   		          enforceMaxLength: true
                         		},
                         		{
                               	xtype :'tbspacer',
                               	width :30
                       		},
                       		{
                     			xtype:'textfield',
                     			labelAlign:'top',
                     			name: 'cell',
                     			fieldLabel:'Cell',//?/
                     			value:'',
                     			labelSeparator:'',
                                 labelWidth : 200,
               		          width : 250,
               		          maxLength : '50',
               		          enforceMaxLength: true
                     		}]
                           		},
                           		{
                        			xtype: 'fieldcontainer',
                                   layout: 'hbox',
                                   margin : '5 0 0 5',
                                   items:[{
                           		    xtype:'textfield',
                         			itemId:'ProductLine',
                         			labelAlign:'top',
                         			name: 'rbo',
                         			fieldLabel:AOCLit.productLine,
                         			value:'',
                         			labelSeparator:'',
                                     labelWidth : 200,
                   		            width : 250,
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
                     			//itemId:'Sheet',
                     			labelAlign:'top',
                     			name: 'page',
                     			fieldLabel:'Page',//?/
                     			value:'',
                     			labelSeparator:'',
                                 labelWidth : 200,
               		          width : 250,
               		          maxLength : '50',
               		          enforceMaxLength: true
                     		}]
                       		},
                       		{
                    			xtype: 'fieldcontainer',
                               layout: 'hbox',
                               margin : '5 0 0 5',
                               items:[{
                       		    xtype:'textfield',
                     			itemId:'OrderMatch',
                     			labelAlign:'top',
                     			name: 'orderMatch',
                     			fieldLabel:'Order Match',
                     			value:'',
                     			labelSeparator:'',
                                 labelWidth : 200,
               		            width : 250,
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
                 			//itemId:'Sheet',
                 			labelAlign:'top',
                 			name: 'sheet',
                 			fieldLabel:'Sheet',//?/
                 			value:'',
                 			labelSeparator:'',
                            labelWidth : 200,
           		          width : 250,
           		          maxLength : '50',
           		          enforceMaxLength: true
                 		},
                 		{
                       	xtype :'tbspacer',
                       	width :30
               		},
               		{
             			xtype:'textfield',
             			labelAlign:'top',
             			name: 'cell',
             			fieldLabel:'Cell',//?/
             			value:'',
             		  labelSeparator:'',
                      labelWidth : 200,
       		          width : 250,
       		          maxLength : '50',
       		          enforceMaxLength: true
             		}]
                   		}]
                          },/*End of File Match- Order File*/
                          
                          /*Start of File Match- Additional Data File*/
                          {	
                       	    xtype: 'form',
                      		  itemId:'FileMatchAdditionalFile',
                              width:960,
                              collapseDirection: 'top',
                              animCollapse: false,
                              collapsible: true,
                              collapsed :true,
                              title: 'File Match - Additional Data File',
                              titleCollapse: true,
                              region: 'south',
                              items:[ {
                            			xtype: 'fieldcontainer',
                                       layout: 'hbox',
                                       margin : '5 0 0 5',
                                       items:[{
                               		    xtype:'textfield',
                             			itemId:'RBO',
                             			labelAlign:'top',
                             			name: 'rbo',
                             			fieldLabel:'RBO',
                             			value:'',
                             			labelSeparator:'',
                                         labelWidth : 200,
                       		            width : 250,
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
                         			//itemId:'Sheet',
                         			labelAlign:'top',
                         			name: 'sheet',
                         			fieldLabel:'Sheet',//?/
                         			value:'',
                         			labelSeparator:'',
                                     labelWidth : 200,
                   		          width : 250,
                   		          maxLength : '50',
                   		          enforceMaxLength: true
                         		},
                         		{
                               	xtype :'tbspacer',
                               	width :30
                       		},
                       		{
                     			xtype:'textfield',
                     			labelAlign:'top',
                     			name: 'cell',
                     			fieldLabel:'Cell',//?/
                     			value:'',
                     			labelSeparator:'',
                                 labelWidth : 200,
               		          width : 250,
               		          maxLength : '50',
               		          enforceMaxLength: true
                     		}]
                           		},
                           		{
                        			xtype: 'fieldcontainer',
                                   layout: 'hbox',
                                   margin : '5 0 0 5',
                                   items:[{
                           		    xtype:'textfield',
                         			itemId:'ProductLine',
                         			labelAlign:'top',
                         			name: 'rbo',
                         			fieldLabel:AOCLit.productLine,
                         			value:'',
                         			labelSeparator:'',
                                     labelWidth : 200,
                   		            width : 250,
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
                     			//itemId:'Sheet',
                     			labelAlign:'top',
                     			name: 'page',
                     			fieldLabel:'Page',//?/
                     			value:'',
                     			labelSeparator:'',
                                 labelWidth : 200,
               		          width : 250,
               		          maxLength : '50',
               		          enforceMaxLength: true
                     		}]
                       		},
                       		{
                    			xtype: 'fieldcontainer',
                               layout: 'hbox',
                               margin : '5 0 0 5',
                               items:[{
                       		    xtype:'textfield',
                     			itemId:'AdditonalDataMatch',
                     			labelAlign:'top',
                     			name: 'additionalDataMatch',
                     			fieldLabel:'Additional Data Match',
                     			value:'',
                     			labelSeparator:'',
                                 labelWidth : 200,
               		            width : 250,
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
                 			//itemId:'Sheet',
                 			labelAlign:'top',
                 			name: 'sheet',
                 			fieldLabel:'Sheet',//?/
                 			value:'',
                 			labelSeparator:'',
                             labelWidth : 200,
           		          width : 250,
           		          maxLength : '50',
           		          enforceMaxLength: true
                 		},
                 		{
                       	xtype :'tbspacer',
                       	width :30
               		},
               		{
             			xtype:'textfield',
             			labelAlign:'top',
             			name: 'cell',
             			fieldLabel:'Cell',//?/
             			value:'',
             			labelSeparator:'',
                         labelWidth : 200,
       		          width : 250,
       		          maxLength : '50',
       		          enforceMaxLength: true
             		}]
                   		}]
                          },
                          {
                             	xtype :'tbspacer',
                             	width :30
                     		}
                          
                          /*End of File Match- Additional Data File*/
                ]
        		 },
                     {
                       	xtype :'tbspacer',
                       	width :30
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

