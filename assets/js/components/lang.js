/**
 * Created by Profesor08 on 19.02.2017.
 */

let langData = {
  language: 'en',
  defaultLanguage: 'en',
  allowedLanguages: ["en", 'ru'],
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
        });
      }
    }
  },

  created: function ()
  {

    if (this.allowedLanguages.indexOf(Cookies.get("lang")) > -1)
    {

    }
    else
    {
      this.loadLang(this.defaultLanguage);
    }

    console.log("Lang component loaded.");
  }
});