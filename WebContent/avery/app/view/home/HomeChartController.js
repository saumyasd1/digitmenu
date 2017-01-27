Ext.define('AOC.view.home.HomeChartController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.homechartcontroller',
    requires:['AOC.view.home.ReportForm'],
    runTime: AOC.config.Runtime,
    changeDateRange:function(cmp,rec){
    var me=this;
    var value = rec.get('val');
    me.loadChartData(value,cmp.xtype=='image');
    },
    loadChartData:function(days,loadList){
	var chart =this.getView().down('#dashboardchart'),
	store = chart.getStore();
	chart.mask('Loading...');
	store.getProxy().url=AOC.config.Settings.getBaseOrderTrendUrl()+'/chart/'+days;
	store.load({callback:function(){
	    chart.unmask();
	    chart.redraw();
	}});
	if(loadList){
	    var list =this.getView().down('homepageorderlist'),
	    liststore = list.getStore();
	    liststore.getProxy().url=AOC.config.Settings.getBaseOrderTrendUrl()+'/homelist';
	    liststore.load();
	}
    },
    getReportView:function(obj){
    	var win=Ext.create('AOC.view.base.BaseWindow',{
    						items:[{
    							xtype:'reportform'
    						}]
    	});
    win.show();
    },
    homeGridCellClick:function( obj, td, cellIndex, record, tr, rowIndex, e, eOpts ){
	var endDate=new Date();
	var status=0;
	var fieldName="";
	if(cellIndex==0)
	    return;
	switch(rowIndex){
	case 0:{
	    status="11";
	    break;
	}
	case 1:{
	    status="19";
	    break;
	}
	case 2:{
	    status="23";
	    break;
	}
	case 3:{
	    status="41";
	    break;
	}
	case 4:{
	    status="42";
	    break;
	}
	case 5:{
	    status="11,19,23,41,42";
	    break;
	}
	}
	var days=0
	switch(cellIndex){
	case 1:{
	    days=1;
	    fieldName='lastOneDay';
	    break;
	}
	case 2:{
	    days=7;
	    fieldName='lastWeek';
	    break;
	}
	case 3:{
	    days=14;
	    fieldName='lastTwoWeek';
	    break;
	}
	case 4:{
	    days=30;
	    fieldName='lastMonth';
	    break;
	}
	}
	if (record.get(fieldName)==0)
	return;
	var store= Ext.ComponentQuery.query('maincontainer orderqueuegrid')[0].getStore();
	store.proxy.setFilterParam('query');
        var parameters = '{"days":"' +days + '","Status":"' + status +'"}';
       store.setRemoteFilter(true);
        if (!store.proxy.hasOwnProperty('filterParam')) {
            store.proxy.setFilterParam('query');
        }
        store.proxy.encodeFilters = function(filters) {
            return filters[0].getValue();
        };
        var con=AOC.app.getController('MenuController');
        con.selectCard('orderqueueview');
        con.selectMenuItem('orderqueueview');
	Ext.ComponentQuery.query('maincontainer orderqueuegrid #clearadvanedsearch')[0].setVisible(true);
        store.filter({
            id: 'query',
            property: 'query',
            value: parameters
        });
    }
})