Ext.define('AOC.store.Sections', {
    extend : 'Ext.data.ArrayStore',
    requires:['AOC.model.Section'],
    model  : 'AOC.model.Section',
    data   : [
              ['home.png', 'HOME', 'homewrapper',true,0],
              ['calendar.png', 'TASK MANAGER', 'taskmanager', false, 0, 'taskManagergrid'],
              ['mail.png', 'EMAIL QUEUE', 'emailmanagement', false, 0, 'emailmanagementgrid'],
              ['orders.png', 'ORDER QUEUE', 'orderqueueview', false, 0, 'orderqueuegrid'],
              ['webform.png', 'WEB ORDER', 'weborderview', false, 0, 'weborderview'],
              ['partners.png', 'PARTNERS', 'partnermanagement', false, 0, 'partnermanagementgrid'],	
              ['contacts.png', 'ADDRESS', 'addressmanage', false, 0, 'addressmanagegrid']
              //['archives.png','ARCHIVE','archivemanage',false,0]
    ]
});