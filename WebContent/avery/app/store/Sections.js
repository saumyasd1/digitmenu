Ext.define('AOC.store.Sections', {
    extend: 'Ext.data.ArrayStore',
    requires:['AOC.model.Section'],
    model: 'AOC.model.Section',
    data: [
//              ['home.png', 'HOME', 'homewrapper',true,0],
//              ['calendar.png', 'TASK MANAGER', 'taskmanager', false, 0, 'taskManagergrid'],
//              ['mail.png', 'EMAIL QUEUE', 'emailmanagement', false, 0, 'emailmanagementgrid'],
//              ['orders.png', 'ORDER QUEUE', 'orderqueueview', false, 0, 'orderqueuegrid'],
//              ['webform.png', 'WEB ORDER', 'weborderview', false, 0, 'weborderview'],
//              ['partners.png', 'PARTNERS', 'partnermanagement', false, 0, 'partnermanagementgrid'],	
//              ['contacts.png', 'ADDRESS', 'addressmanage', false, 0, 'addressmanagegrid']
              //['archives.png','ARCHIVE','archivemanage',false,0]
		['fa fa-home', 'HOME', 'homewrapper',true,0],
		['fa fa-tasks', 'TASK MANAGER', 'taskmanager', false, 0, 'taskmanagergrid'],
        ['fa fa-envelope', 'EMAIL QUEUE', 'emailmanagement', false, 0, 'emailmanagementgrid'],
        ['fa fa-calendar-o', 'ORDER QUEUE', 'orderqueueview', false, 0, 'orderqueuegrid'],
        ['fa fa-globe', 'WEB ORDER', 'weborderview', false, 0, 'weborderview'],
        ['fa fa-users', 'PARTNERS', 'partnermanagement', false, 0, 'partnermanagementgrid'],	
        ['fa fa-address-card', 'ADDRESS', 'addressmanage', false, 0, 'addressmanagegrid'],
    //    ['fa fa-calendar', 'WORK INSTRUCTION', 'wicontainer', false, 0, 'wigrid']
    ]
});