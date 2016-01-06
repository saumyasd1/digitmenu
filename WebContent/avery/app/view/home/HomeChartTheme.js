Ext.define('AOC.view.home.HomeChartTheme', {
    extend: 'Ext.chart.theme.Base',
    singleton: true,
    alias: 'chart.theme.homecharttheme',
    config: {
	baseColor: 'red',
	chart: {
            defaults: {
                background: '#ffffff'
            }
        },
        axis: {
            defaults: {
                style: {
                    strokeStyle: '#BDD9F2'
                },
                grid: {
                    strokeStyle: '#BDD9F2'
                }
            }
        }
    }
});