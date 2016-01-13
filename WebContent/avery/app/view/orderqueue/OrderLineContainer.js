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
			            text: salesOrdersumbitText,
			            margin:'0 10 0 0',
			            handler: 'submitSalesOrder'
			        },{
			            xtype: 'button',
			            reference: 'salesViewOrderbutton',
			            ui:'white',
			            autoWidth: true, 
			            text: viewSalesOrderBtnText,
			            margin:'0 10 0 0',
			            handler: 'viewSalesOrder',
			            disabled:true,
			            align:'right'
			        }]
					}
				]
			},{
				xtype:'orderlineexpandablegrid',
				store:me.store,
				flex:1
			}];
	}
});
