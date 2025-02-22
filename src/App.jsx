import * as React from "react"
import { useState } from 'react';
// IMPORT ANY NEEDED COMPONENTS HERE
import Header from "./components/Header/Header.jsx"
import Instructions from "./components/Instructions/Instructions.jsx"
import Chip from "./components/Chip/Chip.jsx"
import NutritionalLabel from "./components/NutritionalLabel/NutritionalLabel.jsx";
import { createDataSet } from "./data/dataset"
import "./App.css"

// don't move this!
export const appInfo = {
  title: `Fast Food Feud 🍔!`,
  tagline: `Folks' Favorite Friendly Fuel Finder For Food Facts`,
  description: `Finding healthy food is hard. Sometimes we just settle for what's available. That doesn't mean we shouldn't know what's going into our bodies! Fast Food Feud is here to arm the public with all the nutritional facts needed to make informed decisions about fast food consumption.`,
  dataSource: `All data pulled from the MenuStat.org interactive online database.`,
  instructions: {
    start: `Start by clicking on a food category on the left and a fast food joint from the list above. Afterwards, you'll be able to choose from a list of menu items and see their nutritional content.`,
    onlyCategory: `Now select a fast food restaurant from the list above!`,
    onlyRestaurant: `Now select a category from the list on the left!`,
    noSelectedItem: `Almost there! Choose a menu item and you'll have the fast food facts right at your fingertips!`,
    allSelected: `Great choice! Amazing what a little knowledge can do!`,
  },
}
// or this!
const { data, categories, restaurants } = createDataSet()

export function App() {

  const [category, setCategory] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [menuItem, setMenuItem] = useState("");

  const defineInstructions = () => {
    if (category && restaurant && menuItem) {
      return appInfo.instructions.allSelected;
    }
    else if (category && restaurant) {
      return appInfo.instructions.noSelectedItem;
    }
    else if (restaurant) {
      return appInfo.instructions.onlyRestaurant;
    }
    else if (category) {
      return appInfo.instructions.onlyCategory;
    }
    else {
      return appInfo.instructions.start;
    }
  }

  const currentMenuItems = data.filter(object => object.food_category == category && object.restaurant == restaurant);

  return (
    <main className="App">
      {/* CATEGORIES COLUMN */}
      <div className="CategoriesColumn col">
        <div className="categories options">
          <h2 className="title">Categories</h2>
          {categories.map((element, index) => (
            <Chip label={element} closeClickEvent={(e) => { e.stopPropagation(); setCategory("") }} clickEvent={() => { setCategory(element) }} isActive={(element == category) ? true : false} />
          ))
          }
        </div>
      </div>

      {/* MAIN COLUMN */}
      <div className="container">
        {
          /* HEADER HERE */
          <Header title={appInfo.title} tagline={appInfo.tagline} description={appInfo.description} />
        }

        {/* RESTAURANTS ROW */}
        <div className="RestaurantsRow">
          <h2 className="title">Restaurants</h2>
          <div className="restaurants options">{
            /* YOUR CODE HERE */
            restaurants.map((element, index) => (
              <Chip label={element} closeClickEvent={(e) => { e.stopPropagation(); setRestaurant("") }} clickEvent={() => setRestaurant(element)} isActive={(element == restaurant) ? true : false} />
            ))
          }</div>
        </div>

        {/* INSTRUCTIONS GO HERE */
          <Instructions instructions={defineInstructions()} />
        }

        {/* MENU DISPLAY */}
        <div className="MenuDisplay display">
          <div className="MenuItemButtons menu-items">
            <h2 className="title">Menu Items</h2>
            {/* YOUR CODE HERE */
              currentMenuItems.map((element, index) => (
                <Chip label={element.item_name} closeClickEvent={(e) => { e.stopPropagation(); setMenuItem("") }} clickEvent={() => setMenuItem(element)} isActive={(element == menuItem) ? true : false} />
              ))
            }
          </div>

          {/* NUTRITION FACTS */}
          <div className="NutritionFacts nutrition-facts">{
            /* YOUR CODE HERE */
            (menuItem) ? <NutritionalLabel item={menuItem} /> : null
          }</div>
        </div>

        <div className="data-sources">
          <p>{appInfo.dataSource}</p>
        </div>
      </div>
    </main>
  )
}

export default App
