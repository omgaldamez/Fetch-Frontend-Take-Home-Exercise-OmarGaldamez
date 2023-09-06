# Svelte 4.0.5 Fetch Frontend Take-Home Exercise

A Svelte-based web application for searching and viewing dog breeds through a database of shelter dogs, with the hope of finding a lucky dog a new home!.

This project showcases the use of Svelte 4.0.5, Sveltekit, TypeScript, Tailwind CSS, Axios, and Skeleton to build a user-friendly application.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
   - [Installation](#installation)
5. [Vercel Deploy](#vercel-deploy)
6. [Usage](#usage)
   - [Log In](#log-in)
   - [Searching for Breeds](#searching-for-breeds)
   - [Favorite Breeds](#favorite-breeds)
   - [Match](#match)
8. [Future Steps](#future-steps)
9. [Other Projects](#other-projects)

## Introduction

The Svelte Dog Finder App is a web application designed to help users search for and explore various dog breeds. It utilizes the Svelte framework for building reactive and efficient user interfaces, TypeScript for type checking and better code organization, Tailwind CSS for styling, and the Skeleton UI library for UI components.

## Features

- **Breed Search:** Users can search and sort for dog breeds by selecting from a dropdown list of available breeds.
- **Dog Details:** After selecting a breed, users can view detailed information and images of dogs of that breed.
- **Favorites:** Users can mark breeds as favorites, and the app will notify them if there's a match for their selected breeds.
- **Toast Notifications:** The app uses the Skeleton UI library to display toast notifications for breed matching and search results.
- **UI Interface:** The app features UI resources like toggle between Dark Mode, has its own color theme and their components can be reused.

## Technologies Used

- **Svelte:** A frindly JavaScript framework for building user interfaces. It allows for reactive and efficient components. Highly recommended for data visualization
- **TypeScript:** A statically typed superset of JavaScript that enhances code quality and maintainability.
- **Tailwind CSS:** A utility-first CSS framework that simplifies styling and maintains a clean and consistent design.
- **Skeleton UI:** A Svelte library providing UI components and utilities, including toast notifications and tabs.

## Getting Started

Follow these steps to set up and run the Svelte Dog Finder App on your local machine.

### Installation

1. Clone the repository to your local machine:

```bash
   git clone https://github.com/omgaldamez/fetchTestSvelte.git
```

2. Install the required dependencies:

```bash
   npm install
```
3. Run Svelte:

```bash
   npm run dev
```
3. Install Axios (needed for Authentication):

```bash
   npm install axios
```
### Vercel Deploy
In this repository you can find the link to the app pdeploy made with Vercel in the About section

[Deploy](https://fetch-svelte.vercel.app/)

## Usage

### Log In

1. Initially, the Log In Modal is not displayed at the beginning. The only button in the UI will open the Log In Modal. The intention is to be able to display landing information before logging in.
2. Log in to the app using any email and name.
3. TThe app will notify you if any form has incorrect syntax.
4. After logging in, a tab for "Search Breeds" will appear.

### Searching for Breeds

1. In the "Search" section, click the input field to select a breed from the dropdown list.
2. The app will display details of the selected breed, including images and information.
3. It will display up to 50 dogs. Initially, the setup was 25
4. Each dog card will contain Name, Age, Zip Code and an image

### Favorite Breeds

1. In the "Favorites" section, you can mark dog breeds as your favorites by clicking the "Save" button.
2. There is a toggle to alphabetically sort the dog breeds
3. The app will notify you if there is a match for your selected breeds.
4. Select at least one breed as favourite, so the app will show you your best match in the Match section

### Match

1. If you selected more than one breed as favorite. The app will tell you your potential breed match!

## Future Steps
- For the next steps, it will include filtering by Zip Code, adding more dogs, and filtering by locations. It have been successfully tested manually
- [slugs] implemented. In /guides there is an example of how it would enable dynamic routing in Svelte

Contributions to this project are welcome! Feel free to open issues and pull requests to suggest improvements, report bugs, or add new features.

## Other Projects

Some other Svelte and D3.js projects

Longlisted in IIB Awards 2023: [Mexico Health Economics](https://dvizhealtheconomics.z19.web.core.windows.net/)

Svelte [Portfolio Scroll](https://consultora-7v5o.vercel.app/)


**Disclaimer:** This project is a demonstration of Svelte, TypeScript, Tailwind CSS, and the Skeleton UI library and is not affiliated with any real-world dog service. All dog breed information used in this project is fictional and for demonstration purposes only.

