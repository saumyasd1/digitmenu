Ext.define('AOC.view.advsearch.PartnerAdvanceSearch', {
			extend : 'Ext.form.Panel',
			alias : 'widget.partneradvancesearch',
			itemId : 'partneradvancesearchItemId',
			requires : ['Ext.window.MessageBox'],
			controller:'partnerMain',
			border : false,
			buttonAlign : 'right',
			style: 'background: #FFFFFF !important;border: 2px solid #FFFFFF;',
			items : [   {
							xtype:'displayfield',
							itemId:'tittleItemId',
							value:'<b><font size=3>'+AOCLit.advancedSearchWindowTitle+'</font></b>',
							margin:'5 0 0 80'
			            },
						{
							xtype:'tbspacer',
							height:2
						},  
                      {
						xtype:'displayfield',
						itemId:'messageFieldItemId',
						value:'',
						hidden:true,
						margin:'5 0 0 10'
                       },
						{
							xtype:'tbspacer',
							height:2
						},
						{
							xtype : 'textfield',
							itemId: 'partnernamevalue',
							fieldLabel : AOCLit.partnerName,
							name:'partnerName',
							width:250,
							labelSeparator : '',
							labelAlign : 'top',
							allowBlank : true,
							selectOnTab : true,
							margin:'5 0 0 10',
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
							height:2
						},
						{
							xtype : 'radiogroup',
							itemId: 'partnerdatecriteriavalue',
							fieldLabel : '',
							name: 'datecriteriavalue',
							width:250,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'top',
							margin:'5 0 0 10',
							items:[
						            { boxLabel: 'Creation Date', name: 'datecriteriavalue', inputValue: 'createdDate', checked: true },
						            { boxLabel: 'Modified Date', name: 'datecriteriavalue', inputValue: 'lastModifiedDate' }
						            ]
						},
						{
							xtype:'tbspacer',
							height:2
						},
						{
							xtype : 'datefield',
							itemId: 'partnerfromdatecriteriavalue',
							fieldLabel : AOCLit.fromDate,
							name:'fromDate',
							reference:'fromDate',
							width:250,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'top',
							allowBlank : true,
							selectOnTab : true,
							margin:'5 0 0 10',
							listeners : {
							    render : function(datefield) {
							        /// code to convert GMT String to date object
							        datefield.setValue(new Date());
							                }
							        }
							
						},
						{
							xtype:'tbspacer',
							height:2
						},
						{
							xtype : 'datefield',
							itemId: 'partnertodatecriteriavalue',
							fieldLabel : AOCLit.toDate,
							name:'toDate',
							width:250,
							reference:'toDate',
							hidden:false,
							labelSeparator : '',
							labelAlign : 'top',
							allowBlank : true,
							//value: Ext.util.Format.date(currentDateTime),
							selectOnTab : true,
							margin:'5 0 0 10',
							listeners : {
							    render : function(datefield) {
							        /// code to convert GMT String to date object
							        datefield.setValue(new Date());
							                },
						 'focus': 'notifyByMessage'
							        }
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
