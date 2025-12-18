/*import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet.markercluster';
import axios from 'axios';
import {RouterModule } from '@angular/router';
import { BacknavbarComponent } from '../../shared/backnavbar/backnavbar.component';

@Component({
selector: 'app-map',
standalone: true,
imports:[RouterModule, BacknavbarComponent, CommonModule],
templateUrl: './map.html',
styleUrls: ['./map.scss']
})
export class Map implements AfterViewInit, OnDestroy {
map!: L.Map;
originMarker: L.Marker | null = null;
destinationMarker: L.Marker | null = null;
routingControl: L.Routing.Control | null = null;
markerCluster!: L.MarkerClusterGroup;
loading = false;
error = '';


ngAfterViewInit(): void {
this.initMap();
}


ngOnDestroy(): void {
this.map?.remove();
}


initMap() {
  this.map = L.map('map', { zoomControl: false }).setView([36.8065, 10.1815], 7);


L.control.zoom({ position: 'bottomright' }).addTo(this.map);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '© OpenStreetMap contributors'
}).addTo(this.map);


this.markerCluster = L.markerClusterGroup();
this.map.addLayer(this.markerCluster);
}


async searchLocation(query: string): Promise<L.LatLng | null> {
if (!query) return null;


try {
this.loading = true;
this.error = '';


const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1`;
const res = await axios.get(url);
const feature = res.data?.features?.[0];
if (!feature) throw new Error('Location not found');


const [lng, lat] = feature.geometry.coordinates;
return L.latLng(lat, lng);


} catch (e) {
this.error = 'Location not found';
return null;
} finally {
this.loading = false;
}
}


async setOrigin(query: string) {
const latlng = await this.searchLocation(query);
if (!latlng) return;


this.originMarker?.remove();
this.originMarker = L.marker(latlng, { draggable: true })
.bindPopup('Origin')
.addTo(this.markerCluster)




.openPopup();


this.originMarker.on('dragend', () => this.updateRoute());
this.updateRoute();
}


async setDestination(query: string) {
const latlng = await this.searchLocation(query);
if (!latlng) return;


this.destinationMarker?.remove();


this.destinationMarker = L.marker(latlng, { draggable: true })
.bindPopup('Destination')
.addTo(this.markerCluster)
.openPopup();


this.destinationMarker.on('dragend', () => this.updateRoute());
this.updateRoute();
}


clearRoute() {
this.routingControl?.remove();
this.originMarker?.remove();
this.destinationMarker?.remove();


this.routingControl = null;
this.originMarker = null;
this.destinationMarker = null;
}


updateRoute() {
if (!this.originMarker || !this.destinationMarker) return;


this.routingControl?.remove();


this.routingControl = L.Routing.control({
waypoints: [
this.originMarker.getLatLng(),
this.destinationMarker.getLatLng()
],
addWaypoints: false,
routeWhileDragging: false,
show: false,
lineOptions: {
styles: [{ weight: 5 }],
extendToWaypoints: true,
  missingRouteTolerance: 50
}
}).addTo(this.map);


const bounds = L.latLngBounds([
this.originMarker.getLatLng(),
this.destinationMarker.getLatLng()
]);


this.map.fitBounds(bounds, { padding: [60, 60] });
}
}*/
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BacknavbarComponent } from '../../shared/backnavbar/backnavbar.component';
import { Map } from '../../map/map'; // ← SHARED MAP (same one chat uses)

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [CommonModule, RouterModule, BacknavbarComponent, Map],
  templateUrl: './map-page.html',
})
export class MapPage {}
