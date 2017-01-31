/* THIS FILE IS AUTO GENERATED - DO NOT EDIT */

var cldrData = {
  "supplemental": {
    "version": {
      "_number": "$Revision: 12447 $",
      "_unicodeVersion": "8.0.0",
      "_cldrVersion": "29"
    },
    "likelySubtags": {
      "fr": "fr-Latn-FR"
    }
  }
}



var messageData = {
  "fr": {
    "Terra": {
      "ajax": {
        "error": "Échec du chargement du contenu."
      },
      "areYouSure": {
        "unsaved": "Certaines modifications n'ont pas été enregistrées."
      },
      "forms": {
        "validation": {
          "date"      : "Saisissez une date valide au format « jj\/mm\/aaaa ».",
          "digits"    : "Saisissez uniquement des chiffres.",
          "email"     : "Saisissez une adresse e-mail valide.",
          "equalTo"   : "Saisissez à nouveau la même valeur.",
          "max"       : "Saisissez une valeur inférieure ou égale à {0}.",
          "maxlength" : "Saisissez moins de {0} caractères.",
          "min"       : "Saisissez une valeur supérieure ou égale à {0}.",
          "minlength" : "Saisissez au moins {0} caractères.",
          "number"    : "Saisissez un numéro valide.",
          "range"     : "Saisissez une valeur comprise entre {0} et {1}.",
          "remote"    : "Corrigez ce champ.",
          "required"  : "Ce champ est obligatoire.",
          "url"       : "Saisissez une URL valide."
        }
      },
      "truncateText": {
        "showMore"       : "Afficher plus d'informations",
        "showLess"       : "Afficher moins d'informations",
        "text_remaining" : "{0} caractère(s) restant(s)"
      }
    }
  }
}

// Load the CLDR data
Globalize.load(cldrData);

// Load i18n related contents
Globalize.loadMessages(messageData);

// Set the default locale
Globalize.locale('fr');
