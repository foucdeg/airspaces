declare module '@mapbox/togeojson' {
  export = {
    kml: (xmlDoc: Document) => GeoJSON.FeatureCollection,
  };
}

declare namespace LeafletHotline {
  type Hotline = Leaflet.Path & {
    new (positions: any[], options: PolylineOptions): Hotline;
  };
}

declare module 'leaflet-hotline' {
  export = {
    Hotline: LeafletHotline.Hotline,
  };
}

declare module 'console' {
  export = typeof import('console');
}
