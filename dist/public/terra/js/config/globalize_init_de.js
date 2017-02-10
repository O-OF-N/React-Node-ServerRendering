/* THIS FILE IS AUTO GENERATED - DO NOT EDIT */

var cldrData = {
  "supplemental": {
    "version": {
      "_number": "$Revision: 12447 $",
      "_unicodeVersion": "8.0.0",
      "_cldrVersion": "29"
    },
    "likelySubtags": {
      "de": "de-Latn-DE"
    }
  }
}




var messageData = {
  "de": {
    "Terra": {
      "ajax": {
        "error": "Inhalt konnte nicht geladen werden."
      },
      "areYouSure": {
        "unsaved": "Es liegen nicht gespeicherte Änderungen vor."
      },
      "forms": {
        "validation": {
          "date"      : "Geben Sie ein gültiges Datum im Format 'MM.TT.JJJJ' ein.",
          "digits"    : "Geben Sie nur Zahlen ein.",
          "email"     : "Geben Sie eine gültige E-Mail-Adresse ein.",
          "equalTo"   : "Geben Sie denselben Wert erneut ein.",
          "max"       : "Geben Sie einen Wert kleiner als bzw. gleich {0} ein.",
          "maxlength" : "Geben Sie weniger als {0} Zeichen ein.",
          "min"       : "Geben Sie einen Wert größer als bzw. gleich {0} ein.",
          "minlength" : "Geben Sie mindestens {0} Zeichen ein.",
          "number"    : "Geben Sie eine gültige Zahl ein.",
          "range"     : "Geben Sie einen Wert zwischen {0} und {1} ein.",
          "remote"    : "Dieses Feld bearbeiten.",
          "required"  : "Dieses Feld ist ein Pflichtfeld.",
          "url"       : "Geben Sie eine gültige URL ein."
        }
      },
      "truncateText": {
        "showMore"       : "Weitere anzeigen",
        "showLess"       : "Weniger anzeigen",
        "text_remaining" : "{0} verbleibend"
      }
    }
  }
}

// Load the CLDR data
Globalize.load(cldrData);

// Load i18n related contents
Globalize.loadMessages(messageData);

// Set the default locale
Globalize.locale('de');
