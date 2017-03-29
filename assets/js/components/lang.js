/**
 * Created by Profesor08 on 19.02.2017.
 */

let langData = {
  language: 'us',
  defaultLanguage: 'us',
  allowedLanguages: ["us", 'ru'],
  lang: null,
  active: true
};

Vue.component("lang-switcher", {
  template: "#lang-switcher",

  data: function ()
  {
    return langData;
  },

  methods: {
    loadLang: function (lang)
    {
      if (this.allowedLanguages.indexOf(lang) > -1)
      {
        this.$http.get("assets/lang/lang-" + lang + ".json").then(function (res)
        {
          this.lang = JSON.parse(res.data);
          commonData.lang = this.lang;
        });
      }
    },

    switchLang: function (lang)
    {
      localStorage["lang"] = lang;
      this.language = lang;
      this.loadLang(lang);
    }
  },

  created: function ()
  {
    if ("lang" in localStorage && this.allowedLanguages.indexOf(localStorage["lang"]) >= 0)
    {
      this.language = localStorage["lang"];
      this.loadLang(localStorage["lang"]);
    }
    else
    {
      this.language = this.defaultLanguage;
      this.loadLang(this.defaultLanguage);
    }

    console.log("Lang component loaded.");
  }
});