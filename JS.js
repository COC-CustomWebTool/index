require(["esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapGallery",
    "esri/layers/FeatureLayer",
     "esri/Graphic",
      "esri/layers/GraphicsLayer",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/widgets/Search",
    "esri/tasks/Locator",
    "esri/PopupTemplate",
    "esri/layers/GroupLayer",
    "esri/layers/MapImageLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/widgets/BasemapToggle",
    "esri/tasks/QueryTask",
    "esri/tasks/support/Query",
     "esri/widgets/Locate",
      "esri/widgets/Home",
     "esri/widgets/Expand",
    "dojo/dom",
    "dojo/on",
    "dojo/query",


    //    "esri/layers/support/MapImage",

    "dojo/domReady!"], function (
        Map,
        MapView,
         BasemapGallery,
        FeatureLayer,
        Graphic,
        GraphicsLayer,
        Legend,
        LayerList,
        Search, Locator, PopupTemplate,
        GroupLayer,
        MapImageLayer, SimpleMarkerSymbol,
        BasemapToggle,
        QueryTask,
        Query,
         Locate,
         Home,
         Expand,
        dom,
        on,
        query


        //        MapImage
    ) {
        //my code starts here
        var amenityTypeValue = 'BALL FIELD';

        on(query("#doBtn")[0], "click", function (e) {
            // handle event
            //grab the value of the currently selected attribute
            runAmenitiesQuery(amenityTypeValue);
        });
//*********************************************************************//
        var amenityTypeValue = 'BASKETBALL COURT';

        on(query("#doBtn")[0], "click", function (e) {
            // handle event
            //grab the value of the currently selected attribute
            runCourtTypeQuery(amenityTypeValue);
        });
//*********************************************************************//
        on(dom.byId("attSelect"), "change", function (event) {
           amenityTypeValue =  event.target.value;

        });


        




        var myMap = new Map({



            basemap: "hybrid", opacity: 0.8


        });



        var mapView = new MapView({
            map: myMap,
            center: [-111.830815, 33.274270],
            container: "viewDiv",
            zoom: 13,

        });

        var locateBtn = new Locate({
            view: mapView
        });

        // Add the locate widget to the top left corner of the view
        mapView.ui.add(locateBtn, {
            position: "top-left"
        });


        //Add a home button
        var home = new Home({
            view: mapView
        });

        // Add the home button to the top left corner of the view
        mapView.ui.add(home, "top-left");







        // POP UPS
        var popupFountain = {
            title: "{FOUNTAIN_DESC}",
            content: [{

                type: "fields",
                fieldInfos: [{
                    fieldName: "PARK_NAME",
                    label: "Park Name",
                    visible: true
                }, {
                    fieldName: "NUMBER_OF_FAUCETS",
                    label: "Number of faucets",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "DOG_FAUCETS",
                    label: "Dog faucets",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }]
            }]
        };


        /* Add popups For playgrounds
              *************************************************************************************************************************/


        var popupPlayground = {
            title: "PLAYGROUND AT: {PARK_NAME}",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "PLAYGROUND_NAME",
                    label: "Playground name",
                    visible: true
                }, {
                    fieldName: "PLAYGROUND_DESC",
                    label: "Playground Description",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "PLAYGROUND_TYPE",
                    label: "Playground type",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }

                }]
            }]
        };
        /* Add popups for structures
        *************************************************************************************************************************/

        var popupStructure = {
            title: "{STRUCTURE_TYPE}",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "STRUCTURE_DESC",
                    label: "Structure Description",
                    visible: true
                }, {
                    fieldName: "STRUCTURE_TYPE",
                    label: "Structure type",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "STRUCTURE_NAME",
                    label: "Structure name",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                },
//
                    {
                    fieldName: "STRUCTURE_TYPE",
                    label: "Structure type",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                

                }]
            }]
        };

        /* Add popups for walking trails
        *************************************************************************************************************************/

        var popupWalking = {
            title: "WALKING PATH",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "DISTANCE",
                    label: "Length",
                    visible: true


                }]
            }]
        };


        /* Add popups for parking lots
        *************************************************************************************************************************/

        var popupParking = {
            title: "PARKING LOT",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "PARK_NAME",
                    label: "Park name",
                    visible: true,
                }, {
                    fieldName: "Shape__Area",
                    label: "Area(Ft)",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }


                }]
            }]
        };

        /* Add popups for lakes
        *************************************************************************************************************************/

        var popuplakes = {
            title: "Amenitiy description: {AMENTITY_DESC}",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "AMENTITY_TYPE",
                    label: "Amentity Type",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }



                }]
            }]
        };

        /* Add popups for courts
        *************************************************************************************************************************/

        var popupCourts = {
            title: "COURTS",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "PARK_NAME",
                    label: "Park name",
                    visible: true
                },
                {
                    fieldName: "COURT_TYPE",
                    label: "Court type",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }

                }]
            }]
        };

        /* Add popups for fields
        *************************************************************************************************************************/

        var popupFields = {
            title: "FIELDS",
            content: [{
                type: "fields",
                fieldInfos: [{
                    fieldName: "PARK_NAME",
                    label: "Park name",
                    visible: true
                },
                {
                    fieldName: "AMENTITY_TYPE",
                    label: "field type",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }

                }]
            }]
        };

        /* Add popups for main park poly
        *************************************************************************************************************************/
        
        var popupPark = {
            title: "{MAPTITLE}",
            content: [{


                type: "fields",
                fieldInfos: [{
                    fieldName: "PARK_TYPE",
                    label: "Park Type",
                    visible: true
                }, {
                    fieldName: "ADDRESS",
                    label: "Address",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "ACREAGE",
                    label: "Acres ",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "DRINKING_FOUNTAIN",
                    label: "Drinking fountains",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "SPRAY_PAD ",
                    label: "Spray pads",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                }, {
                    fieldName: "WALKING_TRAILS ",
                    label: "Walking trials",
                    visible: true,
                    format: {
                        digitSeparator: true,
                        places: 0
                    }
                },
                   {
                       fieldName: "PLAYGROUNDS",
                       label: "Playgrounds",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0

                       }
                   },                 
                   {
                       fieldName: "BASKETBALL_COURTS",
                       label: "Basketball courts",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0

                       }
                   },                  
                   {
                       fieldName: "BIKE_PATH",
                       label: "Bike park",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0

                       }
                   },
                   {
                       fieldName: "HORSESHOE_PIT",
                       label: "Horse shoe pit",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   },
                   {
                       fieldName: "RACQUET_BALL",
                       label: "Racquet ball",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   },
                   {
                       fieldName: "SAND_VOLLEYBALL",
                       label: "Sand volleyball court",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   },
                   {
                       fieldName: "SKATE_PARK",
                       label: "Skate park",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0
                       }
                   },
                   {
                       fieldName: "TENNIS_COURT",
                       label: "Tennis court",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   },
                   {
                       fieldName: "BALL_FIELD",
                       label: "Ball field",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   },
                   {
                       fieldName: "RC_AIRPLANE_BOX",
                       label: "RC airplane box",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   },
                   {
                       fieldName: "SOCCER_FIELD",
                       label: "Soccer field",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   },
                   {
                       fieldName: "DOG_PARK",
                       label: "Dog park",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   },
                   {
                       fieldName: "ARCHERY_RANGE",
                       label: "Archery range",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   },
                   {
                       fieldName: "CRICKET_FIELD",
                       label: "Criket field",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   },
                   {
                       fieldName: "DISC_GOLF",
                       label: "Disc golf",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   },
                   {
                       fieldName: "CONCESSION_STAND",
                       label: "Concession stand",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   },
                   {
                       fieldName: "OBSERVATION_TOWER",
                       label: "Observation tower",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   },
                   {
                       fieldName: "RAMADA",
                       label: "Ramada",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   },
                   {
                       fieldName: "RESTROOM",
                       label: "Restroom",
                       visible: true,
                       format: {
                           digitSeparator: true,
                           places: 0


                       }
                   }]
            }]


        };

        var popupPark = {
            title: "{MAPTITLE}",
            content: "{MAPTITLE:checkNull}{PARK_TYPE:checkNull}{NAME:checkNull}{BASKETBALL_COURTS:checkNull}"
        };

        checkNull = function (value, key, data) {
            var tempStr = '';
            if (value !== null) {
                tempStr = "<p>" + key + " : " + value + "</p>"
            }
           
           
            return tempStr;

        }


        /* END of POPUPS FOR FEATURE LAYERS
        *************************************************************************************************************************/

        // END of Pop UPS

        var parkPolyCount = 0;

        // Start of Feature layers
        //********************

        var featureServiceURl = "https://services3.arcgis.com/0OPQIK59PJJqLK0A/ArcGIS/rest/services/COC_PARKS_PROJECT2/FeatureServer/";


        var parkPoly = new FeatureLayer({
            url: featureServiceURl + "8",
//            id: "Park Poly",
            popupTemplate: popupPark
           

        });
        myMap.add(parkPoly);

/*       mapView.whenLayerView(parkPoly).then(function (layerView) {
            layerView.watch("updating", function (val) {
                if (!val) {  // wait for the layer view to finish updating
                    layerView.queryFeatures().then(function (results) {

                        parkPolyCount = results.length;
                        dom.byId("parkPolyCount").innerHTML = " Total Park Polys : " + parkPolyCount;

                    });
                }
            });
        });
*/

        var fields = new FeatureLayer({
            url: featureServiceURl + "7",
            id: "Fields",
            popupTemplate: popupFields
        });
        myMap.add(fields);


        var courts = new FeatureLayer({
            url: featureServiceURl + "6",
            popupTemplate: popupCourts
        });
        myMap.add(courts);

        var lakes = new FeatureLayer({
            url: featureServiceURl + "5",
            popupTemplate: popuplakes
        });
        myMap.add(lakes);

        var parkingPoly = new FeatureLayer({
            url: featureServiceURl + "4",
            popupTemplate: popupParking
        });
        myMap.add(parkingPoly);

        var walkingPath = new FeatureLayer({
            url: featureServiceURl + "3",
            popupTemplate: popupWalking
        });
        myMap.add(walkingPath);

        var structurePnt = new FeatureLayer({
            url: featureServiceURl + "2",
            popupTemplate: popupStructure
        });
        myMap.add(structurePnt);

        var playGround = new FeatureLayer({
            url: featureServiceURl + "1",
            popupTemplate: popupPlayground
        });
        myMap.add(playGround);

        var drinkingFountain = new FeatureLayer({
            url: featureServiceURl + "0",
            popupTemplate: popupFountain
        });
        myMap.add(drinkingFountain);
        //********************



        //Query Task Trial  ******************************************************************************************************************************

        /*


        var query = new Query({
            parkPoly});
        query.returnGeometry = true;
        query.outFields = ["*"];

        query.where = "BALL_FIELD &gt; 1";  // Ball fields greater than 1
        queryTask.execute(query).then(function(results){
            console.log(results.features);
        });

        // When resolved, returns a count of the features that satisfy the query.
        queryTask.executeForCount(query).then(function(results){
            console.log(results);
        });






        // Call doQuery() each time the button is clicked
        view.when(function() {
            view.ui.add("optionsDiv", "bottom-right");
            on(dom.byId("doBtn"), "click", doQuery);
        });

        var attributeName = dom.byId("attSelect");
        var expressionSign = dom.byId("signSelect");
        var value = dom.byId("valSelect");

        // Executes each time the button is clicked
        function doQuery() {
            // Clear the results from a previous query
            resultsLayer.removeAll();
            /*********************************************
             *
             * Set the where clause for the query. This can be any valid SQL expression.
             * In this case the inputs from the three drop down menus are used to build
             * the query. For example, if "Elevation", "is greater than", and "10,000 ft"
             * are selected, then the following SQL where clause is built here:
             *
             * params.where = "ELEV_ft > 10000";
             *
             * ELEV_ft is the field name for Elevation and is assigned to the value of the
             * select option in the HTML below. Other operators such as AND, OR, LIKE, etc
             * may also be used here.
             *
             **********************************************/
        /*          params.where = attributeName.value + expressionSign.value + value.value;
      
                  // executes the query and calls getResults() once the promise is resolved
                  // promiseRejected() is called if the promise is rejected
                  query.execute(params)
                    .then(getResults)
                    .catch(promiseRejected);
              }
      
              // Called each time the promise is resolved
              function getResults(response) {
      
                  // Loop through each of the results and assign a symbol and PopupTemplate
                  // to each so they may be visualized on the map
                  var parkResults = arrayUtils.map(response.features, function(
                    feature) {
      
                      // Sets the symbol of each resulting feature to a cone with a
                      // fixed color and width. The height is based on the mountain's elevation
                      feature.symbol = {
                          type: "point-3d", // autocasts as new PointSymbol3D()
                          symbolLayers: [{
                              type: "object", // autocasts as new ObjectSymbol3DLayer()
                              material: {
                                  color: "green"
                              },
                              resource: {
                                  primitive: "cone"
                              },
                              width: 100000,
                              height: feature.attributes.ELEV_m * 100
                          }]
                      };
      
                      feature.popupTemplate = popupTemplate;
                    return feature;
                  });
      
                  resultsLayer.addMany(parkResults);
      
                  // animate to the results after they are added to the map
                  view.goTo(parkResults).then(function() {
                      view.popup.open({
                          features: parkResults,
                          featureMenuOpen: true,
                          updateLocationEnabled: true
                      });
                  });
      
                  // print the number of results returned to the user
                  dom.byId("printResults").innerHTML = parkResults.length +
                    " results found!";
              }
      
              // Called each time the promise is rejected
              function promiseRejected(error) {
                  console.error("Promise rejected: ", error.message);
              }
      
             */
        //*********************************************************************** Query task Trials








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
            //listMode: "hide-children",
            listItemCreatedFunction: function (event) {
                var item = event.item;

                var prefix = "COC_PARKS_PROJECT2 -";
                var tempStr = item.title;
                var finalTitle = tempStr.substring(20, item.title.length);
                if (finalTitle === '') {
                    item.title = 'PARKS';
                }
                else {
                    item.title = finalTitle;
                }
                
                console.log(item.title);
                /*
                if (item.title === " NEW CS PARK POLY") {
                    item.title = "NEW CS PARK POLY";
                }
                */

            }
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


        // Create a BasemapGallery widget instance and set
        // its container to a div element

        var basemapGallery = new BasemapGallery({
            view: mapView,
            container: document.createElement("div")
        });

        // Create an Expand instance and set the content
        // property to the DOM node of the basemap gallery widget
        // Use an Esri icon font to represent the content inside
        // of the Expand widget

        var bgExpand = new Expand({
            view: mapView,
            content: basemapGallery
        });

        // Add the expand instance to the ui

        mapView.ui.add(bgExpand, "top-right");



        //my code ends here


        function runAmenitiesQuery(infieldValue) {

            var fieldNmae = 'AMENTITY_TYPE';
            var fieldValue = infieldValue;
            var whereClause = fieldNmae + "='" + infieldValue + "'";

            var parkList = [];

            var query = fields.createQuery();
            query.where = whereClause;
            query.returnGeometry = false;
            query.returnDistinctValues = true;
            query.outFields = ["PARK_NAME"];

            fields.queryFeatures(query)
              .then(function (response) {
                  parkList = response.features.map(function (feature) {
                      return "'" + feature.attributes.PARK_NAME + "'";
                  });
                  runParksQueries(parkList);
                  //mapView.graphics.removeAll();

                 
              });
        }


        function runCourtTypeQuery(infieldValue) {

            var fieldNmae = 'COURT_TYPE';
            var fieldValue = infieldValue;
            var whereClause = fieldNmae + "='" + infieldValue + "'";

            var parkList = [];

            var query = courts.createQuery();
            query.where = whereClause;
            query.returnGeometry = false;
            query.returnDistinctValues = true;
            query.outFields = ["PARK_NAME"];

            courts.queryFeatures(query)
              .then(function (response) {
                  parkList = response.features.map(function (feature) {
                      return "'" + feature.attributes.PARK_NAME + "'";
                  });
                  runParksQueries(parkList);
                  //mapView.graphics.removeAll();


              });
        }


        function runParksQueries(inParkList) {
            console.log(inParkList);

            var parkQuery = parkPoly.createQuery();
            parkQuery.where = "NAME IN (" + inParkList.toString() + ")";
            parkQuery.outFields = ["*"];
            parkQuery.outSpatialReference = mapView.spatialReference;
            parkPoly.queryFeatures(parkQuery)
              .then(function (response) {
                  console.log(response);
                  mapView.graphics.removeAll();

                  for (feature in response.features) {
                      var bufferGraphic = new Graphic({
                          geometry: response.features[feature].geometry,
                          symbol: {
                              type: "simple-fill", // autocasts as new SimpleFillSymbol()
                              outline: {
                                  width: 5,
                                  color: [255, 128, 0, 1]
                              },
                              style: "none"
                          }
                      });
                      console.log(bufferGraphic.geometry);
                      mapView.graphics.add(bufferGraphic);
                  }
                 

              });

        }


    });


