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
        'AOC.view.home.HomeChartController',
        'AOC.view.home.HomePageOrderList'
    ],
    controller:'homechartcontroller',
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
	var map =AOC.util.Helper.orderColorMap;
        var me = this;
        return [{
            xtype   : 'toolbar',
            height  : 40,
            items   : [{
                xtype  : 'component',
                margin:'0 0 0 50',
                html   : '<div  style="font-family: San Serif, Helvetica, Arial; font-size: 25px; color: #2F3338; line-height: 29px;">Order Summary</div>'
            },'->',{
                xtype        : 'checkbox',
                checked      : true,
                boxLabel     : 'Received',
                seriesItemId : 'received',
                beforeBoxLabelTextTpl :'<div class="home-oder-grid-circle" style="border:5px solid '+ map.get('Received')+'"></div>&nbsp',
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
                beforeBoxLabelTextTpl :'<div class="home-oder-grid-circle" style="border:5px solid '+ map.get('Waiting CS Review')+'"></div>&nbsp',
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
                beforeBoxLabelTextTpl :'<div class="home-oder-grid-circle" style="border:5px solid '+ map.get('Waiting System Response')+'"></div>&nbsp',
                listeners    : {
                    scope  : me,
                    change : me.onChangeCheckboxSeries
                }
            },{
                xtype        : 'checkbox',
                boxLabel     : 'Successful',
                checked      : true,
                margin       :  '0 0 0 15',
                beforeBoxLabelTextTpl :'<div class="home-oder-grid-circle" style="border:5px solid '+ map.get('Successful')+'"></div>&nbsp',
                seriesItemId : 'success',
                listeners    : {
                    scope  : me,
                    change : me.onChangeCheckboxSeries
                }
            },{
                xtype        : 'checkbox',
                boxLabel     : 'Failed',
                checked      : true,
                margin       :  '0 0 0 15',
                seriesItemId : 'failed',
                beforeBoxLabelTextTpl :'<div class="home-oder-grid-circle" style="border:5px solid '+ map.get('Failed')+'"></div>&nbsp',
                listeners    : {
                    scope  : me,
                    change : me.onChangeCheckboxSeries
                }
            },{
                xtype          : 'combo',
                itemId         : 'dashboardDateRange',
                width          : 150,
                margin         : '0 20 0 15',
                forceSelection : true,
                onFocus: function() {
                    var me = this;
                    me.getPicker().focus();
                },
                store          : new Ext.data.Store({
                    fields : ['val','desc'],
                    data   : [{
                        val  : 1,
                        desc : 'Last 1 Day'
                    },{
                        val  : 7,
                        desc : 'Last 7 Days'
                    },{
                        val  : 14,
                        desc : 'Last 14 Days'
                    },{
                        val  : 30,
                        desc : 'Last 30 Days'
                    }]
                }),
                editable       : false,
                displayField   : 'desc',
                valueField     : 'val',
                triggerAction  : 'all',
                queryMode      : 'local',
                allowBlank     : false,
                value          : 1,
                listeners      : {
                    select : 'changeDateRange'
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
                        	tempCombo.fireEvent('select', cmp, tempRec,true);
                        }
                    });
                },
                render: function(ct) {
//                    if(ct.tooltipText)
//                    	AdeptiaConnect.util.Helper.createToolTip(ct.getEl(),ct.tooltipText);
                }
            }
        },{
            xtype       : 'button',
            reference      : 'report',
            margin      :'0 15 0 0',
            text:'Report',
            ui:'blue',
            listeners:{
            	'click':'getReportView'
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
            store        : 'OrderCharts',
            series       : me.buildSeries(),
            axes         : me.buildAxes()
        },{
            xtype:'homepageorderlist',
            minHeight:150
        }];
    },

    buildAxes : function(){
	var me =this;
        return [{
            type     : 'numeric',
            minimum  : 0,
            grid           : true,
            position : 'left',
            title: {
                text: '#Orders',
                fontSize: 15
            },
            fields   : ['received','waitingCR','waitingSR','success','failed']
        }, {
            type: 'category',
            position: 'bottom',
            grid           : true,
            fields: ['day'],
            title: {
                text: 'DAYS',
                fontSize: 15
            },
            renderer:function(label){
        	return me.getLabel(label)
            }
        }];
    },
    
    getLabel:function(label){
	return (label.indexOf("::")!=-1)?label.substring(4):label;
    },
    buildSeries : function(){
	var map =AOC.util.Helper.orderColorMap;
	var me=this;
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
        	opacity :  0.6,
                'stroke-opacity':0.6,
                "stroke-width" :5,
                stroke : map.get('Received')//pink
            },
            tips: {
                trackMouse: true,
                style: 'background: #404040',
                height: 25,
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: function(storeItem, item) {
                    this.setHtml('<div class="home-oder-grid-circle" style="border:5px solid '+ map.get('Received')+'"></div><div class="home-oder-grid-text">'+me.getLabel(storeItem.get('day')) + ': ' + storeItem.get('received'))+'</div>';
                }
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
        	opacity :  0.6,
                'stroke-opacity':0.6,
                "stroke-width" :6,                
                stroke : map.get('Waiting CS Review')//yellow
            },
            tips: {
                trackMouse: true,
                style: 'background: #404040',
                height: 25,
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: function(storeItem, item) {
                    this.setHtml('<div class="home-oder-grid-circle" style="border:5px solid '+ map.get('Waiting CS Review')+'"></div><div class="home-oder-grid-text">'+me.getLabel(storeItem.get('day')) + ': ' + storeItem.get('waitingCR'))+'</div>';
                }
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
        	 opacity :  0.6,
                'stroke-opacity':0.6,
                "stroke-width" :5,
                stroke  : map.get('Waiting System Response')//blue
            },
            tooltip: {
                trackMouse: true,
                style: 'background: #404040',
                height: 25,
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: function(storeItem, item) {
                    this.setHtml('<div class="home-oder-grid-circle" style="border:5px solid '+ map.get('Waiting System Response')+'"></div><div class="home-oder-grid-text">'+me.getLabel(storeItem.get('day'))+ ': ' + storeItem.get('waitingSR'))+'</div>';
                }
            }
        },{
            type: 'line',
            smooth : true,
            highlight: false,
            axis: 'left',
            shadowAttributes : false,
            xField: 'day',
            yField: 'success',
            seriesItemId : 'success',
            style: {
        	opacity :  0.6,
                'stroke-opacity':0.6,
                "stroke-width" :5,
                stroke  : map.get('Successful')//green
            },
            tips: {
                trackMouse: true,
                style: 'background: #404040',
                height: 25,
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: function(storeItem, item) {
                    this.setHtml('<div class="home-oder-grid-circle" style="border:5px solid '+ map.get('Successful')+'"></div><div class="home-oder-grid-text">'+me.getLabel(storeItem.get('day'))+ ': ' + storeItem.get('success'))+'</div>';
                }
            }
        },{
            type: 'line',
            smooth : true,
            highlight: false,
            axis: 'left',
            shadowAttributes : false,
            xField: 'day',
            yField: 'failed',
            seriesItemId : 'failed',
            style: {
        	opacity :  0.6,
                'stroke-opacity':0.6,
                "stroke-width" :4,
                stroke  : map.get('Failed')//red
            },
            tips: {
                trackMouse: true,
                style: 'background: #404040',
                height: 25,
                showDelay: 0,
                dismissDelay: 0,
                hideDelay: 0,
                renderer: function(storeItem, item) {
                    this.setHtml('<div class="home-oder-grid-circle" style="border:5px solid '+ map.get('Failed')+'"></div><div class="home-oder-grid-text">'+me.getLabel(storeItem.get('day'))+ ': ' + storeItem.get('failed'))+'</div>';

                }
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