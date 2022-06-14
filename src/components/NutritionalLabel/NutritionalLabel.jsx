import * as React from "react"
import { nutritionFacts } from "../../constants"
import "./NutritionalLabel.css"

export function NutritionalLabel(props) {
  return (
    <div className="nutritional-label">
      <h3 className="title">Nutrition Facts</h3>

      <h4 className="item-name">{props.item.item_name}</h4>
      {console.log(typeof props.item)}

      <ul className="fact-list">{nutritionFacts.map((element) => (<NutritionalLabelFact item={props.item} fact={element} />))}</ul>
    </div>
  )
}

export function NutritionalLabelFact(props) {
  return (
    <li className="nutrition-fact" key={props.fact.id}>
      <span className="fact-label">{props.fact.label}</span>{" "}
      <span className="fact-value">{(props.fact.attribute == "fiber") ? props.item["dietary_fiber"] : props.item[props.fact.attribute]}</span>
    </li>
  )
}

export default NutritionalLabel
