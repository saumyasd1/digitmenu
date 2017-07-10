Ext.define('AOC.view.home.ReportForm',{
    extend: 'Ext.form.Panel',
    controller:'reportcontroller',
    alias:'widget.reportform',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onReportFormAfterRender'
    },
    initComponent : function(){
        Ext.apply(this,{
            items : this.buildItems()
        });
        this.callParent(arguments);
    },
    bodyPadding:10,

    buildItems : function(){
        return [
            {
				xtype: 'fieldcontainer',
	            layout:{
	            	type:'hbox',
	            	align:'stretch'
	            },
	            defaults:{
	            	flex:1
	            },
	            items:[
					{
						xtype:'combo',
						reference:'partnerCombo',
						itemId:'partnerCombo',
						store : Ext.data.StoreManager.lookup('PartnerManagementStoreId')== null ? Ext.create('AOC.store.PartnerManagementStore') : Ext.data.StoreManager.lookup('PartnerManagementStoreId'),
						valueField:'id',
						name:'partnerName',
						allowBlank : false,
						reference:'partner',
						flex:1.5,
						displayField:'partnerName',
						emptyText:'Select Partner',
						queryMode:'local',
						listeners:{
							select:'onPartnerSelect',
							afterrender:'onPartnerComboAfterRender',
							blur:function(field){
								Helper.clearCombo(field);
							}
						}
					},
					{
						xtype:'combo',
						name:'rbo',
						margin:'0 0 0 10',
						allowBlank : false,
						reference:'rboName',
						displayField:'rboName',
						valueField:'id',
						disabled:true,
						emptyText:'Select RBO',
						queryMode:'local',
						store:Ext.create('Ext.data.Store',{
				     	   	 fields : ['rboName','id','productLineType'],	
					         data : []
				        }),
				        listeners:{
				        	blur:function(field){
								Helper.clearCombo(field);
							}
				        }
	                },
					{
	                	xtype : 'combo',
						name:'Status',
						hideLabel:true,
						margin:'0 0 0 10',
						reference:'status',
						allowBlank : false,
						disabled:true,
						displayField:'value',
						valueField:'code',
						queryMode :'local',
						emptyText:'Select Status',
	                	store: Ext.data.StoreManager.lookup('code') == null ? AOC.util.Helper.getCodeStore('orderfilequeue') : Ext.data.StoreManager.lookup('orderfilequeueid'),
	                    listeners:{
	                    	afterrender:'onStatusComboAfterRender',
	                    	blur:function(field){
								Helper.clearCombo(field);
							}
	                    }
					}
				]
	        },{
				xtype: 'fieldcontainer',
	            layout: {
	            	type:'hbox',
	            	align:'stretch'
	            },
	            items:[
					{
	                    xtype: 'combo',
	                    name: 'siteId',
	                    itemId:'site',
	                    emptyText:'Select Site',
	                    flex:1.5,
	                    editable: false,
	                    displayField: 'name',
	                    valueField: 'id',
	                    hidden:AOCRuntime.getUser().role == 1 ? false : true,
	                    reference: 'siteName',
	                    store: Ext.create('AOC.store.SiteStore'),
	                    queryMode: 'local',
	                    listeners:{
	                    	afterrender:'onSiteComboAfterRender',
	                    	select:'onSiteSelect'
	                    }
	                },
	                {
	    				xtype:'combo',
	    				displayField:'csrName',
	    				reference:'csrCombo',
	    				name:'CSR',
	    				emptyText:'Select CSR Name',
	    				valueField:'userId',
	    				flex:1,
	    				disabled:AOCRuntime.getUser().role == 1 ? true : false ,
	    				margin:'0 0 0 10',
	    				queryMode:'local',
	    				store:Ext.create('AOC.store.AssignCSRStore'),
	    				typeAhead:true,
	    				listeners:{
	                    	afterrender:'onCSRComboAfterRender',
	                    	blur:function(field){
								Helper.clearCombo(field);
							}
	                    }
	    			},
	    			{
	    				xtype:'combo',
	    				name:'timeZone',
	    				emptyText:'Select Time Zone',
	    				flex:1,
	    				reference:'timeZone',
	    				editable:false,
	    				margin:'0 0 0 10',
	    				store:[['Hongkong','HKT'],['Asia/Hong_Kong','EDT'],['EST','EST'],['VST','VNT'],['GMT','GMT'],['CST','CST']]
	    			}
				]
	        },
			{
				xtype:'tbtext',
				height:10,
				margin:'10 0 0 0',
				text:'Please select the type of report you would like to get:',
				style:AOC.config.Settings.config.defaultFormLabelStyle
			},
			{
				xtype : 'radiogroup',
				name: 'rb',
				hideLabel:true,
				width:200,
				labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
				reference:'radioGroup',
				margin:'10 0 0 0',
				items:[
					{ boxLabel: 'Daily Report', name: 'rb', inputValue: 'dailyReport', checked: true },
					{ boxLabel: 'Detail Status Report', name: 'rb', inputValue: 'openReport' }
				],
			    listeners:{
			    	change:'onRadioButtonChange'
			    }
			},
			{
				xtype: 'fieldcontainer',
				layout: {
					type:'hbox',
					align:'stretch'
				},
				margin : '0 0 5 0',
				defaults:{
					labelSeparator:'',
					labelStyle:AOC.config.Settings.config.defaultFormLabelStyle,
					labelAlign:AOC.config.Settings.form.topLabelAlign,
					flex:1
				},
				items:[
					{
						xtype : 'datefield',
						reference:'fromDate',
						hidden:true,
						fieldLabel : 'From Date ',
						selectOnTab: true,
						listeners : {
							afterrender : function(datefield) {
								datefield.setValue(new Date());
							}
						}
					},
					{
						xtype : 'datefield',
						fieldLabel : 'To Date ',
						reference:'toDate',
						margin:'0 0 0 10',
						hidden:true,
						selectOnTab: true,
						listeners : {
							afterrender : function(datefield) {
								datefield.setValue(new Date());
							}
							//focus: 'notifyByMessage'
						}
					}
				]
			}
        ];
    },
    buttons:[
         {
	    	text:'Get Report',
	    	formBind:true,
	    	listeners:{
	    		click:'getReport'
	    	}
         }
     ]
});