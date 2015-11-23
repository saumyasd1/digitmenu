Ext.define('AOC.view.advsearch.PartnerAdvanceSearch', {
			extend : 'Ext.form.Panel',
			alias : 'widget.partneradvancesearch',
			itemId : 'partneradvancesearchItemId',
			requires : ['Ext.window.MessageBox'],
			controller:'partnerMain',
			border : false,
			buttonAlign : 'right',
			style: 'background: #FFFFFF !important;border: 2px solid #FFFFFF;',
			items : [
						{
							xtype:'tbspacer',
							height:20
						},
						{
							xtype : 'textfield',
							itemId: 'partnernamevalue',
							fieldLabel : 'Partner Name',
							name:'partnerName',
							width:355,
							labelSeparator : '',
							labelAlign : 'right',
							allowBlank : true,
							selectOnTab : true,
							listeners:{
								focus: function () {
									var val=this.getValue().replace(/^\s+|\s+$/g,"");
									if(val=="")
										this.setValue('');
								}
							}
						},
						{
							xtype:'tbspacer',
							height:5
						},
						{
							xtype : 'radiogroup',
							itemId: 'partnerdatecriteriavalue',
							fieldLabel : 'Date Criteria',
							name: 'datecriteriavalue',
							width:355,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'right',
							items:[
						            { boxLabel: 'Creation Date', name: 'datecriteriavalue', inputValue: 'createdDate', checked: true },
						            { boxLabel: 'Modified Date', name: 'datecriteriavalue', inputValue: 'lastModifiedDate' }
						            ]
						},
						{
							xtype:'tbspacer',
							height:5
						},
						{
							xtype : 'datefield',
							itemId: 'partnerfromdatecriteriavalue',
							fieldLabel : 'From Date ',
							name:'fromDate',
							width:355,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'right',
							allowBlank : true,
							selectOnTab : true,
							listeners : {
							    render : function(datefield) {
							        /// code to convert GMT String to date object
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
							itemId: 'partnertodatecriteriavalue',
							fieldLabel : 'To Date ',
							name:'toDate',
							width:355,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'right',
							allowBlank : true,
							//value: Ext.util.Format.date(currentDateTime),
							selectOnTab : true,
							listeners : {
							    render : function(datefield) {
							        /// code to convert GMT String to date object
							        datefield.setValue(new Date());
							                }
							        }
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
						handler : 'getPartnerBasedOnSearchParameters'
						}],
				initComponent : function() {
				this.callParent(arguments);
				}

});
