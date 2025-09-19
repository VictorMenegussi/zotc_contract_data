sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'contdataparam/test/integration/FirstJourney',
		'contdataparam/test/integration/pages/ContractDataParametersList',
		'contdataparam/test/integration/pages/ContractDataParametersObjectPage'
    ],
    function(JourneyRunner, opaJourney, ContractDataParametersList, ContractDataParametersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('contdataparam') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheContractDataParametersList: ContractDataParametersList,
					onTheContractDataParametersObjectPage: ContractDataParametersObjectPage
                }
            },
            opaJourney.run
        );
    }
);