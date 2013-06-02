jquery.earth-3d
===============

JQuery plugin that allows you to draw a beautiful 3d spinning earth on canvas. Take a look at the demo:
http://sdrdis.github.com/jquery.earth-3d/

Description
-----------

Based on the amazing [sphere.js](https://github.com/SamHasler/sphere) plugin of [Sam Hasler](https://twitter.com/SamHasler), jquery.earth3d.js is an open source jquery ui plugin which will allow you to emulate a 3d earth (or any planet actually) on canvas. I also added some functionalities I needed for my pet project.

Here are the main functionality provided so far:
* Change the map texture (you can change it to mars for example), along with the tiling
* Change the rotation axis (tilt, turn)
* Change the size
* Change the default rotation speed
* Smooth mouse drag: you can rotate the earth with your mouse, it will smoothly return to the normal speed
* Render locations by indicating spherical coordinates
* Draw paths between these locations
* Draw and update flights following paths
* Location and flights are clickable and entirely customizable
* It works on [mobile](http://sebastien.drouyer.com/jquery.earth-3d/mobile.html)

Licence
-------
jquery.earth3d.js is, as the [sphere.js](https://github.com/SamHasler/sphere) plugin, under [MIT licence](http://sdrdis.github.com/jquery.earth-3d/MIT-LICENSE.txt).

Authors
-------
* Sebastien Drouyer - alias [@sdrdis](https://twitter.com/sdrdis) - for this jquery ui plugin
* Sam Hasler - alias [@SamHasler](https://twitter.com/SamHasler) - for the [sphere.js plugin](https://github.com/SamHasler/sphere)

Additional Credits
------------------
* Roger Cook and Don Shanosky for the plain icon, on [thenounproject](http://thenounproject.com/noun/airplane/#icon-No75).

Known issues
------------
I didn't do pure mathematics since a long time ago, and I didn't have a huge amount of time to make this plugin, so there are some known and urgent issues to resolve for jquery.earth-3d.js to become stable.

All problems locations can be found in the file jquery.earth-3d.js when you search for "WARNING". If you have an idea, don't hesitate to do a pull request :).

The main problems are:
* I got the locations and paths to work only when the planet is not rotated. I had to create some horrible function, as _calibrated, to make this work. I tried different approaches, but failed each time (the problem might be coming from me :)).

* Paths drawing are the main optimization issue (you can easily notify it on the demo). For the moment it is drawn on canvas, but I wonder if we could gain some CPU by instead using SVG or the DOM.

Areas for improvement
---------------------
Of course, if anybody has a suggestion, don't hesitate to use github issues :).

Here are some possible improvements:

* Defining a starting position
* Make it possible to rotate around the globe as if we are in orbit
* For the moment, glows and shadows are designed on photoshop. I will soon post a tutorial on how to do it, but what could be awesome is to generate it on canvas, and defining light angle and intensity...
* Zoom support
* The code can always be cleaner, more optimized...

Documentation
-------------

### Options:
* texture: texture map used by the planet

* sphere: rotation and size of the planet

* defaultSpeed: default spinning speed of the planet

* backToDefaultTime: time (in ms) to return by to default speed when planet is dragged

* locations: locations to display on the planet:
  * Each position must have a key, an alpha and delta position (or x and y if you want to display a static location).
    Any additional key can be reached via callbacks functions
    Example:
`
{
  obj1: {
    alpha: Math.PI / 4,
    delta: 0,
    name: 'location 1'
  }
}
`

* paths: paths and flights to display over the planet:
   Each path must have a key, an origin and a destination. The values are the location's key.
   You can, if you want to, define flights on these paths.
   Each flight has a key, a destination (the location's key) and a position.
   The position is the progress a fleet has made on its path.
   Any additional key can be reach via callbacks functions.
   Example:
`
{
  path: {
    origin: 'obj1',
    destination: 'obj2',
    flights: {
      flight: {
        position: 0.25,
        destination: 'obj2',
        name: 'Flight 1'
      },
      flight2: {
        position: 0.25,
        destination: 'obj1',
        name: 'Flight 2'
      }
    }
  }
}
`

* flightsCanvas: Dom element which is a canvas and where the flights and paths are drawn

* dragElement: Dom element where we catch the mouse drag

* locationsElement: Dom elements where the locations are drawn

* flightsCanvasPosition: position of the flight canvas (can be use if you have some gap between your planet and your flights

* pixelRadiusMultiplier: (TEMPORARY) used by the getSphereRadiusInPixel (see the functions)

* onInitLocation: callback function which allows you to define what to do when the locations are initialized
  * Parameters:
    * location: location (coming from locations option)
    * widget: earth3d widget object

* onShowLocation: callback function which allows you to define what to do when a location becomes visible (was behind the planet and is now in front of it)
  * Parameters:
    * location: location (coming from locations option)
    * x: 2d left position
    * y: 2d top position
    * widget: earth3d widget object

* onRefreshLocation: callback function which allows you to define what to do when a location is refreshed (it moves)
  * Parameters:
    * location: location (coming from locations option)
    * x: 2d left position
    * y: 2d top position
    * widget: earth3d widget object

* onHideLocation: callback function which allows you to define what to do when a location becomes invisible (was in front of the planet and is now behind it)
  * Parameters:
    * location: location (coming from locations option)
    * x: 2d left position
    * y: 2d top position
    * widget: earth3d widget object

* onInitFlight: callback function which allows you to define what to do when the flights are initialized
  * Parameters:
    * flight: flight (coming from flights option)
    * widget: earth3d widget object

* onShowFlight: callback function which allows you to define what to do when a flight becomes visible (was behind the planet and is now in front of it)
  * Parameters:
    * flight: flight (coming from flights option)
    * widget: earth3d widget object

* onRefreshFlight: callback function which allows you to define what to do when a flight is refreshed (it moves)
  * Parameters:
    * flight: flight (coming from flights option)
    * x: 2d left position
    * y: 2d top position
    * widget: earth3d widget object

* onHideFlight: callback function which allows you to define what to do when a flight becomes invisible (was in front of the planet and is now behind it)
  * Parameters:
    * flight: flight (coming from flights option)
    * widget: earth3d widget object






### Functions

  * getSphereRadiusInPixel: function which allows you to get the sphere radius in pixel
    /!| WARNING: this function needs to be refactored, since I didn't find out (my maths courses are far away) how to
    get the exact value. I did a basic linear regression, but it is not exact, and you will have to change the pixelRadiusMultiplier
    option to get the correct value

  * destroy: use this function when you want to destroy the object. It will throw a cancel animation frame, so the
    CPU won't be used anymore.

  * changePaths: use this function when you want to update paths and flights (options on widget)
    it will add the callback functions support