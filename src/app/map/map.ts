/*import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {
  zoom = 8;
  center: google.maps.LatLngLiteral = { lat: 36.8065, lng: 10.1815 };

  markerOrigin: google.maps.LatLngLiteral | null = null;
  markerDestination: google.maps.LatLngLiteral | null = null;

  setOrigin(location: any) {
    this.markerOrigin = { lat: location.lat, lng: location.lng };
    this.center = this.markerOrigin;
  }

  setDestination(location: any) {
    this.markerDestination = { lat: location.lat, lng: location.lng };
  }
}*/

/*
/// <reference types="google.maps" />
import { Component, AfterViewInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html',
  styleUrls: ['./map.scss']
})
export class Map implements AfterViewInit {

  map!: google.maps.Map;

  ngAfterViewInit() {
    // Load Google Maps script dynamically
    if (!document.getElementById('google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => this.initMap();
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  }

  initMap() {
    const mapContainer = document.getElementById('map') as HTMLElement;
    this.map = new google.maps.Map(mapContainer, {
      center: { lat: 36.8065, lng: 10.1815 },
      zoom: 8
    });
  }

  setOrigin(location: {lat: number, lng: number}) {
    new google.maps.Marker({
      position: location,
      map: this.map,
      label: 'O'
    });
    this.map.setCenter(location);
  }

  setDestination(location: {lat: number, lng: number}) {
    new google.maps.Marker({
      position: location,
      map: this.map,
      label: 'D'
    });
  }
}




*/


///correct version
/*
import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet.markercluster';
import axios from 'axios';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html',
  styleUrls: ['./map.scss']
})
export class Map implements AfterViewInit {

  map!: L.Map;
  originMarker!: L.Marker;
  destinationMarker!: L.Marker;
  routingControl: any;
  markerCluster!: L.MarkerClusterGroup;

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map').setView([36.8065, 10.1815], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.markerCluster = L.markerClusterGroup();
    this.map.addLayer(this.markerCluster);
  }

  async searchLocation(query: string): Promise<L.LatLng | null> {
    try {
      const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1`;
      const response = await axios.get(url);

      const features = response.data.features;
      if (!features || features.length === 0) return null;

      const [lng, lat] = features[0].geometry.coordinates;
      return L.latLng(lat, lng);

    } catch (err) {
      console.error("Search error:", err);
      return null;
    }
  }

  async setOrigin(query: string) {
    const latlng = await this.searchLocation(query);
    if (!latlng) return;

    if (this.originMarker) this.map.removeLayer(this.originMarker);

    this.originMarker = L.marker(latlng, { draggable: true })
      .bindPopup("Origin")
      .addTo(this.markerCluster);

    this.map.setView(latlng, 10);
    this.updateRoute();
  }
  
  async setDestination(query: string) {
    const latlng = await this.searchLocation(query);
    if (!latlng) return;

    if (this.destinationMarker) this.map.removeLayer(this.destinationMarker);

    this.destinationMarker = L.marker(latlng, { draggable: true })
      .bindPopup("Destination")
      .addTo(this.markerCluster);

    this.map.setView(latlng, 10);
    this.updateRoute();
  }



  addRideMarker(latlng: L.LatLng, info: string) {
    const marker = L.marker(latlng)
      .bindPopup(info);
    this.markerCluster.addLayer(marker);
  }

  updateRoute() {
    if (!this.originMarker || !this.destinationMarker) return;

    if (this.routingControl) this.map.removeControl(this.routingControl);

    this.routingControl = L.Routing.control({
      waypoints: [
        this.originMarker.getLatLng(),
        this.destinationMarker.getLatLng()
      ],
      routeWhileDragging: true,
      addWaypoints: false,
      show: false,
      lineOptions: {
        styles: [{ color: 'blue', weight: 4 }],
        extendToWaypoints: true,        // ✅ REQUIRED
        missingRouteTolerance: 30       // ✅ REQUIRED
      }
    }).addTo(this.map);
  }
}
*/






















import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet.markercluster';
import axios from 'axios';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html',
  styleUrls: ['./map.scss']
})
export class Map implements AfterViewInit {

  map!: L.Map;
  originMarker: L.Marker | null = null;
  destinationMarker: L.Marker | null = null;
  routingControl: L.Routing.Control | null = null;
  markerCluster!: L.MarkerClusterGroup;

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map').setView([36.8065, 10.1815], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.markerCluster = L.markerClusterGroup();
    this.map.addLayer(this.markerCluster);
  }

  /** Search a city or place by name → return coordinates */
  async searchLocation(query: string): Promise<L.LatLng | null> {
    try {
      const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1`;
      const response = await axios.get(url);

      const features = response.data.features;
      if (!features || features.length === 0) return null;

      const [lng, lat] = features[0].geometry.coordinates;
      return L.latLng(lat, lng);

    } catch (err) {
      console.error("Search error:", err);
      return null;
    }
  }

  /** Accepts a STRING */
  async setOrigin(query: string): Promise<void> {
    const latlng = await this.searchLocation(query);
    if (!latlng) return;

    if (this.originMarker) this.map.removeLayer(this.originMarker);

    this.originMarker = L.marker(latlng, { draggable: true })
      .bindPopup("Origin")
      .addTo(this.markerCluster);

    this.map.setView(latlng, 10);
    this.updateRoute();
  }

  /** Accepts a STRING */
  async setDestination(query: string): Promise<void> {
    const latlng = await this.searchLocation(query);
    if (!latlng) return;

    if (this.destinationMarker) this.map.removeLayer(this.destinationMarker);

    this.destinationMarker = L.marker(latlng, { draggable: true })
      .bindPopup("Destination")
      .addTo(this.markerCluster);

    this.map.setView(latlng, 10);
    this.updateRoute();
  }

  addRideMarker(latlng: L.LatLng, info: string): void {
    const marker = L.marker(latlng).bindPopup(info);
    this.markerCluster.addLayer(marker);
  }

  updateRoute(): void {
    if (!this.originMarker || !this.destinationMarker) return;

    if (this.routingControl) this.map.removeControl(this.routingControl);

    this.routingControl = L.Routing.control({
      waypoints: [
        this.originMarker.getLatLng(),
        this.destinationMarker.getLatLng()
      ],
      routeWhileDragging: true,
      addWaypoints: false,
      show: false,
      lineOptions: {
        styles: [{ color: 'blue', weight: 4 }],
        extendToWaypoints: true,
        missingRouteTolerance: 50
      }
    });

    this.routingControl.addTo(this.map);
  }
}

