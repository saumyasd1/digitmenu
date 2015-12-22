Ext.define('AOC.view.advsearch.ArchiveManageAdvanceSearch', {
			extend : 'Ext.form.Panel',
			alias : 'widget.archiveadvancesearch',
			itemId : 'archivesearchItemId',
			requires : ['Ext.window.MessageBox'],
			controller:'archiveMain',
			border : false,
			buttonAlign : 'right',
			style: 'background: #FFFFFF !important;border: 2px solid #FFFFFF;',
			items : [
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
							xtype : 'radiogroup',
							itemId: 'archivedatecriteriavalue',
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
							itemId: 'archivefromdatecriteriavalue',
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
							itemId: 'archivetodatecriteriavalue',
							fieldLabel : 'To Date ',
							name:'toDate',
							width:355,
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
						}
			],

			buttons : [ {
						text : 'Search',
						disabled : false,
						formBind : true,
						success : true,
						handler : 'getArchiveBasedOnSearchParameters'
						}],
				initComponent : function() {
				this.callParent(arguments);
				}

});
