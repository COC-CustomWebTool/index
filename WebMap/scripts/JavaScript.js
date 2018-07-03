require(["esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/widgets/Search",
    "esri/tasks/Locator",
    "esri/PopupTemplate",
    "esri/layers/GroupLayer",
    "esri/layers/MapImageLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/widgets/BasemapToggle",



    //    "esri/layers/support/MapImage",

    "dojo/domReady!"], function (
        Map,
        MapView,
        FeatureLayer,
        Legend,
        LayerList,
        Search, Locator, PopupTemplate,
        GroupLayer,
        MapImageLayer, SimpleMarkerSymbol,
        BasemapToggle


        //        MapImage
    ) {
        //my code starts here











        var myMap = new Map({



            basemap: "hybrid", opacity: 0.8


        });



        var mapView = new MapView({
            map: myMap,
            center: [-111.830815, 33.274270],
            container: "viewDiv",
            zoom: 18,

        });













        // POP UPS
        var popupFountain = {
            title: "Number: {NUMBER_OF_FAUCETS}"
        };
        var popupPlayground = {
            title: "Name  : {PLAYGROUND_NAME}"
        };
        var popupStructure = {
            title: "Structure   : {STRUCTURE_NAME}",
            content: "Number of Stories: {STRUCTURE_TYPE}"
        };

        var popupWalking = {
            title: "Walking Path Notes:{NOTES}"
        };


        var popupParking = {
            title: "Table Material Type: {PARKINGLOT_NAME}"
        };

        var popuplakes = {
            title: "Misc Type: {NOTES}"
        };

        var popupCourts = {
            title: "Blue Emergency Lights"
        };

        var popupFields = {
            title: "ball field "
        };




        // END of Pop UPS


        // Start of Feature layers
        //********************
        var drinkingFountain = new FeatureLayer({
            url: "https://services3.arcgis.com/0OPQIK59PJJqLK0A/arcgis/rest/services/COLLECTOR_CODING/FeatureServer/0",
            popupTemplate: popupFountain
        });
        myMap.add(drinkingFountain);
        //********************
        var playGround = new FeatureLayer({
            url: "https://services3.arcgis.com/0OPQIK59PJJqLK0A/arcgis/rest/services/COLLECTOR_CODING/FeatureServer/1",
            popupTemplate: popupPlayground
        });
        myMap.add(playGround);

        var structurePnt = new FeatureLayer({
            url: "https://services3.arcgis.com/0OPQIK59PJJqLK0A/arcgis/rest/services/COLLECTOR_CODING/FeatureServer/2",
            popupTemplate: popupStructure
        });
        myMap.add(structurePnt);

        var walkingPath = new FeatureLayer({
            url: "https://services3.arcgis.com/0OPQIK59PJJqLK0A/arcgis/rest/services/COLLECTOR_CODING/FeatureServer/3",
            popupTemplate: popupWalking
        });
        myMap.add(walkingPath);

        var parkingPoly = new FeatureLayer({
            url: "https://services3.arcgis.com/0OPQIK59PJJqLK0A/arcgis/rest/services/COLLECTOR_CODING/FeatureServer/4",
            popupTemplate: popupParking
        });
        myMap.add(parkingPoly);

        var lakes = new FeatureLayer({
            url: "https://services3.arcgis.com/0OPQIK59PJJqLK0A/arcgis/rest/services/COLLECTOR_CODING/FeatureServer/5",
            popupTemplate: popuplakes
        });
        myMap.add(lakes);

        var courts = new FeatureLayer({
            url: "https://services3.arcgis.com/0OPQIK59PJJqLK0A/arcgis/rest/services/COLLECTOR_CODING/FeatureServer/6",
            popupTemplate: popupCourts
        });
        myMap.add(courts);

        var fields = new FeatureLayer({
            url: "https://services3.arcgis.com/0OPQIK59PJJqLK0A/arcgis/rest/services/COLLECTOR_CODING/FeatureServer/7",
            popupTemplate: popupFields
        });
        myMap.add(fields);

        var parkPoly = new FeatureLayer({
            url: "https://services3.arcgis.com/0OPQIK59PJJqLK0A/arcgis/rest/services/COLLECTOR_CODING/FeatureServer/8"
        });
        myMap.add(parkPoly);





        //legend


        var legend = new Legend({
            view: mapView,
            layerInfos: [
                { layer: drinkingFountain, title: 'Drinking Fountians' },
                { layer: playGround, title: 'Play Grounds' },
                { layer: structurePnt, title: 'Structures' },
                { layer: walkingPath, title: 'Walking Path' },
                { layer: lakes, title: 'Lakes' },
                { layer: parkingPoly, title: 'Parking Area' },
                { layer: courts, title: 'Courts' },
                { layer: fields, title: 'Fields' },
                { layer: parkPoly, title: 'Parks' }]
        });
        mapView.ui.add(legend, "bottom-left");

        //Layer List Widget
        var layerList = new LayerList({
            view: mapView,
            listMode: "hide-children"
        });
        // Adds widget below other elements in the top left corner of the view
        mapView.ui.add(layerList, {
            position: "bottom-right"
        });




        //Search Widget

        var searchWidget = new Search({
            view: mapView,
            sources: [{
                locator: new Locator({ url: "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" }),
                singleLineFieldName: "SingleLine",
                name: "Custom Geocoding Service",
                localSearchOptions: {
                    minScale: 300000,
                    distance: 50000
                },
                placeholder: "Search Geocoder",
                maxResults: 15,
                maxSuggestions: 20,
                suggestionsEnabled: false,
                minSuggestCharacters: 0
            }, {
                featureLayer: parkPoly,
                searchFields: ["MAPTITLE"],
                displayField: "MAPTITLE",
                exactMatch: false,
                outFields: ["*"],
                name: "My Custom Search",
                placeholder: "example: TUMBLEWEED",
                maxResults: 15,
                maxSuggestions: 20,
                suggestionsEnabled: true,
                minSuggestCharacters: 0,
                //          zoomScale:0.5
                //  Our zoome scale did not work as we liked it too
            }]
        });
        // Adds the search widget below other elements in
        // the top left corner of the view
        mapView.ui.add(searchWidget, {
            position: "top-left",
            index: 2
        });







        //my code ends here
    });