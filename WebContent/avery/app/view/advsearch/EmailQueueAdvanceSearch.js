Ext.define('AOC.view.advsearch.EmailQueueAdvanceSearch', {
			extend : 'Ext.form.Panel',
			alias : 'widget.emailqueueadvancesearch',
			itemId : 'emailqueueadvancesearchID',
			controller : 'emailManagementController',
			requires : ['Ext.window.MessageBox'],
			border : false,
			buttonAlign : 'right',
			style: 'background: #FFFFFF !important;border: 2px solid #FFFFFF;',
			items : [  
			           {
							xtype:'displayfield',
							itemId:'tittleItemId',
							value:'<b><font size=3>'+AOCLit.advancedSearchWindowTitle+'</font></b>',
							margin:'5 0 0 200'
                        },
						{
							xtype:'tbspacer',
							height:2,
							width:10
						},
			         {
							xtype:'displayfield',
							itemId:'messageFieldItemId',
							value:'',
							hidden:true,
							margin:'5 0 0 20'
                     },
						{
							xtype:'tbspacer',
							height:5,
							width:30
						},
			          {
			            xtype: 'fieldcontainer',
	                    layout: 'hbox',
	                    margin : '5 0 0 20',
	                    items:[{
						
							xtype : 'textfield',
							fieldLabel : 'RBO',
							name:'RBOName',
							width:250,
							labelSeparator : '',
							labelAlign : 'top',
							allowBlank : true,
							selectOnTab : true
					 	     },
						{
							xtype : 'tbspacer',
							height:5,
							width:30
						},
						{
							xtype : 'textfield',
							fieldLabel : AOCLit.partnerName,
							name:'PartnerName',
							width:250,
							labelSeparator : '',
							labelAlign : 'top'
						}]
			       },
						{
				           xtype: 'fieldcontainer',
                           layout: 'hbox',
                           margin : '5 0 0 20',
                           items:[{
							xtype : 'textfield',
							fieldLabel : AOCLit.Subject,
							name:'Subject',
							width:250,
							labelSeparator : '',
							labelAlign : 'top'
						     },
						{
							xtype : 'tbspacer',
							height:5,
							width:30
						},
						{
							xtype : 'textfield',
							fieldLabel : AOCLit.emailBody,
							name:'EmailBody',
							width:250,
							labelSeparator : '',
							labelAlign : 'top'
						}]
						},
						{ 
							xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        margin : '5 0 0 20',
	                        items:[{
							xtype : 'combo',
							fieldLabel : AOCLit.orderStatus,
							name:'Status',
							width:250,
							labelSeparator : '',
							labelAlign : 'top',
							displayField:'value',
							valueField:'code',
							queryMode :'local',
							store: Ext.data.StoreManager.lookup('orderfilequeueid') == null ? AOC.util.Helper.getCodeStore('orderfilequeue') : Ext.data.StoreManager.lookup('orderfilequeueid')
						    },
						{
							xtype : 'tbspacer',
							height:5,
							width:30
						},
						{
							xtype : 'combo',
							fieldLabel : AOCLit.productLine,
							name:'ProductLineType',
							itemId:'productLineComboItemId',
							displayField:'productLineType',
							valueField:'productLineType',
							width:250,
							labelSeparator : '',
							labelAlign : 'top'
						}]
						},
						{ 
							xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        margin : '5 0 0 20',
	                        items:[{
							xtype : 'textfield',
							fieldLabel : AOCLit.senderEmailID,
							name:'SenderEmailID',
							width:250,
							labelSeparator : '',
							labelAlign : 'top'
						    },
						{
							xtype : 'tbspacer',
							height:5,
							width:30
						},
						{
							xtype : 'textfield',
							fieldLabel : AOCLit.orderTrackNo,
							name:'id',
							width:250,
							labelSeparator : '',
							labelAlign : 'top'
						}]
						},
						{ 
							xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        margin : '5 0 0 20',
	                        items:[
						   {
							xtype : 'textfield',
							fieldLabel : AOCLit.poNumber,
							name:'ponumber',
							width:250,
							labelSeparator : '',
							labelAlign : 'top'
						},
						   {
								xtype : 'tbspacer',
								height:5,
								width:30
							},
							{
								xtype : 'textfield',
								fieldLabel : AOCLit.CSRName,
								name:'CSRName',
								width:250,
								labelSeparator : '',
								labelAlign : 'top'
							}
							]
						},
						{
							xtype : 'tbspacer',
							height:5,
							width:30
						},
						{
							xtype : 'radiogroup',
							name: 'datecriteriavalue',
							fieldLabel : '',
							width:600,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'top',
							items:[
						            { boxLabel: 'Process Date', name: 'datecriteriavalue', inputValue: 'receivedDate', checked: true },
						            { boxLabel: 'Submitted Date', name: 'datecriteriavalue', inputValue: 'submittedDate' }
						            ]
						},
						{

							xtype: 'fieldcontainer',
	                        layout: 'hbox',
	                        margin : '5 0 0 20',
	                        items:[{
							xtype : 'datefield',
							name:'fromDate',
							//value : Ext.Date.subtract (new Date(),Ext.Date.DAY,7),
							reference:'fromDate',
							fieldLabel : AOCLit.fromDate,
							width:250,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'top',
							allowBlank : true,
							selectOnTab : true,
							listeners : {
							    render : function(datefield) {
							        datefield.setValue(Ext.Date.subtract (new Date(),Ext.Date.DAY,7));
							    }
							}
						},
						{
							xtype:'tbspacer',
							height:5,
							width:30
						},
						{
							xtype : 'datefield',
							fieldLabel : AOCLit.toDate,
							name:'toDate',
							reference:'toDate',
							width:250,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'top',
							allowBlank : true,
							selectOnTab : true,
							listeners : {
							    render : function(datefield) {
							        datefield.setValue(new Date());
							                },
							     'focus': 'notifyByMessage'
							        }
						}]
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
