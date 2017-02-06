Ext.define('AOC.view.home.HomeChartController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.homechartcontroller',
    runTime: AOC.config.Runtime,
    changeDateRange:function(cmp,rec){
	    var me=this;
	    var value = rec.get('val');
	    //me.loadChartData(value,cmp.xtype=='image');
    },
    loadChartData:function(days,loadList){
		/*var chart = this.getView().down('#dashboardchart'),
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
		}*/
    },
    getReportView:function(obj){
	//    	var win=Ext.create('AOC.view.base.BaseWindow',{
	//    						items:[{
	//    							xtype:'reportform'
	//    						}]
	//    	});
	//    win.show();
    }
});