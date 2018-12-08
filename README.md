# Artform (Front-end) 

Live demo: https://artform-app.herokuapp.com/

### Log in as a bidder by clicking "Bidder" 

Email: juan@gmail.com

Password: 123

(Artist log in is currently still in progress.)

## Idea: 

This comes from a personal problem. In college, I tried to sell my art to make some extra cash. I used a site called Society6, a platform that allows artists to sell their art, where they would handle the transactions as well as make the print and ship it. Sounds great and all, but I realized that I only made about 10% of the profits. An $18.99 print would leave me with about $2. 

The idea behind this, my final project for the Flatiron Access Labs Coding Bootcamp, was to create a platform, completely user to user, without any extra fees. Maximum financial benefit for the artist. As well as a fun bidding atmosphere for the users, similar to Ebay. 

For the purposes of showcasing my project, I have left the timer to run for 25 seconds count-down after the initial bid.

## Solution: 

I have taken actual art done by myself and some of my old classmates/friends from when I attended FIT as an illustration major for the seed data. That's what the user first sees when opening up this app. 

After logging in is when users are able to interact and see details about the specific art.

This app is only interacting my own backend api, found here: https://github.com/gg-1414/artform-backend

The timer persists, even when a new user is viewing the same piece of art by comparing the start time (a post request to the art instance is made with the time after the initial bid) to the current time. Once that timer hits 0, the user with the highest bid wins the art. It is then taken out of the index page and moved to the winner's profile page. 

## How to use this app: 
1. Make sure you have PostgreSQL: https://www.postgresql.org/
- Once you downloaded it, start the server.

1. Clone the backend: https://github.com/gg-1414/artform-backend
- Run in terminal: `rails db:create`
- Then run: `rails db:migrate`
- Then run: `rails db:seed`
- Then run: `rails s` 

2. Clone this repo. 
- Run in terminal: `npm start`


