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
							xtype : 'radiogroup',
							itemId: 'archivedatecriteriavalue',
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
							itemId: 'archivefromdatecriteriavalue',
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
							itemId: 'archivetodatecriteriavalue',
							fieldLabel : AOCLit.toDate,
							name:'toDate',
							reference:'toDate',
							width:250,
							hidden:false,
							labelSeparator : '',
							labelAlign : 'top',
							allowBlank : true,
							selectOnTab : true,
							margin:'5 0 0 10',
							listeners : {
							    render : function(datefield) {
							        datefield.setValue(new Date());
							                }
							        }
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
