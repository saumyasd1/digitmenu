Ext.define('AOC.view.partner.CreatePartnerProductLine',{
	extend:'AOC.view.base.BaseWindow',
	alias:'widget.createpartnerproductline',
	itemId:'createpartnerproductlineItemId',
	controller:'productlineMain',
	bodyPadding: 5,
	width: 1000,
	height:500,
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
                items:this.buildItem(),
                //layout:'fit',
                buttons:this.buildButtons(),
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
        			}]
        },
        buildItem:function(){
        	var me=this,siteStore=Ext.data.StoreManager.lookup('siteId')==null?Ext.create('AOC.store.SiteStore'):Ext.data.StoreManager.lookup('siteId'),
        			rboStore=Ext.data.StoreManager.lookup('rboId')==null?Ext.create('AOC.store.RBOStore'):Ext.data.StoreManager.lookup('rboId');
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
					},{
        		xtype:'form',
        		itemId:'listPanel',
        		border:false,
        		width:980,
        		items:[{
        			xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin : '5 0 0 5',
                    items:[{
        			xtype:'displayfield',
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
        			name: 'rboId',
        			reference:'rboId',
        			fieldLabel:AOCLit.RBO,
        			allowBlank: false,
        			labelSeparator:'',
                    labelWidth : 200,
  		            width : 300,
  		            maxLength : '50',
  		            enforceMaxLength: true,
  		            store:rboStore,
  		            displayField:'rboName',
  		            valueField:'id',
  		            blankText : 'RBO Name is required',
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
                        valueField:'id',
                        displayField:'name',
      		            width : 300,
      		            labelAlign:'top',
      		            maxLength : '100',
      		            store:siteStore,
      		            enforceMaxLength: true,
      		            //blankText : AOCLit.CSRReq,
      		            listeners : {
      		            	 blur : this.notifyByImage,
     		            	'focus' : 'HideMandatoryMessage',
     		            	'select':'onSiteSelect'
     	                    }
            		},{
                    	xtype :'tbspacer',
                    	width :30
            		}
            		]
        		},{
        			xtype:'fieldcontainer',
        			reference:'systemcontainer',
        			fieldLabel:'Systems',
        			labelAlign:'top'
        		},{
                  	 xtype: 'fieldcontainer',
         			 labelAlign:'top',
         			 layout: 'hbox',
         			 margin : '5 0 0 5',
         			 items:[{
                 			xtype:'textfield',
                 			labelAlign:'top',
                 			name: 'email',
                 			fieldLabel:'Email ID',
                 			//allowBlank: false,
                 			regex: /^((([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z\s?]{2,5}){1,25})*(\s*?,\s*?)*)*$/, //Allowed Space Between Email Ids
                 			labelSeparator:'',
                            labelWidth : 200,
           		            width : 300,
           		            maxLength : '50',
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
            			xtype:'textfield',
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
            			xtype:'textfield',
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
            		}]
        		},{
        			xtype:'fieldcontainer',
        			layout:'hbox',
        			fieldLabel:'Product Line',
        			margin : '5 0 0 5',
        			items:[{
        				xtype:'radio',
        				boxLabel:'Unique',
        				input:'unique',
        				name:'productlineType',
        				checked:true,
        				listeners:{
        					change:'onProductLineChange'
        				}
        			},{
            			xtype:'combo',
            			name: 'productLineTypeCombo',
            			fieldLabel:AOCLit.productLine,
            			allowBlank: true,
            			reference:'productLineTypeCombo',
            			labelSeparator:'',
                        labelWidth : 100,
      		            width : 200,
      		            margin:' 0 10 0 10',
      		            store:[['HTL','HTL'],['PFL','PFL'],['WVL','WVL']],
      		            value:'HTL',
      		            blankText : AOCLit.prodLineReq,
      		            listeners : {
      		            	 blur : this.notifyByImage,
      		            	'focus' : 'HideMandatoryMessage',
      		            	change:'onProductLineComboChange'
     	                    }
            		},{
        				xtype:'radio',
        				boxLabel:'Mixed',
        				inputValue:'MIXED',
        				name:'productlineType'
        			},{
        				xtype:'hiddenfield',
        				reference:'productLineHidden',
        				value:'HTL'
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
                            name      : 'waivemoa',
                            inputValue: 'waivemoa'
                        },{
                        	xtype :'tbspacer',
                        	width :30
                		}, {
                            boxLabel  : 'Waive MOQ ',
                            name      : 'waivemoq',
                            inputValue: 'waivemoq'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '<b>CSR Attention</b>',
                    defaultType: 'checkboxfield',
                    layout:'hbox',
                    margin : '5 0 0 5',
                    labelAlign:'top',
                    name:'CSRAttention',
                    items: [
                        {
                            boxLabel  : 'Local Billing',
                            name      : 'localbilling',
                            inputValue: 'localbilling'
                        },
                        {
                        	xtype:'tbspacer',
                        	width:30
                        },
                        {
                            boxLabel  : 'Factory Transfer',
                            name      : 'factorytransfer',
                            inputValue: 'factorytransfer'
                        },
                        {
                        	xtype:'tbspacer',
                        	width:30
                        },
                        {
                            boxLabel  : 'Shipment Sample',
                            name      : 'shipmentsample',
                            inputValue: 'shipmentsample'
                        }
                        
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    defaultType: 'checkboxfield',
                    layout:'hbox',
                    margin : '5 0 0 5',
                    labelAlign:'top',
                    name:'CSRAttention1',
                    items: [
                        {
                            boxLabel  : 'Size Check',
                            name      : 'sizecheck',
                            inputValue: 'sizecheck'
                        },{
                        	xtype :'tbspacer',
                        	width :30
                		},
                        {
                            boxLabel  : 'Fabric Check',
                            name      : 'fabriccheck',
                            inputValue: 'fabriccheck'
                        },
                        {
                        	xtype:'tbspacer',
                        	width:30
                        },
                        {
                            boxLabel  : 'LLKK',
                            name      : 'llkk',
                            inputValue: 'llkk'
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
                                         id        : 'yes'
                                     }, {
                                         boxLabel  : 'No',
                                         name      : 'additionalData',
                                         inputValue: 'no',
                                         id        : 'no',
                                         listeners: {
                                             change: function (field, newValue, oldValue) {
                                            	 field.up('form').down('#AdditionalData').setDisabled(newValue);
                                             	
                                             }
                                         }
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

