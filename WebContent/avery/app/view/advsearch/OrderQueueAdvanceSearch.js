Ext.define('AOC.view.advsearch.OrderQueueAdvanceSearch', {
			extend : 'Ext.form.Panel',
			alias : 'widget.orderqueueadvancesearch',
			itemId : 'orderqueueadvancesearchID',
			controller : 'orderqueue',
			requires : ['Ext.window.MessageBox'],
			border : false,
			buttonAlign : 'right',
			controller:'orderqueue',
			style: 'background: #FFFFFF !important;border: 2px solid #FFFFFF;',
			items : [ {
			            xtype: 'fieldcontainer',
	                    layout: 'hbox',
	                    margin : '5 0 0 5',
	                    items:[{
						
							xtype : 'textfield',
							fieldLabel : 'RBO',
							name:'RBOName',
							width:280,
							labelSeparator : '',
							labelAlign : 'right',
							allowBlank : true,
							selectOnTab : true
					 	     },
						{
							xtype : 'tbspacer',
							height:5
						},
						{
							xtype : 'textfield',
							fieldLabel : 'Partner Name',
							name:'PartnerName',
							width:280,
							labelSeparator : '',
							labelAlign : 'right'
						}]
			       },
						{
				           xtype: 'fieldcontainer',
                           layout: 'hbox',
                           margin : '5 0 0 5',
                           items:[{
							xtype : 'textfield',
							fieldLabel : 'Subject',
							name:'Subject',
							width:280,
							labelSeparator : '',
							labelAlign : 'right'
						     },
						{
							xtype : 'tbspacer',
							height:5
						},
						{
							xtype : 'textfield',
							fieldLabel : 'Email Body',
							name:'EmailBody',
							width:280,
							labelSeparator : '',
							labelAlign : 'right'
						}]
						},
						{ 
							xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        margin : '5 0 0 5',
	                        items:[{
							xtype : 'combo',
							fieldLabel : ' Order Status',
							name:'Status',
							width:280,
							labelSeparator : '',
							labelAlign : 'right',
							store:[['Order Received','Order Received'],['Order Pre-processed','Order Pre-processed'],['Waiting CS Verification','Waiting CS Verification'],
							       ['CS Verified','CS Verified'],['Submitted to Oracle','Submitted to Oracle'],['Cancelled','Cancelled'],
							       ['Order Error','Order Error']]
						    },
						{
							xtype : 'tbspacer',
							height:5
						},
						{
							xtype : 'combo',
							fieldLabel : 'Product Line',
							name:'ProductLineType',
							itemId:'productLineComboItemId',
							displayField:'productLineType',
							valueField:'id',
							width:280,
							labelSeparator : '',
							labelAlign : 'right'
						}]
						},
						{
							xtype : 'tbspacer',
							height:5
						},
						{
							xtype : 'tbspacer',
							height:5
						},
						{
							xtype : 'radiogroup',
							name: 'datecriteriavalue',
							fieldLabel : 'Date Criteria',
							width:700,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'right',
							items:[
						            { boxLabel: 'Process Date', name: 'datecriteriavalue', inputValue: 'receivedDate', checked: true },
						            { boxLabel: 'Submitted Date', name: 'datecriteriavalue', inputValue: 'submittedDate' }
						            ]
						},
						{

							xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        margin : '5 0 0 5',
	                        items:[{
							xtype : 'datefield',
							name:'fromDate',
							fieldLabel : 'From Date ',
							width:280,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'right',
							allowBlank : true,
							selectOnTab : true,
							listeners : {
							    render : function(datefield) {
							        datefield.setValue(new Date());
							    }
							}
						},
						{
							xtype:'tbspacer',
							height:5
						},
						{
							xtype : 'datefield',
							fieldLabel : 'To Date ',
							name:'toDate',
							width:280,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'right',
							allowBlank : true,
							selectOnTab : true,
							listeners : {
							    render : function(datefield) {
							        datefield.setValue(new Date());
							                }
							        }
						}]
						},
						{
							xtype:'tbspacer',
							height:5
						}
			],
			buttons : [ {
						text : 'Search',
						disabled : false,
						formBind : true,
						success : true,
						listeners : {
							click  : 'getOrderBasedOnSearchParameters'
						}
				}],
				initComponent : function() {
				this.callParent(arguments);
				}

});
