import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

// lib imports
import 'tab1.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.light.copyWith(
      statusBarColor: Colors.transparent,
      systemNavigationBarColor: Colors.white,
      systemNavigationBarDividerColor: Colors.grey[700],
      systemNavigationBarIconBrightness: Brightness.dark,
    ));

    _updateNavigationBarIconBrightness(); //This method will reload navbar on app resume

    // Cards lists generator
    List<Widget> cardsTab1 = new List();
    cardsTab1.add(new CardNetflix());
    cardsTab1.add(new CardSpotify());
    cardsTab1.add(new CardAmazonPrime());
    cardsTab1.add(new CardPSN());

    cardsTab1.add(new Center(
      child: new Container(
          margin: new EdgeInsets.only(top: 36.0, bottom: 60.0),
          child: new Text(
            cardsTab1.length.toString() + " suscripciones",
            style: TextStyle(
              fontSize: 18.0,
              color: Colors.black38,
            ),
          )),
    ));

// ####################### APP LOADER ##########################
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: DefaultTabController(
        length: 3,
        child: Scaffold(
          appBar: AppBar(
            backgroundColor: Colors.white,
            toolbarOpacity: 0.5,
            brightness: Brightness.light,
            flexibleSpace: new Column(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                new TabBar(
                  labelColor: Colors.grey[800],
                  indicatorColor: Colors.grey[800],
                  tabs: [
                    Tab(icon: Icon(Icons.card_membership)),
                    Tab(icon: Icon(Icons.credit_card)),
                    Tab(icon: Icon(Icons.shopping_basket)),
                  ],
                ),
              ],
            ),
            elevation: 0.0,
          ),

// ############################### BODY ##########################################

          body: TabBarView(
            children: [
              new Container(
                  margin: const EdgeInsets.only(
                      left: 0.0, right: 0.0, bottom: 0.0),
                  child: new ListView(
                    children: cardsTab1,
                  )),
              Icon(Icons.credit_card),
              Icon(Icons.shopping_basket),
            ],
          ),

// ############################### END BODY ##########################################

          bottomNavigationBar: new BottomAppBar(
            //shape: CircularNotchedRectangle(),
            child: new Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                IconButton(
                  onPressed: () {},
                  icon: Icon(Icons.menu),
                ),
                IconButton(
                  onPressed: () {},
                  icon: Icon(Icons.more_vert),
                )
              ],
            ),
          ),

          floatingActionButton: new FloatingActionButton(
            child: new Icon(Icons.add),
            onPressed: () {},
            backgroundColor: Colors.grey[800],
          ),

          floatingActionButtonLocation:
              FloatingActionButtonLocation.centerDocked,
        ),
      ),
    );
  }
}

void _updateNavigationBarIconBrightness() async {
  SystemChannels.lifecycle.setMessageHandler((msg) {
    if (msg == AppLifecycleState.resumed.toString()) {
      SystemChrome.setSystemUIOverlayStyle(
        SystemUiOverlayStyle.light.copyWith(
          systemNavigationBarColor: Colors.white,
          systemNavigationBarIconBrightness: Brightness.dark,
          systemNavigationBarDividerColor: Colors.grey[700],
        ),
      );
    }
  });
}
