Ext.define('AOC.view.home.OrderQueueStatusList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.orderqueuestatuslist',
	emptyText:AOCLit.emptyDataMsg,
	requires:['AOC.view.home.HomePageController'],
	controller:'homepagecontroller',
	initComponent : function(){
		var me=this;
		Ext.apply(this,{
	        columns: this.buildColumns(),
	        colTpl: me.buildColTpl(),
	        store:'HomePageOders',
	        columnLines:false,
	        rowLines: false,
	        tbar: { 
				height: AOC.config.Settings.config.defaultTbarHeight,
				items : me.buildTbar()
			},
	        viewConfig : {
	            stripeRows: false,
	            getRowClass: function(record,num) {
		        	if(num==0){
		        	    return 'light-black';
		        	}
		        	else{
		                return (num % 2 == 0) ? 'light-black' : 'black';
		        	}
	            }
	        }
		});
		this.callParent(arguments);
	},
	listeners:{
        cellclick:'onOrderQueueStatusCellClick'
    },
    buildTbar:function(){
    	return [
    	     {
    	    	 xtype:'tbtext',
    	    	 text:'Order Queue Status',
    	    	 style:AOC.config.Settings.config.tabHeaderTitleStyle
    	     },'->',
    	     {
  				xtype:'combobox',
  				name: 'siteId',
  				fieldLabel:'Site',
  				width:280,
      	    	labelStyle:Settings.config.defaultFormLabelStyle,
      	    	labelSeparator:'',
      	    	currentItemRef:'siteCombo',
      	    	labelWidth:80,
      	    	editable:false,
  				displayField: 'name',
  				queryMode :'local',
  				reference:'siteCombo',
  				valueField: 'id',
  				store:Ext.create('AOC.store.SiteStore'),
  				listeners : {
  					'afterrender':'onAfterRenderSiteCombo',
  					'change':'onChangeSiteCSRCodeCombo'
  				}
    	     }, {
  				xtype:'combo',
  				fieldLabel:'CSR Code',
      	    	labelStyle:Settings.config.defaultFormLabelStyle,
      	    	labelSeparator:'',
      	    	labelWidth:80,
  				width:280,
  				displayField:'csrName',
  				currentItemRef:'csrCombo',
  				reference:'csrCombo',
  				name:'assignCSR',
  				disabled:true,
  				valueField:'id',
  				queryMode:'local',
  				store:Ext.create('AOC.store.AssignCSRStore'),
  				typeAhead:true,
  				enableKeyEvents:true,
  				listeners:{
  					blur:function(combo,e){
  						Helper.clearCSRCombo(combo,e);
  					},
  					'afterrender':'onAfterRenderCSRCombo',
  					'focus':'onFocusCSRcombo',
  					'change':'onChangeSiteCSRCodeCombo'
  				}
    	     }, {
    	    	xtype:'combo',
    	    	displayField:'Name',
    	    	fieldLabel:'Refresh Rate',
    	    	labelStyle:Settings.config.defaultFormLabelStyle,
    	    	labelSeparator:'',
    	    	labelWidth:100,
    	    	valueField:'id',
    	    	value:0,
    	    	queryMode:'local',
    	    	reference:'refreshRateCombo',
    	    	name:'refreshRateCombo',
    	    	editable:false,
    	    	store:new Ext.data.JsonStore({
    	    		data:[
    	    		    {Name:'Don\'t Refresh',id:0},
    	    		    {Name:'5 min', id:5},{Name:'10 min',id:10},{Name:'15 min', id:15}    
    	    		],
    	    		fields:['Name','id']
    	    	}),
    	    	listeners:{
    	    		select:'onRefreshRateComboSelect'
    	    	}
    	     }, {
    	    	 text:'',
    	    	 scale:'medium',
    	    	 cls:'aoc-btn',
    	    	 tooltip:'<font color="blue">Quick Refresh</font>',
    	    	 iconCls:'fa fa-refresh aoc-icon',
    	    	 handler:'onRefreshClick'
    	     }
    	];
    },
	buildColumns : function(){
    	var me=this;
        return {
            defaults:{
                draggable : false,
                sortable : false,
                hideable :false,
                flex:1,
                resizable:false
			},
			items:[
				{  
					text : 'Orders',
					width:200,
					dataIndex:'orderType',
					cls:'home-order-grid',
					renderer: function(v,meta,rec){
						return me.colTpl.apply(rec.data);
					}
               	},
				{  
					text : 'Last 1 Day',
					align:'center',
					dataIndex:'lastOneDay',
					cls:'home-order-grid',
					renderer: me.renderValue
               	},
				{  
					text : 'Last 7 Days',
					align:'center',
					dataIndex:'lastWeek',
					cls:'home-order-grid',
					renderer: me.renderValue
               	},
				{ 
					text : 'Last 14 Days',
					align:'center',
					dataIndex:'lastTwoWeek',
					cls:'home-order-grid',
					renderer: me.renderValue
               	},
				{ 
					text : 'Last 30 Days',
					border:false,
					align:'center',
					dataIndex:'lastMonth',
					cls:'home-order-grid',
					renderer: me.renderValue
               	}
			]
		};
    },
    renderValue:function(v,meta,rec){
    	var style=(v>0)?'"cursor:pointer;"':'""';
        return '<div style='+style+' class="home-oder-grid-column-text">'+v+'</div>';
    },
    buildColTpl : function(){
        return Ext.create('Ext.XTemplate',
            '<div >',
                '<div class="home-oder-grid-circle" style="border:5px solid {[values.colorCode]}"></div>',
                '<div class="home-oder-grid-text">{[Ext.util.Format.htmlEncode(values.orderType)]}</div>',
            '</div>',
			{
                disableFormats : true
            }
        );
    }
});