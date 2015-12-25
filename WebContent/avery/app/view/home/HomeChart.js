Ext.define('AOC.view.home.HomeChart',{
    extend        : 'Ext.container.Container',
    requires      : [
        'Ext.chart.*',
        'Ext.chart.Chart',             
        'Ext.chart.series.Line',
        'Ext.toolbar.Toolbar',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Line',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'AOC.view.home.HomePageOrderList'
    ],
    alias         : 'widget.odersoverviewchart',
    cls           : 'container-border',
    layout        : {
        type   : 'vbox',
        align  : 'stretch'
    },
    initComponent : function(){
        var me = this;
        Ext.apply(me,{
            items : me.buildItems()
        });
        me.callParent(arguments);
        me.helper = AOC.util.Helper;
    },

    buildItems : function(){
        var me = this;
        return [{
            xtype   : 'toolbar',
            height  : 40,
            items   : [{
                xtype  : 'component',
                margin:'0 0 0 50',
                html   : '<div  style="font-weight:600;font-size:20px">Orders Summary</div>'
            },'->',{
                xtype        : 'checkbox',
                checked      : true,
                boxLabel     : 'Received',
                seriesItemId : 'received',
                listeners    : {
                    scope  : me,
                    change : me.onChangeCheckboxSeries
                }
            },{
                xtype        : 'checkbox',
                checked      : true,
                boxLabel     : 'Waiting CS Review',
                margin       : '0 0 0 15',
                seriesItemId : 'waitingCR',
                listeners    : {
                    scope  : me,
                    change : me.onChangeCheckboxSeries
                }
            },{
                xtype        : 'checkbox',
                checked      : true,
                boxLabel     : 'Waiting System Response',
                margin       : '0 0 0 15',
                seriesItemId : 'waitingSR',
                listeners    : {
                    scope  : me,
                    change : me.onChangeCheckboxSeries
                }
            },{
                xtype        : 'checkbox',
                boxLabel     : 'Successful',
                checked      : true,
                margin       :  '0 0 0 15',
                seriesItemId : 'success',
                listeners    : {
                    scope  : me,
                    change : me.onChangeCheckboxSeries
                }
            },,{
                xtype        : 'checkbox',
                boxLabel     : 'Failed',
                checked      : true,
                margin       :  '0 0 0 15',
                seriesItemId : 'failed',
                listeners    : {
                    scope  : me,
                    change : me.onChangeCheckboxSeries
                }
            },{
                xtype          : 'combo',
                itemId         : 'dashboardDateRange',
                width          : 150,
                margin         : '0 20 0 15',
                forceSelection: true,
                onFocus: function() {
                    var me = this;
                    me.getPicker().focus();
                },
                store          : new Ext.data.Store({
                    fields : ['val','desc'],
                    data   : [{
                        val  : 30,
                        desc : 'Last Month'
                    },{
                        val  : 7,
                        desc : 'Last Week'
                    },{
                        val  : 14,
                        desc : 'Last Two Week'
                    },{
                        val  : 7,
                        desc : 'Last 1 Day'
                    }]
                }),
                editable       : false,
                displayField   : 'desc',
                valueField     : 'val',
                triggerAction  : 'all',
                queryMode      : 'local',
                allowBlank     : false,
                value          : 30,
                listeners      : {
                    scope  : me,
                    select : function(cmp, recs){
                        me.fireEvent('daterangechanged', me, recs[0], cmp);
                }
            }
        },{
            xtype       : 'image',
            width       : 15,
            itemId      : 'refreshbutton',
            height      : 15,
            margin      :'0 15 0 0',
            src:'avery/build/testing/AOC/resources/images/grid/refresh.png',
            style       : {
            	'cursor' : 'pointer'
            },
            tooltipText : 'refresh',
            listeners   : {
            	afterrender : function(cmp){
                    cmp.el.on({
                    	scope : me,
                        click : function(){
                        	var tempCombo = me.down("#dashboardDateRange");
                        	var tempRec = tempCombo.findRecordByValue(tempCombo.getValue());
                        	me.fireEvent('daterangechanged', me, tempRec, tempCombo);
                        }
                    });
                },
                render: function(ct) {
//                    if(ct.tooltipText)
//                    	AdeptiaConnect.util.Helper.createToolTip(ct.getEl(),ct.tooltipText);
                }
            }
        }]
        },{
            xtype        : 'chart',
            itemId       : 'dashboardchart',
            flex         :1,
            insetPadding : 25, 
            style        : {
                "background-color" : "#f9f9f9"
            },
            store        : me.buildStore(),
            series       : me.buildSeries(),
            axes         : me.buildAxes()
        },{
            xtype:'homepageorderlist'
        }];
    },

    buildStore : function(){
        var me  = this,
            str = Ext.create('Ext.data.Store',{
                fields : ['received','waitingCR','waitingSR','success','failed','day'],
//                proxy : {
//                    type   : 'memory',
//                    reader : {
//                        type : 'json'
//                    }
//                }
                data: [{"received":4,"waitingCR":6,"waitingSR":1,"success":1,"failed":0,"day":'1 DEC'},
                       {"received":5,"waitingCR":10,"waitingSR":6,"success":3,"failed":3,"day":'2 DEC'},
                       {"received":6,"waitingCR":8,"waitingSR":4,"success":5,"failed":5,"day":'3 DEC'},
                       {"received":3,"waitingCR":5,"waitingSR":7,"success":4,"failed":2,"day":'4 DEC'},
                       {"received":2,"waitingCR":2,"waitingSR":3,"success":2,"failed":2,"day":'5 DEC'},
                       {"received":1,"waitingCR":4,"waitingSR":12,"success":7,"failed":8,"day":'6 DEC'}]
            });
        return str;
    },

    buildAxes : function(){
        return [{
            type     : 'numeric',
            minimum  : 0,
            grid           : true,
            position : 'left',
            title: {
                text: 'NO. OF ODERS',
                fontSize: 15
            },
            fields   : ['received','waitingCR','waitingSR','succes','failed']
        }, {
            type: 'category',
            position: 'bottom',
            grid           : true,
            fields: ['day'],
            title: {
                text: 'DAYS',
                fontSize: 15
            }
        }];
    },

    buildSeries : function(){
	var map =AOC.util.Helper.orderColorMap;
        return [{
            type: 'line',
            smooth : true,
            highlight: false,
            shadowAttributes : false,
            axis: 'left',
            xField: 'day',
            yField: 'received',
            seriesItemId : 'received',
            style: {
                opacity : 1,
                'stroke-opacity':1,
                "stroke-width" :5,
                stroke : map.get('Received')//pink
            }
        },{
            type: 'line',
            smooth : true,
            shadowAttributes : false,
            highlight: false,
            axis: 'left',
            xField: 'day',
            yField: 'waitingCR',
            seriesItemId : 'waitingCR',
            style: {
        	 opacity : 1,
                'stroke-opacity':1,
                "stroke-width" :5,
                stroke : map.get('Waiting CS Review')//yellow
            }
        },{
            type: 'line',
            smooth : true,
            highlight: false,
            axis: 'left',
            shadowAttributes : false,
            xField: 'day',
            yField: 'waitingSR',
            seriesItemId : 'waitingSR',
            style: {
        	 opacity : 1,
                'stroke-opacity':1,
                "stroke-width" :5,
                stroke  : map.get('Waiting System Response')//blue
            }
        },{
            type: 'line',
            smooth : true,
            highlight: false,
            axis: 'left',
            seriesIsHidden : true,
            shadowAttributes : false,
            xField: 'day',
            yField: 'success',
            seriesItemId : 'success',
            style: {
        	 opacity : 1,
                'stroke-opacity':1,
                "stroke-width" :5,
                stroke  : map.get('Successful')//green
            }
        },{

            type: 'line',
            smooth : true,
            highlight: false,
            axis: 'left',
            seriesIsHidden : true,
            shadowAttributes : false,
            xField: 'day',
            yField: 'failed',
            seriesItemId : 'failed',
            style: {
        	 opacity : 1,
                'stroke-opacity':1,
                "stroke-width" :5,
                stroke  : map.get('Failed')//red
            }
        
        }];
    },
    onChangeCheckboxSeries : function(cmp, value){
        var me = this,
            chart = Ext.ComponentQuery.query('#dashboardchart')[0],
            series = chart.series;
        for (var ii=0; ii<series.length; ii++){
            if (series[ii].seriesItemId === cmp.seriesItemId){
        	series[ii].setHidden(!value);
            }
        }
        chart.redraw();
    }

});