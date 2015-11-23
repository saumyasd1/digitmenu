Ext.define('AOC.config.Overrides',{
    singleton : true,
    constructor : function(){
    		Ext.define('Ext.override.data.proxy.Server', {
    		override: 'Ext.data.proxy.Server',
    		simpleSortMode:true,
    		initComponent: function () {
                var me = this;
                	me.simpleSortMode=true;
                me.callParent(arguments);
            },
            getParams: function(operation) {
                if (!operation.isReadOperation) {
                    return {};
                }

                var me = this,
                    params = {},
                    grouper = operation.getGrouper(),
                    sorters = operation.getSorters(),
                    filters = operation.getFilters(),
                    page = operation.getPage(),
                    start = operation.getStart(),
                    limit = operation.getLimit(),
                    simpleSortMode = me.getSimpleSortMode(),
                    simpleGroupMode = me.getSimpleGroupMode(),
                    pageParam = me.getPageParam(),
                    startParam = me.getStartParam(),
                    limitParam = me.getLimitParam(),
                    groupParam = me.getGroupParam(),
                    groupDirectionParam = me.getGroupDirectionParam(),
                    sortParam = me.getSortParam(),
                    filterParam = me.getFilterParam(),
                    directionParam = me.getDirectionParam(),
                    hasGroups, index;

                if (pageParam && page) {
                    params[pageParam] = page;
                }

                if (startParam && (start || start === 0)) {
                    params[startParam] = start;
                }

                if (limitParam && limit) {
                    params[limitParam] = limit;
                }
                hasGroups = groupParam && grouper;
                if (hasGroups) {
                    // Grouper is a subclass of sorter, so we can just use the sorter method
                    if (simpleGroupMode) {
                        params[groupParam] = grouper.getProperty();
                        params[groupDirectionParam] = grouper.getDirection();
                    } else {
                        params[groupParam] = me.encodeSorters([grouper], true);
                    }
                }

                if (sortParam && sorters && sorters.length > 0) {
                    if (simpleSortMode) {
                        index = 0;
                        // Group will be included in sorters, so grab the next one
                        if (sorters.length > 1 && hasGroups) {
                            index = 1;
                        }
                        params[sortParam] = sorters[index].getProperty();
                        params[directionParam] = sorters[index].getDirection();
                    } else {
                        params[sortParam] = me.encodeSorters(sorters);
                    }

                }

                if (filterParam && filters && filters.length > 0) {
                    params[filterParam] = me.encodeFilters(filters);
                }

                return params;
            }
    		});
    }
    
});