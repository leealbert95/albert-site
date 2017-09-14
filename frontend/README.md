#My Portfolio Website

##About

This is a pet project that I have been working on, a personal website that implements an MVC pattern. It is created with Reactjs and uses Redux to manage application state, with an Express backend and MongoDb database to hold the website data. I created this project initially just to understand React, but as I familiarized myself with its powerful features, I found myself having fun with this project. As my first serious solo project and also my first venture at gathering data about my own life, it was an eye-opening experience. There were many tough obstacles to overcome, as it was my first serious attempt at learning React and had to accustom myself to the appropriate practices and features of this framework. I became much better at problem solving throughout the course of this project because I forced myself to be as self-reliant as I could. I am especially proud that I I've developed a much greater understanding of React through this project, as well as knowledge of other essential concepts such as HTTP requests, frontend-backend interaction, and optimizing website performance.

##Features

###Photos

This page contains gallery of photos I've taken over the years, and comes with rudimentary sorting and search options for the images. When image is opened in the lightbox, the Redux state is updated with its location (latitude & longitude) so that the map on the Places page will center on that location when opened. 

One of the greatest challenges of implementing this page was that even though the logic worked fine, it was incredibly slow with so many inages on one page. This was because the gallery component - and thus all its images - would rerender for every action taken in the lightbox (child component of gallery). I improved the page loading speed by setting a cap on images displayed at once, and moved most lightbox-related functions to the lightbox component itself to avoid unnecessary gallery rerenders. 