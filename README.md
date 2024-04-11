# Recipe Website

Welcome to our Recipe Website! This repository contains the source code for a platform where you can explore and discover delicious recipes from around the world. Whether you're a seasoned chef or just starting out in the kitchen, we hope you find inspiration and joy in cooking and trying out new recipes.

## Features

- Browse a vast collection of recipes.
- Engage with the community by rating your cooking experiences.
- Responsive design, allowing for a seamless experience across all platforms.

## Getting Started

To clone this project and run it locally on your machine, follow these steps:

### 1. Install Node.js and npm

If you haven't installed Node.js and npm yet, you need to do that first. Follow the instructions below for your operating system:
- **Ubuntu**:
```sh
sudo apt update
sudo apt install nodejs
sudo apt install npm
```


### 2. Clone the repository

Open a terminal and run the following command:

```sh
git clone https://github.com/albertcheruiyot/Recipe-Website.git
```


### 3. Navigate to the project directory

Change into the project directory:

```sh
cd recipe-website
```


### 4. Install dependencies

Install the necessary dependencies by running:

```sh
npm install
```


### 5. Start the JSON server

Before starting the development server, you need to start the JSON server. Navigate to the directory containing `recipe.json` and run:


```sh
json-server --watch recipe.json
```


### 6. Start the development server

Once the dependencies are installed and the JSON server is running, start the development server by running:

```sh
npm start
```


### 7. Access the website

Open your web browser and navigate to `http://localhost:3000` to view the Recipe Website.

## Contributing

I welcome contributions from the community to make our Recipe Website even better! If you have ideas for new features, improvements, or bug fixes, please feel free to submit a pull request. Make sure to follow our [contributing guidelines](CONTRIBUTING.md) before getting started.

## Feedback and Support

If you encounter any issues while using our Recipe Website or have suggestions for improvement, please don't hesitate to [open an issue](https://github.com/albertcheruiyot/Recipe-Website/issues) on GitHub. Your feedback is invaluable to us as we strive to create a delightful cooking experience for our users.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
