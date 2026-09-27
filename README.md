# react-native-playground

Hands-on React Native POCs. Most projects are Expo apps with expo-router tabs, and every one has its own README.

## Basics

The simplest starting point: a new Expo app and a first set of tests.

* [hello-world-rn](pocs/hello-world-rn/) - Plain Expo 53 + React Native 0.79 app with expo-router tabs
* [unit-tests](pocs/unit-tests/) - Jest tests for hooks, constants, components and screens

## 📜 Lists & Scrolling

Lists render only the rows on screen, so long data stays fast.
They cover paging, refreshing and loading more rows as you scroll.

* [flatlist](pocs/flatlist/) - FlatList photo gallery with Picsum images
* [infinite-scroll](pocs/infinite-scroll/) - Pull to refresh and load more pages as you scroll
* [grid](pocs/grid/) - Cat facts from catfact.ninja shown in a table grid
* [gallery](pocs/gallery/) - ScrollView image gallery with seeded Picsum photos

## 🃏 Cards & Animation

Cards group related data into one tap target.
Animations add swipes, stacks and motion on top of them.

* [cards](pocs/cards/) - Horizontal FlatList carousel of user cards
* [stacked-cards](pocs/stacked-cards/) - Team member cards stacked with the Animated API

## 📝 Forms & Input

Forms collect user data and check it before saving.
Pickers, modals and multi-step flows keep long forms easy to fill.

* [form](pocs/form/) - Validated form with a date picker and a list of saved entries
* [combos](pocs/combos/) - Dependent state and city pickers inside a modal
* [toast](pocs/toast/) - Salary form with a split pay modal and an animated toast
* [wizzard](pocs/wizzard/) - Multi-step pizza order: flavor and size, toppings, delivery and payment

## 🧭 Navigation

Navigation moves the user between screens without losing state.

* [grocery-list](pocs/grocery-list/) - Material top tabs with grocery, todo and notes lists

## 🌐 Network & Device APIs

Apps call web APIs, embed web pages and read device services.

* [weather](pocs/weather/) - Weather forecast from the Open-Meteo API
* [web-view](pocs/web-view/) - Hacker News inside a react-native-webview
* [maps](pocs/maps/) - Address search with expo-location, showing latitude and longitude

## 📱 Apps

Small complete apps that combine storage, charts, files and games.

* [calculator](pocs/calculator/) - Calculator app with home and about tabs
* [classic-snake](pocs/classic-snake/) - Classic snake game
* [simple-flix](pocs/simple-flix/) - Save and watch YouTube videos, stored with AsyncStorage
* [gyn-hub](pocs/gyn-hub/) - Gym check-ins with streaks, charts and PDF export

## 🧩 Dynamic UI & Remote Code

The server decides what the app shows or ships new code at runtime.
Screens change without a new App Store release.

* [dynamic-code-sdui](pocs/dynamic-code-sdui/) - Server-driven UI: a Go backend sends the pages, the Expo app renders them
* [rn-repack-fun](pocs/rn-repack-fun/) - Re.Pack on React Native 0.82 loads remote component bundles and caches them in AsyncStorage
