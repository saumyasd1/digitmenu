Ext.define('AOC.config.Runtime',{
    singleton : true,
    config :{
        activeButton : null,
        activeGrid:null,
        windowInEditMode:false,
        orderQueueId:null,
        orderQueueActiveRecord:null,
        salesOrderCount:0,
        hideSubmitToSystemButton:false,
        orderQueueStatus:null,
        allowOrderLineEdit:true,
        openRow:{},
        closeRow:{},
        fetch:new Array(),
        luv:new Array(),
        game:new Array(),
        user: {}
    },
    constructor : function(config){
        this.initConfig(config);
    }
});