/* THIS FILE IS AUTO GENERATED - DO NOT EDIT */

var cldrData = {
  "supplemental": {
    "version": {
      "_number": "$Revision: 12447 $",
      "_unicodeVersion": "8.0.0",
      "_cldrVersion": "29"
    },
    "likelySubtags": {
      "es": "es-Latn-ES"
    }
  }
}



var messageData = {
  "es": {
    "Terra": {
      "ajax": {
        "error": "Error al cargar el contenido."
      },
      "areYouSure": {
        "unsaved": "Hay cambios sin guardar."
      },
      "forms": {
        "validation": {
          "date"      : "Escriba una fecha válida en formato dd\/mm\/aaaa.",
          "digits"    : "Escriba solo dígitos.",
          "email"     : "Escriba una dirección de correo electrónico válida.",
          "equalTo"   : "Escriba el mismo valor de nuevo.",
          "max"       : "Escriba un número menor que o igual a {0}.",
          "maxlength" : "Escriba menos de {0} caracteres.",
          "min"       : "Escriba un número mayor que o igual a {0}.",
          "minlength" : "Escriba al menos {0} caracteres.",
          "number"    : "Escriba un número válido.",
          "range"     : "Escriba un valor entre {0} y {1}.",
          "remote"    : "Arregle este campo.",
          "required"  : "Este campo es obligatorio.",
          "url"       : "Escriba un URL válido."
        }
      },
      "truncateText": {
        "showMore"       : "Mostrar más",
        "showLess"       : "Mostrar menos",
        "text_remaining" : "{0} restantes"
      }
    }
  }
}

// Load the CLDR data
Globalize.load(cldrData);

// Load i18n related contents
Globalize.loadMessages(messageData);

// Set the default locale
Globalize.locale('es');
