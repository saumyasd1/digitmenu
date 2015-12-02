Ext.define('AOC.config.Runtime',{
    singleton : true,
    config : {
        activeButton : null,
        activeGrid:null,
        windowInEditMode:false,
        orderQueueId:null,
        orderQueueActiveRecord:null
    },
    constructor : function(config){
        this.initConfig(config);
    }
});