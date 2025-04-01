sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'getcontractatm/test/integration/FirstJourney',
		'getcontractatm/test/integration/pages/OrderItemDetailsList',
		'getcontractatm/test/integration/pages/OrderItemDetailsObjectPage'
    ],
    function(JourneyRunner, opaJourney, OrderItemDetailsList, OrderItemDetailsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('getcontractatm') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheOrderItemDetailsList: OrderItemDetailsList,
					onTheOrderItemDetailsObjectPage: OrderItemDetailsObjectPage
                }
            },
            opaJourney.run
        );
    }
);