Ext.define('AOC.view.home.HomePageOrderList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.homepageorderlist',
	emptyText:'<div align=center> No data to display.</div>',
	initComponent : function(){
	var me=this;
	Ext.apply(this,{
        columns : this.buildColumns(),
        colTpl      : me.buildColTpl(),
        columnLines   : false,
        store:'HomePageOders',
        columnLines:false,
        rowLines: false,
        viewConfig : {
	            stripeRows : false,
	            getRowClass: function(record,num) {
	        	if(num==0){
	        	    return 'light-black';
	        	}
	        	else{
	                return (num%2==0)?'light-black':'black';
	        	}
                    }
        }
	});
       this.callParent(arguments);
  },
  buildColumns : function(){
    	var me=this;
        return {
            defaults : {
                draggable : false,
                sortable : false,
                hideable :false,
                flex:1,
                resizable:false
               },
               items:[{  
            	 text : 'Oders',
            	 width:200,
            	 dataIndex:'orderType',
            	 cls:'home-order-grid',
            	 renderer  : function(v,meta,rec){
                    return me.colTpl.apply(rec.data);
                 }
               	},{  
            	 text : 'Last 1 Day',
                 align:'center',
            	 dataIndex:'lastOneDay',
            	 cls:'home-order-grid',
            	 renderer  : function(v,meta,rec){
                    return '<div class="home-oder-grid-column-text">'+v+'</div>';
                 }
               	},{  
            	 text : 'Last 7 Days',
            	 align:'center',
            	 dataIndex:'lastWeek',
            	 cls:'home-order-grid',
            	 renderer  : function(v,meta,rec){
                    return '<div class="home-oder-grid-column-text">'+v+'</div>';
                 }
               	},{ 
            	 text : 'Last 14 Days',
            	 align:'center',
            	 dataIndex:'lastTwoWeek',
           	 cls:'home-order-grid',
           	 renderer  : function(v,meta,rec){
                   return '<div class="home-oder-grid-column-text">'+v+'</div>';
                }
               	},{ 
            	 text : 'Last 7 Days',
            	 border:false,
            	 align:'center',
            	 dataIndex:'lastMonth',
            	 cls:'home-order-grid',
            	 renderer  : function(v,meta,rec){
                    return '<div class="home-oder-grid-column-text">'+v+'</div>';
                 }
               	}
        ]};
    },
    buildColTpl : function(){
        return Ext.create('Ext.XTemplate',
            '<div >',
                '<div class="home-oder-grid-circle" style="{[this.getColor(values)]}"></div>',
                '<div class="home-oder-grid-text">{[Ext.util.Format.htmlEncode(values.orderType)]}</div>',
            '</div>',{
                disableFormats : true,
                getColor:function(v){
                    return 'border:5px solid '+AOC.util.Helper.orderColorMap.get(v.orderType)+';';
                }
            }
        );
    }
});