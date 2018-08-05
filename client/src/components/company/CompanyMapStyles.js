var $main_color = '#2d313f',
  $saturation = -20,
  $brightness = 5;

var style = [
  {
    //set saturation for the labels on the map
    elementType: 'labels',
    stylers: [{ saturation: $saturation }]
  },
  {
    //poi stands for point of interest - don't show these lables on the map
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    //don't show highways lables on the map
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    //don't show local road lables on the map
    featureType: 'road.local',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }]
  },
  {
    //don't show arterial road lables on the map
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }]
  },
  {
    //don't show road lables on the map
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  },
  //style different elements on the map
  {
    featureType: 'transit',
    elementType: 'geometry.fill',
    stylers: [
      { hue: $main_color },
      { visibility: 'on' },
      { lightness: $brightness },
      { saturation: $saturation }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
      { hue: $main_color },
      { visibility: 'on' },
      { lightness: $brightness },
      { saturation: $saturation }
    ]
  },
  {
    featureType: 'poi.government',
    elementType: 'geometry.fill',
    stylers: [
      { hue: $main_color },
      { visibility: 'on' },
      { lightness: $brightness },
      { saturation: $saturation }
    ]
  },
  {
    featureType: 'poi.sport_complex',
    elementType: 'geometry.fill',
    stylers: [
      { hue: $main_color },
      { visibility: 'on' },
      { lightness: $brightness },
      { saturation: $saturation }
    ]
  },
  {
    featureType: 'poi.attraction',
    elementType: 'geometry.fill',
    stylers: [
      { hue: $main_color },
      { visibility: 'on' },
      { lightness: $brightness },
      { saturation: $saturation }
    ]
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry.fill',
    stylers: [
      { hue: $main_color },
      { visibility: 'on' },
      { lightness: $brightness },
      { saturation: $saturation }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'geometry.fill',
    stylers: [
      { hue: $main_color },
      { visibility: 'on' },
      { lightness: $brightness },
      { saturation: $saturation }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry.fill',
    stylers: [
      { hue: $main_color },
      { visibility: 'on' },
      { lightness: $brightness },
      { saturation: $saturation }
    ]
  },
  {
    featureType: 'landscape',
    stylers: [
      { hue: $main_color },
      { visibility: 'on' },
      { lightness: $brightness },
      { saturation: $saturation }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      { hue: $main_color },
      { visibility: 'on' },
      { lightness: $brightness },
      { saturation: $saturation }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      { hue: $main_color },
      { visibility: 'on' },
      { lightness: $brightness },
      { saturation: $saturation }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      { hue: $main_color },
      { visibility: 'on' },
      { lightness: $brightness },
      { saturation: $saturation }
    ]
  }
];

module.exports = style;
