Ext.define('AOC.view.home.OrderQueueStatusList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.orderqueuestatuslist',
	emptyText:AOCLit.emptyDataMsg,
	requires:['AOC.view.home.HomePageController'],
	controller:'homepagecontroller',
	frame:true,
	initComponent : function(){
		var me=this;
		Ext.apply(this,{
	        columns: this.buildColumns(),
	        colTpl: me.buildColTpl(),
	        store:'HomePageOders',
	        columnLines:false,
	        rowLines: false,
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