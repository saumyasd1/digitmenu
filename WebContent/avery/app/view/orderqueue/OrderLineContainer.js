Ext.define('AOC.view.orderqueue.OrderLineContainer', {
	extend : 'Ext.container.Container',
	requires : [],
	alias : 'widget.orderlinecontainer',
	controller:'orderlinecontainer',
	initComponent : function() {
		var me=this;
		Ext.apply(this, {
			layout :'fit', 
			border:'4 4 4 4',
			 layout: {
		        type: 'vbox',
		        align: 'stretch'
		    },
			items :me.buildItems()
	 	});
		me.updateLayout();
	 	this.callParent(arguments);
	},
	buildItems:function(){
		var me=this;
		 var record=AOC.config.Runtime.getOrderQueueActiveRecord();
		return  [{
				xtype:'container',
				items:[{
				xtype:'container',
				height:30,
				
				margin:'10 10 5 10',
				layout: {
				    type: 'hbox',
				    align: 'left'
				},
				items:[{
					xtype:'image',
					width:40,
					src:AOC.config.Settings.buttonIcons.backIcon,
					autoEl: 'div',
					cls:'orderline-back-button',
					listeners:{
						el:{
							'click':'backButton'
						}
					}
				},
				{
			    	xtype : 'displayfield',
			    	style :{
			    		font:'10px'
			    	},
			    	encodeHtml:true,
			    	value : 'Order Line   (Order Track#:'+record.get('id')+')'//Added Order track#
				}]
				},
				{
					xtype:'toolbar',
					height:75,
					buttonAlign:'right',
					margin:'0 10 0 10',
					border:'0 0 1 0',
					style: {
					    borderColor: '#cecece',
					    borderStyle: 'solid'
					},
					layout: {
					    type: 'hbox',
					    align: 'left'
					},
					items:[{
						xtype:'displayfield',
						fieldLabel:'<b>Partner</b>',
						cls:'orderline-displayfield-label-cls',
						labelAlign :'top',
						value : record.get('PartnerName'),
						autoWidth: true
					},{xtype:'tbspacer',
						height:2,
						width:5
					},
					{
						xtype:'displayfield',
						fieldLabel : '<b>RBO</b>',
						labelAlign :'top',
						value:record.get('RBOName'),
						autoWidth: true
					},
					{xtype:'tbspacer',
						height:2,
						width:5
					},
					{
						xtype:'displayfield',
						fieldLabel : '<b>Product Line</b>',
						autoWidth: true, 
						labelAlign:'top',
						value:record.get('productLineType')
					},
					{xtype:'tbspacer',
						height:2,
						width:5
					},
					{
						xtype:'displayfield',
						fieldLabel : '<b>Subject</b>',
						labelAlign :'top',
						value:record.get('Subject'),
						maxWidth: 220
					},'->',{
			            xtype: 'button',
			            reference:'validateButton',
			            ui:'white',
			            autoWidth: true, 
			            text: '<b>Validate</b>',
			            margin:'0 10 0 10',
			            handler: 'validateOrderLine'
			        },{
			            xtype: 'button',
			            ui:'white',
			            autoWidth: true, 
			            reference:'cancelOrderButton',
			            margin:'0 10 0 0',
			            text: '<b>Cancel Order</b>',
			            handler: 'cancelOrder'
			        },{
			            xtype: 'button',
			            reference: 'salesOrderbutton',
			            ui:'white',
			            autoWidth: true, 
			            text: AOCLit.salesOrdersumbitText,
			            margin:'0 10 0 0',
			            handler: 'submitSalesOrder'
			        },{
			            xtype: 'button',
			            reference: 'salesViewOrderbutton',
			            ui:'white',
			            autoWidth: true, 
			            text: AOCLit.viewSalesOrderBtnText,
			            margin:'0 10 0 0',
			            handler: 'viewSalesOrder',
			            disabled:true,
			            align:'right'
			        },{
			            xtype:'checkboxfield',
			            boxLabel  : 'Copy Data',
		                    checked: false,
		                    handler:function(cmp,checked){
		                	var activeitme=(checked)?0:1;
		                	cmp.up('orderlinecontainer').down('#orderlineexpandablegridcard').getLayout().setActiveItem(activeitme);
		                	if(record.get('Status')==4 && AOC.config.Runtime.getAllowOrderLineEdit())
		                	{
		                		if(checked==false)
		                		   me.lookupReference('form').enable();
		                	    else 
		            		       me.lookupReference('form').disable();
		                	}	
		                    }
			        }]
					},
					{
						xtype:'toolbar',
						buttonAlign:'right',
						margin:'0 10 0 10',
						border:'0 0 1 0',
						style: {
						    borderColor: '#cecece',
						    borderStyle: 'solid'
						},
						layout: {
						    type: 'hbox',
						    align: 'left'
						},
						items:[{
			            xtype: 'form',
			            reference: 'form',
			            margin:'10 10 10 10',
			            layout: 'hbox',
			            items: [{
			                xtype: 'radiogroup',
			                reference: 'radioGroup',
			                layout:'hbox',
			                items: [{
			                    boxLabel: '<b>Order Line Update</b>',
			                    labelWidth:100,
			                    name: 'rb',
			                    inputValue: '1',
			                    checked: true,
			                    width:180
		                        }, 
		                        {
				                    xtype: 'tbspacer',
				                    width: 15
				                },
				                {
				                    boxLabel: '<b>Variable Order Update</b>',
				                    labelWidth:120,
				                    name: 'rb',
				                    inputValue: '2',
				                    width:160
		                         }],
					                listeners: {
					                    change: 'radioButtonClick'
					                }
		                        },
		                            {
						                xtype: 'tbspacer',
						                width: 20
		                           },{
					                xtype: 'combo',
					                hidden: true,
					                editable:false,
					                displayField: 'variableFieldName',
					                valueField: 'variableFieldName',
					                reference: 'variableFieldCombo'
		                       }, {
					                xtype: 'tbspacer',
					                width: 20
		                       },{
						            xtype: 'button',
						            text: AOCLit.bulkUpdateButtonText,
						            ui:'blue-plain',
						            reference:'bulkUpdateButton',
						            handler: 'getUpdateScreen'
					              }]
		        }
						]}
				]
			},{
			xtype:'container',
			layout:'card',
			flex:1,
			itemId:'orderlineexpandablegridcard',
			activeItem:1,
			items:[{
			    xtype:'orderlineexpandablegrid',
			    itemId: 'orderlineexpandablegridvv',
			    store:me.store,
		            selModel: {
		        	      type:'spreadsheet',
		        	      rowNumbererHeaderWidth:0
		        	    }
			},
			{
				xtype:'orderlineexpandablegrid',
				itemId: 'orderlineexpandablegridrowmodel',
				store:me.store,
				editGrid:true,
				selModel: {
	        	      type: 'rowmodel'
	        	    }
			}
			]
			}
			];
	}
});
