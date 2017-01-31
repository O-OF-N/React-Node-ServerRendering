/* THIS FILE IS AUTO GENERATED - DO NOT EDIT */

var cldrData = {
  "supplemental": {
    "version": {
      "_unicodeVersion": "7.0.0",
      "_number": "$Revision: 11318 $"
    },
    "likelySubtags": {
      "en": "en-Latn-US"
    }
  }
}

var messageData = {
  "en": {
    "Terra": {
      "ajax": {
        "error": "This content failed to load."
      },
      "areYouSure": {
        "unsaved": "You have unsaved changes."
      },
      "forms": {
        "validation": {
          "date"      : "Enter a valid date in the \"mm/dd/yyyy\" format.",
          "digits"    : "Enter only digits.",
          "email"     : "Enter a valid email address.",
          "equalTo"   : "Enter the same value again.",
          "max"       : "Enter a value less than or equal to {0}.",
          "maxlength" : "Enter less than {0} characters.",
          "min"       : "Enter a value greater than or equal to {0}.",
          "minlength" : "Enter at least {0} characters.",
          "number"    : "Enter a valid number.",
          "range"     : "Enter a value between {0} and {1}.",
          "remote"    : "Fix this field.",
          "required"  : "This field is required.",
          "url"       : "Enter a valid URL."
        }
      },
      "truncateText": {
        "showMore"       : "Show more",
        "showLess"       : "Show less",
        "text_remaining" : "{0} remaining"
      }
    }
  }
}

// Load the CLDR data
Globalize.load(cldrData);

// Load i18n related contents
Globalize.loadMessages(messageData);

// Set the default locale
Globalize.locale('en');
