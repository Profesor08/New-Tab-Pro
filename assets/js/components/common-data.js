/**
 * Created by Profesor08 on 03.01.2017.
 */
const commonData = {
  active: true,
  size: 175,
  contentWidth: 1000,
  siteBorderColor: "rgba(255, 51, 0, 0.2)",
  siteBackgroundColor: "rgba(45, 45, 45, 0.4)",
  pageBackgroundColor: "rgba(0, 0, 10, 1)",
  pageBackgroundColorTransparent: "rgba(0, 0, 10, 0.2)",
  sitesGrid: null,
  sites: [
    // {name: "Google", url: "https://www.google.ru", image: "assets/images/sites/google.png"},
    // {name: "Torrentsmd", url: "https://torrentsmd.com/", image: "assets/images/sites/torrentsmd.png"},
    // {name: "Youtube", url: "https://youtube.com/", image: "assets/images/sites/youtube.png"},
    // {name: "X-MU Forum", url: "http://forum.x-mu.net/", image: "assets/images/sites/forum.x-mu.png"},
    // {name: "Facebook", url: "https://facebook.com/",image: "assets/images/sites/facebook.png"},
    // {name: "Moldindconbank", url: "https://wb.micb.md/",image: "assets/images/sites/moldindconbank.png"},
    // {name: "Habrahabr", url: "http://habrahabr.ru/",image: "assets/images/sites/habrahabr.png"},
    // {name: "Geektimes", url: "http://geektimes.ru/",image: "assets/images/sites/geektimes.png"},
    // {name: "Vkontakte", url: "http://vk.com",image: "assets/images/sites/vk.com.png"},
    // {name: "Lostfilm", url: "http://lostfilm.tv/",image: "assets/images/sites/lostfilm.png"},
    // {name: "The Pirate Bay", url: "http://thepiratebay.se/",image: "assets/images/sites/thepiratebay.png"},
    // {name: "Ebay", url: "http://ebay.com/",image: "assets/images/sites/ebay.png"},
    // {name: "GearBest", url: "http://www.gearbest.com/",image: "assets/images/sites/gearbest.png"},
    // {name: "Paypal", url: "http://paypal.com/",image: "assets/images/sites/paypal.png"},
    // {name: "SoundCloud", url: "https://soundcloud.com/",image: "assets/images/sites/Soundcloud-Icon.png"},
    // {name: "Coub", url: "http://coub.com/",image: "assets/images/sites/coub.png"},
    // {name: "Coriolis", url: "https://coriolis.io/", image: "https://coriolis.io/192x192.png"},
    // {name: "Elite Dangerous Database", url: "https://eddb.io/", image: "https://eddb.io/android-chrome-192x192.png"},
    // {name: "League of Legends", url: "http://ru.leagueoflegends.com/", image: "http://i.imgur.com/3DeXQQW.png"}
  ],
  options: {
    active: false,
    addSiteDialog: false,
    newSite: {
      image: '',
      name: '',
      url: ''
    }
  },
  lang: [],
  showMenu: false,
  snowButton: {
    active: true,
    snow: null,
    canvas_id: "Snow",
    canvas: null
  },
  spaceButton: {
    active: true,
    space: null,
    canvas_id: "FlyingThroughTheSpace",
    canvas: null
  },
  cloudsButton: {
    active: true,
    clouds: null,
    canvas_id: "Clouds",
    canvas: null
  },
  weatherData: {
    active: true,
    show: false,
    city: null,
    country: null,
    condition: null,
    temperature: null
  },
  voiceSearch: {
    active: true,
    recording: false,
    voiceSearch: null
  },
  currencyData: {
    active: true,
    currencyList: [],
    volutes: ["USD", "EUR", "RUB", "UAH", "RON", "GBP", "CHF"],
    baseVolute: "MDL",
    options: false,
    newBaseVolute: "",
    addVolute: "",
    currencies: {
      AED: "United Arab Emirates Dirham",
      AFN: "Afghan Afghani",
      ALL: "Albanian Lek",
      AMD: "Armenian Dram",
      ANG: "Netherlands Antillean Guilder",
      AOA: "Angolan Kwanza",
      ARS: "Argentine Peso",
      AUD: "Australian Dollar",
      AWG: "Aruban Florin",
      AZN: "Azerbaijani Manat",
      BAM: "Bosnia-Herzegovina Convertible Mark",
      BBD: "Barbadian Dollar",
      BDT: "Bangladeshi Taka",
      BGN: "Bulgarian Lev",
      BHD: "Bahraini Dinar",
      BIF: "Burundian Franc",
      BMD: "Bermudan Dollar",
      BND: "Brunei Dollar",
      BOB: "Bolivian Boliviano",
      BRL: "Brazilian Real",
      BSD: "Bahamian Dollar",
      BTC: "Bitcoin",
      BTN: "Bhutanese Ngultrum",
      BWP: "Botswanan Pula",
      BYN: "Belarusian Ruble",
      BYR: "Belarusian Ruble (pre-2016)",
      BZD: "Belize Dollar",
      CAD: "Canadian Dollar",
      CDF: "Congolese Franc",
      CHF: "Swiss Franc",
      CLF: "Chilean Unit of Account (UF)",
      CLP: "Chilean Peso",
      CNY: "Chinese Yuan",
      COP: "Colombian Peso",
      CRC: "Costa Rican Colón",
      CUC: "Cuban Convertible Peso",
      CUP: "Cuban Peso",
      CVE: "Cape Verdean Escudo",
      CZK: "Czech Republic Koruna",
      DJF: "Djiboutian Franc",
      DKK: "Danish Krone",
      DOP: "Dominican Peso",
      DZD: "Algerian Dinar",
      EEK: "Estonian Kroon",
      EGP: "Egyptian Pound",
      ERN: "Eritrean Nakfa",
      ETB: "Ethiopian Birr",
      EUR: "Euro",
      FJD: "Fijian Dollar",
      FKP: "Falkland Islands Pound",
      GBP: "British Pound Sterling",
      GEL: "Georgian Lari",
      GGP: "Guernsey Pound",
      GHS: "Ghanaian Cedi",
      GIP: "Gibraltar Pound",
      GMD: "Gambian Dalasi",
      GNF: "Guinean Franc",
      GTQ: "Guatemalan Quetzal",
      GYD: "Guyanaese Dollar",
      HKD: "Hong Kong Dollar",
      HNL: "Honduran Lempira",
      HRK: "Croatian Kuna",
      HTG: "Haitian Gourde",
      HUF: "Hungarian Forint",
      IDR: "Indonesian Rupiah",
      ILS: "Israeli New Sheqel",
      IMP: "Manx pound",
      INR: "Indian Rupee",
      IQD: "Iraqi Dinar",
      IRR: "Iranian Rial",
      ISK: "Icelandic Króna",
      JEP: "Jersey Pound",
      JMD: "Jamaican Dollar",
      JOD: "Jordanian Dinar",
      JPY: "Japanese Yen",
      KES: "Kenyan Shilling",
      KGS: "Kyrgystani Som",
      KHR: "Cambodian Riel",
      KMF: "Comorian Franc",
      KPW: "North Korean Won",
      KRW: "South Korean Won",
      KWD: "Kuwaiti Dinar",
      KYD: "Cayman Islands Dollar",
      KZT: "Kazakhstani Tenge",
      LAK: "Laotian Kip",
      LBP: "Lebanese Pound",
      LKR: "Sri Lankan Rupee",
      LRD: "Liberian Dollar",
      LSL: "Lesotho Loti",
      LTL: "Lithuanian Litas",
      LVL: "Latvian Lats",
      LYD: "Libyan Dinar",
      MAD: "Moroccan Dirham",
      MDL: "Moldovan Leu",
      MGA: "Malagasy Ariary",
      MKD: "Macedonian Denar",
      MMK: "Myanma Kyat",
      MNT: "Mongolian Tugrik",
      MOP: "Macanese Pataca",
      MRO: "Mauritanian Ouguiya",
      MTL: "Maltese Lira",
      MUR: "Mauritian Rupee",
      MVR: "Maldivian Rufiyaa",
      MWK: "Malawian Kwacha",
      MXN: "Mexican Peso",
      MYR: "Malaysian Ringgit",
      MZN: "Mozambican Metical",
      NAD: "Namibian Dollar",
      NGN: "Nigerian Naira",
      NIO: "Nicaraguan Córdoba",
      NOK: "Norwegian Krone",
      NPR: "Nepalese Rupee",
      NZD: "New Zealand Dollar",
      OMR: "Omani Rial",
      PAB: "Panamanian Balboa",
      PEN: "Peruvian Nuevo Sol",
      PGK: "Papua New Guinean Kina",
      PHP: "Philippine Peso",
      PKR: "Pakistani Rupee",
      PLN: "Polish Zloty",
      PYG: "Paraguayan Guarani",
      QAR: "Qatari Rial",
      RON: "Romanian Leu",
      RSD: "Serbian Dinar",
      RUB: "Russian Ruble",
      RWF: "Rwandan Franc",
      SAR: "Saudi Riyal",
      SBD: "Solomon Islands Dollar",
      SCR: "Seychellois Rupee",
      SDG: "Sudanese Pound",
      SEK: "Swedish Krona",
      SGD: "Singapore Dollar",
      SHP: "Saint Helena Pound",
      SLL: "Sierra Leonean Leone",
      SOS: "Somali Shilling",
      SRD: "Surinamese Dollar",
      STD: "São Tomé and Príncipe Dobra",
      SVC: "Salvadoran Colón",
      SYP: "Syrian Pound",
      SZL: "Swazi Lilangeni",
      THB: "Thai Baht",
      TJS: "Tajikistani Somoni",
      TMT: "Turkmenistani Manat",
      TND: "Tunisian Dinar",
      TOP: "Tongan Pa?anga",
      TRY: "Turkish Lira",
      TTD: "Trinidad and Tobago Dollar",
      TWD: "New Taiwan Dollar",
      TZS: "Tanzanian Shilling",
      UAH: "Ukrainian Hryvnia",
      UGX: "Ugandan Shilling",
      USD: "United States Dollar",
      UYU: "Uruguayan Peso",
      UZS: "Uzbekistan Som",
      VEF: "Venezuelan Bolívar Fuerte",
      VND: "Vietnamese Dong",
      VUV: "Vanuatu Vatu",
      WST: "Samoan Tala",
      XAF: "CFA Franc BEAC",
      XAG: "Silver Ounce",
      XAU: "Gold Ounce",
      XCD: "East Caribbean Dollar",
      XDR: "Special Drawing Rights",
      XOF: "CFA Franc BCEAO",
      XPD: "Palladium Ounce",
      XPF: "CFP Franc",
      XPT: "Platinum Ounce",
      YER: "Yemeni Rial",
      ZAR: "South African Rand",
      ZMK: "Zambian Kwacha (pre-2013)",
      ZMW: "Zambian Kwacha",
      ZWL: "Zimbabwean Dollar"
    }
  }
};
