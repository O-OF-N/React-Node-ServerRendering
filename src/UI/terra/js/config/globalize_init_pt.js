/* THIS FILE IS AUTO GENERATED - DO NOT EDIT */

var cldrData = {
  "supplemental": {
    "version": {
      "_number": "$Revision: 12447 $",
      "_unicodeVersion": "8.0.0",
      "_cldrVersion": "29"
    },
    "likelySubtags": {
      "pt": "pt-Latn-BR"
    }
  }
}



var messageData = {
  "pt": {
    "Terra": {
      "ajax": {
        "error": "Falha ao carregar conteúdo."
      },
      "areYouSure": {
        "unsaved": "Existem alterações sem salvar."
      },
      "forms": {
        "validation": {
          "date"      : "Insira uma data válida no formato \"dd\/mm\/aaaa\".",
          "digits"    : "Insira somente dígitos.",
          "email"     : "Digite um endereço de email válido.",
          "equalTo"   : "Insira o mesmo valor novamente.",
          "max"       : "Insira um número menor ou igual a {0}.",
          "maxlength" : "Insira menos de {0} caracteres.",
          "min"       : "Insira um número maior ou igual a {0}.",
          "minlength" : "Insira {0} caracteres, no mínimo.",
          "number"    : "Insira um número válido.",
          "range"     : "Insira um valor entre {0} e {1}.",
          "remote"    : "Corrija este campo.",
          "required"  : "Este campo é obrigatório.",
          "url"       : "Digite um URL válido."
        }
      },
      "truncateText": {
        "showMore"       : "Mostrar mais",
        "showLess"       : "Mostrar menos",
        "text_remaining" : "{0} restante(s)"
      }
    }
  }
}

// Load the CLDR data
Globalize.load(cldrData);

// Load i18n related contents
Globalize.loadMessages(messageData);

// Set the default locale
Globalize.locale('pt');
