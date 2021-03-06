﻿require(["esri/Map",
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


        /* MAP IMAGE
       *************************************************************************************************************************/
    ) {
        /* MY CODE STARTS HERE
       *************************************************************************************************************************/
        var amenityTypeValue = 'BALL FIELD';

        on(query("#doBtn")[0], "click", function (e) {
            // handle event
            //grab the value of the currently selected attribute
            runAmenitiesQuery(amenityTypeValue);
        });

        on(dom.byId("attSelect"), "change", function (event) {
            amenityTypeValue = event.target.value;

        });





        /* ADD A MAP
       *************************************************************************************************************************/

        var myMap = new Map({



            basemap: "hybrid", opacity: 0.8


        });

        /* ADD A MAPVIEW
       *************************************************************************************************************************/

        var mapView = new MapView({
            map: myMap,
            center: [-111.830815, 33.274270],
            container: "viewDiv",
            zoom: 13,

        });


        /* ADD A LOCATE BUTTON TO THE MAP
       *************************************************************************************************************************/
        var locateBtn = new Locate({
            view: mapView
        });

        // Add the locate widget to the top left corner of the view
        mapView.ui.add(locateBtn, {
            position: "top-left"
        });


        /* ADD A HOME BUTTON TO THE MAP
        *************************************************************************************************************************/
        var home = new Home({
            view: mapView
        });

        // Add the home button to the top left corner of the view
        mapView.ui.add(home, "top-left");







        /* POPUPS FOR DRINKING FOUNTAINS
        *************************************************************************************************************************/
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


        /* POPUPS FOR PLAYGROUNDS
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
        /* POPUPS FOR STRUCTURES
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

        /* POPUPS FOR WALKNG TRAILS
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


        /* POPUPS FOR PARKING LOTS
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

        /* POPUPS FOR LAKES
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

        /* POPUPS FOR COURTS
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

        /* POPUPS FOR FIELDS
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

        /* POPUPS FOR MAIN PARK POLY
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


        /* GET RID OF NULL VALUES
        *************************************************************************************************************************/
        var popupPark = {
            title: "{MAPTITLE}",
            content: "{MAPTITLE:checkNull}{PARK_TYPE:checkNull}{NAME:checkNull}{BASKETBALL_COURTS:checkNull}{ADDRESS:checkNull}{ACREAGE:checkNull}{DRINKING_FOUNTAIN:checkNull}{SPRAY_PAD:checkNull}{WALKING_TRAILS:checkNull}{PLAYGROUNDS:checkNull}{BIKE_PATH:checkNull}{HORSESHOE_PIT:checkNull}{RACQUET_BALL:checkNull}{SAND_VOLLEYBALL:checkNull}{SKATE_PARK:checkNull}{TENNIS_COURT:checkNull}{BALL_FIELD:checkNull}{RC_AIRPLANE_BOX:checkNull}{SOCCER_FIELD:checkNull}{DOG_PARK:checkNull}{ARCHERY_RANGE:checkNull}{CRICKET_FIELD:checkNull}{DISC_GOLF:checkNull}{CONCESSION_STAND:checkNull}{GUARD_OFFICE:checkNull}{OBSERVATION_TOWER:checkNull}{RAMADA:checkNull}{RESTROOM:checkNull}{SHADE_STRUCTURE:checkNull}"
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


        var parkPolyCount = 0;
        /* START OF FEATURE LAYERS 
       *************************************************************************************************************************/
       

        var featureServiceURl = "https://services3.arcgis.com/0OPQIK59PJJqLK0A/ArcGIS/rest/services/COC_PARKS_PROJECT2/FeatureServer/";


        var parkPoly = new FeatureLayer({
            url: featureServiceURl + "8",
            id: "Park Poly",
            popupTemplate: popupPark


        });
        myMap.add(parkPoly);

       

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
       


        /* ADD A LEGEND TO THE MAP
        *************************************************************************************************************************/
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

        /* ADD A LAYERLIST TO THE MAP
         *************************************************************************************************************************/
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
               

            }
        });
        // Adds widget below other elements in the top left corner of the view
        mapView.ui.add(layerList, {
            position: "bottom-right"
        });




        /* ADD A SEARCH WIDGET TO THE MAP
            *************************************************************************************************************************/

        var searchWidget = new Search({
            view: mapView,
            sources: [{
                
                featureLayer: parkPoly,
                searchFields: ["MAPTITLE"],
                displayField: "MAPTITLE",
                exactMatch: false,
                outFields: ["*"],
                name: "PARKS",
                placeholder: "example: TUMBLEWEED",
                maxResults: 15,
                maxSuggestions: 20,
                suggestionsEnabled: true,
                minSuggestCharacters: 0,

            },
                {
                    featureLayer: fields,
                    searchFields: ["AMENTITY_TYPE", "PARK_NAME"],
                    suggestionTemplate: "{PARK_NAME}: {AMENTITY_TYPE}",
                    displayField: "PARK_NAME",
                    exactMatch: false,
                    outFields: ["*"],
                    name: "FiELDS",
                    placeholder: "example: BALL FIELD",
                    maxResults: 15,
                    maxSuggestions: 20,
                    suggestionsEnabled: true,
                    minSuggestCharacters: 0,
                },

                 {
                     featureLayer: courts,
                     searchFields: ["COURT_TYPE", "PARK_NAME"],
                     suggestionTemplate: "{PARK_NAME}: {COURT_TYPE}",
                     displayField: "PARK_NAME",
                     exactMatch: false,
                     outFields: ["*"],
                     name: "COURTS",
                     placeholder: "example: BASKETBALL",
                     maxResults: 15,
                     maxSuggestions: 20,
                     suggestionsEnabled: true,
                     minSuggestCharacters: 0,
                 },
                  {
                      featureLayer: playGround,
                      searchFields: ["PLAYGROUND_TYPE", "PARK_NAME"],
                      suggestionTemplate: "{PARK_NAME}: {PLAYGROUND_TYPE}",
                      displayField: "PARK_NAME",
                      exactMatch: false,
                      outFields: ["*"],
                      name: "PLAYGROUNDS",
                      placeholder: "example: SPRAYPAD",
                      maxResults: 15,
                      maxSuggestions: 20,
                      suggestionsEnabled: true,
                      minSuggestCharacters: 0,
                  },

                  {
                      featureLayer: structurePnt,
                      searchFields: ["STRUCTURE_TYPE", "PARK_NAME"],
                      suggestionTemplate: "{STRUCTURE_TYPE}: {PARK_NAME}",
                      displayField: "PARK_NAME",
                      exactMatch: false,
                      outFields: ["*"],
                      name: "STRUCTURES",
                      placeholder: "example: ramada",
                      maxResults: 15,
                      maxSuggestions: 20,
                      suggestionsEnabled: true,
                      minSuggestCharacters: 0,
                  },
                



            {



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
            
                
            }]
        });
        // Adds the search widget below other elements in
        // the top left corner of the view
        mapView.ui.add(searchWidget, {
            position: "top-left",
            index: 2
        });


        /* ADD A BASEMAP GALLERY TO THE MAP
        *************************************************************************************************************************/

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

        mapView.ui.add(bgExpand, "top-left");



        /* START OF QUERY FEATURES
        *************************************************************************************************************************/

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
        /* END OF QUERY FEATURES
        *************************************************************************************************************************/

    });


/* MY CODE ENDS HERE
        *************************************************************************************************************************/