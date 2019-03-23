import 'package:flutter/material.dart';
import 'package:gradient_widgets/gradient_widgets.dart';

// Variables para su reutilización
final double standardHeight = 178.0;
final EdgeInsets standardMargin = new EdgeInsets.only(left: 18.0, right: 18.0, top: 25.0, bottom: 5.0);
final double standardBlurRadius = 9.0;

class CardSpotify extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Container(
     height: standardHeight,
     margin: standardMargin,
     decoration: new BoxDecoration(
       gradient: new LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            // Add one stop for each color.
            // Stops should increase
            // from 0 to 1
            stops: [0.1, 0.5, 0.9],
            colors: [
              Colors.greenAccent[200],
              Colors.greenAccent[400],
              Colors.greenAccent[400],
            ],
          ),
       shape: BoxShape.rectangle,
       borderRadius: new BorderRadius.circular(16.0),
       boxShadow: <BoxShadow>[
         new BoxShadow(  
          color: Colors.greenAccent[100],
          blurRadius: standardBlurRadius,
          offset: new Offset(0.0, 8.0),
        ),
      ],
    ),
  );
  }
}

class CardNetflix extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Container(
     height: standardHeight,
     margin: standardMargin,
     decoration: new BoxDecoration(
       gradient: new LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            stops: [0.1, 0.5, 0.9],
            colors: [
              Colors.redAccent[100],
              Colors.redAccent[400],
              Colors.redAccent[400],
            ],
          ),
       shape: BoxShape.rectangle,
       borderRadius: new BorderRadius.circular(16.0),
       boxShadow: <BoxShadow>[
         new BoxShadow(  
          color: Colors.red[100],
          blurRadius: standardBlurRadius,
          offset: new Offset(0.0, 8.0),
        ),
      ],
    ),
  );
  }
}

class CardAmazonPrime extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Container(
     height: standardHeight,
     margin: standardMargin,
     decoration: new BoxDecoration(
       gradient: Gradients.tameer,
       shape: BoxShape.rectangle,
       borderRadius: new BorderRadius.circular(16.0),
       boxShadow: <BoxShadow>[
         new BoxShadow(  
          color: Colors.blueGrey[200],
          blurRadius: standardBlurRadius,
          offset: new Offset(0.0, 8.0),
        ),
      ],
    ),
  );
  }
}

class CardPSN extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Container(
     height: standardHeight,
     margin: standardMargin,
     decoration: new BoxDecoration(
       gradient: new LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            stops: [0.1, 0.5, 0.9],
            colors: [
              Colors.blueAccent[100],
              Colors.blueAccent[400],
              Colors.blueAccent[400],
            ],
          ),
       shape: BoxShape.rectangle,
       borderRadius: new BorderRadius.circular(16.0),
       boxShadow: <BoxShadow>[
         new BoxShadow(  
          color: Colors.blue[100],
          blurRadius: standardBlurRadius,
          offset: new Offset(0.0, 8.0),
        ),
      ],
    ),
  );
  }
}

class CardGradientColdlinear extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Container(
     height: standardHeight,
     margin: standardMargin,
     decoration: new BoxDecoration(
       gradient: Gradients.coldLinear,
       shape: BoxShape.rectangle,
       borderRadius: new BorderRadius.circular(16.0),
       boxShadow: <BoxShadow>[
         new BoxShadow(  
          color: Colors.black12,
          blurRadius: standardBlurRadius,
          offset: new Offset(0.0, 8.0),
        ),
      ],
    ),
  );
  }
}